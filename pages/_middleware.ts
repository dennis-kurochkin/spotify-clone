import { NextRequest, NextResponse } from 'next/server'
import { AUTH_JWT_COOKIE_NAME } from '~/constants/auth'

const pagesPathnamesToProtect: string[] = [
  '/',
  '/playlist',
  '/library',
]

export default function middleware(req: NextRequest) {
  if (pagesPathnamesToProtect.includes(req.nextUrl.pathname)) {
    const token = req.cookies[AUTH_JWT_COOKIE_NAME]

    if (!token) {
      return NextResponse.redirect(new URL('/signin', req.url))
    }
  }
}
