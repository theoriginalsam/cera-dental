import 'server-only'
import { CLINIC_TIME_ZONE, SITE_URL } from '@/lib/clinic'

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

const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif"

export function renderBookingEmail(booking: BookingDetails, adminUrl: string) {
  const whatsapp = `https://wa.me/${booking.phone.replace(/\D/g, '').replace(/^(?!977)(\d{10})$/, '977$1')}`
  const tel = `tel:${booking.phone.replace(/[\s-]/g, '')}`
  const date = booking.preferred_date ? formatDate(booking.preferred_date) : ''
  const received = new Date().toLocaleString('en-GB', {
    timeZone: CLINIC_TIME_ZONE, weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true,
  })

  const rows: [string, string][] = [
    ['Treatment', booking.treatment || 'Not specified'],
    ['Date', date || 'Not chosen'],
    ['Time', booking.preferred_time || 'Not chosen'],
    ...(booking.message ? [['Message', booking.message] as [string, string]] : []),
  ]

  const subject = `New booking: ${booking.name}${booking.treatment ? ` – ${booking.treatment}` : ''}`
  const preheader = [booking.phone, date, booking.preferred_time].filter(Boolean).join(' · ')

  const text = [
    'New appointment request from the website:',
    '',
    `Name: ${booking.name}`,
    `Phone: ${booking.phone}`,
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    `WhatsApp: ${whatsapp}`,
    `All bookings: ${adminUrl}`,
  ].join('\n')

  const detailRows = rows
    .map(
      ([label, value], i) => `
              <tr>
                <td style="padding:14px 20px;${i ? 'border-top:1px solid #e2e8f0;' : ''}">
                  <div style="font-size:11px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#94a3b8;">${label}</div>
                  <div style="margin-top:4px;font-size:15px;font-weight:600;color:#0f172a;white-space:pre-line;">${escapeHtml(value)}</div>
                </td>
              </tr>`
    )
    .join('')

  const button = (href: string, label: string, color: string) => `
                <td style="padding:0 6px;">
                  <a href="${escapeHtml(href)}" style="display:inline-block;background:${color};color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:13px 26px;border-radius:12px;">${label}</a>
                </td>`

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;font-family:${FONT};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <img src="${SITE_URL}/logo-horizontal.png" width="150" alt="Cera Dental Clinic" style="display:block;width:150px;height:auto;border:0;">
            </td>
          </tr>
          <tr>
            <td style="background:#ffffff;border:1px solid #e2e8f0;border-radius:24px;padding:32px 28px;">

              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:14px;">
                    <img src="${SITE_URL}/email/booking-icon.png" width="52" height="52" alt="" style="display:block;border:0;border-radius:14px;">
                  </td>
                  <td style="vertical-align:middle;">
                    <div style="font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0891b2;">New booking</div>
                    <div style="margin-top:2px;font-size:22px;font-weight:800;color:#0f172a;">Appointment request</div>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0;font-size:15px;line-height:1.6;color:#64748b;">
                Someone just requested an appointment on the website. Contact them to confirm.
              </p>

              <div style="margin-top:24px;font-size:24px;font-weight:800;color:#0f172a;">${escapeHtml(booking.name)}</div>
              <a href="${escapeHtml(tel)}" style="display:inline-block;margin-top:4px;font-size:17px;font-weight:700;color:#0e7490;text-decoration:none;">${escapeHtml(booking.phone)}</a>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;">${detailRows}
              </table>

              <table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:28px auto 0;">
                <tr>${button(tel, 'Call', '#0891b2')}${button(whatsapp, 'WhatsApp', '#16a34a')}
                </tr>
              </table>

              <p style="margin:24px 0 0;text-align:center;">
                <a href="${escapeHtml(adminUrl)}" style="font-size:15px;font-weight:700;color:#0e7490;text-decoration:none;">View all bookings &rarr;</a>
              </p>

            </td>
          </tr>
          <tr>
            <td align="center" style="padding:20px 16px 0;font-size:12px;line-height:1.6;color:#94a3b8;">
              Received ${received} &middot; Sent automatically by the Cera Dental Clinic website
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return { subject, text, html }
}

// Emails the clinic about a new booking. Never throws: a failed email must not fail the booking,
// which is already saved and visible in /admin.
export async function notifyNewBooking(booking: BookingDetails, adminUrl: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const { subject, text, html } = renderBookingEmail(booking, adminUrl)

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM || DEFAULT_FROM,
        to: (process.env.NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL).split(',').map((e) => e.trim()),
        subject,
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
