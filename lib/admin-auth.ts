import 'server-only'
import { createHash, createHmac, randomBytes, scrypt, timingSafeEqual } from 'crypto'
import { promisify } from 'util'
import { cookies } from 'next/headers'
import { getSupabase } from '@/lib/supabase'

export const ADMIN_COOKIE = 'cera_admin'
export const MIN_PASSWORD_LENGTH = 8

const SETTINGS_TABLE = 'admin_settings'
const PASSWORD_KEY = 'password_hash'
// PostgREST / Postgres codes for "table does not exist" (admin_settings not created yet)
const MISSING_TABLE_CODES = ['PGRST205', '42P01']

const scryptAsync = promisify(scrypt) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>

function safeEqual(a: string, b: string): boolean {
  const ha = createHash('sha256').update(a).digest()
  const hb = createHash('sha256').update(b).digest()
  return timingSafeEqual(ha, hb)
}

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16)
  const hash = await scryptAsync(password, salt, 64)
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`
}

// The current credential: the password hash saved from the admin page, or, until one
// has been saved, ADMIN_PASSWORD from the environment. Null means sign-in is unavailable.
async function getCredential(): Promise<string | null> {
  const supabase = getSupabase()
  if (supabase) {
    const { data, error } = await supabase
      .from(SETTINGS_TABLE)
      .select('value')
      .eq('key', PASSWORD_KEY)
      .maybeSingle()
    if (data?.value) return data.value as string
    if (error && !MISSING_TABLE_CODES.includes(error.code)) {
      console.error('Failed to read admin password:', error.message)
      return null
    }
  }
  const password = process.env.ADMIN_PASSWORD
  return password ? `plain$${password}` : null
}

async function matches(input: string, credential: string): Promise<boolean> {
  if (credential.startsWith('plain$')) return safeEqual(input, credential.slice('plain$'.length))
  const [scheme, saltHex, hashHex] = credential.split('$')
  if (scheme !== 'scrypt' || !saltHex || !hashHex) return false
  const hash = await scryptAsync(input, Buffer.from(saltHex, 'hex'), 64)
  return timingSafeEqual(hash, Buffer.from(hashHex, 'hex'))
}

// The session cookie holds an HMAC derived from the current credential,
// so changing the password signs everyone else out.
function sessionToken(credential: string): string {
  return createHmac('sha256', credential).update('cera-admin-session-v1').digest('hex')
}

export async function isAdminConfigured(): Promise<boolean> {
  return (await getCredential()) !== null
}

export async function checkPassword(input: string): Promise<boolean> {
  const credential = await getCredential()
  return credential !== null && (await matches(input, credential))
}

export async function isAdmin(): Promise<boolean> {
  const credential = await getCredential()
  const actual = cookies().get(ADMIN_COOKIE)?.value
  return Boolean(credential && actual) && safeEqual(actual as string, sessionToken(credential as string))
}

export async function startSession(credential?: string) {
  const current = credential ?? (await getCredential())
  if (!current) return
  cookies().set(ADMIN_COOKIE, sessionToken(current), {
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

export type SavePasswordResult = 'ok' | 'setup' | 'failed'

// Saves a new password hash and keeps the current browser signed in.
export async function savePassword(password: string): Promise<SavePasswordResult> {
  const supabase = getSupabase()
  if (!supabase) return 'setup'
  const credential = await hashPassword(password)
  const { error } = await supabase
    .from(SETTINGS_TABLE)
    .upsert({ key: PASSWORD_KEY, value: credential, updated_at: new Date().toISOString() })
  if (error) {
    if (MISSING_TABLE_CODES.includes(error.code)) return 'setup'
    console.error('Failed to save admin password:', error.message)
    return 'failed'
  }
  await startSession(credential)
  return 'ok'
}
