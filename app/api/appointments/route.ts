import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { TREATMENTS, TIME_SLOTS, BOOKING_DAYS_AHEAD, addDays, clinicNow, isSlotOpen } from '@/lib/clinic'

const TREATMENT_TITLES: readonly string[] = [...TREATMENTS.map((t) => t.title), 'Not sure / Check-up']

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot field: real visitors never see or fill it
  if (clean(body.company, 100)) {
    return NextResponse.json({ ok: true }, { status: 201 })
  }

  const name           = clean(body.name, 100)
  const phone          = clean(body.phone, 20)
  const preferred_date = clean(body.preferred_date, 10)
  const preferred_time = clean(body.preferred_time, 40)
  const treatment      = clean(body.treatment, 60)
  const message        = clean(body.message, 1000)

  if (name.length < 2) {
    return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
  }
  if (!/^\+?[0-9\s-]{7,20}$/.test(phone)) {
    return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 })
  }
  const now = clinicNow()
  if (
    preferred_date &&
    (!/^\d{4}-\d{2}-\d{2}$/.test(preferred_date) ||
      preferred_date < now.date ||
      preferred_date > addDays(now.date, BOOKING_DAYS_AHEAD))
  ) {
    return NextResponse.json({ error: 'Please choose a date from the list.' }, { status: 400 })
  }
  const slot = TIME_SLOTS.find((s) => s.label === preferred_time)
  if (preferred_time && !slot) {
    return NextResponse.json({ error: 'Please choose a valid time.' }, { status: 400 })
  }
  if (slot && preferred_date && !isSlotOpen(slot, preferred_date, now)) {
    return NextResponse.json({ error: 'That time has already passed today. Please choose another time.' }, { status: 400 })
  }
  if (treatment && !TREATMENT_TITLES.includes(treatment)) {
    return NextResponse.json({ error: 'Please choose a valid treatment.' }, { status: 400 })
  }

  const supabase = getSupabase()
  if (!supabase) {
    return NextResponse.json(
      { error: 'Online booking is not available right now. Please book on WhatsApp or call us.' },
      { status: 503 }
    )
  }

  const { error } = await supabase.from('appointments').insert({
    name,
    phone,
    preferred_date: preferred_date || null,
    preferred_time: preferred_time || null,
    treatment:      treatment || null,
    message:        message || null,
  })

  if (error) {
    console.error('Failed to save appointment:', error.message)
    return NextResponse.json(
      { error: 'Could not send your booking. Please try again or book on WhatsApp.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true }, { status: 201 })
}
