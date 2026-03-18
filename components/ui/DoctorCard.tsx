'use client'

import { motion } from 'framer-motion'
import { Award, Calendar } from 'lucide-react'
import clsx from 'clsx'

interface DoctorCardProps {
  name: string
  title: string
  specialty: string
  experience: string
  qualifications: string[]
  bio: string
  initials: string
  color: string
  index?: number
}

export default function DoctorCard({
  name,
  title,
  specialty,
  experience,
  qualifications,
  bio,
  initials,
  color,
  index = 0,
}: DoctorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      {/* Top colour band */}
      <div className={clsx('h-2 w-full', color)} />

      <div className="p-6">
        {/* Avatar + name */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className={clsx(
              'w-16 h-16 rounded-2xl flex items-center justify-center',
              'text-white text-xl font-extrabold shrink-0 shadow-md',
              color
            )}
          >
            {initials}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              {name}
            </h3>
            <p className="text-cyan-600 font-semibold text-sm">{title}</p>
            <p className="text-slate-500 text-xs mt-0.5">{specialty}</p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-slate-500 text-sm leading-relaxed mb-4">{bio}</p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <span className="flex items-center gap-1.5 text-slate-600">
            <Calendar className="w-4 h-4 text-cyan-500" />
            {experience}
          </span>
        </div>

        {/* Qualifications */}
        <div className="flex flex-wrap gap-2">
          {qualifications.map((q) => (
            <span
              key={q}
              className="inline-flex items-center gap-1 text-xs font-medium bg-cyan-50 text-cyan-700 px-2.5 py-1 rounded-lg"
            >
              <Award className="w-3 h-3" />
              {q}
            </span>
          ))}
        </div>
      </div>

      {/* Hover CTA strip */}
      <div className="px-6 pb-5">
        <a
          href="tel:+9779846020595"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-200 text-slate-600 hover:text-cyan-700 text-sm font-semibold transition-all duration-200"
        >
          Book Appointment
        </a>
      </div>
    </motion.div>
  )
}
