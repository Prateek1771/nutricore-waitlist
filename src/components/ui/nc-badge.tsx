import type { ReactNode } from 'react'

type BadgeVariant = 'yellow' | 'lavender' | 'mint' | 'peach' | 'pink' | 'sky' | 'dark' | 'streak' | 'coral'

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  yellow:   'bg-nc-yellow   text-nc-dark',
  lavender: 'bg-nc-lavender text-nc-dark',
  mint:     'bg-nc-mint     text-nc-dark',
  peach:    'bg-nc-peach    text-nc-dark',
  pink:     'bg-nc-pink     text-nc-dark',
  sky:      'bg-nc-sky      text-nc-dark',
  dark:     'bg-nc-dark     text-white',
  streak:   'bg-nc-streak   text-white',
  coral:    'bg-nc-coral    text-white',
}

interface NcBadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  size?: 'xs' | 'sm' | 'md'
  className?: string
  dot?: boolean
}

const SIZE_CLASSES = {
  xs: 'px-2 py-0.5 text-[10px] tracking-wider',
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-1.5 text-sm',
}

export function NcBadge({ children, variant = 'mint', size = 'sm', className = '', dot }: NcBadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wide
        ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}
      `}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  )
}

export function NcEyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full
        px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium
        bg-nc-dark/8 text-nc-text-secondary
        ${className}
      `}
    >
      {children}
    </span>
  )
}
