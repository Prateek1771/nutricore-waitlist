import { useEffect, useState } from 'react'
import { Leaf } from 'lucide-react'
import { motion } from 'framer-motion'
import { NcButtonPrimary } from './ui/nc-button'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'App Pages', href: '#pages' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Waitlist', href: '#waitlist' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-nc-bg/80 backdrop-blur-xl border-b border-black/[0.06] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" aria-label="NutriCore home" className="flex items-center gap-2 group">
          <span className="w-7 h-7 rounded-lg bg-nc-dark flex items-center justify-center transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
            <Leaf size={14} fill="currentColor" className="text-white transition-colors duration-300 group-hover:text-nc-mint" />
          </span>
          <span className="font-semibold text-nc-text text-sm tracking-tight">NutriCore</span>
        </a>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-1.5 text-sm text-nc-text-secondary hover:text-nc-text rounded-full hover:bg-black/5 transition-all duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <NcButtonPrimary size="sm" onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}>
          Join Waitlist
        </NcButtonPrimary>
      </div>
    </motion.nav>
  )
}
