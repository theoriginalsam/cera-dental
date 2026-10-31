import 'server-only'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export interface Appointment {
  id: string
  created_at: string
  name: string
  phone: string
  preferred_date: string | null
  preferred_time: string | null
  treatment: string | null
  message: string | null
  status: AppointmentStatus
}

export const STATUSES = ['new', 'confirmed', 'completed', 'cancelled'] as const
export type AppointmentStatus = (typeof STATUSES)[number]

let client: SupabaseClient | null = null

// Server-side client using the secret key. Returns null until the env vars are set,
// so the site still works (bookings fall back to WhatsApp) before Supabase is configured.
export function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY
  if (!url || !key) return null
  client ??= createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return client
}
