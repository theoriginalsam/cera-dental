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
  { value: '12+', label: 'Years of Excellence' },
  { value: '8,500+', label: 'Happy Patients' },
  { value: '3', label: 'Specialist Doctors' },
  { value: '99%', label: 'Pain-Free Success Rate' },
]

const TRUST_ITEMS = [
  { icon: <ShieldCheck className="w-4 h-4" />, text: 'Certified & Accredited' },
  { icon: <Star className="w-4 h-4" />, text: '4.9 / 5 Rating' },
  { icon: <Clock className="w-4 h-4" />, text: 'Open Sun–Fri, 9AM–6:30PM' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen hero-bg overflow-hidden flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-100" />

      {/* Floating blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '3s' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-700/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left copy */}
          <div className="flex flex-col gap-6">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex self-start items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-2 text-white text-sm font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
              </span>
              Now Accepting New Patients — No Waiting List
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight"
            >
              Advanced Dental Care
              <br />
              <span className="text-cyan-300">in the Heart of</span>
              <br />
              Pokhara.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-lg"
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
              className="flex flex-wrap gap-3"
            >
              {TRUST_ITEMS.map((item) => (
                <span
                  key={item.text}
                  className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm px-3 py-1.5 rounded-full"
                >
                  <span className="text-cyan-300">{item.icon}</span>
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
                variant="white"
                size="lg"
                icon={<CalendarCheck className="w-5 h-5 text-cyan-600" />}
              >
                Book Appointment
              </Button>
              <Button
                variant="outline"
                size="lg"
                icon={<Phone className="w-5 h-5" />}
                className="border-white/40 text-white hover:bg-white/10 hover:border-white/60"
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
              className="flex items-center gap-2 text-slate-300 hover:text-white text-sm transition-colors w-fit"
            >
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              Nayabazar Rd, Pokhara 33700, Nepal
            </motion.a>
          </div>

          {/* Right — stats glass card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="glass rounded-3xl p-8 space-y-6">
              {/* Stars */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
                <span className="ml-2 text-slate-600 text-sm font-medium">
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

              {/* Divider */}
              <div className="section-divider" />

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="bg-slate-50 rounded-2xl p-4 text-center"
                  >
                    <p className="text-2xl font-extrabold gradient-text">
                      {s.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 leading-tight">
                      {s.label}
                    </p>
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
              className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-center"
            >
              <p className="text-2xl font-extrabold text-white">{s.value}</p>
              <p className="text-xs text-slate-300 mt-1 leading-tight">
                {s.label}
              </p>
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60 hover:text-white/90 transition-colors"
      >
        <span className="text-xs font-medium tracking-widest uppercase">
          Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.a>
    </section>
  )
}
