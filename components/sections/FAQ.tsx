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
      'We are open Sunday through Friday, 9:00 AM to 6:30 PM. We are strictly closed on Saturdays. For urgent dental emergencies outside these hours, please call us and leave a message — we will respond as quickly as possible.',
  },
  {
    category: 'General',
    question: 'How do I book an appointment?',
    answer:
      'You can book by calling us at +977 9846020595, sending a WhatsApp message to the same number, or by walking in during clinic hours. We aim to accommodate same-day appointments for most routine and urgent cases.',
  },
  {
    category: 'Treatments',
    question: 'Is a root canal really as painful as people say?',
    answer:
      'No — modern root canal therapy is routinely described by our patients as no more uncomfortable than a routine filling. We use superior local anaesthesia, heated anaesthetic for faster onset, and rotary instrumentation to complete the procedure efficiently. Many patients read on their phones throughout!',
  },
  {
    category: 'Treatments',
    question: 'How long does teeth whitening last?',
    answer:
      'Our in-chair LED whitening results typically last 12–18 months depending on your diet and habits. We recommend avoiding coffee, tea, and red wine for the first 48 hours (the "white diet"). Maintenance with our take-home kit can extend results significantly.',
  },
  {
    category: 'Treatments',
    question: 'What is the process for getting dental implants?',
    answer:
      'The implant process has three main stages: (1) a 3D CBCT scan and treatment planning consultation, (2) the titanium post placement under local anaesthesia, and (3) the attachment of the custom ceramic crown once the implant has fully integrated with the bone (usually 3–4 months). The result is a permanent, natural-looking tooth that can last a lifetime.',
  },
  {
    category: 'Children',
    question: 'At what age should my child first visit the dentist?',
    answer:
      'We recommend bringing your child for their first visit around their 1st birthday or within 6 months of their first tooth appearing — whichever comes first. Early visits help establish positive associations with dental care and allow us to catch any developmental issues early.',
  },
  {
    category: 'Cost & Payment',
    question: 'Do you offer payment plans?',
    answer:
      'Yes. For major treatments such as implants, smile design, and full-mouth rehabilitation, we offer interest-free installment plans. Please speak to our patient coordinator during your consultation to discuss which plan works best for your situation.',
  },
  {
    category: 'Cost & Payment',
    question: 'How much does a check-up cost?',
    answer:
      'Our comprehensive check-up (including digital X-rays and a full oral cancer screening) starts from NPR 800. We believe that transparent, affordable preventive care saves patients significantly more money — and discomfort — in the long run.',
  },
  {
    category: 'Technology',
    question: 'What technology do you use?',
    answer:
      'We invest in the best available technology: digital X-rays (90% lower radiation than film), 3D cone-beam CT (CBCT) scanner, intraoral HD cameras, CEREC CAD/CAM for same-day ceramic restorations, ultrasonic cleaning systems, and apex locators for precision RCT. Our sterilisation cycle is fully validated and logged.',
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
          description="Can't find what you're looking for? Call us at +977 9846020595 and we'll answer personally."
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
              Our patient coordinators are available Sun–Fri, 9AM–6:30PM.
            </p>
          </div>
          <a
            href="tel:+9779846020595"
            className="shrink-0 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-xl text-sm shadow-md shadow-cyan-200 transition-all hover:scale-[1.02]"
          >
            Call Us Now
          </a>
        </motion.div>
      </div>
    </section>
  )
}
