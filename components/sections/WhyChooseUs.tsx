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

const CAPTION =
  'absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full'

const GALLERY: {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
  video?: boolean
  poster?: string
}[] = [
  { src: '/clinic/reception.jpg',     width: 960,  height: 1280, caption: 'Reception',             alt: 'Reception desk with the Cera logo and staff welcoming a patient' },
  { src: '/clinic/treatment.jpg',     width: 723,  height: 1280, caption: 'Patient care',          alt: 'Dentist and assistant treating a patient in the dental chair' },
  { src: '/clinic/chair-video.mp4',   width: 540,  height: 960,  video: true, poster: '/clinic/chair-video-poster.jpg', alt: 'Treatment room with a modern dental chair' },
  { src: '/clinic/signboard.jpg',     width: 1280, height: 1280, caption: 'Our signboard',         alt: 'Blue Cera Dental Clinic signboard above the clinic entrance in Nayabazar' },
  { src: '/clinic/room.jpg',          width: 960,  height: 1280, caption: 'Treatment room',        alt: 'Dental chair with overhead light, monitor and operator stool' },
  { src: '/clinic/sterilization.jpg', width: 960,  height: 1280, caption: 'Sterilization',         alt: 'Clinical area with UV sterilization cabinet, instrument trolley and steel trays' },
  { src: '/clinic/sink.jpg',          width: 960,  height: 1280,                                   alt: 'Tooth-shaped mirror above a hand-wash basin' },
  { src: '/clinic/plant.jpg',         width: 960,  height: 1280,                                   alt: 'Jade plant in a white ceramic pot at the clinic' },
]

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
          <figure className="relative h-64 sm:h-80 lg:h-[420px] rounded-2xl overflow-hidden shadow-card mb-4">
            <Image
              src="/clinic/front.jpg"
              alt="Cera Dental Clinic building on Nayabazar road, Pokhara"
              fill
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="object-cover"
            />
            <figcaption className={CAPTION}>Find us in Nayabazar, Pokhara</figcaption>
          </figure>

          {/* Masonry: photos keep their own shape instead of being cropped to a grid */}
          <div className="columns-2 lg:columns-4 gap-4">
            {GALLERY.map((item) => (
              <figure key={item.src} className="relative mb-4 break-inside-avoid rounded-2xl overflow-hidden shadow-card bg-slate-100">
                {item.video ? (
                  <video
                    src={item.src}
                    poster={item.poster}
                    width={item.width}
                    height={item.height}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label={item.alt}
                    className="block w-full h-auto"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="block w-full h-auto"
                  />
                )}
                {item.caption && <figcaption className={CAPTION}>{item.caption}</figcaption>}
              </figure>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
