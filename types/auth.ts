import { User } from '@prisma/client'

export type UserCredentials = Pick<User, 'email' | 'password'>
