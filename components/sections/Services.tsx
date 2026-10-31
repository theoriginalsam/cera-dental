'use client'

import { motion } from 'framer-motion'
import {
  Stethoscope,
  Droplets,
  Layers,
  Zap,
  Crown,
  Sparkles,
  Sun,
  Gem,
  Smile,
  Anchor,
  Syringe,
  Baby,
} from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import ServiceCard from '@/components/ui/ServiceCard'

const SERVICES = [
  {
    icon: <Stethoscope className="w-5 h-5" />,
    title: 'General Dentistry',
    description: 'Routine dental check-ups and general dental care.',
    accent: 'bg-cyan-100',
  },
  {
    icon: <Droplets className="w-5 h-5" />,
    title: 'Scaling & Polishing',
    description: 'Professional cleaning for teeth and gums.',
    accent: 'bg-sky-100',
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: 'Dental Fillings',
    description: 'Restorative treatment for teeth affected by decay.',
    accent: 'bg-teal-100',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Root Canal Treatment',
    description: 'Root canal treatment (RCT).',
    accent: 'bg-rose-100',
  },
  {
    icon: <Crown className="w-5 h-5" />,
    title: 'Crowns & Bridges',
    description: 'Fixed restorative options for damaged or missing teeth.',
    accent: 'bg-indigo-100',
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: 'Aesthetic Dentistry',
    description: 'Aesthetic and cosmetic dental treatments.',
    accent: 'bg-violet-100',
  },
  {
    icon: <Sun className="w-5 h-5" />,
    title: 'Teeth Whitening',
    description: 'Teeth whitening and bleaching.',
    accent: 'bg-yellow-100',
  },
  {
    icon: <Gem className="w-5 h-5" />,
    title: 'Dental Diamonds',
    description: 'Small decorative tooth gems bonded to the tooth surface.',
    accent: 'bg-fuchsia-100',
  },
  {
    icon: <Smile className="w-5 h-5" />,
    title: 'Braces & Aligners',
    description: 'Orthodontic treatment with braces and aligners.',
    accent: 'bg-cyan-100',
  },
  {
    icon: <Anchor className="w-5 h-5" />,
    title: 'Dental Implants',
    description: 'Dental implant treatment.',
    accent: 'bg-amber-100',
  },
  {
    icon: <Syringe className="w-5 h-5" />,
    title: 'Tooth Extraction',
    description: 'Tooth removal when clinically indicated.',
    accent: 'bg-slate-200',
  },
  {
    icon: <Baby className="w-5 h-5" />,
    title: 'Paediatric Dentistry',
    description: 'Dental care for children.',
    accent: 'bg-pink-100',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Dental Care at Cera"
          title="Care for every"
          titleHighlight="kind of smile."
          description="Explore the dental services listed by our clinic. Treatment recommendations are made following an individual assessment."
        />

        {/* Bento grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SERVICES.map((service, i) => (
            <motion.div key={service.title} variants={itemVariants}>
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                tag={String(i + 1).padStart(2, '0')}
                accent={service.accent}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 mb-4 text-sm max-w-xl mx-auto">
            The appropriate treatment is determined after clinical examination
            and discussion with the treating dentist.
          </p>
          <a
            href="https://wa.me/9779768059598?text=Hi%20Cera%20Dental%2C%20I%20would%20like%20to%20book%20an%20appointment."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md shadow-cyan-200 transition-all hover:scale-[1.02]"
          >
            Book an Appointment
          </a>
        </motion.div>
      </div>
    </section>
  )
}
