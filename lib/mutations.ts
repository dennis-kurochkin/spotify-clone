import fetcher from './fetcher'
import { UserCredentials } from '../types/auth'

export const auth = (mode: 'signin' | 'signup', body: UserCredentials) => {
  return fetcher(`/${mode}`, body)
}
