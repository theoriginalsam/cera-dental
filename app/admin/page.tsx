import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { isAdmin, isAdminConfigured } from '@/lib/admin-auth'
import { getSupabase, STATUSES, type Appointment } from '@/lib/supabase'
import { login, logout, updateStatus } from './actions'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Bookings | Cera Dental Admin',
  robots: { index: false, follow: false },
}

const STATUS_STYLES: Record<string, string> = {
  new:       'bg-cyan-50 text-cyan-700 border-cyan-200',
  confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  completed: 'bg-slate-100 text-slate-600 border-slate-200',
  cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-GB', {
    timeZone: 'Asia/Kathmandu',
    day: 'numeric', month: 'short', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  })
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  })
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-horizontal.png" alt="Cera Dental Clinic" width={160} height={52} className="h-10 w-auto" />
            <span className="hidden sm:inline text-sm font-semibold text-slate-400">Bookings</span>
          </Link>
          {isAdmin() && (
            <form action={logout}>
              <button className="text-sm font-semibold text-slate-500 hover:text-cyan-700">Sign out</button>
            </form>
          )}
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">{children}</main>
    </div>
  )
}

function LoginForm({ error }: { error: boolean }) {
  return (
    <div className="max-w-sm mx-auto bg-white border border-slate-100 rounded-2xl shadow-card p-8">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Admin sign in</h1>
      <p className="text-sm text-slate-500 mb-6">View appointment requests from the website.</p>
      {!isAdminConfigured() && (
        <p className="mb-4 text-sm bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-3">
          ADMIN_PASSWORD is not set on the server yet.
        </p>
      )}
      <form action={login} className="space-y-4">
        <input
          type="password"
          name="password"
          required
          autoFocus
          placeholder="Password"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        {error && <p className="text-sm text-rose-600">Incorrect password.</p>}
        <button className="w-full rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 text-sm">
          Sign in
        </button>
      </form>
    </div>
  )
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { error?: string; status?: string }
}) {
  if (!isAdmin()) {
    return (
      <Shell>
        <LoginForm error={searchParams.error === '1'} />
      </Shell>
    )
  }

  const supabase = getSupabase()
  if (!supabase) {
    return (
      <Shell>
        <p className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-5 text-sm">
          Supabase is not configured. Set SUPABASE_URL and SUPABASE_SECRET_KEY on the server.
        </p>
      </Shell>
    )
  }

  const filter = STATUSES.find((s) => s === searchParams.status)
  let query = supabase
    .from('appointments')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)
  if (filter) query = query.eq('status', filter)
  const { data, error } = await query
  const appointments = (data ?? []) as Appointment[]

  return (
    <Shell>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Appointment requests</h1>
          <p className="text-sm text-slate-500 mt-1">
            Showing the latest {appointments.length} {filter ? `“${filter}” ` : ''}requests.
          </p>
        </div>
        <nav className="flex flex-wrap gap-2">
          {[undefined, ...STATUSES].map((s) => (
            <Link
              key={s ?? 'all'}
              href={s ? `/admin?status=${s}` : '/admin'}
              className={clsx(
                'px-3 py-1.5 rounded-full text-sm font-semibold border capitalize',
                filter === s
                  ? 'bg-cyan-600 text-white border-cyan-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-cyan-300'
              )}
            >
              {s ?? 'All'}
            </Link>
          ))}
        </nav>
      </div>

      {error && (
        <p className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-5 text-sm">
          Could not load bookings: {error.message}. Check that the appointments table exists (run supabase/schema.sql).
        </p>
      )}

      {!error && appointments.length === 0 && (
        <p className="bg-white border border-slate-100 rounded-2xl p-10 text-center text-slate-500">
          No appointment requests yet.
        </p>
      )}

      <div className="grid gap-4">
        {appointments.map((a) => (
          <article key={a.id} className="bg-white border border-slate-100 rounded-2xl shadow-card p-5">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-bold text-slate-900">{a.name}</h2>
                  <span className={clsx('text-xs font-semibold px-2.5 py-0.5 rounded-full border capitalize', STATUS_STYLES[a.status])}>
                    {a.status}
                  </span>
                </div>
                <p className="text-sm">
                  <a href={`tel:${a.phone.replace(/[\s-]/g, '')}`} className="font-semibold text-cyan-700 hover:underline">
                    {a.phone}
                  </a>
                  <span className="text-slate-300"> · </span>
                  <a
                    href={`https://wa.me/${a.phone.replace(/\D/g, '').replace(/^(?!977)(\d{10})$/, '977$1')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-600 hover:underline"
                  >
                    WhatsApp
                  </a>
                </p>
                <p className="text-sm text-slate-600">
                  <span className="font-medium">{a.treatment ?? 'Treatment not specified'}</span>
                  {(a.preferred_date || a.preferred_time) && (
                    <>
                      <span className="text-slate-300"> · </span>
                      {a.preferred_date && formatDate(a.preferred_date)}
                      {a.preferred_date && a.preferred_time && ', '}
                      {a.preferred_time}
                    </>
                  )}
                </p>
                {a.message && (
                  <p className="text-sm text-slate-500 bg-slate-50 rounded-xl px-3 py-2 mt-2 whitespace-pre-line">{a.message}</p>
                )}
                <p className="text-xs text-slate-400 pt-1">Received {formatDateTime(a.created_at)}</p>
              </div>

              <form action={updateStatus} className="flex items-center gap-2 shrink-0">
                <input type="hidden" name="id" value={a.id} />
                <select
                  name="status"
                  defaultValue={a.status}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm capitalize focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <button className="rounded-xl bg-slate-900 hover:bg-cyan-700 text-white text-sm font-semibold px-4 py-2">
                  Update
                </button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </Shell>
  )
}
