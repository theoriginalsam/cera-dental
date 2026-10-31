'use client'

import { motion } from 'framer-motion'
import {
  ShieldCheck,
  ScanLine,
  Armchair,
  Users,
  Clock,
} from 'lucide-react'

const ITEMS = [
  { icon: <ScanLine className="w-5 h-5" />,    text: 'Digital X-Ray' },
  { icon: <ShieldCheck className="w-5 h-5" />, text: 'Sterilization Facilities' },
  { icon: <Armchair className="w-5 h-5" />,    text: 'Two Modern Dental Chairs' },
  { icon: <Users className="w-5 h-5" />,       text: 'Care for All Ages' },
  { icon: <Clock className="w-5 h-5" />,       text: 'Open Daily · 9AM–7PM' },
]

export default function TrustBar() {
  return (
    <section className="bg-white border-b border-slate-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center sm:justify-between gap-4 items-center"
        >
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-2 text-slate-600 text-sm font-medium"
            >
              <span className="text-cyan-600">{item.icon}</span>
              {item.text}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
