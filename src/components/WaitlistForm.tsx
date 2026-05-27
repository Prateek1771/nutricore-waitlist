import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Leaf, DownloadSimple, ShareNetwork } from '@phosphor-icons/react'
import confetti from 'canvas-confetti'
import html2canvas from 'html2canvas'
import { NcEyebrow } from './ui/nc-badge'
import { NcButtonPrimary } from './ui/nc-button'
import { submitFeedback } from '../lib/supabase'

gsap.registerPlugin(ScrollTrigger)

const inputCls = `
  w-full px-4 py-3 rounded-nc-md bg-nc-surface text-sm text-nc-text
  border border-black/10 focus:border-black/25 focus:outline-none
  transition-all duration-200 resize-none
  placeholder:text-nc-text-muted
`

export default function WaitlistForm() {
  const sectionRef = useRef<HTMLElement>(null)
  const ticketRef = useRef<HTMLDivElement>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [ticketNum] = useState(() => Math.floor(1000 + Math.random() * 9000))

  useGSAP(() => {
    const fields = sectionRef.current?.querySelectorAll('.form-field')
    fields?.forEach((field, i) => {
      gsap.fromTo(
        field,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          delay: i * 0.07,
          scrollTrigger: {
            trigger: field,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, { scope: sectionRef })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please enter your name and email.')
      return
    }

    setStatus('loading')
    try {
      // In the future, this could be a direct insert to a separate 'waitlist' table
      await submitFeedback({
        name,
        email,
        role: 'Waitlist User',
      } as any) // Typecast for now as we transition DB schemas
      
      setStatus('success')
      
      // Fire confetti!
      const duration = 3000
      const end = Date.now() + duration
      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#A7E4C0', '#F9D8A5']
        })
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#A7E4C0', '#F9D8A5']
        })
        if (Date.now() < end) requestAnimationFrame(frame)
      }
      frame()
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const downloadTicket = async () => {
    if (!ticketRef.current) return
    try {
      const canvas = await html2canvas(ticketRef.current, { backgroundColor: null, scale: 2 })
      const link = document.createElement('a')
      link.download = `nutricore-pass-${ticketNum}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Failed to generate ticket', err)
    }
  }

  if (status === 'success') {
    return (
      <section id="waitlist" className="py-32 bg-nc-bg relative overflow-hidden">
        <div className="max-w-md mx-auto px-6 flex flex-col items-center">
          
          <div 
            ref={ticketRef}
            className="w-full aspect-[4/5] bg-gradient-to-br from-nc-dark to-nc-text rounded-3xl p-8 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden"
          >
            {/* Ticket Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-nc-mint rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Leaf size={24} className="text-nc-mint" weight="fill" />
                <span className="font-serif font-bold text-xl tracking-tight">NutriCore</span>
              </div>
              <div className="text-right">
                <span className="text-white/50 text-xs font-mono uppercase tracking-widest block mb-1">Pass No.</span>
                <span className="font-mono font-bold text-lg">#{ticketNum}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-white/50 text-sm uppercase tracking-widest">Early Access</span>
              <h3 className="font-serif text-3xl font-bold leading-tight">
                {name}'s<br/>VIP Ticket
              </h3>
            </div>

            <div className="flex items-end justify-between border-t border-white/10 pt-4 mt-8">
              <div>
                <span className="text-white/50 text-xs block mb-1">Launch Date</span>
                <span className="font-medium">Q3 2026</span>
              </div>
              <div className="text-right">
                <span className="text-white/50 text-xs block mb-1">Status</span>
                <span className="text-nc-mint font-medium">Confirmed</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center space-y-4">
            <h2 className="font-serif text-2xl font-bold text-nc-text">You're on the list!</h2>
            <p className="text-nc-text-secondary text-sm">
              Keep an eye on your inbox. We'll be sending you a quick follow-up to hear your thoughts on pricing.
            </p>
            
            <div className="flex gap-3 justify-center pt-4">
              <button onClick={downloadTicket} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-nc-surface border border-black/10 text-sm font-semibold hover:bg-black/5 transition-colors">
                <DownloadSimple size={18} /> Download Pass
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="waitlist" className="py-32 bg-nc-bg">
      <div className="max-w-xl mx-auto px-6 text-center">
        <div className="mb-10 form-field">
          <NcEyebrow className="mb-4 mx-auto">Early Access</NcEyebrow>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-nc-text leading-[1.1] tracking-tight">
            Join the Waitlist
          </h2>
          <p className="mt-4 text-nc-text-secondary text-base leading-relaxed">
            Be the first to know when we launch and get an exclusive early-bird discount.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="form-field space-y-4">
            <div>
              <label className="block text-sm font-semibold text-nc-text mb-2">Your Name</label>
              <input
                type="text"
                placeholder="Arjun Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputCls}
                style={{ boxShadow: 'var(--shadow-nc-inset)' }}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-nc-text mb-2">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
                style={{ boxShadow: 'var(--shadow-nc-inset)' }}
              />
            </div>
          </div>

          {errorMsg && (
            <div className="px-4 py-3 rounded-nc-md bg-nc-pink border border-nc-pink-dark text-sm text-nc-dark">
              {errorMsg}
            </div>
          )}

          <div className="form-field pt-2">
            <NcButtonPrimary
              type="submit"
              size="lg"
              trailingArrow
              disabled={status === 'loading'}
              className="w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Joining...' : 'Get Early Access'}
            </NcButtonPrimary>
            <p className="text-center text-xs text-nc-text-muted mt-3">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
