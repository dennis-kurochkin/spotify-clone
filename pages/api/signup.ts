import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import { isPrismaConnectionError, prismaClient } from '~/lib/prisma'
import { getAuthJWTCookie } from '~/helpers/auth'

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
        avatar: 'http://placekitten.com/g/600/600',
        email,
        password: bcrypt.hashSync(password, salt),
        name: 'No name',
      },
    })

    const songs = await prismaClient.song.findMany({})
    await Promise.all(new Array(10).fill(1).map((_, index) => {
      return prismaClient.playlist.create({
        data: {
          name: `Playlist #${index + 1}`,
          avatar: 'http://placekitten.com/g/500/500',
          description: 'Playlist description',
          user: {
            connect: {
              id: user.id,
            },
          },
          songs: {
            connect: songs.map((song) => ({ id: song.id })),
          },
        },
      })
    }))

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
