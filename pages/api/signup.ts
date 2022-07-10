import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import { isPrismaConnectionError, prismaClient } from '../../lib/prisma'
import { getAuthJWTCookie } from '../../helpers/auth'

interface SignUpApiRequest extends NextApiRequest {
  body: {
    email: string
    password: string
  }
}

type ResponseData = {
  user: User
}

type ResponseDataError = {
  message?: string
  error?: unknown
}

export default async (req: SignUpApiRequest, res: NextApiResponse<ResponseData | ResponseDataError>) => {
  if (req.method !== 'POST') {
    res.status(405).json({})
    return
  }

  const salt = bcrypt.genSaltSync()
  const { email, password } = req.body

  try {
    const user: User = await prismaClient.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    })

    res.setHeader('Set-Cookie', getAuthJWTCookie({ email, id: user.id }))
    res.json({ user })
  } catch (error) {
    if (isPrismaConnectionError(error)) {
      res.status(500).json({
        message: 'Prisma connection error',
        error,
      })
    } else {
      res.status(400).json({
        message: 'User already exists',
        error,
      })
    }
  }
}
