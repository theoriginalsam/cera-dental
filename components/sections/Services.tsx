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
import { TREATMENTS } from '@/lib/clinic'

const ICONS: Record<(typeof TREATMENTS)[number]['slug'], React.ReactNode> = {
  general:    <Stethoscope className="w-5 h-5" />,
  scaling:    <Droplets className="w-5 h-5" />,
  fillings:   <Layers className="w-5 h-5" />,
  rootcanal:  <Zap className="w-5 h-5" />,
  crowns:     <Crown className="w-5 h-5" />,
  aesthetic:  <Sparkles className="w-5 h-5" />,
  whitening:  <Sun className="w-5 h-5" />,
  diamonds:   <Gem className="w-5 h-5" />,
  braces:     <Smile className="w-5 h-5" />,
  implants:   <Anchor className="w-5 h-5" />,
  extraction: <Syringe className="w-5 h-5" />,
  paediatric: <Baby className="w-5 h-5" />,
}

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

        {/* Photo card grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {TREATMENTS.map((t, i) => (
            <motion.div key={t.slug} variants={itemVariants}>
              <ServiceCard
                icon={ICONS[t.slug]}
                title={t.title}
                description={t.description}
                image={t.image}
                alt={t.alt}
                tag={String(i + 1).padStart(2, '0')}
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
            href="#book"
            className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md shadow-cyan-200 transition-all hover:scale-[1.02]"
          >
            Book an Appointment
          </a>
        </motion.div>
      </div>
    </section>
  )
}
