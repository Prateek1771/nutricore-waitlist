import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://placeholder.supabase.co'
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface PitchFeedback {
  name?: string
  email?: string
  role?: string
  feature_ratings?: Record<string, number>
  preferred_pages?: string[]
  will_buy?: string
  price_opinion?: string
  preferred_features?: string
  nice_to_have?: string
  ui_liked?: string
  ui_improvements?: string
  ui_references?: string
}

export async function submitFeedback(data: PitchFeedback) {
  const { error } = await supabase.from('pitch_feedback').insert([data])
  if (error) throw error
}
