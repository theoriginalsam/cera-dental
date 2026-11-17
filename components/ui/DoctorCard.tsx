'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { BadgeCheck, Calendar } from 'lucide-react'
import clsx from 'clsx'

interface DoctorCardProps {
  name: string
  title?: string
  specialty?: string
  registration?: string
  experience?: string
  initials: string
  color: string
  photo?: string
  index?: number
}

export default function DoctorCard({
  name,
  title,
  specialty,
  registration,
  experience,
  initials,
  color,
  photo,
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
      className="group relative flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      {/* Top colour band */}
      <div className={clsx('h-2 w-full', color)} />

      <div className="p-6 flex-1">
        {/* Photo, or initials when there's no photo yet */}
        {photo ? (
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden mb-4 shadow-md ring-4 ring-slate-50">
            <Image src={photo} alt={name} fill sizes="96px" className="object-cover object-top" />
          </div>
        ) : (
          <div
            className={clsx(
              'w-24 h-24 rounded-2xl flex items-center justify-center mb-4',
              'text-white text-3xl font-extrabold shadow-md ring-4 ring-slate-50',
              color
            )}
          >
            {initials}
          </div>
        )}

        {/* Name + specialty */}
        <h3 className="text-lg font-bold text-slate-900 leading-tight">{name}</h3>
        {title && <p className="text-cyan-600 font-semibold text-sm mt-0.5">{title}</p>}
        {specialty && (
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">{specialty}</p>
        )}

        {/* Meta */}
        {(registration || experience) && (
          <div className="flex flex-col gap-1.5 mt-4 text-xs text-slate-600">
            {registration && (
              <span className="flex items-center gap-1.5">
                <BadgeCheck className="w-4 h-4 text-cyan-500 shrink-0" />
                {registration}
              </span>
            )}
            {experience && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyan-500 shrink-0" />
                {experience}
              </span>
            )}
          </div>
        )}
      </div>

      {/* CTA strip */}
      <div className="px-6 pb-5">
        <a
          href="#book"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-200 text-slate-600 hover:text-cyan-700 text-sm font-semibold transition-all duration-200"
        >
          Book Appointment
        </a>
      </div>
    </motion.div>
  )
}
