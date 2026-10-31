'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarCheck, MessageCircle, Phone, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import clsx from 'clsx'
import SectionHeader from '@/components/ui/SectionHeader'
import {
  BOOKING_DAYS_AHEAD,
  PHONE_DISPLAY,
  PHONE_TEL,
  TIME_SLOTS,
  TREATMENTS,
  WHATSAPP_URL,
  addDays,
  clinicNow,
  isSlotOpen,
} from '@/lib/clinic'

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
type Field  = 'name' | 'phone'
type FieldErrors = Partial<Record<Field, string>>

// Same rules as the API, with friendlier wording shown next to each field
function validate(form: typeof EMPTY): FieldErrors {
  const errors: FieldErrors = {}
  const name   = form.name.trim()
  const digits = form.phone.replace(/\D/g, '')

  if (!name) errors.name = 'Please enter your name.'
  else if (name.length < 2) errors.name = 'Please enter your full name.'

  if (!form.phone.trim()) errors.phone = 'Please enter your phone number so we can confirm your booking.'
  else if (!/^\+?[0-9\s-]+$/.test(form.phone.trim()) || digits.length < 7 || digits.length > 15)
    errors.phone = 'Please enter a valid phone number, e.g. 98XXXXXXXX.'

  return errors
}

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
const inputErrorClass = 'border-rose-300 bg-rose-50/40 focus:ring-rose-400'

// Formats a YYYY-MM-DD date string; UTC keeps the calendar day stable in every browser time zone
function formatDay(date: string, options: Intl.DateTimeFormatOptions) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', { timeZone: 'UTC', ...options })
}

function whatsappLink(form: typeof EMPTY) {
  const lines = ['Hi Cera Dental, I would like to book an appointment.']
  if (form.name)           lines.push(`Name: ${form.name}`)
  if (form.phone)          lines.push(`Phone: ${form.phone}`)
  if (form.treatment)      lines.push(`Treatment: ${form.treatment}`)
  if (form.preferred_date) lines.push(`Preferred date: ${formatDay(form.preferred_date, { weekday: 'long', day: 'numeric', month: 'long' })}`)
  if (form.preferred_time) lines.push(`Preferred time: ${form.preferred_time}`)
  if (form.message)        lines.push(`Note: ${form.message}`)
  return `${WHATSAPP_URL}?text=${encodeURIComponent(lines.join('\n'))}`
}

export default function Booking() {
  const [form, setForm]     = useState(EMPTY)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError]   = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [attempted, setAttempted]     = useState(false)
  const nameRef  = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)

  // Computed after mount: the page is prerendered, so "today" must come from the visitor's clock
  const [now, setNow] = useState<ReturnType<typeof clinicNow> | null>(null)
  useEffect(() => setNow(clinicNow()), [])

  // Upcoming dates; today is skipped once every slot for today has passed
  const days = useMemo(() => {
    if (!now) return []
    const lastSlot = TIME_SLOTS[TIME_SLOTS.length - 1]
    const start = isSlotOpen(lastSlot, now.date, now) ? 0 : 1
    return Array.from({ length: BOOKING_DAYS_AHEAD }, (_, i) => addDays(now.date, start + i))
  }, [now])

  const pickDate = (date: string) =>
    setForm((f) => {
      const preferred_date = f.preferred_date === date ? '' : date
      const slot = TIME_SLOTS.find((t) => t.label === f.preferred_time)
      const keepTime = !slot || !now || !preferred_date || isSlotOpen(slot, preferred_date, now)
      return { ...f, preferred_date, preferred_time: keepTime ? f.preferred_time : '' }
    })

  const pickTime = (label: string) =>
    setForm((f) => ({ ...f, preferred_time: f.preferred_time === label ? '' : label }))

  const update = (field: keyof typeof EMPTY) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }))
      // Clear a field's message as soon as the visitor starts fixing it
      if (field in fieldErrors) setFieldErrors((errs) => ({ ...errs, [field]: undefined }))
    }

  // After the first submit attempt, re-check a field whenever the visitor leaves it
  const recheck = (field: Field) => () => {
    if (!attempted) return
    setFieldErrors((errs) => ({ ...errs, [field]: validate(form)[field] }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    setAttempted(true)
    const errors = validate(form)
    setFieldErrors(errors)
    if (errors.name || errors.phone) {
      setStatus('idle')
      ;(errors.name ? nameRef : phoneRef).current?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong on our side. Please try again in a moment.')
      }
      setStatus('sent')
      setForm(EMPTY)
      setFieldErrors({})
      setAttempted(false)
    } catch (err) {
      setStatus('error')
      // fetch throws a TypeError when the visitor is offline or the server can't be reached
      setError(
        err instanceof TypeError
          ? "We couldn't reach our server. Please check your internet connection and try again."
          : err instanceof Error
            ? err.message
            : 'Something went wrong. Please try again.'
      )
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
              <form noValidate onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="book-name" className="text-sm font-medium text-slate-700">Full name *</label>
                  <input
                    id="book-name"
                    ref={nameRef}
                    maxLength={100}
                    value={form.name}
                    onChange={update('name')}
                    onBlur={recheck('name')}
                    aria-invalid={Boolean(fieldErrors.name)}
                    aria-describedby={fieldErrors.name ? 'book-name-error' : undefined}
                    className={clsx(inputClass, fieldErrors.name && inputErrorClass)}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  {fieldErrors.name && (
                    <p id="book-name-error" className="flex items-start gap-1.5 text-xs text-rose-600">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-px" />
                      {fieldErrors.name}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="book-phone" className="text-sm font-medium text-slate-700">Phone number *</label>
                  <input
                    id="book-phone"
                    ref={phoneRef}
                    type="tel"
                    inputMode="tel"
                    maxLength={20}
                    value={form.phone}
                    onChange={update('phone')}
                    onBlur={recheck('phone')}
                    aria-invalid={Boolean(fieldErrors.phone)}
                    aria-describedby={fieldErrors.phone ? 'book-phone-error' : undefined}
                    className={clsx(inputClass, fieldErrors.phone && inputErrorClass)}
                    placeholder="98XXXXXXXX"
                    autoComplete="tel"
                  />
                  {fieldErrors.phone && (
                    <p id="book-phone-error" className="flex items-start gap-1.5 text-xs text-rose-600">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-px" />
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>
                {/* Preferred date — upcoming days only */}
                <fieldset className="sm:col-span-2 min-w-0">
                  <legend className="text-sm font-medium text-slate-700 mb-1.5">
                    Preferred date <span className="text-slate-400 font-normal">(optional)</span>
                  </legend>
                  <div className="chip-scroll flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
                    {days.length === 0 &&
                      Array.from({ length: 7 }, (_, i) => (
                        <div key={i} className="shrink-0 w-16 h-[76px] rounded-xl bg-slate-100 animate-pulse" />
                      ))}
                    {days.map((date, i) => {
                      const selected = form.preferred_date === date
                      const top =
                        date === now?.date ? 'Today'
                        : date === (now && addDays(now.date, 1)) ? 'Tomorrow'
                        : formatDay(date, { weekday: 'short' })
                      return (
                        <button
                          key={date}
                          type="button"
                          onClick={() => pickDate(date)}
                          aria-pressed={selected}
                          aria-label={formatDay(date, { weekday: 'long', day: 'numeric', month: 'long' })}
                          className={clsx(
                            'shrink-0 snap-start w-16 rounded-xl border py-2 flex flex-col items-center transition-colors',
                            selected
                              ? 'bg-cyan-600 border-cyan-600 text-white shadow-md shadow-cyan-200'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-cyan-300 hover:bg-cyan-50',
                            i === 0 && !selected && 'border-cyan-200'
                          )}
                        >
                          <span className={clsx('text-[11px] font-semibold', selected ? 'text-cyan-50' : 'text-slate-500')}>
                            {top}
                          </span>
                          <span className="text-xl font-extrabold leading-tight">{formatDay(date, { day: 'numeric' })}</span>
                          <span className={clsx('text-[11px]', selected ? 'text-cyan-50' : 'text-slate-400')}>
                            {formatDay(date, { month: 'short' })}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {form.preferred_date
                      ? <>Selected: <span className="font-semibold text-slate-700">{formatDay(form.preferred_date, { weekday: 'long', day: 'numeric', month: 'long' })}</span> · tap again to clear</>
                      : 'Open every day. Need a later date? Mention it in the message.'}
                  </p>
                </fieldset>

                {/* Preferred time */}
                <fieldset className="sm:col-span-2 min-w-0">
                  <legend className="text-sm font-medium text-slate-700 mb-1.5">
                    Preferred time <span className="text-slate-400 font-normal">(optional)</span>
                  </legend>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((t) => {
                      const open = !now || !form.preferred_date || isSlotOpen(t, form.preferred_date, now)
                      const selected = form.preferred_time === t.label
                      return (
                        <button
                          key={t.label}
                          type="button"
                          disabled={!open}
                          onClick={() => pickTime(t.label)}
                          aria-pressed={selected}
                          className={clsx(
                            'rounded-xl border px-2 py-2.5 flex flex-col items-center transition-colors',
                            selected
                              ? 'bg-cyan-600 border-cyan-600 text-white shadow-md shadow-cyan-200'
                              : open
                                ? 'bg-white border-slate-200 text-slate-700 hover:border-cyan-300 hover:bg-cyan-50'
                                : 'bg-slate-100 border-slate-100 text-slate-400 cursor-not-allowed'
                          )}
                        >
                          <span className="text-sm font-semibold">{t.short}</span>
                          <span className={clsx('text-[11px]', selected ? 'text-cyan-50' : 'text-slate-400')}>
                            {open ? t.hours : 'Passed'}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </fieldset>
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
                  <div role="alert" className="sm:col-span-2 flex items-start gap-3 text-sm bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                    <div>
                      <p className="font-semibold text-rose-700">Your request wasn&apos;t sent</p>
                      <p className="text-rose-600 mt-0.5">{error}</p>
                      <a
                        href={whatsappLink(form)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 font-semibold text-emerald-700 hover:text-emerald-800"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Send the same details on WhatsApp instead
                      </a>
                    </div>
                  </div>
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
