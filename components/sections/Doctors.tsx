'use client'

import SectionHeader from '@/components/ui/SectionHeader'
import DoctorCard from '@/components/ui/DoctorCard'

const DOCTORS = [
  {
    name: 'Dr. Aarav Joshi',
    title: 'BDS, MDS (Oral Surgery)',
    specialty: 'Oral & Maxillofacial Surgeon',
    experience: '12+ years experience',
    qualifications: ['MDS Oral Surgery', 'AO Trauma Fellow', 'FNANS Member'],
    bio:
      'Dr. Joshi is one of the most sought-after oral surgeons in the Gandaki Province. He specialises in wisdom tooth extraction, jaw corrections, facial trauma reconstruction, and implant placements using guided surgery protocols. He trained at BPKIHS and completed an advanced fellowship in Singapore.',
    initials: 'AJ',
    color: 'bg-cyan-600',
  },
  {
    name: 'Dr. Sunita Thapa',
    title: 'BDS, Certificate Invisalign Specialist',
    specialty: 'Cosmetic Dentist & Invisalign Specialist',
    experience: '9 years experience',
    qualifications: ['Invisalign Certified', 'AACD Associate', 'Smile Design Expert'],
    bio:
      'Dr. Thapa has transformed thousands of smiles across Nepal and is the clinic\'s lead aesthetic dentist. Her expertise spans composite bonding, porcelain veneers, digital smile design, and full-arch Invisalign. She believes every patient deserves a smile they\'re proud to show the world.',
    initials: 'ST',
    color: 'bg-violet-600',
  },
  {
    name: 'Dr. Kevin Pradhan',
    title: 'BDS, MDS (Pedodontics)',
    specialty: 'Pediatric Dentist & Specialist in Anxious Patients',
    experience: '7 years experience',
    qualifications: ['MDS Pedodontics', 'IAPD Member', 'Happy Gas Certified'],
    bio:
      "Dr. Kevin's gentle manner has made him the favourite dentist for children and adults who experience dental anxiety throughout Pokhara. He uses a tell-show-do approach, distraction therapy, and when needed, conscious sedation to ensure every visit feels safe. He is also trained in Special Needs dentistry.",
    initials: 'KP',
    color: 'bg-emerald-600',
  },
]

export default function Doctors() {
  return (
    <section id="doctors" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Meet the Team"
          title="Our Expert"
          titleHighlight="Doctors"
          description="Board-certified specialists with combined experience of 28+ years. Real people who genuinely care about your oral health."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DOCTORS.map((doctor, i) => (
            <DoctorCard key={doctor.name} {...doctor} index={i} />
          ))}
        </div>

        {/* Accreditation note */}
        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm">
            All doctors are registered with the{' '}
            <span className="text-slate-600 font-medium">
              Nepal Dental Association (NDA)
            </span>{' '}
            and participate in annual continuing education programmes.
          </p>
        </div>
      </div>
    </section>
  )
}
