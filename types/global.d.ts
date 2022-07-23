import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line
  var prismaClient: PrismaClient
}
