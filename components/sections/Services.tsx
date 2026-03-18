'use client'

import { motion } from 'framer-motion'
import {
  Search,
  Sparkles,
  Zap,
  Anchor,
  Sun,
  ScanLine,
  SmilePlus,
  Baby,
} from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import ServiceCard from '@/components/ui/ServiceCard'

const SERVICES = [
  {
    icon: <Search className="w-5 h-5" />,
    title: 'Comprehensive Check-ups',
    description:
      'Full oral health evaluation, digital X-rays, and a personalised care plan — all in one visit. Catch problems early, save more later.',
    tag: 'Most Popular',
    accent: 'bg-cyan-100',
    large: false,
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: 'Smile Design',
    description:
      'Bespoke cosmetic treatment combining veneers, whitening, and contouring. We digitally preview your new smile before a single tooth is touched.',
    tag: 'Premium',
    accent: 'bg-violet-100',
    large: true,
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Root Canal Therapy',
    description:
      'Modern single-visit RCT with rotary instruments and apex locators. Patients consistently report it as no more uncomfortable than a filling.',
    accent: 'bg-rose-100',
    large: false,
  },
  {
    icon: <Anchor className="w-5 h-5" />,
    title: 'Dental Implants',
    description:
      'Titanium implants that fuse with bone for a lifetime of durability. Full treatment planning with 3D CBCT imaging for precision placement.',
    tag: 'Advanced',
    accent: 'bg-amber-100',
    large: false,
  },
  {
    icon: <Sun className="w-5 h-5" />,
    title: 'Teeth Whitening',
    description:
      'In-chair LED whitening that lifts stains up to 8 shades in 60 minutes, plus take-home trays for maintenance. Safe, fast, and long-lasting.',
    accent: 'bg-yellow-100',
    large: false,
  },
  {
    icon: <ScanLine className="w-5 h-5" />,
    title: 'Invisalign & Clear Aligners',
    description:
      'Straighten teeth discreetly with removable clear aligners. We are certified Invisalign providers with full digital scanning — no messy moulds.',
    tag: 'Invisible',
    accent: 'bg-cyan-100',
    large: false,
  },
  {
    icon: <SmilePlus className="w-5 h-5" />,
    title: 'Crowns & Bridges',
    description:
      'Same-day CEREC ceramic crowns and precision-fit bridges. Match your natural shade perfectly with our in-house digital milling system.',
    accent: 'bg-indigo-100',
    large: false,
  },
  {
    icon: <Baby className="w-5 h-5" />,
    title: 'Pediatric Dentistry',
    description:
      'Child-friendly visits designed to eliminate dental fear. Our specialist uses tell-show-do techniques and nitrous oxide for a positive first experience.',
    accent: 'bg-pink-100',
    large: false,
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
          eyebrow="What We Offer"
          title="Our Services"
          titleHighlight="& Treatments"
          description="From preventive care to complete smile makeovers — every procedure is performed with the latest technology and a gentle touch."
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
            <motion.div
              key={service.title}
              variants={itemVariants}
              className={service.large ? 'sm:col-span-2 lg:col-span-2' : ''}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                tag={service.tag}
                accent={service.accent}
                large={service.large}
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
          <p className="text-slate-500 mb-4 text-sm">
            Not sure which treatment you need? We offer a{' '}
            <span className="text-cyan-600 font-semibold">free initial consultation</span>.
          </p>
          <a
            href="tel:+9779846020595"
            className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md shadow-cyan-200 transition-all hover:scale-[1.02]"
          >
            Schedule a Free Consultation
          </a>
        </motion.div>
      </div>
    </section>
  )
}
