import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { NcEyebrow } from './ui/nc-badge'
import { NcCard } from './ui/nc-card'
import { Home, Utensils, Dumbbell, Book, Trophy, User, ImageOff } from 'lucide-react'

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
    desc: 'Daily exercise plan with GIFs. Mark sets complete. Progressive overload built in.',
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
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set())

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
                  {brokenImages.has(page.img) ? (
                    <div className="w-full h-full flex items-center justify-center" aria-label={`${page.name} illustration unavailable`}>
                      <ImageOff size={48} className="text-black/20" strokeWidth={1.5} />
                    </div>
                  ) : (
                    <img
                      src={page.img}
                      alt={`NutriCore ${page.name} app screen`}
                      width="800"
                      height="600"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      onError={() => setBrokenImages(prev => new Set(prev).add(page.img))}
                    />
                  )}
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
