import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cera Dental Clinic | Crafting Confident Smiles',
  description:
    'Cera Dental Clinic in Nayabazar, Pokhara. Dental care for adults and children, with general, restorative, aesthetic and specialist services. Open every day, 9 AM–7 PM.',
  keywords: [
    'Cera Dental Clinic',
    'Dental Clinic Pokhara',
    'Dentist Nayabazar Pokhara',
    'Root Canal Pokhara',
    'Dental Implants Pokhara',
    'Braces and Aligners Pokhara',
    'Teeth Whitening Pokhara',
    'Paediatric Dentist Pokhara',
    'Oral and Maxillofacial Surgery Pokhara',
  ],
  authors: [{ name: 'Cera Dental Clinic' }],
  creator: 'Cera Dental Clinic',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Cera Dental Clinic | Crafting Confident Smiles',
    description:
      'Thoughtful dental care in Pokhara. Visit us at Pokhara-8, Nayabazar, Nepal — open every day, 9 AM–7 PM.',
    siteName: 'Cera Dental Clinic',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cera Dental Clinic | Crafting Confident Smiles',
    description:
      'Comprehensive dental care for adults and children in Nayabazar, Pokhara.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: '/favicon.ico',      sizes: '16x16 32x32', type: 'image/x-icon' },
      { url: '/favicon-32.png',   sizes: '32x32',       type: 'image/png' },
      { url: '/favicon-192.png',  sizes: '192x192',     type: 'image/png' },
      { url: '/favicon-512.png',  sizes: '512x512',     type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
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
