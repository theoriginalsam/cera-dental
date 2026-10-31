'use client'

import { motion } from 'framer-motion'
import { CalendarDays, MapPin, Users, ArrowRight } from 'lucide-react'

const FACTS = [
  { icon: <CalendarDays className="w-5 h-5" />, label: 'Established', value: '2025' },
  { icon: <MapPin className="w-5 h-5" />,       label: 'Location',    value: 'Nayabazar, Pokhara' },
  { icon: <Users className="w-5 h-5" />,        label: 'Patients',    value: 'All age groups' },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col gap-5"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-cyan-600">
              <span className="w-6 h-px bg-cyan-400" />
              A Little About Cera
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
              Dentistry with care{' '}
              <span className="gradient-text">at its centre.</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Cera Dental Clinic was established in 2025 in Nayabazar, Pokhara. We
              provide dental care for patients of all age groups, with services
              spanning general, restorative, aesthetic and specialist dentistry.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed">
              Our approach is centred on patient experience, skilled dental
              professionals, modern equipment, infection control and a clean,
              comfortable environment. We aim to offer ethical dental care and
              treatment options at reasonable prices.
            </p>
            <a
              href="#team"
              className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-semibold w-fit group"
            >
              Meet the dental team
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* Facts */}
          <div className="grid gap-4">
            {FACTS.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex items-center gap-4 bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-card"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center text-white shadow-md shadow-cyan-200 shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">{f.label}</p>
                  <p className="text-lg font-bold text-slate-900">{f.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
