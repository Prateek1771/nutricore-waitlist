import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { NcEyebrow } from './ui/nc-badge'
import { NcCard } from './ui/nc-card'

gsap.registerPlugin(ScrollTrigger)

const problems = [
  {
    num: '01',
    title: 'Eating out every day — no idea what\'s healthy',
    body: 'Most Indians eat from Swiggy or dhabas regularly. No app tells you which order actually fits your body goals.',
    accent: 'bg-nc-yellow',
  },
  {
    num: '02',
    title: 'No personalized plan — generic diets don\'t work',
    body: 'Diet apps abroad are built for Western food. Indian food databases are missing or wildly inaccurate.',
    accent: 'bg-nc-mint',
  },
  {
    num: '03',
    title: 'Dietitians cost ₹1,000–₹3,000/month',
    body: 'Professional guidance is expensive and inaccessible for students and young professionals.',
    accent: 'bg-nc-peach',
  },
  {
    num: '04',
    title: 'Logging food feels like a chore',
    body: 'Text-based logging is tedious. People quit in 3 days. Photo and voice should make it effortless.',
    accent: 'bg-nc-lavender',
  },
]

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const items = sectionRef.current?.querySelectorAll('.problem-item')
    if (!items) return
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          delay: i * 0.1,
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    const heading = sectionRef.current?.querySelector('.problem-heading')
    if (heading) gsap.fromTo(
      heading,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="problem" className="py-32 bg-nc-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="problem-heading mb-16 max-w-2xl">
          <NcEyebrow className="mb-4">The Problem</NcEyebrow>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-nc-text leading-[1.1] tracking-tight">
            Why India needs a<br />smarter nutrition app
          </h2>
          <p className="mt-4 text-nc-text-secondary text-base leading-relaxed">
            Current tools are built for the West. Indian users are underserved — expensive professionals, inaccurate databases, and generic plans that don't stick.
          </p>
        </div>

        <div className="space-y-4">
          {problems.map((p) => (
            <div key={p.num} className="problem-item">
              <NcCard padding="p-6">
                <div className="flex items-start gap-6">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-nc-md flex items-center justify-center ${p.accent}`}>
                    <span className="text-xs font-bold text-nc-dark/60 font-mono">{p.num}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-nc-text text-base md:text-lg mb-1.5">{p.title}</h3>
                    <p className="text-sm text-nc-text-secondary leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </NcCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
