import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
import { AUTH_JWT_COOKIE_NAME, AUTH_JWT_EXPIRES_IN_HOURS, AUTH_JWT_EXPIRES_IN_SECONDS } from '../constants/auth'
import { logError } from './index'
import { prismaClient } from '../lib/prisma'

export const getAuthJWT = ({ email, id }: Pick<User, 'email' | 'id'>) => {
  return jwt.sign(
    {
      email,
      id,
      time: Date.now(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: `${AUTH_JWT_EXPIRES_IN_HOURS}h`,
    }
  )
}

export const getAuthJWTCookie = (user: Parameters<typeof getAuthJWT>[0]) => {
  return cookie.serialize(AUTH_JWT_COOKIE_NAME, getAuthJWT(user), {
    httpOnly: true,
    maxAge: AUTH_JWT_EXPIRES_IN_SECONDS,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}

export const validateRoute = (handler: (req: NextApiRequest, res: NextApiResponse, user: User) => void) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies[AUTH_JWT_COOKIE_NAME]
    let user: User | null = null

    if (token) {
      try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET) as User

        user = await prismaClient.user.findUnique({
          where: {
            id,
          },
        })

        if (!user) throw new Error('User is invalid')
      } catch (error) {
        logError(error)
        res.status(401).json({
          message: 'Not Authorized',
          error,
        })
        return
      }

      return handler(req, res, user)
    }

    res.status(401).json({
      message: 'Not Authorized',
    })
  }
}
