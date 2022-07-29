import { NextApiRequest, NextApiResponse } from 'next'
import { getAuthJWTCookieCleared } from '~/helpers/auth'

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({})
  }

  res.setHeader('Set-Cookie', getAuthJWTCookieCleared())
  res.json({})
}
