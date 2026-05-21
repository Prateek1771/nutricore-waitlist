import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import {
  Utensils, Dumbbell, Camera, Zap, Store, RefreshCw, Mic
} from 'lucide-react'
import type { ElementType } from 'react'
import { NcCardFill, type AccentColor } from './ui/nc-card'
import { NcEyebrow } from './ui/nc-badge'

gsap.registerPlugin(ScrollTrigger)

interface Feature {
  Icon: ElementType
  accent: AccentColor
  title: string
  body: string
  span: string
}

const features: Feature[] = [
  {
    Icon: Utensils,
    accent: 'yellow',
    title: 'Personalized Diet Plans',
    body: '7-day Indian meal plans with calories and ₹ cost per meal. Dal, Idli, Ragi, Paneer — your culture, your macros.',
    span: 'col-span-12 md:col-span-7',
  },
  {
    Icon: Mic,
    accent: 'sky',
    title: 'Kannada & Hindi Voice Log',
    body: 'Say "I had Ragi Mudde and Sambar" and our AI logs the exact macros instantly. No manual typing required.',
    span: 'col-span-12 md:col-span-5',
  },
  {
    Icon: Store,
    accent: 'mint',
    title: '1-Tap Instamart & Swiggy',
    body: 'Turn your weekly plan into an Instamart grocery cart with one tap, or get Swiggy picks that fit your calorie budget.',
    span: 'col-span-12 md:col-span-7',
  },
  {
    Icon: Zap,
    accent: 'peach',
    title: 'Streaks & Cheat Meals',
    body: 'Hit a 30-day streak, earn a guilt-free cheat meal. Our AI adjusts your weekly macros so you can eat pizza without ruining progress.',
    span: 'col-span-12 md:col-span-5',
  },
  {
    Icon: Camera,
    accent: 'pink',
    title: 'Food Photo AI',
    body: 'Snap a photo of your meal — NutriCore identifies it, logs the macros, and tracks your streak.',
    span: 'col-span-12 md:col-span-4',
  },
  {
    Icon: Dumbbell,
    accent: 'lavender',
    title: 'Fitness Plans',
    body: 'Beginner-friendly home or gym routines matched to your fitness level and goals.',
    span: 'col-span-12 md:col-span-4',
  },
  {
    Icon: RefreshCw,
    accent: 'yellow',
    title: '15-Day Full Body Check',
    body: 'Re-assess your stats every 15 days. Your plan auto-adjusts as your body and habits change.',
    span: 'col-span-12 md:col-span-4',
  },
]

gsap.registerPlugin(ScrollTrigger)

interface Feature {
  Icon: ElementType
  accent: AccentColor
  title: string
  body: string
  span: string
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.feature-card')
    if (!cards) return
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: 'power2.out',
          delay: (i % 3) * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="features" className="py-32 bg-nc-surface-deep">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16 gs-heading">
          <NcEyebrow className="mb-4">Core Features</NcEyebrow>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-nc-text leading-[1.1] tracking-tight">
            Everything you need<br />to eat and move better
          </h2>
          <p className="mt-4 text-nc-text-secondary text-base leading-relaxed max-w-xl">
            7 features designed around the real life of an Indian — budget meals, local food database, Swiggy integration, and AI that learns you.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {features.map((f) => (
            <div key={f.title} className={`feature-card ${f.span} group cursor-default`}>
              <NcCardFill accent={f.accent} padding="p-6" className="relative overflow-hidden transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="flex items-center gap-3 mb-3 transition-transform duration-300 group-hover:translate-x-1 relative z-10">
                  <div className="w-10 h-10 rounded-nc-md bg-nc-dark/8 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                    <f.Icon size={20} className="text-nc-dark" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-semibold text-nc-dark text-lg leading-tight">{f.title}</h3>
                </div>
                <p className="text-sm text-nc-dark/70 leading-relaxed relative z-10">{f.body}</p>
              </NcCardFill>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
