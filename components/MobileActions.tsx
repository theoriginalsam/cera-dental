'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, X, ChevronUp } from 'lucide-react'

export default function MobileActions() {
  const [visible, setVisible]       = useState(false)
  const [expanded, setExpanded]     = useState(false)
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 120)
      setShowScroll(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      {/* ─── Mobile floating bottom tab bar (only on < lg) ─── */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="fixed bottom-0 left-0 right-0 z-50 lg:hidden mobile-bar pb-safe"
          >
            <div className="flex items-stretch h-16">

              {/* Call button */}
              <a
                href="tel:+9779846020595"
                className="flex-1 flex flex-col items-center justify-center gap-1 bg-cyan-600 text-white active:bg-cyan-700 transition-colors"
                aria-label="Call Cera Dental"
              >
                <Phone className="w-5 h-5" strokeWidth={2.5} />
                <span className="text-[10px] font-semibold tracking-wide uppercase">
                  Call Now
                </span>
              </a>

              {/* Divider */}
              <div className="w-px bg-cyan-500/40" />

              {/* WhatsApp button */}
              <a
                href="https://wa.me/9779846020595?text=Hi%20Cera%20Dental%2C%20I%20would%20like%20to%20book%20an%20appointment."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex flex-col items-center justify-center gap-1 bg-emerald-500 text-white active:bg-emerald-600 transition-colors"
                aria-label="WhatsApp Cera Dental"
              >
                <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
                <span className="text-[10px] font-semibold tracking-wide uppercase">
                  WhatsApp
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Desktop FAB (call + WhatsApp stack, bottom-right) ─── */}
      <div className="fixed bottom-6 right-5 z-50 hidden lg:flex flex-col items-end gap-3">
        {/* Scroll-to-top */}
        <AnimatePresence>
          {showScroll && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg text-slate-500 hover:text-cyan-600 hover:border-cyan-300 flex items-center justify-center transition-colors"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* WhatsApp FAB */}
        <motion.a
          href="https://wa.me/9779846020595?text=Hi%20Cera%20Dental%2C%20I%20would%20like%20to%20book%20an%20appointment."
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-13 h-13 w-14 h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-200 flex items-center justify-center text-white transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" strokeWidth={2.5} />
        </motion.a>

        {/* Call FAB */}
        <motion.a
          href="tel:+9779846020595"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-2xl bg-cyan-600 hover:bg-cyan-700 shadow-lg shadow-cyan-200 flex items-center justify-center text-white transition-colors"
          aria-label="Call the clinic"
        >
          <Phone className="w-6 h-6" strokeWidth={2.5} />
        </motion.a>
      </div>
    </>
  )
}
