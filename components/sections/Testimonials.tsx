'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const REVIEWS = [
  {
    name: 'Priya Sharma',
    location: 'Pokhara',
    initials: 'PS',
    color: 'bg-cyan-600',
    rating: 5,
    title: 'Root Canal With Zero Pain — I Promise!',
    text: 'I had been avoiding an RCT for two years out of fear. Dr. Joshi spent 10 minutes explaining exactly what he would do before he even touched my mouth. The procedure was completely painless — I kept waiting for it to hurt and it never did. The clinic is immaculately clean and smells nothing like a typical dental clinic. Highly recommend!',
    date: 'March 2024',
    treatment: 'Root Canal Therapy',
  },
  {
    name: 'Ramesh K.',
    location: 'Lakeside, Pokhara',
    initials: 'RK',
    color: 'bg-violet-600',
    rating: 5,
    title: 'My Son Actually Looks Forward to Visits Now',
    text: "Dr. Kevin is nothing short of a miracle worker. My 7-year-old used to scream just hearing the word 'dentist'. After just two visits with Dr. Kevin, he now asks when he can go back. The reception area has tablets and cartoons — it's designed for kids. The staff are endlessly patient. This place changed our family's relationship with dental care.",
    date: 'January 2024',
    treatment: 'Pediatric Dentistry',
  },
  {
    name: 'Anita Gurung',
    location: 'Pokhara',
    initials: 'AG',
    color: 'bg-emerald-600',
    rating: 5,
    title: 'Smile Design That Changed My Confidence',
    text: "Dr. Sunita showed me a digital preview of my new smile before we started a single thing. I cried — in the best way. The veneers look completely natural. Colleagues keep asking if I've done something different but can't quite put a finger on it. The entire team is warm, professional and the clinic is spotlessly clean. Worth every paisa.",
    date: 'February 2024',
    treatment: 'Smile Design / Veneers',
  },
  {
    name: 'Suresh B.',
    location: 'Birauta, Pokhara',
    initials: 'SB',
    color: 'bg-amber-500',
    rating: 5,
    title: "Best Dental Experience I've Ever Had",
    text: "I came in for a routine check-up and left with a completely new understanding of my oral health. Dr. Joshi showed me a live intraoral camera feed and explained everything in simple language. No unnecessary upselling, just honest advice. The digital X-ray was instant and the whole visit took under an hour. This is how dentistry should be.",
    date: 'April 2024',
    treatment: 'Comprehensive Check-up',
  },
  {
    name: 'Deepa M.',
    location: 'Mahendrapul, Pokhara',
    initials: 'DM',
    color: 'bg-rose-500',
    rating: 5,
    title: 'Whitening Results Were Jaw-Dropping',
    text: 'I was sceptical about the LED whitening — I\'ve tried strips before with disappointing results. But after 60 minutes in the chair with Dr. Sunita, my teeth were genuinely 7 shades lighter. The take-home kit maintained the results beautifully. The clinic feels more like a luxury spa than a dentist. Already booked my next appointment.',
    date: 'March 2024',
    treatment: 'Professional Teeth Whitening',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
        />
      ))}
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Overall rating banner */}
        <div className="flex flex-col items-center gap-2 mb-12">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-7 h-7 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-3xl font-extrabold text-slate-900">4.9 out of 5</p>
          <p className="text-slate-500 text-sm">Based on 320+ verified patient reviews</p>
        </div>

        <SectionHeader
          eyebrow="Patient Stories"
          title="What Our Patients"
          titleHighlight="Say"
          description="Real reviews from real patients — unedited and straight from our Google & Facebook pages."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {REVIEWS.map((review) => (
            <motion.div
              key={review.name}
              variants={cardVariants}
              className="bento-card bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col gap-4 cursor-default"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      {review.name}
                    </p>
                    <p className="text-slate-400 text-xs">{review.location}</p>
                  </div>
                </div>
                <Quote className="w-6 h-6 text-cyan-200 shrink-0" />
              </div>

              {/* Stars + treatment */}
              <div className="flex items-center justify-between">
                <StarRating rating={review.rating} />
                <span className="text-xs text-slate-400">{review.date}</span>
              </div>

              {/* Title */}
              <h4 className="font-bold text-slate-800 text-sm leading-snug">
                &ldquo;{review.title}&rdquo;
              </h4>

              {/* Body */}
              <p className="text-slate-500 text-sm leading-relaxed flex-1">
                {review.text}
              </p>

              {/* Treatment tag */}
              <span className="self-start text-xs font-medium text-cyan-700 bg-cyan-50 border border-cyan-100 px-2.5 py-1 rounded-lg">
                {review.treatment}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Leave a review */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center"
        >
          <div className="glass border border-cyan-100 rounded-2xl px-8 py-5 text-center max-w-md">
            <p className="text-slate-600 text-sm mb-3">
              Had a great experience? Help others find us!
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-cyan-300 text-slate-700 hover:text-cyan-700 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-md"
            >
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              Write a Google Review
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
