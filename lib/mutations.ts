import fetcher from './fetcher'
import { UserCredentials } from '../types/auth'

export type AuthenticateMode = 'signin' | 'signup'
export const authenticate = (mode: AuthenticateMode, body: UserCredentials) => {
  return fetcher(`/${mode}`, body)
}
