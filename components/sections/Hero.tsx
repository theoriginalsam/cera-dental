'use client'

import { motion } from 'framer-motion'
import {
  Phone,
  CalendarCheck,
  Star,
  ShieldCheck,
  Clock,
  MapPin,
  ChevronDown,
} from 'lucide-react'
import Button from '@/components/ui/Button'

const STATS = [
  { value: '12+',    label: 'Years of Excellence' },
  { value: '8,500+', label: 'Happy Patients' },
  { value: '3',      label: 'Specialist Doctors' },
  { value: '99%',    label: 'Pain-Free Success Rate' },
]

const TRUST_ITEMS = [
  { icon: <ShieldCheck className="w-4 h-4" />, text: 'Certified & Accredited' },
  { icon: <Star className="w-4 h-4" />,        text: '4.9 / 5 Rating' },
  { icon: <Clock className="w-4 h-4" />,       text: 'Open Sun–Fri, 9AM–6:30PM' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden flex items-center">

      {/* Subtle cyan accent — top-right only */}
      <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-bl from-cyan-50 via-white to-white pointer-events-none" />

      {/* Dot-grid pattern (very faint) */}
      <div className="absolute inset-0 bg-hero-pattern opacity-40 pointer-events-none" />

      {/* Decorative blobs */}
      <div className="absolute top-16 right-0 w-80 h-80 bg-cyan-100/70 rounded-full blur-3xl animate-float pointer-events-none" />
      <div
        className="absolute bottom-24 right-24 w-56 h-56 bg-cyan-200/40 rounded-full blur-2xl animate-float pointer-events-none"
        style={{ animationDelay: '2s' }}
      />
      <div className="absolute top-1/3 left-0 w-48 h-48 bg-slate-100 rounded-full blur-3xl pointer-events-none" />

      {/* Cyan vertical accent bar */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left copy ── */}
          <div className="flex flex-col gap-6">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex self-start items-center gap-2 bg-cyan-50 border border-cyan-200 rounded-full px-4 py-2 text-cyan-700 text-sm font-semibold"
            >
              <span className="relative flex h-2 w-2">
                <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
              </span>
              Now Accepting New Patients — No Waiting List
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight"
            >
              Advanced Dental Care
              <br />
              <span className="gradient-text">in the Heart of</span>
              <br />
              Pokhara.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-lg"
            >
              Experience state-of-the-art technology &amp; genuinely painless
              procedures. From routine check-ups to full Smile Design — we
              restore confidence, one smile at a time.
            </motion.p>

            {/* Trust pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {TRUST_ITEMS.map((item) => (
                <span
                  key={item.text}
                  className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-sm px-3 py-1.5 rounded-full"
                >
                  <span className="text-cyan-500">{item.icon}</span>
                  {item.text}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Button
                variant="primary"
                size="lg"
                icon={<CalendarCheck className="w-5 h-5" />}
              >
                Book Appointment
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon={<Phone className="w-5 h-5" />}
              >
                Call +977 984-602-0595
              </Button>
            </motion.div>

            {/* Address */}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              href="#contact"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-600 text-sm transition-colors w-fit"
            >
              <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
              Nayabazar Rd, Pokhara 33700, Nepal
            </motion.a>
          </div>

          {/* ── Right — glass card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="bg-white rounded-3xl p-8 space-y-6 border border-slate-100 shadow-card">
              {/* Stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <span className="ml-2 text-slate-500 text-sm font-medium">
                  4.9 · 320+ Reviews
                </span>
              </div>

              <p className="text-slate-700 text-lg font-medium leading-snug">
                &ldquo;Finally found a clinic where I feel zero anxiety. The staff is
                incredible and my root canal was truly painless!&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-700 flex items-center justify-center text-white font-bold text-sm">
                  SM
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Sita M.</p>
                  <p className="text-slate-400 text-xs">Verified Patient · Pokhara</p>
                </div>
              </div>

              <div className="section-divider" />

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center"
                  >
                    <p className="text-2xl font-extrabold gradient-text">{s.value}</p>
                    <p className="text-xs text-slate-500 mt-1 leading-tight">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:hidden grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center"
            >
              <p className="text-2xl font-extrabold gradient-text">{s.value}</p>
              <p className="text-xs text-slate-500 mt-1 leading-tight">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-600 transition-colors"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Explore</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  )
}
