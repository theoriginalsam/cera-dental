import 'server-only'
import { createHash, createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'cera_admin'

// The session cookie holds an HMAC derived from ADMIN_PASSWORD, so changing
// the password signs everyone out.
function sessionToken(): string | null {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return null
  return createHmac('sha256', password).update('cera-admin-session-v1').digest('hex')
}

function safeEqual(a: string, b: string): boolean {
  const ha = createHash('sha256').update(a).digest()
  const hb = createHash('sha256').update(b).digest()
  return timingSafeEqual(ha, hb)
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD)
}

export function checkPassword(input: string): boolean {
  const password = process.env.ADMIN_PASSWORD
  return Boolean(password) && safeEqual(input, password as string)
}

export function isAdmin(): boolean {
  const expected = sessionToken()
  const actual = cookies().get(ADMIN_COOKIE)?.value
  return Boolean(expected && actual) && safeEqual(actual as string, expected as string)
}

export function startSession() {
  const token = sessionToken()
  if (!token) return
  cookies().set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/admin',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export function endSession() {
  cookies().delete({ name: ADMIN_COOKIE, path: '/admin' })
}
