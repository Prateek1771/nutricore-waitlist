import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface NcCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: string
}

export function NcCard({ children, className = '', hover = true, padding = 'p-6' }: NcCardProps) {
  return (
    <div className="p-1.5 rounded-[calc(1.5rem+6px)] bg-black/[0.025] ring-1 ring-black/[0.04] h-full">
      <motion.div
        className={`rounded-nc-lg bg-nc-surface h-full ${padding} ${className}`}
        style={{ boxShadow: 'var(--shadow-nc-card)' }}
        whileHover={hover ? { y: -2 } : undefined}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        onHoverStart={(e) => {
          if (hover && e.currentTarget instanceof HTMLElement) {
            e.currentTarget.style.boxShadow = 'var(--shadow-nc-elevated)'
          }
        }}
        onHoverEnd={(e) => {
          if (e.currentTarget instanceof HTMLElement) {
            e.currentTarget.style.boxShadow = 'var(--shadow-nc-card)'
          }
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export type AccentColor = 'yellow' | 'lavender' | 'mint' | 'peach' | 'pink' | 'sky'

const FILL_BG: Record<AccentColor, string> = {
  yellow:   'bg-nc-yellow',
  lavender: 'bg-nc-lavender',
  mint:     'bg-nc-mint',
  peach:    'bg-nc-peach',
  pink:     'bg-nc-pink',
  sky:      'bg-nc-sky',
}

interface NcCardFillProps {
  children: ReactNode
  accent: AccentColor
  className?: string
  padding?: string
}

export function NcCardFill({ children, accent, className = '', padding = 'p-6' }: NcCardFillProps) {
  return (
    <div className="p-1.5 rounded-[calc(1.5rem+6px)] bg-black/[0.025] ring-1 ring-black/[0.04] h-full">
      <motion.div
        className={`rounded-nc-lg h-full ${padding} ${FILL_BG[accent]} ${className}`}
        whileHover={{ y: -2, scale: 1.004 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

interface NcCardHeroProps {
  children: ReactNode
  className?: string
}

export function NcCardHero({ children, className = '' }: NcCardHeroProps) {
  return (
    <div className="p-2 rounded-[calc(2rem+8px)] bg-black/[0.025] ring-1 ring-black/[0.04] h-full">
      <div
        className={`rounded-nc-xl bg-nc-surface h-full p-6 md:p-8 ${className}`}
        style={{ boxShadow: 'var(--shadow-nc-card)' }}
      >
        {children}
      </div>
    </div>
  )
}
