import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { MIN_PASSWORD_LENGTH, isAdmin } from '@/lib/admin-auth'
import { changePassword } from '../actions'
import Shell from '../Shell'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Change password | Cera Dental Admin',
  robots: { index: false, follow: false },
}

const ERRORS: Record<string, string> = {
  current:  'Your current password is incorrect.',
  short:    `The new password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
  mismatch: 'The two new passwords don’t match.',
  same:     'The new password must be different from the current one.',
  setup:    'Password changes aren’t set up yet: run supabase/schema.sql in the Supabase SQL Editor, then try again.',
  failed:   'Could not save the new password. Please try again.',
}

const INPUT = 'w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500'

export default async function PasswordPage({
  searchParams,
}: {
  searchParams: { error?: string; done?: string }
}) {
  if (!(await isAdmin())) redirect('/admin')

  const error = searchParams.error ? ERRORS[searchParams.error] : undefined
  const done = searchParams.done === '1'

  return (
    <Shell signedIn>
      <div className="max-w-sm mx-auto bg-white border border-slate-100 rounded-2xl shadow-card p-8">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Change password</h1>
        <p className="text-sm text-slate-500 mb-6">
          Anyone else signed in to the admin page will be signed out and need the new password.
        </p>

        {done && (
          <p role="status" className="mb-5 text-sm bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3">
            Password changed. You’re still signed in on this device.
          </p>
        )}
        {error && (
          <p role="alert" className="mb-5 text-sm bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-3">
            {error}
          </p>
        )}

        {/* key remounts the form after each submit so typed passwords are cleared */}
        <form key={searchParams.error ?? String(done)} action={changePassword} className="space-y-4">
          <label className="block">
            <span className="block text-sm font-semibold text-slate-700 mb-1.5">Current password</span>
            <input type="password" name="current" required autoComplete="current-password" className={INPUT} />
          </label>
          <label className="block">
            <span className="block text-sm font-semibold text-slate-700 mb-1.5">New password</span>
            <input
              type="password"
              name="next"
              required
              minLength={MIN_PASSWORD_LENGTH}
              autoComplete="new-password"
              aria-describedby="new-password-hint"
              className={INPUT}
            />
            <span id="new-password-hint" className="block text-xs text-slate-400 mt-1.5">
              At least {MIN_PASSWORD_LENGTH} characters.
            </span>
          </label>
          <label className="block">
            <span className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm new password</span>
            <input type="password" name="confirm" required autoComplete="new-password" className={INPUT} />
          </label>
          <button className="w-full rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 text-sm">
            Save new password
          </button>
        </form>

        <Link href="/admin" className="block text-center text-sm font-semibold text-slate-500 hover:text-cyan-700 mt-5">
          Back to bookings
        </Link>
      </div>
    </Shell>
  )
}
