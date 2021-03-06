import { PrismaClient } from '@prisma/client'

export const isPrismaConnectionError = (error: unknown): boolean => {
  // @ts-expect-error TODO: write a function to check is error is NextError
  if (typeof error === 'object' && !!error.clientVersion) { // @ts-expect-error TODO: write a function to check is error is NextError
    return Object.keys(error).length === 2 && !!error.clientVersion && !error.errorCode
  }

  return false
}

const createPrismaClient = (): PrismaClient => {
  if (process.env.NODE_ENV !== 'production') {
    if (!global.prismaClient) {
      global.prismaClient = new PrismaClient()
    }

    return global.prismaClient
  }

  return new PrismaClient()
}

export const prismaClient = createPrismaClient()
