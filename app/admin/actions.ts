'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { MIN_PASSWORD_LENGTH, checkPassword, endSession, isAdmin, savePassword, startSession } from '@/lib/admin-auth'
import { getSupabase, STATUSES, type AppointmentStatus } from '@/lib/supabase'

export async function login(formData: FormData) {
  const password = String(formData.get('password') ?? '')
  if (!(await checkPassword(password))) redirect('/admin?error=1')
  await startSession()
  redirect('/admin')
}

export async function logout() {
  endSession()
  redirect('/admin')
}

export async function updateStatus(formData: FormData) {
  if (!(await isAdmin())) redirect('/admin')

  const id     = String(formData.get('id') ?? '')
  const status = String(formData.get('status') ?? '') as AppointmentStatus
  if (!id || !STATUSES.includes(status)) return

  const supabase = getSupabase()
  if (!supabase) return
  await supabase.from('appointments').update({ status }).eq('id', id)
  revalidatePath('/admin')
}

export async function changePassword(formData: FormData) {
  if (!(await isAdmin())) redirect('/admin')

  const current = String(formData.get('current') ?? '')
  const next    = String(formData.get('next') ?? '')
  const confirm = String(formData.get('confirm') ?? '')

  if (!(await checkPassword(current))) redirect('/admin/password?error=current')
  if (next.length < MIN_PASSWORD_LENGTH) redirect('/admin/password?error=short')
  if (next !== confirm) redirect('/admin/password?error=mismatch')
  if (next === current) redirect('/admin/password?error=same')

  const result = await savePassword(next)
  redirect(result === 'ok' ? '/admin/password?done=1' : `/admin/password?error=${result}`)
}
