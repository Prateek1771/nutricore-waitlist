import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { NcEyebrow } from './ui/nc-badge'
import { NcCard } from './ui/nc-card'
import { Home, Utensils, Dumbbell, Book, Trophy, User } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const pages = [
  {
    name: 'Dashboard',
    desc: 'Your daily nutrition overview — calories, macros, streak, upcoming meals, and quick actions all in one glance.',
    img: '/illustrations/dashboard_iso.png',
    accent: 'bg-nc-yellow',
    Icon: Home,
  },
  {
    name: 'Food & Diet',
    desc: 'Full 7-day meal plan with Indian foods. Log meals via photo or voice. Real-time macro tracking.',
    img: '/illustrations/food_diet_iso.png',
    accent: 'bg-nc-mint',
    Icon: Utensils,
  },
  {
    name: 'Workout',
    desc: 'Daily exercise plan with GIF demonstrations. Mark sets complete. Progressive overload built in.',
    img: '/illustrations/workout_iso.png',
    accent: 'bg-nc-peach',
    Icon: Dumbbell,
  },
  {
    name: 'Journal',
    desc: 'Daily check-ins, mood tracking, and body stats. Helps the AI refine your plan every 15 days.',
    img: '/illustrations/journal_iso.png',
    accent: 'bg-nc-lavender',
    Icon: Book,
  },
  {
    name: 'Rewards',
    desc: 'Streak milestones, badges, and community leaderboard. Gamified health that keeps you coming back.',
    img: '/illustrations/rewards_iso.png',
    accent: 'bg-nc-pink',
    Icon: Trophy,
  },
  {
    name: 'Profile',
    desc: 'Your body stats, goal history, plan timeline, and subscription. Everything personal in one place.',
    img: '/illustrations/profile_iso.png',
    accent: 'bg-nc-sky',
    Icon: User,
  },
]

export default function PagesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const cards = sectionRef.current?.querySelectorAll('.page-card')
    if (!cards) return
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: (i % 3) * 0.12,
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
    <section ref={sectionRef} id="pages" className="py-32 bg-nc-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <NcEyebrow className="mb-4">App Pages</NcEyebrow>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-nc-text leading-[1.1] tracking-tight">
            Six powerful pages,<br />one seamless experience
          </h2>
          <p className="mt-4 text-nc-text-secondary text-base leading-relaxed max-w-xl">
            Each page is purpose-built. Clean, warm, and fast — designed to feel like a coach in your pocket, not another app you'll abandon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pages.map((page) => (
            <div key={page.name} className="page-card group">
              <NcCard padding="p-0" className="flex flex-col overflow-hidden">
                {/* Image placeholder / illustration */}
                <div className={`relative aspect-[4/3] w-full ${page.accent} overflow-hidden`}>
                  <img
                    src={page.img}
                    alt={page.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const t = e.currentTarget
                      t.style.display = 'none'
                      const parent = t.parentElement
                      if (parent) {
                        parent.innerHTML = `<div class="w-full h-full flex items-center justify-center"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-black/20"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></div>`
                      }
                    }}
                  />
                </div>
                {/* Text */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2 text-nc-text">
                    <page.Icon size={18} strokeWidth={2.5} />
                    <h3 className="font-semibold text-sm">{page.name}</h3>
                  </div>
                  <p className="text-xs text-nc-text-secondary leading-relaxed">{page.desc}</p>
                </div>
              </NcCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
