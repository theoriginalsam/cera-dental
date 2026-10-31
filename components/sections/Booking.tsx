'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarCheck, MessageCircle, Phone, CheckCircle2, Loader2 } from 'lucide-react'
import clsx from 'clsx'
import SectionHeader from '@/components/ui/SectionHeader'
import { PHONE_DISPLAY, PHONE_TEL, TIME_SLOTS, TREATMENTS, WHATSAPP_URL } from '@/lib/clinic'

const TREATMENT_OPTIONS = [...TREATMENTS.map((t) => t.title), 'Not sure / Check-up']

const EMPTY = {
  name: '',
  phone: '',
  preferred_date: '',
  preferred_time: '',
  treatment: '',
  message: '',
  company: '', // honeypot
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'

function todayInKathmandu() {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kathmandu' })
}

function whatsappLink(form: typeof EMPTY) {
  const lines = ['Hi Cera Dental, I would like to book an appointment.']
  if (form.name)           lines.push(`Name: ${form.name}`)
  if (form.phone)          lines.push(`Phone: ${form.phone}`)
  if (form.treatment)      lines.push(`Treatment: ${form.treatment}`)
  if (form.preferred_date) lines.push(`Preferred date: ${form.preferred_date}`)
  if (form.preferred_time) lines.push(`Preferred time: ${form.preferred_time}`)
  if (form.message)        lines.push(`Note: ${form.message}`)
  return `${WHATSAPP_URL}?text=${encodeURIComponent(lines.join('\n'))}`
}

export default function Booking() {
  const [form, setForm]     = useState(EMPTY)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError]   = useState('')

  const update = (field: keyof typeof EMPTY) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }
      setStatus('sent')
      setForm(EMPTY)
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="book" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Book an Appointment"
          title="Choose how you'd"
          titleHighlight="like to book."
          description="Send your details through the form and our team will call you to confirm, or message us directly on WhatsApp."
        />

        <div className="grid lg:grid-cols-5 gap-6">

          {/* ── Option 1: Booking form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-card"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center text-white shadow-md shadow-cyan-200">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">Option 1</p>
                <h3 className="text-lg font-bold text-slate-900">Request an appointment</h3>
              </div>
            </div>

            {status === 'sent' ? (
              <div className="flex flex-col items-center text-center gap-3 py-10">
                <CheckCircle2 className="w-14 h-14 text-emerald-500" />
                <p className="text-xl font-bold text-slate-900">Request received!</p>
                <p className="text-slate-500 text-sm max-w-sm">
                  Thank you. Our team will contact you soon to confirm your appointment.
                  For anything urgent, call us on{' '}
                  <a href={PHONE_TEL} className="text-cyan-700 font-semibold">{PHONE_DISPLAY}</a>.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-sm font-semibold text-cyan-700 hover:text-cyan-800"
                >
                  Book another appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                  Full name *
                  <input required minLength={2} maxLength={100} value={form.name} onChange={update('name')} className={inputClass} placeholder="Your name" autoComplete="name" />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                  Phone number *
                  <input required type="tel" pattern="\+?[0-9\s\-]{7,20}" value={form.phone} onChange={update('phone')} className={inputClass} placeholder="98XXXXXXXX" autoComplete="tel" />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                  Preferred date
                  <input type="date" min={todayInKathmandu()} value={form.preferred_date} onChange={update('preferred_date')} className={inputClass} />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                  Preferred time
                  <select value={form.preferred_time} onChange={update('preferred_time')} className={inputClass}>
                    <option value="">Any time</option>
                    {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </label>
                <label className="sm:col-span-2 flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                  Treatment
                  <select value={form.treatment} onChange={update('treatment')} className={inputClass}>
                    <option value="">Select a treatment (optional)</option>
                    {TREATMENT_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </label>
                <label className="sm:col-span-2 flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                  Message
                  <textarea rows={3} maxLength={1000} value={form.message} onChange={update('message')} className={inputClass} placeholder="Anything we should know? (optional)" />
                </label>

                {/* Honeypot — hidden from people, catches bots */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={update('company')}
                  className="hidden"
                  aria-hidden="true"
                />

                {status === 'error' && (
                  <p className="sm:col-span-2 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={clsx(
                      'flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3.5 shadow-md shadow-cyan-200 transition-all',
                      status === 'sending' && 'opacity-70 cursor-wait'
                    )}
                  >
                    {status === 'sending' ? <Loader2 className="w-5 h-5 animate-spin" /> : <CalendarCheck className="w-5 h-5" />}
                    {status === 'sending' ? 'Sending…' : 'Send Booking Request'}
                  </button>
                  <a
                    href={whatsappLink(form)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 font-semibold px-6 py-3"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Send these details on WhatsApp
                  </a>
                </div>
              </form>
            )}
          </motion.div>

          {/* ── Option 2: WhatsApp / call ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl p-6 sm:p-8 text-white shadow-card flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-emerald-50 uppercase tracking-wider">Option 2</p>
                <h3 className="text-lg font-bold">Book on WhatsApp</h3>
              </div>
            </div>
            <p className="text-emerald-50 leading-relaxed mb-6">
              Prefer to chat? Message us on WhatsApp and we&apos;ll find a time that
              works for you. Walk-ins are also welcome every day, 9 AM–7 PM.
            </p>
            <div className="mt-auto space-y-3">
              <a
                href={`${WHATSAPP_URL}?text=${encodeURIComponent('Hi Cera Dental, I would like to book an appointment.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-6 py-3.5 shadow-md transition-all hover:scale-[1.02]"
              >
                <MessageCircle className="w-5 h-5" />
                Message Us on WhatsApp
              </a>
              <a
                href={PHONE_TEL}
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 font-semibold px-6 py-3.5 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
