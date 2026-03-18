import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cera Dental Clinic | Best Dental Clinic in Pokhara, Nepal',
  description:
    'Advanced dental care in the heart of Pokhara. State-of-the-art technology & painless procedures. Root Canal, Implants, Smile Design & more. Open Sun–Fri, 9AM–6:30PM.',
  keywords: [
    'Best Dental Clinic in Pokhara',
    'Dental Care Pokhara',
    'Cera Dental Clinic',
    'Root Canal Pokhara',
    'Dental Implants Nepal',
    'Cosmetic Dentist Pokhara',
    'Pediatric Dentist Nepal',
    'Teeth Whitening Pokhara',
    'Invisalign Pokhara',
    'Oral Surgeon Nepal',
  ],
  authors: [{ name: 'Cera Dental Clinic' }],
  creator: 'Cera Dental Clinic',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Cera Dental Clinic | Best Dental Clinic in Pokhara',
    description:
      'Advanced dental care with state-of-the-art technology & painless procedures. Visit us at Nayabazar Rd, Pokhara 33700, Nepal.',
    siteName: 'Cera Dental Clinic',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cera Dental Clinic | Best Dental Clinic in Pokhara',
    description:
      'Advanced dental care with state-of-the-art technology & painless procedures in Pokhara, Nepal.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  )
}
