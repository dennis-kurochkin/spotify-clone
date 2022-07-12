import { UserCredentials } from '../types/auth'
import { fetcher } from './fetcher'

export type AuthenticateMode = 'signin' | 'signup'
export const authenticate = (mode: AuthenticateMode, body: UserCredentials) => {
  return fetcher(`/${mode}`, body)
}
