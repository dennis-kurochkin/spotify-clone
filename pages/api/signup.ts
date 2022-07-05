import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { User } from '@prisma/client'
import { prismaClient } from '../../lib/prisma'

type ResponseData = {
  user: User
}

type ResponseDataError = {
  message: string
}

export default async (req: NextApiRequest, res: NextApiResponse<ResponseData | ResponseDataError>) => {
  if (req.method !== 'POST') {
    return res.status(404)
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
    res.status(401)
    res.json({ message: 'User already exists' })
  }

  const token = jwt.sign(
    {
      email,
      id: user.id,
      time: Date.now(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '8h',
    }
  )

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('SBOTIFY_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  )

  res.json({ user })
}
