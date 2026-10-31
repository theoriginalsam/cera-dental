// Shared clinic details used by the page sections, booking form and admin page.

export const PHONE_DISPLAY   = '+977 9846020595'
export const PHONE_TEL       = 'tel:+9779846020595'
export const WHATSAPP_NUMBER = '9779768059598'
export const WHATSAPP_URL    = `https://wa.me/${WHATSAPP_NUMBER}`

export const SOCIAL_LINKS = {
  facebook:  'https://www.facebook.com/p/Cera-Dental-Clinic-61588173137651/',
  instagram: 'https://www.instagram.com/cera.dental.official/',
  tiktok:    'https://www.tiktok.com/@ceradentalofficial',
}

export const TREATMENTS = [
  { slug: 'general',    title: 'General Dentistry',    description: 'Routine dental check-ups and general dental care.',              image: '/services/general.jpg',    alt: 'Dental mirror and explorer on a linen cloth' },
  { slug: 'scaling',    title: 'Scaling & Polishing',  description: 'Professional cleaning for teeth and gums.',                      image: '/services/scaling.jpg',    alt: 'Toothbrush and polishing cup beside a glass of water' },
  { slug: 'fillings',   title: 'Dental Fillings',      description: 'Restorative treatment for teeth affected by decay.',             image: '/services/fillings.jpg',   alt: 'Model tooth with a dental composite syringe' },
  { slug: 'rootcanal',  title: 'Root Canal Treatment', description: 'Root canal treatment (RCT).',                                    image: '/services/rootcanal.jpg',  alt: 'Endodontic files arranged on a tray' },
  { slug: 'crowns',     title: 'Crowns & Bridges',     description: 'Fixed restorative options for damaged or missing teeth.',       image: '/services/crowns.jpg',     alt: 'Ceramic dental crown on a stone pedestal' },
  { slug: 'aesthetic',  title: 'Aesthetic Dentistry',  description: 'Aesthetic and cosmetic dental treatments.',                      image: '/services/aesthetic.jpg',  alt: 'Dental shade guide fanned out on linen' },
  { slug: 'whitening',  title: 'Teeth Whitening',      description: 'Teeth whitening and bleaching.',                                image: '/services/whitening.jpg',  alt: 'Whitening tray and gel tube on marble' },
  { slug: 'diamonds',   title: 'Dental Diamonds',      description: 'Small decorative tooth gems bonded to the tooth surface.',      image: '/services/diamonds.jpg',   alt: 'Model tooth with a small sparkling tooth gem' },
  { slug: 'braces',     title: 'Braces & Aligners',    description: 'Orthodontic treatment with braces and aligners.',               image: '/services/braces.jpg',     alt: 'Clear aligner on a ceramic dish' },
  { slug: 'implants',   title: 'Dental Implants',      description: 'Dental implant treatment.',                                     image: '/services/implants.jpg',   alt: 'Titanium dental implant standing upright' },
  { slug: 'extraction', title: 'Tooth Extraction',     description: 'Tooth removal when clinically indicated.',                      image: '/services/extraction.jpg', alt: 'Dental forceps on a folded sterile cloth' },
  { slug: 'paediatric', title: 'Paediatric Dentistry', description: 'Dental care for children.',                                     image: '/services/paediatric.jpg', alt: "Child's toothbrush and a small toy tooth" },
] as const

// endHour is in clinic local time (Asia/Kathmandu), used to hide slots that have already passed today
export const TIME_SLOTS = [
  { label: 'Morning (9 AM–12 PM)', short: 'Morning',   hours: '9 AM–12 PM', endHour: 12 },
  { label: 'Afternoon (12–4 PM)',  short: 'Afternoon', hours: '12–4 PM',    endHour: 16 },
  { label: 'Evening (4–7 PM)',     short: 'Evening',   hours: '4–7 PM',     endHour: 19 },
] as const

export const CLINIC_TIME_ZONE = 'Asia/Kathmandu'
export const BOOKING_DAYS_AHEAD = 14

// Today's date (YYYY-MM-DD) and current hour in the clinic's time zone
export function clinicNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: CLINIC_TIME_ZONE,
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23',
  }).formatToParts(now)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return { date: `${get('year')}-${get('month')}-${get('day')}`, hour: Number(get('hour')) }
}

// Adds days to a YYYY-MM-DD date string without time-zone drift
export function addDays(date: string, days: number) {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d + days)).toISOString().slice(0, 10)
}

// A slot can still be booked for today if at least an hour of it remains
export function isSlotOpen(slot: (typeof TIME_SLOTS)[number], date: string, now = clinicNow()) {
  return date !== now.date || now.hour < slot.endHour - 1
}
