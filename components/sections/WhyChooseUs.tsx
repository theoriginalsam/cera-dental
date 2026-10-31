'use client'

import { motion } from 'framer-motion'
import {
  ScanLine,
  ShieldPlus,
  Armchair,
  Sofa,
  HeartHandshake,
} from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Image from 'next/image'
import clsx from 'clsx'

const FEATURES = [
  {
    icon: <ScanLine className="w-6 h-6" />,
    title: 'Digital X-Ray',
    description:
      'Available at the clinic, so imaging can be done on site as part of your assessment.',
    color: 'bg-cyan-600',
    span: 'lg:col-span-2',
    size: 'large',
  },
  {
    icon: <ShieldPlus className="w-6 h-6" />,
    title: 'Sterilization Facilities',
    description: 'Part of our clinical setup, with infection control at the centre of our approach.',
    color: 'bg-emerald-600',
    span: '',
    size: 'normal',
  },
  {
    icon: <Armchair className="w-6 h-6" />,
    title: 'Two Modern Dental Chairs',
    description: 'Modern equipment for dental treatment.',
    color: 'bg-indigo-600',
    span: '',
    size: 'normal',
  },
  {
    icon: <Sofa className="w-6 h-6" />,
    title: 'Clean, Comfortable Space',
    description: 'A welcoming patient environment for patients of all ages.',
    color: 'bg-teal-600',
    span: '',
    size: 'normal',
  },
  {
    icon: <HeartHandshake className="w-6 h-6" />,
    title: 'Ethical Care',
    description: 'Ethical dental care and treatment options at reasonable prices.',
    color: 'bg-violet-600',
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
    <section id="environment" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Cera Environment"
          title="Comfort in every"
          titleHighlight="detail."
          description="Our clinic is equipped with digital X-ray, sterilization facilities and two modern dental chairs. We aim to provide a clean and comfortable space for patients of all ages."
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

        {/* Inside the clinic — photo + video gallery */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-extrabold text-slate-900 mb-6 text-center">
            Inside <span className="gradient-text">Cera</span>
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:h-[640px]">
            <figure className="col-span-2 relative h-64 sm:h-80 lg:h-auto rounded-2xl overflow-hidden shadow-card">
              <Image
                src="/clinic/front.jpg"
                alt="Cera Dental Clinic building on Nayabazar road, Pokhara"
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
              <figcaption className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                Find us in Nayabazar, Pokhara
              </figcaption>
            </figure>
            <div className="relative row-span-2 h-80 lg:h-auto rounded-2xl overflow-hidden shadow-card bg-slate-100">
              <video
                src="/clinic/chair-video.mp4"
                poster="/clinic/chair-video-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                aria-label="Treatment room with a modern dental chair"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <figure className="relative h-80 lg:h-auto rounded-2xl overflow-hidden shadow-card">
              <Image
                src="/clinic/chair.jpg"
                alt="Modern dental chair with overhead light and patient screen"
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover"
              />
            </figure>
            <figure className="relative col-span-2 lg:col-span-1 h-80 lg:h-auto rounded-2xl overflow-hidden shadow-card">
              <Image
                src="/clinic/mirror.jpg"
                alt="Tooth-shaped mirror at the clinic"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover object-top"
              />
            </figure>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
