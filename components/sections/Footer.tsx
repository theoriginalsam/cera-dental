'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  AlertCircle,
} from 'lucide-react'

const SERVICES_LIST = [
  'Comprehensive Check-ups',
  'Smile Design',
  'Root Canal Therapy',
  'Dental Implants',
  'Teeth Whitening',
  'Invisalign & Aligners',
  'Crowns & Bridges',
  'Pediatric Dentistry',
]

const QUICK_LINKS = [
  { label: 'Services',     href: '#services' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Our Doctors',  href: '#doctors' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ',          href: '#faq' },
]

const HOURS = [
  { day: 'Sunday',    hours: '9:00 AM – 6:30 PM', open: true },
  { day: 'Monday',    hours: '9:00 AM – 6:30 PM', open: true },
  { day: 'Tuesday',   hours: '9:00 AM – 6:30 PM', open: true },
  { day: 'Wednesday', hours: '9:00 AM – 6:30 PM', open: true },
  { day: 'Thursday',  hours: '9:00 AM – 6:30 PM', open: true },
  { day: 'Friday',    hours: '9:00 AM – 6:30 PM', open: true },
  { day: 'Saturday',  hours: 'Closed',             open: false },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300">

      {/* Top CTA band */}
      <div className="bg-gradient-to-r from-cyan-700 via-cyan-600 to-cyan-700 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1">
                Ready to Transform Your Smile?
              </h2>
              <p className="text-cyan-100 text-sm">
                Book a free consultation today. No commitments, no pressure.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="tel:+9779846020595"
                className="flex items-center justify-center gap-2 bg-white text-cyan-700 hover:bg-cyan-50 font-bold px-6 py-3.5 rounded-xl text-sm shadow-md transition-all hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4" />
                Call +977 984-602-0595
              </a>
              <a
                href="https://wa.me/9779846020595"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-md transition-all hover:scale-[1.02]"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand + contact */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Image
                src="/logo.png"
                alt="Cera Dental Clinic"
                width={140}
                height={56}
                className="h-12 w-auto object-contain brightness-[1.8]"
              />
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Advanced dental care in the heart of Pokhara. State-of-the-art
              technology. Genuinely painless procedures. Real smiles.
            </p>

            <div className="space-y-3 text-sm">
              <a
                href="https://maps.google.com/?q=Nayabazar+Rd+Pokhara+Nepal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <MapPin className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                Nayabazar Rd, Pokhara 33700, Nepal
              </a>
              <a
                href="tel:+9779846020595"
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-500 shrink-0" />
                +977 9846020595
              </a>
              <a
                href="mailto:info@ceradental.com.np"
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
                info@ceradental.com.np
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: <Facebook className="w-4 h-4" />, label: 'Facebook' },
                { icon: <Instagram className="w-4 h-4" />, label: 'Instagram' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-cyan-700 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Services
            </h3>
            <ul className="space-y-2.5">
              {SERVICES_LIST.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-cyan-600 shrink-0" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-cyan-600 shrink-0" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-5">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-500" />
                Opening Hours
              </span>
            </h3>
            <ul className="space-y-2">
              {HOURS.map((h) => (
                <li
                  key={h.day}
                  className="flex items-center justify-between gap-2 text-xs"
                >
                  <span
                    className={
                      h.open ? 'text-slate-300' : 'text-slate-500'
                    }
                  >
                    {h.day}
                  </span>
                  <span
                    className={
                      h.open
                        ? 'text-cyan-400 font-medium'
                        : 'text-rose-400 font-semibold'
                    }
                  >
                    {h.hours}
                  </span>
                </li>
              ))}
            </ul>

            {/* Saturday warning */}
            <div className="mt-4 flex items-start gap-2 bg-rose-950/50 border border-rose-800/50 rounded-xl p-3">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <p className="text-rose-300 text-xs leading-relaxed">
                <span className="font-bold">Closed every Saturday.</span> Please
                plan your visits accordingly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps embed */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="rounded-2xl overflow-hidden border border-slate-800">
          <div className="relative">
            {/* Actual Google Maps embed — replace src with your clinic's embed URL from Google Maps */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.2938752393406!2d83.9852!3d28.2096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399595abd4b20c4d%3A0xd5d9a58e98e69a44!2sNayabazar%2C%20Pokhara%2033700!5e0!3m2!1sen!2snp!4v1700000000000"
              width="100%"
              height="280"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cera Dental Clinic — Nayabazar Rd, Pokhara 33700"
            />
          </div>
          <div className="bg-slate-800 px-5 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Nayabazar Rd, Pokhara 33700, Nepal
            </div>
            <a
              href="https://maps.google.com/?q=Nayabazar+Rd+Pokhara+Nepal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold transition-colors shrink-0"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Cera Dental Clinic. All rights
            reserved.
          </p>
          <p>
            Nayabazar Rd, Pokhara 33700, Nepal ·{' '}
            <a
              href="tel:+9779846020595"
              className="text-cyan-600 hover:text-cyan-400"
            >
              +977 9846020595
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
