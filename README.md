# Cera Dental Clinic — Website

A high-performance, conversion-optimized marketing website for **Cera Dental Clinic**, Pokhara, Nepal. Built with Next.js 14, Tailwind CSS, and Framer Motion.

---

## Live Demo

🌐 [cera-dental.vercel.app](https://cera-dental-gm72d3s7f-datainsights-projects.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |
| Deployment | Vercel |

---

## Features

- **Glassmorphism Navigation** — sticky, blur-backdrop nav that transitions on scroll
- **White Hero Section** — clean layout with cyan accents and a gradient visit-details card
- **About Section** — clinic background and approach
- **Services Grid** — 12 treatments in a card grid with stagger animations
- **Clinic Environment Grid** — equipment and facilities in a mixed-size bento layout
- **Dental Team** — 5 dentist cards with qualifications and NMC numbers
- **FAQ Accordion** — 8 Q&As with smooth Framer Motion AnimatePresence transitions
- **Google Maps Embed** — Nayabazar, Pokhara location in the footer
- **Mobile Floating Bar** — sticky Call + WhatsApp bottom tabs on mobile
- **Desktop FABs** — floating Call + WhatsApp + scroll-to-top buttons
- **SEO Optimised** — proper H1/H2 hierarchy, full OpenGraph & Twitter metadata

---

## Project Structure

```
cera-dental/
├── app/
│   ├── layout.tsx          # Root layout + SEO metadata
│   ├── page.tsx            # Page composition
│   └── globals.css         # Global styles, glassmorphism utilities
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx      # Animated button (primary / outline / ghost / white)
│   │   ├── SectionHeader.tsx
│   │   ├── ServiceCard.tsx
│   │   └── DoctorCard.tsx
│   │
│   ├── sections/
│   │   ├── Navigation.tsx  # Glassmorphism sticky nav + mobile drawer
│   │   ├── Hero.tsx        # Full-height hero with gradient visit-details card
│   │   ├── TrustBar.tsx    # 5-item facilities bar
│   │   ├── About.tsx       # About the clinic
│   │   ├── Services.tsx    # Service catalog grid
│   │   ├── WhyChooseUs.tsx # Clinic environment bento grid
│   │   ├── Doctors.tsx     # Dental team cards
│   │   ├── FAQ.tsx         # Accordion FAQ
│   │   └── Footer.tsx      # 4-column footer + map embed
│   │
│   └── MobileActions.tsx   # Floating mobile bottom bar + desktop FABs
│
└── public/
    └── logo.png            # Transparent-background clinic logo
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm start
```

---

## Online Booking (Supabase)

The booking form (`#book`) saves requests to Supabase; the clinic views them at **`/admin`**.
Until the variables below are set, the form shows a message asking visitors to use WhatsApp instead.

1. In Supabase → **SQL Editor**, run [`supabase/schema.sql`](supabase/schema.sql) once.
2. Add these variables to `.env.local` (local) **and** Vercel → Project → Settings → Environment Variables (live), then redeploy:

| Variable | Where to find it |
|---|---|
| `SUPABASE_URL` | Supabase → Project Settings → API → Project URL |
| `SUPABASE_SECRET_KEY` | Supabase → Project Settings → API Keys → Secret key (`sb_secret_…`) — server-only |
| `ADMIN_PASSWORD` | The first admin password, used to sign in at `/admin` |
| `RESEND_API_KEY` | *Optional.* [Resend](https://resend.com) → API Keys. Emails the clinic about each new booking |
| `NOTIFY_EMAIL` | *Optional.* Who gets booking emails (default `ceradentalpokhara@gmail.com`) |

**Booking emails:** create the Resend account with the `NOTIFY_EMAIL` address. Resend's shared sender
(`onboarding@resend.dev`) only delivers to the account's own email; to email anyone else, verify a domain in
Resend and set `NOTIFY_FROM` (e.g. `Cera Dental <bookings@yourdomain.com>`). A failed email never blocks a booking.

Staff can change the password at **`/admin/password`**. The new password is stored as a salted hash in the
`admin_settings` table and replaces `ADMIN_PASSWORD`; changing it signs out every other device.
Forgot it? Delete the `password_hash` row in Supabase → Table Editor → `admin_settings`, then sign in with `ADMIN_PASSWORD`.

---

## Business Details

| | |
|---|---|
| Clinic | Cera Dental Clinic |
| Address | Pokhara-8, Nayabazar, Nepal (opposite GMC Hospital OPD gate) |
| Phone | +977 9846020595 |
| WhatsApp | +977 9768059598 |
| Email | ceradentalpokhara@gmail.com |
| Hours | Every day, 9:00 AM – 7:00 PM |

---

## Colour Palette

| Token | Hex | Usage |
|---|---|---|
| Primary | `#0891b2` | Buttons, accents, gradient |
| Background | `#f8fafc` | Page background |
| Text | `#0f172a` | Body text |
| Cyan 300 | `#67e8f9` | Highlight text |
| Teal 400 | `#2dd4bf` | Gradient end stop |
