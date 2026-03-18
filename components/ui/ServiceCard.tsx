'use client'

import { motion } from 'framer-motion'
import clsx from 'clsx'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  tag?: string
  accent?: string
  large?: boolean
  className?: string
}

export default function ServiceCard({
  icon,
  title,
  description,
  tag,
  accent = 'bg-cyan-50',
  large = false,
  className,
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(8,145,178,0.18)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={clsx(
        'bento-card relative overflow-hidden rounded-2xl bg-white p-6',
        'border border-slate-100 shadow-card cursor-default',
        large ? 'md:col-span-2' : '',
        className
      )}
    >
      {/* Background accent blob */}
      <div
        className={clsx(
          'absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-40 blur-2xl',
          accent
        )}
      />

      <div className="relative z-10 flex flex-col gap-4 h-full">
        {tag && (
          <span className="self-start text-xs font-bold uppercase tracking-widest text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">
            {tag}
          </span>
        )}

        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center text-white shadow-md shadow-cyan-200">
          {icon}
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-1.5">{title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
        </div>

        <div className="mt-auto pt-2">
          <span className="text-cyan-600 text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
            Learn more
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </div>
      </div>
    </motion.div>
  )
}
