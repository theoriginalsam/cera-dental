'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import clsx from 'clsx'

const FAQS = [
  {
    category: 'General',
    question: 'What are your opening hours?',
    answer:
      'We are open every day, 9:00 AM to 7:00 PM.',
  },
  {
    category: 'General',
    question: 'How do I book an appointment?',
    answer:
      'You can fill in the booking form on this page and our team will contact you to confirm, message us on WhatsApp, call us on +977 9846020595, or simply walk in during clinic hours.',
  },
  {
    category: 'General',
    question: 'Do you see dental emergencies?',
    answer:
      'Emergency dental availability is during clinic hours, 9 AM–7 PM, every day.',
  },
  {
    category: 'Location',
    question: 'Where is the clinic?',
    answer:
      'Cera Dental Clinic is at Pokhara-8, Nayabazar — opposite the GMC Hospital OPD gate and Karmachari Sanchaya Kosh Bhawan.',
  },
  {
    category: 'Treatments',
    question: 'How do I know which treatment I need?',
    answer:
      'Treatment recommendations are made following an individual assessment. The appropriate treatment is determined after clinical examination and discussion with the treating dentist.',
  },
  {
    category: 'Treatments',
    question: 'When are the specialists available?',
    answer:
      'Specialist consultations (orthodontics, periodontology and implantology, and oral and maxillofacial surgery) are available on selected days. Please contact us to confirm the schedule.',
  },
  {
    category: 'Children',
    question: 'Do you treat children?',
    answer:
      'Yes. We provide dental care for patients of all age groups, including paediatric dentistry for children.',
  },
  {
    category: 'Facilities',
    question: 'What equipment does the clinic have?',
    answer:
      'Our clinic is equipped with digital X-ray, sterilization facilities and two modern dental chairs, in a clean and comfortable space.',
  },
]

interface FAQItemProps {
  question: string
  answer: string
  category: string
  isOpen: boolean
  onToggle: () => void
  index: number
}

function FAQItem({ question, answer, category, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      className={clsx(
        'border rounded-2xl overflow-hidden transition-colors duration-200',
        isOpen
          ? 'border-cyan-200 bg-cyan-50/50'
          : 'border-slate-100 bg-white hover:border-slate-200'
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex-1">
          <span className="text-xs font-semibold text-cyan-600 uppercase tracking-wider block mb-1">
            {category}
          </span>
          <span
            className={clsx(
              'text-base font-semibold leading-snug',
              isOpen ? 'text-cyan-700' : 'text-slate-900'
            )}
          >
            {question}
          </span>
        </div>

        <div
          className={clsx(
            'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200',
            isOpen
              ? 'bg-cyan-600 text-white'
              : 'bg-slate-100 text-slate-500'
          )}
        >
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="faq-content"
          >
            <div className="px-5 pb-5">
              <div className="w-full h-px bg-cyan-100 mb-4" />
              <p className="text-slate-600 text-sm leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Common Questions"
          title="Frequently Asked"
          titleHighlight="Questions"
          description="Can't find what you're looking for? Call us at +977 9846020595 or message us on WhatsApp."
        />

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={faq.question}
              {...faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              index={i}
            />
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 glass rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div className="flex-1">
            <p className="font-bold text-slate-900 mb-1">Still have questions?</p>
            <p className="text-slate-500 text-sm">
              We&apos;re happy to help — every day, 9 AM–7 PM.
            </p>
          </div>
          <a
            href="https://wa.me/9779768059598"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-md shadow-cyan-200 transition-all hover:scale-[1.02]"
          >
            Message Us on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
