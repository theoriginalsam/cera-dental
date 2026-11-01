import 'server-only'

const DEFAULT_NOTIFY_EMAIL = 'ceradentalpokhara@gmail.com'
// Resend's shared sender works without a verified domain, but only delivers to the
// email address the Resend account was created with.
const DEFAULT_FROM = 'Cera Dental Website <onboarding@resend.dev>'

export interface BookingDetails {
  name: string
  phone: string
  preferred_date: string
  preferred_time: string
  treatment: string
  message: string
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-GB', {
    timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

// Emails the clinic about a new booking. Never throws: a failed email must not fail the booking,
// which is already saved and visible in /admin.
export async function notifyNewBooking(booking: BookingDetails, adminUrl: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const whatsapp = `https://wa.me/${booking.phone.replace(/\D/g, '').replace(/^(?!977)(\d{10})$/, '977$1')}`

  const rows: [string, string][] = [
    ['Name', booking.name],
    ['Phone', booking.phone],
    ['Treatment', booking.treatment || 'Not specified'],
    ['Date', booking.preferred_date ? formatDate(booking.preferred_date) : 'Not chosen'],
    ['Time', booking.preferred_time || 'Not chosen'],
    ['Message', booking.message || '—'],
  ]

  const text = [
    'New appointment request from the website:',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    `WhatsApp: ${whatsapp}`,
    `All bookings: ${adminUrl}`,
  ].join('\n')

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;color:#0f172a">
      <h2 style="color:#0891b2;margin:0 0 16px">New appointment request</h2>
      <table style="border-collapse:collapse;width:100%;font-size:15px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 12px 8px 0;color:#64748b;vertical-align:top;white-space:nowrap">${label}</td>
            <td style="padding:8px 0;white-space:pre-line">${escapeHtml(value)}</td>
          </tr>`
          )
          .join('')}
      </table>
      <p style="margin:24px 0 0">
        <a href="tel:${escapeHtml(booking.phone.replace(/[\s-]/g, ''))}" style="background:#0891b2;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:bold">Call</a>
        &nbsp;
        <a href="${whatsapp}" style="background:#059669;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:bold">WhatsApp</a>
        &nbsp;
        <a href="${escapeHtml(adminUrl)}" style="color:#0891b2;font-weight:bold">Open admin</a>
      </p>
    </div>`

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM || DEFAULT_FROM,
        to: (process.env.NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL).split(',').map((e) => e.trim()),
        subject: `New booking: ${booking.name}${booking.treatment ? ` – ${booking.treatment}` : ''}`,
        text,
        html,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) console.error('Booking email failed:', res.status, await res.text())
  } catch (err) {
    console.error('Booking email failed:', err)
  }
}
