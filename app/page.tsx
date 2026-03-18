import Navigation from '@/components/sections/Navigation'
import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import Services from '@/components/sections/Services'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Doctors from '@/components/sections/Doctors'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import Footer from '@/components/sections/Footer'
import MobileActions from '@/components/MobileActions'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <WhyChooseUs />
        <Doctors />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <MobileActions />
    </>
  )
}
