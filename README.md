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
- **White Hero Section** — clean layout with cyan accents and a gradient testimonial card
- **Bento Grid Services** — 8 treatments in an asymmetric card grid with stagger animations
- **Why Choose Us Grid** — 8 clinic differentiators in a mixed-size bento layout
- **Doctor Profiles** — 3 specialist cards (Oral Surgery, Cosmetic, Pediatric)
- **Testimonials** — 5 verified patient reviews with 5-star ratings
- **FAQ Accordion** — 9 Q&As with smooth Framer Motion AnimatePresence transitions
- **Google Maps Embed** — Nayabazar Rd, Pokhara location in the footer
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
│   │   ├── Hero.tsx        # Full-height hero with gradient testimonial card
│   │   ├── TrustBar.tsx    # 5-item trust signal bar
│   │   ├── Services.tsx    # Bento grid service catalog
│   │   ├── WhyChooseUs.tsx # Why choose us bento grid
│   │   ├── Doctors.tsx     # Doctor profile cards
│   │   ├── Testimonials.tsx# Patient reviews
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

## Business Details

| | |
|---|---|
| Clinic | Cera Dental Clinic |
| Address | Nayabazar Rd, Pokhara 33700, Nepal |
| Phone | +977 9846020595 |
| Hours | Sunday – Friday, 9:00 AM – 6:30 PM |
| Closed | **Every Saturday** |

---

## Colour Palette

| Token | Hex | Usage |
|---|---|---|
| Primary | `#0891b2` | Buttons, accents, gradient |
| Background | `#f8fafc` | Page background |
| Text | `#0f172a` | Body text |
| Cyan 300 | `#67e8f9` | Highlight text |
| Teal 400 | `#2dd4bf` | Gradient end stop |
