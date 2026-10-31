import Navigation from '@/components/sections/Navigation'
import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Doctors from '@/components/sections/Doctors'
import Booking from '@/components/sections/Booking'
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
        <About />
        <Services />
        <WhyChooseUs />
        <Doctors />
        <Booking />
        <FAQ />
      </main>
      <Footer />
      <MobileActions />
    </>
  )
}
