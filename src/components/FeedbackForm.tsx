import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Star, CheckSquare, Square, Leaf } from '@phosphor-icons/react'
import { NcEyebrow } from './ui/nc-badge'
import { NcButtonPrimary } from './ui/nc-button'
import { submitFeedback } from '../lib/supabase'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  { key: 'diet_planner',   label: 'Diet Planner',           emoji: '🥗' },
  { key: 'fitness_planner', label: 'Fitness Planner',        emoji: '🏋️' },
  { key: 'photo_logger',   label: 'Food Photo AI Logger',    emoji: '📸' },
  { key: 'streaks',        label: 'Streaks & Rewards',       emoji: '🔥' },
  { key: 'community',      label: 'Community Showcase',      emoji: '🏆' },
  { key: 'swiggy',         label: 'Swiggy Integration',      emoji: '🛵' },
  { key: 'body_check',     label: '15-Day Body Check',       emoji: '📊' },
]

const PAGES = ['Dashboard', 'Food / Diet', 'Workout', 'Journal', 'Rewards', 'Profile']

const ROLES = ['Investor', 'Developer', 'Potential User', 'Other']

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(star)}
        >
          <Star
            size={22}
            weight={(hover || value) >= star ? 'fill' : 'regular'}
            className={(hover || value) >= star ? 'text-nc-streak' : 'text-nc-text-muted'}
          />
        </button>
      ))}
    </div>
  )
}

function ToggleChip({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
        selected
          ? 'bg-nc-dark text-white border-nc-dark'
          : 'bg-transparent text-nc-text-secondary border-black/15 hover:border-black/30 hover:bg-black/5'
      }`}
    >
      {selected ? <CheckSquare size={12} weight="fill" /> : <Square size={12} />}
      {label}
    </button>
  )
}

function FormField({ label, children, hint, required }: { label: string; children: React.ReactNode; hint?: string; required?: boolean }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-nc-text">
        {label}{required && <span className="text-nc-coral ml-0.5">*</span>}
      </label>
      {hint && <p className="text-xs text-nc-text-muted">{hint}</p>}
      {children}
    </div>
  )
}

const inputCls = `
  w-full px-4 py-3 rounded-nc-md bg-nc-surface text-sm text-nc-text
  border border-black/10 focus:border-black/25 focus:outline-none
  transition-all duration-200 resize-none
  placeholder:text-nc-text-muted
`

export default function FeedbackForm() {
  const sectionRef = useRef<HTMLElement>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [otherRole, setOtherRole] = useState('')
  const [featureRatings, setFeatureRatings] = useState<Record<string, number>>({})
  const [preferredPages, setPreferredPages] = useState<string[]>([])
  const [willBuy, setWillBuy] = useState('')
  const [priceOpinion, setPriceOpinion] = useState('')
  const [preferredFeatures, setPreferredFeatures] = useState('')
  const [niceToHave, setNiceToHave] = useState('')
  const [uiLiked, setUiLiked] = useState('')
  const [uiImprovements, setUiImprovements] = useState('')
  const [uiReferences, setUiReferences] = useState('')

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

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

  const togglePage = (p: string) =>
    setPreferredPages((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    const missing: string[] = []
    if (!name.trim())                                         missing.push('Your Name')
    if (!email.trim())                                        missing.push('Email')
    if (!role)                                                missing.push('I am a...')
    if (role === 'Other' && !otherRole.trim())               missing.push('Please specify your profession')
    if (FEATURES.some((f) => !featureRatings[f.key]))        missing.push('Feature ratings (rate all 7)')
    if (preferredPages.length === 0)                          missing.push('App pages (pick at least one)')
    if (!willBuy)                                             missing.push('Would you pay ₹350/month?')
    if (!priceOpinion.trim())                                 missing.push('Price that feels right')
    if (!preferredFeatures.trim())                            missing.push('Features that matter most')
    if (!niceToHave.trim())                                   missing.push('Nice-to-have features')
    if (!uiLiked)                                             missing.push('Did you like the design?')
    if (!uiImprovements.trim())                               missing.push('UI improvements')
    if (!uiReferences.trim())                                 missing.push('Reference apps')

    if (missing.length > 0) {
      setErrorMsg('Please complete: ' + missing.join(', '))
      return
    }

    setStatus('loading')
    try {
      await submitFeedback({
        name,
        email,
        role: role === 'Other' ? otherRole.trim() : role,
        feature_ratings: featureRatings,
        preferred_pages: preferredPages,
        will_buy: willBuy,
        price_opinion: priceOpinion,
        preferred_features: preferredFeatures,
        nice_to_have: niceToHave,
        ui_liked: uiLiked,
        ui_improvements: uiImprovements,
        ui_references: uiReferences,
      })
      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <section id="feedback" className="py-32 bg-nc-bg">
        <div className="max-w-lg mx-auto px-6 text-center flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-nc-mint flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
            <Leaf size={28} weight="fill" className="text-nc-dark" />
          </div>
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-nc-text mb-3">
              {name ? `Thank you, ${name.split(' ')[0]}!` : 'Thank you!'}
            </h2>
            <p className="text-nc-text-secondary text-base leading-relaxed">
              Your response has been recorded and will directly shape NutriCore.
              We'll reach out as we move toward our India launch. 🌱
            </p>
          </div>
          <div className="w-12 h-px bg-nc-text-muted/30" />
          <p className="text-xs text-nc-text-muted">Submitted · NutriCore MVP Q3 2026</p>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="feedback" className="py-32 bg-nc-bg">
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-12 form-field">
          <NcEyebrow className="mb-4">Feedback</NcEyebrow>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-nc-text leading-[1.1] tracking-tight">
            Help shape NutriCore
          </h2>
          <p className="mt-4 text-nc-text-secondary text-base leading-relaxed">
            Your input directly refines the product. Takes 3 minutes — means everything to us.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Identity */}
          <div className="form-field p-6 rounded-nc-xl border border-black/[0.06] bg-nc-surface/50 space-y-5">
            <h3 className="text-xs uppercase tracking-widest text-nc-text-muted font-medium">About You</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Your Name" required>
                <input
                  type="text"
                  placeholder="Prateek Hitli"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCls}
                  style={{ boxShadow: 'var(--shadow-nc-inset)' }}
                />
              </FormField>
              <FormField label="Email" required>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                  style={{ boxShadow: 'var(--shadow-nc-inset)' }}
                />
              </FormField>
            </div>
            <FormField label="I am a..." required>
              <div className="flex flex-wrap gap-2 mt-1">
                {ROLES.map((r) => (
                  <ToggleChip
                    key={r}
                    label={r}
                    selected={role === r}
                    onClick={() => { setRole(r); if (r !== 'Other') setOtherRole('') }}
                  />
                ))}
              </div>
              {role === 'Other' && (
                <input
                  type="text"
                  placeholder="Tell us your profession..."
                  value={otherRole}
                  onChange={(e) => setOtherRole(e.target.value)}
                  className={inputCls}
                  style={{ boxShadow: 'var(--shadow-nc-inset)' }}
                />
              )}
            </FormField>
          </div>

          {/* Q1 — Feature ratings */}
          <div className="form-field p-6 rounded-nc-xl border border-black/[0.06] bg-nc-surface/50 space-y-5">
            <h3 className="text-xs uppercase tracking-widest text-nc-text-muted font-medium">
              1. Rate each feature (1 = Not interested, 5 = Must have) <span className="text-nc-coral">*</span>
            </h3>
            <div className="space-y-4">
              {FEATURES.map((f) => (
                <div key={f.key} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-nc-text flex items-center gap-2">
                    <span>{f.emoji}</span> {f.label}
                  </span>
                  <StarRating
                    value={featureRatings[f.key] ?? 0}
                    onChange={(v) => setFeatureRatings((prev) => ({ ...prev, [f.key]: v }))}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Q2 — Preferred pages */}
          <div className="form-field p-6 rounded-nc-xl border border-black/[0.06] bg-nc-surface/50 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-nc-text-muted font-medium">
              2. Which app pages excite you most? <span className="text-nc-coral">*</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {PAGES.map((p) => (
                <ToggleChip key={p} label={p} selected={preferredPages.includes(p)} onClick={() => togglePage(p)} />
              ))}
            </div>
          </div>

          {/* Q3 — Pricing */}
          <div className="form-field p-6 rounded-nc-xl border border-black/[0.06] bg-nc-surface/50 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-nc-text-muted font-medium">
              3. Would you pay ₹350/month for full access? <span className="text-nc-coral">*</span>
            </h3>
            <div className="flex gap-3 flex-wrap">
              {['Yes', 'No', 'Maybe'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setWillBuy(opt.toLowerCase())}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                    willBuy === opt.toLowerCase()
                      ? opt === 'Yes' ? 'bg-nc-mint border-nc-mint-dark text-nc-dark' : opt === 'No' ? 'bg-nc-pink border-nc-pink-dark text-nc-dark' : 'bg-nc-yellow border-nc-yellow-dark text-nc-dark'
                      : 'bg-transparent border-black/15 text-nc-text-secondary hover:border-black/30'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <FormField label="What price feels right to you?" required>
              <input
                type="text"
                placeholder="e.g. ₹99/month, ₹200/month, ₹999/year..."
                value={priceOpinion}
                onChange={(e) => setPriceOpinion(e.target.value)}
                className={inputCls}
                style={{ boxShadow: 'var(--shadow-nc-inset)' }}
              />
            </FormField>
          </div>

          {/* Q4 — Preferred features */}
          <div className="form-field p-6 rounded-nc-xl border border-black/[0.06] bg-nc-surface/50 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-nc-text-muted font-medium">
              4. Which features matter most to you? <span className="text-nc-coral">*</span>
            </h3>
            <textarea
              rows={3}
              placeholder="e.g. Photo logging is the killer feature. The Swiggy integration is super relevant for my lifestyle..."
              value={preferredFeatures}
              onChange={(e) => setPreferredFeatures(e.target.value)}
              className={inputCls}
              style={{ boxShadow: 'var(--shadow-nc-inset)' }}
            />
          </div>

          {/* Q5 — Nice to have */}
          <div className="form-field p-6 rounded-nc-xl border border-black/[0.06] bg-nc-surface/50 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-nc-text-muted font-medium">
              5. Nice-to-have features you'd love to see <span className="text-nc-coral">*</span>
            </h3>
            <textarea
              rows={3}
              placeholder="e.g. Water tracking, sleep tracking, family plan mode, recipe generator..."
              value={niceToHave}
              onChange={(e) => setNiceToHave(e.target.value)}
              className={inputCls}
              style={{ boxShadow: 'var(--shadow-nc-inset)' }}
            />
          </div>

          {/* Q6 — UI Review */}
          <div className="form-field p-6 rounded-nc-xl border border-black/[0.06] bg-nc-surface/50 space-y-5">
            <h3 className="text-xs uppercase tracking-widest text-nc-text-muted font-medium">
              6. UI & Design Review
            </h3>
            <FormField label="Did you like the visual design?" required>
              <div className="flex gap-3 flex-wrap mt-1">
                {['Yes', 'Not really', 'Needs work'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setUiLiked(opt.toLowerCase().replace(' ', '_'))}
                    className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                      uiLiked === opt.toLowerCase().replace(' ', '_')
                        ? 'bg-nc-dark text-white border-nc-dark'
                        : 'bg-transparent border-black/15 text-nc-text-secondary hover:border-black/30'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </FormField>
            <FormField label="Any improvements or suggestions?" required>
              <textarea
                rows={3}
                placeholder="e.g. The dashboard feels cluttered. I'd prefer a darker theme. The streak animation is great..."
                value={uiImprovements}
                onChange={(e) => setUiImprovements(e.target.value)}
                className={inputCls}
                style={{ boxShadow: 'var(--shadow-nc-inset)' }}
              />
            </FormField>
            <FormField label="Reference apps or images you like" hint="Links, app names, or describe the vibe" required>
              <textarea
                rows={2}
                placeholder="e.g. MyFitnessPal's logging UX, Zepto's speed, https://dribbble.com/..."
                value={uiReferences}
                onChange={(e) => setUiReferences(e.target.value)}
                className={inputCls}
                style={{ boxShadow: 'var(--shadow-nc-inset)' }}
              />
            </FormField>
          </div>

          {/* Error */}
          {errorMsg && (
            <div className="px-4 py-3 rounded-nc-md bg-nc-pink border border-nc-pink-dark text-sm text-nc-dark">
              {errorMsg}
            </div>
          )}

          {/* Submit */}
          <div className="form-field">
            <NcButtonPrimary
              type="submit"
              size="lg"
              trailingArrow
              disabled={status === 'loading'}
              className="w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Submitting...' : 'Submit Feedback'}
            </NcButtonPrimary>
            <p className="text-center text-xs text-nc-text-muted mt-3">
              Your response is anonymous. We only store what you share here.
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
