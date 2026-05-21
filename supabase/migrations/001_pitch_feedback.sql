-- NutriCore Pitch Feedback Table
-- Run this in Supabase SQL Editor before launching the pitch site

create table if not exists pitch_feedback (
  id                 uuid        default gen_random_uuid() primary key,
  created_at         timestamptz default now(),
  name               text,
  email              text,
  role               text,
  feature_ratings    jsonb,
  preferred_pages    text[],
  will_buy           text,
  price_opinion      text,
  preferred_features text,
  nice_to_have       text,
  ui_liked           text,
  ui_improvements    text,
  ui_references      text
);

-- Enable Row Level Security
alter table pitch_feedback enable row level security;

-- Allow anyone (anon key) to insert
create policy "Anyone can submit feedback"
  on pitch_feedback
  for insert
  to anon
  with check (true);

-- Only authenticated users (you) can read
create policy "Auth users can read feedback"
  on pitch_feedback
  for select
  to authenticated
  using (true);
