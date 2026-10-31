'use client'

import SectionHeader from '@/components/ui/SectionHeader'
import DoctorCard from '@/components/ui/DoctorCard'

const DOCTORS = [
  {
    name: 'Dr. Shisham Khanal',
    title: 'BDS · Medical Officer',
    specialty: 'Aesthetic Dentistry',
    registration: 'NMC Registration No. 37766',
    experience: "3 years' experience",
    initials: 'SK',
    color: 'bg-cyan-600',
  },
  {
    name: 'Dr. Anjal GC',
    title: 'BDS, MDS',
    specialty: 'Consultant Orthodontics, Braces and Aligner Specialist',
    registration: 'NMC Registration No. 23434',
    initials: 'AG',
    color: 'bg-violet-600',
  },
  {
    name: 'Dr. Suresh Bhandari',
    title: 'BDS, MDS',
    specialty: 'Consultant Periodontology and Oral Implantology',
    initials: 'SB',
    color: 'bg-emerald-600',
  },
  {
    name: 'Dr. Yashuma Tiwari',
    title: 'BDS, MDS',
    specialty: 'Consultant Oral and Maxillofacial Surgery',
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DOCTORS.map((doctor, i) => (
            <DoctorCard key={doctor.name} {...doctor} index={i} />
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
