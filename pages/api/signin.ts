import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { isPrismaConnectionError, prismaClient } from '~/lib/prisma'
import { getAuthJWTCookie } from '~/helpers/auth'

interface SignInApiRequest extends NextApiRequest {
  body: {
    email: string
    password: string
  }
}

export default async (req: SignInApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({})
    return
  }

  const { email, password } = req.body
  let user: User | null

  try {
    user = await prismaClient.user.findUnique({ where: { email } })

    if (!user) throw new Error('User is not found')

    if (bcrypt.compareSync(password, user.password)) {
      res.setHeader('Set-Cookie', getAuthJWTCookie({
        email,
        id: user.id,
      }))
      res.json({ user })
    } else {
      res.status(400).json({ message: 'Password don\'t match' })
    }
  } catch (error) {
    if (isPrismaConnectionError(error)) {
      res.status(500).json({
        message: 'Prisma connection error',
        error,
      })
    } else {
      res.status(400).json({
        message: 'User with this email is not found',
        error,
      })
    }
  }
}
