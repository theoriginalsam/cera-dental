import Image from 'next/image'
import Link from 'next/link'
import { logout } from './actions'

export default function Shell({ signedIn, children }: { signedIn: boolean; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link href={signedIn ? '/admin' : '/'} className="flex items-center gap-3 shrink-0">
            <Image src="/logo-horizontal.png" alt="Cera Dental Clinic" width={160} height={52} className="h-10 w-auto" />
            <span className="hidden sm:inline text-sm font-semibold text-slate-400">Bookings</span>
          </Link>
          {signedIn && (
            <nav className="flex items-center gap-4 sm:gap-6 text-sm font-semibold text-slate-500">
              <Link href="/admin/password" className="hover:text-cyan-700">Change password</Link>
              <form action={logout}>
                <button className="hover:text-cyan-700">Sign out</button>
              </form>
            </nav>
          )}
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">{children}</main>
    </div>
  )
}
