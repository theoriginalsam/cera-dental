'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import clsx from 'clsx'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  image: string
  alt: string
  tag?: string
  className?: string
}

export default function ServiceCard({
  icon,
  title,
  description,
  image,
  alt,
  tag,
  className,
}: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(8,145,178,0.18)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={clsx(
        'group relative overflow-hidden rounded-2xl bg-white',
        'border border-slate-100 shadow-card cursor-default flex flex-col',
        className
      )}
    >
      {/* Photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {tag && (
          <span className="absolute top-3 left-3 text-xs font-bold tracking-widest text-cyan-700 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            {tag}
          </span>
        )}
      </div>

      <div className="relative p-6 pt-0 flex flex-col gap-3 flex-1">
        {/* Icon overlapping the photo */}
        <div className="-mt-6 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center text-white shadow-md shadow-cyan-200 ring-4 ring-white">
          {icon}
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-900 mb-1.5">{title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}
