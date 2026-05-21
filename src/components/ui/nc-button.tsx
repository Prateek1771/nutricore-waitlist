import type { ReactNode, ButtonHTMLAttributes } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  trailingArrow?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const SIZE = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export function NcButtonPrimary({ children, trailingArrow, size = 'md', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`
        group inline-flex items-center gap-2 rounded-full font-semibold cursor-pointer
        bg-nc-dark text-white
        transition-all duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)]
        hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(0,0,0,0.18)]
        active:scale-[0.98]
        ${SIZE[size]} ${className}
      `}
      {...props}
    >
      <span>{children}</span>
      {trailingArrow && (
        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center
                         transition-transform duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)]
                         group-hover:translate-x-0.5 group-hover:-translate-y-px">
          <ArrowUpRight size={12} weight="bold" />
        </span>
      )}
    </button>
  )
}

export function NcButtonCoral({ children, trailingArrow, size = 'md', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`
        group inline-flex items-center gap-2 rounded-full font-semibold cursor-pointer
        bg-nc-coral text-white
        transition-all duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)]
        hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(244,132,95,0.3)]
        active:scale-[0.98]
        ${SIZE[size]} ${className}
      `}
      {...props}
    >
      <span>{children}</span>
      {trailingArrow && (
        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <ArrowUpRight size={12} weight="bold" />
        </span>
      )}
    </button>
  )
}

export function NcButtonAccent({ children, size = 'md', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center gap-2 rounded-full font-semibold cursor-pointer
        bg-nc-yellow text-nc-dark
        transition-all duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)]
        hover:bg-nc-yellow-dark hover:-translate-y-px
        active:scale-[0.98]
        ${SIZE[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export function NcButtonSecondary({ children, size = 'md', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center gap-2 rounded-full font-semibold cursor-pointer
        bg-transparent border border-black/20 text-nc-text
        transition-all duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)]
        hover:border-black/40 hover:bg-black/5 hover:-translate-y-px
        active:scale-[0.98]
        ${SIZE[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
