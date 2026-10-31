'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { checkPassword, endSession, isAdmin, startSession } from '@/lib/admin-auth'
import { getSupabase, STATUSES, type AppointmentStatus } from '@/lib/supabase'

export async function login(formData: FormData) {
  const password = String(formData.get('password') ?? '')
  if (!checkPassword(password)) redirect('/admin?error=1')
  startSession()
  redirect('/admin')
}

export async function logout() {
  endSession()
  redirect('/admin')
}

export async function updateStatus(formData: FormData) {
  if (!isAdmin()) redirect('/admin')

  const id     = String(formData.get('id') ?? '')
  const status = String(formData.get('status') ?? '') as AppointmentStatus
  if (!id || !STATUSES.includes(status)) return

  const supabase = getSupabase()
  if (!supabase) return
  await supabase.from('appointments').update({ status }).eq('id', id)
  revalidatePath('/admin')
}
