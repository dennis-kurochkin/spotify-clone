import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import { prismaClient } from '../../lib/prisma'
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
}

export default async (req: SignUpApiRequest, res: NextApiResponse<ResponseData | ResponseDataError>) => {
  if (req.method !== 'POST') {
    res.status(405).json({})
  }

  const salt = bcrypt.genSaltSync()
  const { email, password } = req.body

  let user: User

  try {
    user = await prismaClient.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    })
  } catch (error) {
    res.status(400).json({ message: 'User already exists' })
  }

  res.setHeader('Set-Cookie', getAuthJWTCookie({ email, id: user.id }))
  res.json({ user })
}
