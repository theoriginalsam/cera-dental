'use client'

import SectionHeader from '@/components/ui/SectionHeader'
import DoctorCard from '@/components/ui/DoctorCard'

const DOCTORS = [
  {
    name: 'Dr. Shisham Khanal',
    title: 'BDS (NMC, KU)',
    registration: 'NMC No. 37766',
    initials: 'SK',
    color: 'bg-cyan-600',
  },
  {
    name: 'Dr. Prakash Kafle',
    title: 'BDS (BPKIHS)',
    registration: 'NMC No. 32537',
    initials: 'PK',
    color: 'bg-rose-500',
  },
  {
    name: 'Dr. Anjal GC',
    title: 'BDS, MDS (Orthodontics)',
    registration: 'NMC No. 23434',
    initials: 'AG',
    color: 'bg-violet-600',
  },
  {
    name: 'Dr. Suresh Bhandari',
    title: 'BDS, MDS (Periodontology and Oral Implantology)',
    registration: 'NMC No. 22222',
    initials: 'SB',
    color: 'bg-emerald-600',
  },
  {
    name: 'Dr. Yashuma Tiwari',
    title: 'BDS, MDS (Oral and Maxillofacial Surgery)',
    registration: 'NMC No. 24367',
    initials: 'YT',
    color: 'bg-amber-500',
  },
]

export default function Doctors() {
  return (
    <section id="team" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Meet Our Dental Team"
          title="People behind"
          titleHighlight="your smile."
          description="Our dental team includes general and specialist dental professionals."
        />

        {/* Flex-wrap so the last row of the 5 cards stays centred */}
        <div className="flex flex-wrap justify-center gap-6">
          {DOCTORS.map((doctor, i) => (
            <div
              key={doctor.name}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <DoctorCard {...doctor} index={i} />
            </div>
          ))}
        </div>

        {/* Schedule note */}
        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm">
            Specialist consultations are available on selected days;{' '}
            <span className="text-slate-600 font-medium">
              please contact us to confirm the schedule.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
