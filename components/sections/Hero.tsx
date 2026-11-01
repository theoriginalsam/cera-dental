'use client'

import { motion } from 'framer-motion'
import {
  CalendarCheck,
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  ChevronDown,
  ArrowDown,
  Facebook,
  Instagram,
  Music2,
} from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/clinic'

const TRUST_ITEMS = [
  { icon: <ShieldCheck className="w-4 h-4" />, text: 'Established 2025' },
  { icon: <MapPin className="w-4 h-4" />,      text: 'Pokhara · Nayabazar' },
  { icon: <Clock className="w-4 h-4" />,       text: 'Open Daily, 9AM–7PM' },
]

const SOCIALS = [
  { label: 'Facebook',  href: SOCIAL_LINKS.facebook,  icon: <Facebook className="w-4 h-4" /> },
  { label: 'Instagram', href: SOCIAL_LINKS.instagram, icon: <Instagram className="w-4 h-4" /> },
  { label: 'TikTok',    href: SOCIAL_LINKS.tiktok,    icon: <Music2 className="w-4 h-4" /> },
]

const VISIT_DETAILS = [
  { icon: <MapPin className="w-4 h-4" />, label: 'Visit Us',         value: 'Nayabazar, Pokhara' },
  { icon: <Clock className="w-4 h-4" />,  label: 'Opening Hours',    value: 'Every day · 9 AM–7 PM' },
  { icon: <Phone className="w-4 h-4" />,  label: 'For Appointments', value: 'Call or WhatsApp' },
]

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen bg-white overflow-hidden flex items-center">

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
              Thoughtful Dental Care in Pokhara
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight"
            >
              Crafting
              <br />
              <span className="gradient-text">confident smiles.</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-lg"
            >
              Comprehensive dental care for adults and children, delivered with a
              patient-centred approach in a clean and comfortable setting.
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
              <a
                href="#book"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-lg font-semibold rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 shadow-md shadow-cyan-200 hover:shadow-lg hover:shadow-cyan-300 transition-all hover:scale-[1.02]"
              >
                <CalendarCheck className="w-5 h-5" />
                Book an Appointment
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-lg font-semibold rounded-xl border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 transition-all hover:scale-[1.02]"
              >
                <ArrowDown className="w-5 h-5" />
                Explore Treatments
              </a>
            </motion.div>

            {/* Address */}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              href="#visit"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-600 text-sm transition-colors w-fit"
            >
              <MapPin className="w-4 h-4 text-cyan-500 shrink-0" />
              Pokhara-8, Nayabazar, Nepal
            </motion.a>

            {/* Social */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-2"
            >
              <span className="text-slate-400 text-sm mr-1">Follow us</span>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 hover:border-cyan-300 hover:bg-cyan-50 flex items-center justify-center text-slate-500 hover:text-cyan-700 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right — gradient card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="bg-gradient-to-br from-cyan-600 via-cyan-500 to-teal-400 rounded-3xl p-8 space-y-6 shadow-card-hover">
              <div>
                <p className="text-cyan-100 text-xs font-semibold tracking-widest uppercase">
                  Your Smile, Our Care
                </p>
                <p className="text-white text-3xl font-extrabold leading-tight mt-2">
                  Care with confidence.
                </p>
              </div>

              <div className="space-y-3">
                {VISIT_DETAILS.map((d) => (
                  <div key={d.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30 shrink-0">
                      {d.icon}
                    </div>
                    <div>
                      <p className="text-cyan-100 text-xs uppercase tracking-wider">{d.label}</p>
                      <p className="font-semibold text-white text-sm">{d.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
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
