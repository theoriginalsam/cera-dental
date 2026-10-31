'use client'

import Image from 'next/image'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Music2,
  MessageCircle,
  Star,
  Navigation as NavigationIcon,
} from 'lucide-react'

const WHATSAPP_URL = 'https://wa.me/9779768059598'
const MAPS_URL     = 'https://maps.app.goo.gl/Hkhezb1KBi1UcUNP7'

const SERVICES_LIST = [
  'General Dentistry',
  'Scaling & Polishing',
  'Root Canal Treatment',
  'Crowns & Bridges',
  'Teeth Whitening',
  'Braces & Aligners',
  'Dental Implants',
  'Paediatric Dentistry',
]

const QUICK_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Treatments', href: '#services' },
  { label: 'Our Team',   href: '#team' },
  { label: 'FAQ',        href: '#faq' },
  { label: 'Find Us',    href: '#visit' },
]

const SOCIALS = [
  { icon: <Facebook className="w-4 h-4" />,  label: 'Facebook',  href: 'https://www.facebook.com/p/Cera-Dental-Clinic-61588173137651/' },
  { icon: <Instagram className="w-4 h-4" />, label: 'Instagram', href: 'https://www.instagram.com/cera.dental.official/' },
  { icon: <Music2 className="w-4 h-4" />,    label: 'TikTok',    href: 'https://www.tiktok.com/@ceradentalofficial' },
]

export default function Footer() {
  return (
    <footer id="visit" className="bg-slate-900 text-slate-300">

      {/* Top CTA band */}
      <div className="bg-gradient-to-r from-cyan-700 via-cyan-600 to-cyan-700 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-cyan-100 text-xs font-semibold tracking-widest uppercase mb-1">
                A Question or Ready to Visit?
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1">
                We&apos;re happy to help.
              </h2>
              <p className="text-cyan-100 text-sm max-w-xl">
                Appointments are available by WhatsApp, phone call or walk-in.
                Emergency dental availability is during clinic hours, 9 AM–7 PM.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="tel:+9779846020595"
                className="flex items-center justify-center gap-2 bg-white text-cyan-700 hover:bg-cyan-50 font-bold px-6 py-3.5 rounded-xl text-sm shadow-md transition-all hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4" />
                Call +977 9846020595
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-md transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" />
                Message Us on WhatsApp
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
              Crafting confident smiles. Thoughtful dental care in Pokhara.
            </p>

            <div className="space-y-3 text-sm">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <MapPin className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                Pokhara-8, Nayabazar, Nepal
              </a>
              <a
                href="tel:+9779846020595"
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Phone className="w-4 h-4 text-cyan-500 shrink-0" />
                +977 9846020595
              </a>
              <a
                href="mailto:ceradentalpokhara@gmail.com"
                className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
                ceradentalpokhara@gmail.com
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
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
              Treatments
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
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="text-slate-300">Every day</span>
              <span className="text-cyan-400 font-medium">9:00 AM – 7:00 PM</span>
            </div>

            <div className="mt-6 space-y-3">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 rounded-xl px-4 py-3 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <NavigationIcon className="w-4 h-4 text-cyan-400 shrink-0" />
                Get directions to the clinic
              </a>
              <a
                href="https://g.page/r/CbHMmO5HCnfrEAE/review"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 rounded-xl px-4 py-3 text-sm text-slate-300 hover:text-white transition-colors"
              >
                <Star className="w-4 h-4 text-amber-400 shrink-0" />
                Leave us a Google review
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps embed */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="rounded-2xl overflow-hidden border border-slate-800">
          <div className="relative">
            <iframe
              src="https://www.google.com/maps?q=Cera%20Dental%20Clinic%2C%20Nayabazar%2C%20Pokhara&ll=28.2118581,83.987093&z=17&output=embed"
              width="100%"
              height="280"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cera Dental Clinic — Nayabazar, Pokhara"
            />
          </div>
          <div className="bg-slate-800 px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div className="flex items-start gap-2 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              Opposite the GMC Hospital OPD gate and Karmachari Sanchaya Kosh Bhawan, Nayabazar, Pokhara.
            </div>
            <a
              href={MAPS_URL}
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
            Pokhara-8, Nayabazar, Nepal ·{' '}
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
