'use client'

import { motion } from 'framer-motion'
import {
  Microscope,
  Clock,
  HeartHandshake,
  ShieldPlus,
  Banknote,
  Smile,
  Languages,
  Wifi,
} from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import clsx from 'clsx'

const FEATURES = [
  {
    icon: <Microscope className="w-6 h-6" />,
    title: 'State-of-the-Art Technology',
    description:
      'Digital X-ray (90% less radiation), 3D CBCT cone-beam scanner, intraoral cameras and CEREC same-day crowns.',
    color: 'bg-cyan-600',
    span: 'lg:col-span-2',
    size: 'large',
  },
  {
    icon: <HeartHandshake className="w-6 h-6" />,
    title: 'Patient-First Philosophy',
    description:
      'We explain every step before we start. No surprises, no pressure — just compassionate, transparent care.',
    color: 'bg-violet-600',
    span: '',
    size: 'normal',
  },
  {
    icon: <ShieldPlus className="w-6 h-6" />,
    title: 'Strict Sterilisation',
    description:
      'Autoclave sterilisation after every patient. Single-use instruments where applicable. Clinic-grade HEPA air filtration.',
    color: 'bg-emerald-600',
    span: '',
    size: 'normal',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Same-Day Appointments',
    description:
      'Most cases can be seen the same day. Urgent walk-ins always welcome during clinic hours (Sun–Fri 9AM–6:30PM).',
    color: 'bg-amber-500',
    span: '',
    size: 'normal',
  },
  {
    icon: <Banknote className="w-6 h-6" />,
    title: 'Transparent Pricing',
    description:
      'Upfront treatment quotes with no hidden fees. Flexible payment plans available for major procedures.',
    color: 'bg-rose-500',
    span: '',
    size: 'normal',
  },
  {
    icon: <Smile className="w-6 h-6" />,
    title: 'Anxiety-Free Experience',
    description:
      'Topical numbing before every injection. Happy gas (N₂O) and IV sedation available for nervous patients.',
    color: 'bg-pink-500',
    span: 'lg:col-span-2',
    size: 'large',
  },
  {
    icon: <Languages className="w-6 h-6" />,
    title: 'Multilingual Team',
    description: 'Nepali, Hindi, and English-speaking staff. We make sure you understand your treatment plan completely.',
    color: 'bg-indigo-600',
    span: '',
    size: 'normal',
  },
  {
    icon: <Wifi className="w-6 h-6" />,
    title: 'Comfortable Waiting Area',
    description: 'Free high-speed Wi-Fi, refreshments, and entertainment screens to make your wait as comfortable as possible.',
    color: 'bg-teal-600',
    span: '',
    size: 'normal',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden:  { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why Patients Love Us"
          title="The Cera Dental"
          titleHighlight="Difference"
          description="We've spent years engineering an experience that makes you forget you're at the dentist — in the best possible way."
        />

        {/* Bento grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              className={clsx(
                'bento-card relative bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-card cursor-default',
                f.span,
                f.size === 'large' ? 'p-8' : 'p-6'
              )}
            >
              {/* Subtle gradient background */}
              <div
                className={clsx(
                  'absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl -translate-y-1/4 translate-x-1/4',
                  f.color
                )}
              />

              {/* Icon */}
              <div
                className={clsx(
                  'w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md mb-4',
                  f.color
                )}
              >
                {f.icon}
              </div>

              {/* Text */}
              <h3
                className={clsx(
                  'font-bold text-slate-900 mb-2',
                  f.size === 'large' ? 'text-xl' : 'text-base'
                )}
              >
                {f.title}
              </h3>
              <p
                className={clsx(
                  'text-slate-500 leading-relaxed',
                  f.size === 'large' ? 'text-base' : 'text-sm'
                )}
              >
                {f.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
