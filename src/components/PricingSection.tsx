import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Check, X } from 'lucide-react'
import { NcEyebrow } from './ui/nc-badge'
import { NcCard } from './ui/nc-card'

gsap.registerPlugin(ScrollTrigger)

const freeTier = [
  { label: 'Basic meal suggestions', included: true },
  { label: 'Manual food logging', included: true },
  { label: 'Step counter', included: true },
  { label: 'AI personalized plan', included: false },
  { label: 'Swiggy integration', included: false },
  { label: 'Photo / voice logging', included: false },
  { label: 'Streak rewards', included: false },
]

const proTier = [
  { label: 'AI personalized 7-day meal plan', included: true },
  { label: 'AI exercise plan with GIFs', included: true },
  { label: 'Food photo & voice logging', included: true },
  { label: 'Swiggy & Instamart integration', included: true },
  { label: 'Streak rewards & community', included: true },
  { label: '15-day body check & plan refresh', included: true },
  { label: 'Priority support', included: true },
]

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.pricing-card')
    if (!cards?.length) return
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="pricing" className="py-32 bg-nc-surface-deep">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <NcEyebrow className="mb-4">Pricing</NcEyebrow>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-nc-text leading-[1.1] tracking-tight">
            Less than one Swiggy order<br />
            <span className="text-nc-text-secondary">per month</span>
          </h2>
          <p className="mt-4 text-nc-text-secondary text-base max-w-lg mx-auto">
            Cheaper than a single dietitian session. NutriCore gives you full personalization every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Free */}
          <div className="pricing-card">
            <NcCard padding="p-7">
              <p className="text-xs uppercase tracking-widest text-nc-text-muted font-medium mb-1">Free</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="font-serif text-4xl font-bold text-nc-text">₹0</span>
                <span className="text-sm text-nc-text-muted mb-1">/month</span>
              </div>
              <p className="text-xs text-nc-text-muted mb-6">Get started, no credit card</p>
              <ul className="space-y-3">
                {freeTier.map((item) => (
                  <li key={item.label} className="flex items-center gap-3">
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${item.included ? 'bg-nc-mint' : 'bg-black/8'}`}>
                      {item.included
                        ? <Check size={12} strokeWidth={3} className="text-nc-dark" />
                        : <X size={12} strokeWidth={3} className="text-nc-text-muted" />
                      }
                    </span>
                    <span className={`text-sm ${item.included ? 'text-nc-text' : 'text-nc-text-muted line-through'}`}>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </NcCard>
          </div>

          {/* Pro */}
          <div className="pricing-card p-2 rounded-[calc(2rem+8px)] bg-nc-dark ring-2 ring-nc-dark">
            <div className="rounded-nc-xl bg-nc-dark p-7 h-full relative overflow-hidden">
              {/* Glow */}
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-nc-yellow/20 blur-2xl pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs uppercase tracking-widest text-white/50 font-medium">Pro</p>
                  <span className="px-2 py-0.5 rounded-full bg-nc-yellow text-nc-dark text-[10px] font-bold uppercase tracking-wide">Popular</span>
                </div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="font-serif text-4xl font-bold text-white">₹350</span>
                  <span className="text-sm text-white/50 mb-1">/month</span>
                </div>
                <p className="text-xs text-white/40 mb-6">Full access, cancel anytime</p>
                <ul className="space-y-3">
                  {proTier.map((item) => (
                    <li key={item.label} className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-nc-yellow">
                        <Check size={12} strokeWidth={3} className="text-nc-dark" />
                      </span>
                      <span className="text-sm text-white/80">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Family */}
          <div className="pricing-card">
            <NcCard padding="p-7" className="bg-white/40 backdrop-blur-md border border-white/60">
              <p className="text-xs uppercase tracking-widest text-nc-text-muted font-medium mb-1">Family</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="font-serif text-4xl font-bold text-nc-text">₹800</span>
                <span className="text-sm text-nc-text-muted mb-1">/month</span>
              </div>
              <p className="text-xs text-nc-text-muted mb-6">For you and up to 4 members</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Everything in Pro',
                  'Up to 5 individual profiles',
                  'Shared grocery lists',
                  'Family streak challenges',
                  'Dedicated dietician support'
                ].map((label) => (
                  <li key={label} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-nc-lavender">
                      <Check size={12} strokeWidth={3} className="text-nc-dark" />
                    </span>
                    <span className="text-sm text-nc-text">{label}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-3 rounded-full border-2 border-nc-dark text-sm font-semibold text-nc-dark hover:bg-nc-dark hover:text-white transition-colors"
              >
                Join Waitlist
              </button>
            </NcCard>
          </div>
        </div>

        <p className="text-center text-xs text-nc-text-muted mt-8">
          Pricing is indicative for the MVP launch in India. Subject to change based on feedback.
        </p>
      </div>
    </section>
  )
}
