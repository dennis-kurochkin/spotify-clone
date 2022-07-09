import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { AUTH_JWT_COOKIE_NAME, AUTH_JWT_EXPIRES_IN_HOURS, AUTH_JWT_EXPIRES_IN_SECONDS } from '../constants/auth'

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

export const isPrismaConnectionError = (error: unknown): boolean => {
  // @ts-expect-error
  if (typeof error === 'object' && !!error.clientVersion) { // @ts-expect-error
    return Object.keys(error).length === 2 && !!error.clientVersion && !error.errorCode
  }

  return false
}
