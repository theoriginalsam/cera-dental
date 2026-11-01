'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface DatePickerProps {
  value: string            // YYYY-MM-DD or ''
  onChange: (date: string) => void
  min: string              // first bookable day
  max: string              // last bookable day
  today: string
}

// Dates are handled as YYYY-MM-DD strings with UTC math, so the calendar shows the
// same days in every browser time zone.
function toDate(date: string) {
  return new Date(`${date}T00:00:00Z`)
}

function iso(y: number, m: number, d: number) {
  return new Date(Date.UTC(y, m, d)).toISOString().slice(0, 10)
}

function format(date: string, options: Intl.DateTimeFormatOptions) {
  return toDate(date).toLocaleDateString('en-GB', { timeZone: 'UTC', ...options })
}

export default function DatePicker({ value, onChange, min, max, today }: DatePickerProps) {
  // The visible month, as [year, monthIndex]
  const [month, setMonth] = useState(() => {
    const d = toDate(value || min)
    return [d.getUTCFullYear(), d.getUTCMonth()] as const
  })
  const [y, m] = month

  const first = iso(y, m, 1)
  const daysInMonth = new Date(Date.UTC(y, m + 1, 0)).getUTCDate()
  const leadingBlanks = toDate(first).getUTCDay()
  // A neighbouring month is reachable if it contains at least one bookable day
  const canGoBack = first > min
  const canGoForward = iso(y, m + 1, 1) <= max

  const go = (delta: number) => {
    const d = new Date(Date.UTC(y, m + delta, 1))
    setMonth([d.getUTCFullYear(), d.getUTCMonth()])
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4">
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={!canGoBack}
          aria-label="Previous month"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-cyan-50 hover:text-cyan-700 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <p className="text-sm font-bold text-slate-900" aria-live="polite">
          {format(first, { month: 'long', year: 'numeric' })}
        </p>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={!canGoForward}
          aria-label="Next month"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-cyan-50 hover:text-cyan-700 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d) => (
          <span key={d} className="text-[11px] font-semibold text-slate-400 py-1">{d}</span>
        ))}
        {Array.from({ length: leadingBlanks }, (_, i) => <span key={`blank-${i}`} />)}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = iso(y, m, i + 1)
          const disabled = date < min || date > max
          const selected = date === value
          const isToday = date === today
          return (
            <button
              key={date}
              type="button"
              disabled={disabled}
              onClick={() => onChange(selected ? '' : date)}
              aria-pressed={selected}
              aria-label={format(date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              className={clsx(
                'relative h-10 rounded-xl text-sm font-semibold transition-colors',
                selected
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-200'
                  : disabled
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-700 hover:bg-cyan-50 hover:text-cyan-700',
                isToday && !selected && !disabled && 'ring-1 ring-inset ring-cyan-300'
              )}
            >
              {i + 1}
              {isToday && (
                <span className={clsx('absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full', selected ? 'bg-white' : 'bg-cyan-500')} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
