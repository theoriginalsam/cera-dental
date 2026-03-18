'use client'

import { motion } from 'framer-motion'
import clsx from 'clsx'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  titleHighlight?: string
  description?: string
  align?: 'left' | 'center' | 'right'
  light?: boolean
}

export default function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  description,
  align = 'center',
  light = false,
}: SectionHeaderProps) {
  const alignClass = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }[align]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={clsx('flex flex-col gap-3 mb-12', alignClass)}
    >
      {eyebrow && (
        <span
          className={clsx(
            'inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase',
            light ? 'text-cyan-200' : 'text-cyan-600'
          )}
        >
          <span
            className={clsx(
              'w-6 h-px',
              light ? 'bg-cyan-300' : 'bg-cyan-400'
            )}
          />
          {eyebrow}
          <span
            className={clsx(
              'w-6 h-px',
              light ? 'bg-cyan-300' : 'bg-cyan-400'
            )}
          />
        </span>
      )}

      <h2
        className={clsx(
          'text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight',
          light ? 'text-white' : 'text-slate-900'
        )}
      >
        {title}{' '}
        {titleHighlight && (
          <span className={light ? 'text-cyan-300' : 'gradient-text'}>
            {titleHighlight}
          </span>
        )}
      </h2>

      {description && (
        <p
          className={clsx(
            'text-lg leading-relaxed max-w-2xl',
            light ? 'text-slate-300' : 'text-slate-500'
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
