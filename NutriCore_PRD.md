**NutriCore**

AI Dietitian / Trainer / Meal Prep Platform

Product Requirements Document — v1.0

**Owner**

Prateek Hitli

**Version**

1.0 MVP

**Date**

May 2026

**Target Launch**

Q3 2026 — Mysuru Pilot

**Grade**

**91 / 100 — A-**

**1\. Executive Summary**
=========================

NutriCore is an AI-powered all-in-one dietitian, personal trainer, and meal prep platform built for urban Indians aged 18–35. It solves the daily nutrition and fitness chaos caused by mess food dependency, Swiggy overreliance, and lack of structured health guidance — all at a price point no competitor matches.

**Problem Statement**
---------------------

*   Urban Indian students and professionals have poor nutrition due to mess food and unplanned Swiggy orders
*   Existing platforms like HealthifyMe charge ₹208/month and still lack ordering integration
*   No platform connects meal planning, food ordering, grocery delivery, and progress tracking in one loop
*   Indian regional foods (millets, thalis, South Indian staples) are poorly represented in existing databases

**Solution**
------------

NutriCore generates a fully personalized meal and exercise plan based on BMI, food preferences, budget, and fitness level. It then connects the plan directly to Swiggy for restaurant ordering and Instamart for grocery delivery — both free for all users. A daily photo streak, voice meal logging in Kannada/Hindi/English, and 15-day adaptive check-ins keep users engaged and improving.

**Key Differentiators**
-----------------------

**Feature**

**HealthifyMe**

**Fitelo**

**NutriCore**

Swiggy integration

No

No

Yes — FREE

Instamart cart push

No

No

Yes — FREE

Kannada voice logging

No

No

Yes — FREE

Photo meal scan

Paid only

No

Yes — FREE

Photo streak system

No

No

Yes — FREE

Price per month

Rs.208

Rs.500+

Rs.99

Indian food DB depth

Basic

Basic

Deep — custom

15-day adaptive plan

No

Manual

AI-driven

**Success Targets**
-------------------

**Metric**

**Target**

**Timeframe**

Total signups

50 users

Day 30 (Mysuru)

D30 retention

30%

Month 1

Free to Pro conversion

10%

Month 1

7-day photo streak

40% of users

Month 1

Monthly Recurring Revenue

Rs.5,000

Month 3

Net Promoter Score

70+

Month 2

**2\. Target Audience**
=======================

**Primary Users**
-----------------

*   18–35 year old urban Indians
*   Students — mess food dependent, low budget, want to build muscle or lose weight
*   Working professionals — desk jobs, Swiggy reliance, no time to meal prep
*   Gym beginners — want structured plans but have no prior knowledge

**Secondary Users**
-------------------

*   Homemakers — want family meal planning and grocery management
*   People with specific health goals — weight loss, diabetes management, PCOD

**Market Size**
---------------

*   10 million urban wellness seekers in India (realistic, conservative estimate)
*   Mysuru pilot → Karnataka → South India → Pan India → Global

**Personas**
------------

### **Persona 1 — Arjun (Primary)**

**Name**

Arjun, 22 — Engineering Student, Mysuru

**Goal**

Build muscle and gain weight healthily

**Pain Points**

Eats college mess food daily, no budget flexibility (Rs.50-80/day), no gym knowledge, overwhelmed by conflicting advice online

**Platform Path**

Budget meal prep + beginner gym plan + Instamart grocery push for weekly ingredients

### **Persona 2 — Priya (Primary)**

**Name**

Priya, 29 — IT Professional, Bengaluru

**Goal**

Lose fat gained from sedentary desk job

**Pain Points**

No time to cook, orders Swiggy 2x/day, medium budget (Rs.150-300/day), tried HealthifyMe but dropped off

**Platform Path**

Hybrid ordering mode — Swiggy healthy lunch suggestions + home dinner meal prep + home workout plan

**3\. Core Features — MVP Specification**
=========================================

**3.1 Onboarding Quiz (13 Fields, Under 3 Minutes)**
----------------------------------------------------

The onboarding quiz collects all data needed to generate a fully personalized plan. It must feel conversational, not clinical.

**#**

**Field**

**Input Type**

**Options / Notes**

1

Age

Number input

18–80

2

Gender

Single select

Male / Female / Other

3

Height

Number input

cm or ft — user picks unit

4

Weight

Number input

kg or lbs — user picks unit

5

Activity level

Single select

Sedentary / Light / Moderate / Active

6

Food preference

Single select

Full vegetarian / Eggetarian / Non-vegetarian / Vegan

7

Daily budget

Number input

User types minimum Rs. spend per day

8

Exercise location

Single select

Home / Gym / Never

9

Exercise level

Single select

Beginner (0-6mo) / Intermediate (6mo-2yr) / Advanced (2yr+)

10

Exercise frequency

Single select

Never / Occasionally / Regularly

11

Home equipment

Text / multi-select

User lists what they own (dumbbells, bands, etc.)

12

Ordering mode

Single select

Full meal prep / Full ordering / Hybrid (per meal)

13

Exercise time slot

Single select

Morning / Afternoon / Evening

**3.2 BMI Evaluation & Doctor Gate**
------------------------------------

**BMI Range**

**Classification**

**Platform Action**

Under 16

Severely underweight

GATE: Prompt to consult doctor before generating plan

16 – 18.4

Underweight

Plan focuses on caloric surplus + muscle building

18.5 – 24.9

Normal

Maintenance or goal-based plan

25 – 29.9

Overweight

Moderate deficit + cardio plan

30 – 39.9

Obese

Structured deficit + beginner-friendly exercise

40+

Severely obese

GATE: Prompt to consult doctor before generating plan

**3.3 Daily Plan Generation**
-----------------------------

The AI generates a fully structured daily plan including calorie targets, meal-by-meal breakdown with costs, and a complete exercise session. All plans are generated via Groq (Llama 3) orchestrated by LangChain.

### **Sample Plan Output — Arjun (BMI: Underweight, Budget: Rs.80/day, Home workout, Eggetarian)**

**Component**

**Details**

Calorie target

2,400 kcal intake | 200 kcal burn goal

Breakfast

Oats + dry fruits + 2 boiled eggs (Rs.35, 420 kcal) — Instamart link

Lunch

Ragi mudde + sambar (Rs.25, 530 kcal) — Meal prep recipe

Snack

Banana + peanut butter (Rs.20, 200 kcal)

Dinner

Dal + roti + paneer sabzi (Rs.40, 620 kcal) — Instamart link

Exercise

Evening — Squat 3x10, Pushup 3x12, Dumbbell Row 3x10 (GIF + diagram)

Total cost

Rs.120/day (within Rs.80 base + flexibility)

**3.4 Photo Streak System**
---------------------------

The daily photo upload serves dual purpose: calorie tracking via AI meal scan AND a daily streak log. This drives the highest retention of any feature in the platform.

*   User uploads 1 meal photo per day to maintain streak
*   Same upload triggers: (a) AI calorie + macro reading via photo scan API, (b) streak counter increment
*   Miss a day: streak resets to zero — no grace period, no freeze
*   Milestones: 7 days = badge, 30 days = badge + cheat meal unlock, 100 days = special shareable card
*   Streak counter: Free for all users
*   Full photo memory journal (grid view by date): Pro only

**3.5 Voice Meal Logging**
--------------------------

Users speak what they ate in English, Hindi, or Kannada. The platform parses the input, identifies food items, queries the nutrition stack, and logs macros automatically — no manual searching required.

*   Technology: Web Speech API (browser-native) + Groq for NLP parsing
*   Languages: English, Hindi, Kannada (MVP)
*   Example: User says 'I ate ragi mudde and sambar' — platform logs 530 kcal, 15g protein
*   Voice parse fails: text input fallback shown automatically
*   Tier: Free for all users — lowers friction, drives daily active use

**3.6 15-Day Check-In & Plan Adaptation**
-----------------------------------------

Every 15 days, the platform prompts users to re-enter key health signals. The AI uses this data to adjust the meal and exercise plan for the next cycle.

**Check-In Field**

**Input Type**

**AI Uses It To**

Current weight

Number (kg)

Recalculate BMI, assess plan effectiveness

Energy levels

Scale 1–5

Adjust calorie targets if energy is low

Sleep quality

Scale 1–5

Flag recovery issues, reduce exercise intensity

Mood

Scale 1–5

Detect burnout, suggest plan variety

Progress photo

Image upload

Visual tracking in memory journal

**3.7 Monthly Reward System**
-----------------------------

*   When user hits monthly calorie/BMI target: cheat meal unlocked (user picks food — pizza, burger, sweets)
*   Shareable achievement card generated (designed for Instagram/WhatsApp sharing)
*   30-day photo streak also triggers cheat meal unlock + milestone badge
*   100-day streak triggers special shareable card

**3.8 Meal Prep Module**
------------------------

*   AI suggests pulses, grains, and vegetables to buy based on the week's plan
*   Step-by-step recipe instructions with prep time and difficulty rating
*   Full ingredients list with estimated Rs. cost per serving
*   Calorie + macro breakdown per recipe
*   One-tap Instamart cart push for all ingredients

**4\. Technical Architecture**
==============================

**4.1 Tech Stack Overview**
---------------------------

**Layer**

**Technology**

**Purpose**

Frontend

Next.js 15 + shadcn/ui + Tailwind CSS

UI, quiz flow, dashboard, plan viewer

Backend

Next.js API routes (single codebase)

BMI logic, AI orchestration, API calls

AI / LLM (Primary)

Groq — Llama 3

Fast meal + exercise plan generation

AI / LLM (Fallback)

OpenRouter

Fallback if Groq is unavailable

Orchestration

LangChain.js

Chains BMI → prefs → plan generation

Database

Supabase (PostgreSQL)

Users, plans, streaks, check-in history

Auth

Supabase Auth — Email/Phone OTP

India-friendly login

Payments

Razorpay

Subscriptions, UPI, credit/debit cards

Hosting

Vercel

Free tier, native Next.js support

Voice

Web Speech API + Groq NLP

Voice meal logging in 3 languages

Photo scan

FoodFacts / Nutrical API

Meal photo → calorie/macro reading

**4.2 Nutrition API Stack — Lookup Order**
------------------------------------------

The nutrition lookup follows a strict priority chain to maximize Indian food accuracy while keeping costs at zero.

**Priority**

**Source**

**Coverage**

**Cost**

1st

Custom Indian Food DB (in-house)

100 core items: dal, roti, idli, sambar, millets, thalis — verified macros

Free (built once)

2nd

Open Food Facts

2.5M+ products globally — Indian packaged goods (MTR, Haldirams, Aashirvaad)

Free forever

3rd

Edamam

900K+ foods — NLP queries, recipe analysis, fallback for unrecognized items

Free tier (400 calls/mo)

**4.3 Database Schema (Supabase)**
----------------------------------

### **Users Table**

**Column**

**Type**

**Notes**

id

UUID PRIMARY KEY

Auto-generated

email

TEXT UNIQUE

Optional — phone preferred

phone

TEXT UNIQUE

Primary identifier for Indian users

quiz

JSONB

Full 13-field quiz response

current\_plan

JSONB

Latest generated meal + exercise plan

streak

INTEGER DEFAULT 0

Current photo streak count

tier

TEXT DEFAULT 'free'

free / pro / annual / family

created\_at

TIMESTAMP

Account creation date

### **Plans Table**

**Column**

**Type**

**Notes**

id

UUID PRIMARY KEY

Auto-generated

user\_id

UUID REFERENCES users(id)

Foreign key

bmi

DECIMAL

Calculated at quiz time

calorie\_target

INTEGER

Daily intake target

meals

JSONB

Full meal plan with costs and macros

exercise

JSONB

Exercise plan with sets/reps/GIF URLs

valid\_until

DATE

15-day validity before check-in

created\_at

TIMESTAMP

Plan generation date

### **Checkins Table**

**Column**

**Type**

**Notes**

id

UUID PRIMARY KEY

Auto-generated

user\_id

UUID REFERENCES users(id)

Foreign key

weight

DECIMAL

Current weight in kg

energy

INTEGER (1-5)

Self-reported energy level

sleep

INTEGER (1-5)

Self-reported sleep quality

mood

INTEGER (1-5)

Self-reported mood

photo\_url

TEXT

Supabase Storage URL for progress photo

created\_at

TIMESTAMP

Check-in submission date

**5\. API Integrations**
========================

**5.1 Swiggy MCP — Restaurant Ordering**
----------------------------------------

*   AI generates restaurant suggestions matching user's calorie target, food preference, and daily budget
*   Integration type: Swiggy Model Context Protocol (MCP)
*   Example query: 'Vegetarian thali under Rs.80 with 450-550 calories near Mysuru'
*   Fallback: If Swiggy MCP is unavailable, show cached last response or DIY meal prep recipe
*   Tier: FREE for all users — this is a core differentiator, not a paywall feature

**5.2 Instamart API — Grocery Delivery**
----------------------------------------

*   Meal prep ingredient lists pushed directly to user's Instamart cart in one tap
*   Real-time pricing and inventory checked at time of push
*   Mysuru coverage confirmed for launch
*   Fallback: If Instamart API is unavailable, show manual shopping list with estimated prices
*   Tier: FREE for all users
*   Future: 3-5% affiliate commission per completed Instamart order (post-MVP)

**5.3 ExerciseDB API — Exercise Library**
-----------------------------------------

*   5,000+ exercises with animated GIF, muscle diagram, full written instructions
*   Each exercise tagged by muscle group, equipment required, and difficulty
*   AI selects and sequences exercises based on user's location, level, and frequency
*   Exercise data cached locally in Supabase after first fetch to minimize API calls
*   Source: RapidAPI — free tier sufficient for MVP, ~$10/month plan for scale

**5.4 Voice Input — Web Speech API**
------------------------------------

*   Browser-native — zero cost, no external API required
*   Groq NLP parses spoken food description into structured food items
*   Nutrition lookup then proceeds through the standard chain (Custom DB → Open Food Facts → Edamam)
*   Language support: English, Hindi, Kannada
*   Fallback: Text input shown automatically if voice parse fails or browser unsupported

**6\. Monetization Strategy**
=============================

**6.1 Tier Overview**
---------------------

NutriCore uses soft gating — free users experience real value and naturally discover the premium upgrade. There are no hard paywalls or feature blocks on day 4. Users see a taste of Pro features, get results, and choose to upgrade.

**Feature**

**Free (Rs.0)**

**Pro (Rs.99/mo)**

**Annual (Rs.799/yr)**

**Family (Rs.199/mo)**

BMI eval + 7-day static plan

Yes

Yes

Yes

Yes — 4 members

Photo meal scan

Yes

Yes

Yes

Yes

Voice meal logging (3 languages)

Yes

Yes

Yes

Yes

Daily photo streak counter

Yes

Yes

Yes

Yes

Swiggy ordering suggestions

Yes

Yes

Yes

Yes

Instamart grocery cart push

Yes

Yes

Yes

Yes

7-day progress preview (soft gated)

Yes (7 days)

Full history

Full history

Full history

1-day AI plan preview (soft gated)

1 day preview

Full 30 days

Full 30 days

Full 30 days

Full AI-personalized meal plans

No

Yes

Yes

Yes

Full AI exercise plans

No

Yes

Yes

Yes

15-day adaptive check-in

Submit only

AI-adjusted

AI-adjusted

AI-adjusted

Full progress dashboard

No

Yes

Yes

Yes

Photo memory journal

No

Full history

Full history

Full history

Cheat meal + badge rewards

No

Yes

Yes

Yes

Annual savings

\-

\-

33% off

\-

**6.2 Pricing Rationale**
-------------------------

*   Rs.99/month is 52% cheaper than HealthifyMe (Rs.208/month) with more features
*   Rs.799/year creates strong 12-month retention — saves Rs.389 vs monthly
*   Rs.199/month family plan targets homemakers and couples (secondary audience)
*   Swiggy and Instamart kept FREE because the order-to-track loop is the #1 differentiator

**6.3 Revenue Projections**
---------------------------

**Month**

**Users**

**Pro Conversions (10%)**

**MRR**

Month 1 (Mysuru pilot)

50

5

Rs.495

Month 2 (Mysuru + word of mouth)

150

15

Rs.1,485

Month 3 (Karnataka expansion)

500

50

Rs.4,950

Month 6 (South India)

2,000

200

Rs.19,800

**6.4 Future Revenue Streams (Post-MVP)**
-----------------------------------------

*   Instamart affiliate commission: 3–5% per completed grocery order placed through platform
*   Elite tier (Rs.799/month): human dietitian review, weekly 1:1 call, blood report analysis
*   Referral program: refer a friend, both get 1 month Pro free

**7\. Exercise Planning Logic**
===============================

**7.1 AI Decision Framework**
-----------------------------

The AI uses a combination of the user's BMI, exercise location, experience level, and frequency to determine the optimal workout structure. It does not use fixed templates.

**Scenario**

**AI-Generated Plan Structure**

Never exercised + Obese BMI + Home

3x20min walks/week + 10min bodyweight (gentle start, ramp over 15 days)

Beginner + Home + Occasional + Dumbbells

3x/week full body: goblet squat, dumbbell row, pushup, overhead press

Beginner + Gym + Regular

3-4x/week full body compound movements, 45min sessions

Intermediate + Gym + Regular

Push/Pull/Legs split, 4-5x/week, progressive overload

Advanced + Gym + Regular

5-6x/week specialized split, periodization, strength focus

Home + Any level + Bodyweight only

Calisthenics progression: pushup → pike pushup → handstand pushup

**7.2 Exercise Display Format**
-------------------------------

Every exercise in the plan is displayed with full context so beginners can follow along without any prior knowledge.

*   Exercise name + primary muscle group + secondary muscles
*   Sets / reps / recommended rest time
*   Animated GIF demonstration (from ExerciseDB)
*   Muscle diagram showing which muscles are worked
*   Full written instructions (step-by-step)
*   Estimated calories burned per session — connects to daily calorie target

**7.3 Exercise Completion Tracking**
------------------------------------

*   User checks off each exercise as done or skipped after their session
*   AI records which exercises are consistently skipped
*   At 15-day check-in, AI adjusts: replaces skipped exercises, reduces intensity if completion rate is low
*   Completion rate shown in progress dashboard (Pro users)

**8\. Build Roadmap — 42 Modules**
==================================

**Phase 1 — Foundation**
------------------------

**#**

**Module**

**Description**

01

Project scaffold

Next.js 15 + shadcn/ui + Tailwind CSS setup

02

Supabase auth

Email/Phone OTP login via Supabase Auth

03

Onboarding quiz UI

All 13 fields, conversational flow, validation

04

BMI calculator + doctor gate

BMI logic + extreme BMI gating (<16 or >40)

05

Static plan template UI

Daily plan display component

06

User dashboard

Main hub: today's plan, streak, progress summary

07

Mobile responsiveness

Full responsive layout across all screen sizes

08

T&C page

Full terms users must accept before onboarding

**Phase 2 — AI Core**
---------------------

**#**

**Module**

**Description**

09

Groq + LangChain setup

API connection, prompt chaining, error handling

10

Meal plan generator

BMI + prefs + budget + mode → structured meal plan

11

Exercise plan generator

Location + level + frequency → workout plan

12

Dynamic plan rendering

Render AI output in structured UI components

**Phase 3 — Food & Nutrition**
------------------------------

**#**

**Module**

**Description**

13

Custom Indian food DB

100 items with verified macros loaded into Supabase

14

Open Food Facts API

Primary external nutrition data source

15

Photo meal scan

FoodFacts/Nutrical API — photo → calorie/macro

16

Voice meal logging

Web Speech API + Groq NLP + 3 language support

17

Meal prep recipes module

Recipes with ingredients, costs, macros

18

Nutrition lookup chain

Custom DB → Open Food Facts → Edamam priority order

**Phase 4 — Ordering**
----------------------

**#**

**Module**

**Description**

19

Swiggy MCP integration

AI restaurant suggestions per meal

20

Instamart API integration

Grocery list → one-tap cart push

21

Hybrid ordering UI

User picks ordering mode per individual meal

22

API cache layer

Store last API response — serve on downtime

23

DIY fallback

Show meal prep recipe when ordering API is unavailable

**Phase 5 — Progress & Retention**
----------------------------------

**#**

**Module**

**Description**

24

15-day check-in form

Weight + energy + sleep + mood + photo

25

Plan adjustment AI

Re-generate plan based on check-in data

26

Progress dashboard

Weight graph, BMI trend, calorie streaks

27

Monthly reward system

Target hit → cheat meal unlock + shareable card

28

Photo streak counter

Daily photo → streak increment, milestone detection

29

Memory journal UI

Photo grid by date — full view Pro only

30

Milestone badge system

7/30/100 day badge + cheat meal triggers

31

Exercise completion tracking

Checkbox per exercise → AI notes skips

32

Push notifications

Streak reminders, meal logging prompts

33

Weekly progress email

Personalised weekly summary via Resend/SendGrid

**Phase 6 — Voice**
-------------------

**#**

**Module**

**Description**

34

Web Speech API integration

Browser voice capture + fallback to text

35

Groq voice NLP parsing

Spoken food → structured food items → macro lookup

36

Multilingual support

Hindi and Kannada voice model routing

**Phase 7 — Monetization**
--------------------------

**#**

**Module**

**Description**

37

Freemium gate logic

Feature access rules: Free vs Pro

38

Soft gating UI

Show preview, prompt upgrade — never a hard block

39

Razorpay subscriptions

Rs.99/mo, Rs.799/yr, Rs.199/mo family plans

40

Instamart affiliate tracking

Commission attribution per order (post-MVP)

**Phase 8 — Launch**
--------------------

**#**

**Module**

**Description**

41

Medical disclaimer system

Disclaimer on every plan page

42

FSSAI compliance labels

Food information display per Indian regulations

43

Performance optimisation

Core Web Vitals, image optimisation, lazy loading

44

Vercel deployment

Production deployment + environment config

45

Custom domain setup

Domain purchase + DNS configuration

46

Analytics setup

Posthog or Mixpanel — event tracking, funnel analysis

47

Feedback collection

In-app NPS survey + WhatsApp/IG outreach setup

**9\. Launch Plan — Mysuru Pilot**
==================================

**9.1 Launch Parameters**
-------------------------

**Parameter**

**Detail**

Launch city

Mysuru, Karnataka

Target users

50 signups in first 30 days

Budget

Rs.3,000 (IG/FB ads) + Rs.0 development costs

D30 retention target

30% of users still active

Conversion target

10% free to Pro (5 users = Rs.495 MRR)

**9.2 Marketing Channels (All Three Simultaneously)**
-----------------------------------------------------

### **Channel 1 — Instagram & Facebook Ads (Rs.3,000 budget)**

*   Target: Mysuru, age 18–35, interests: fitness, food, wellness, gym
*   Creative angle: 'The Swiggy diet that actually works — free for Mysuru'
*   Funnel: Ad → quiz → generated plan → photo log day 1

### **Channel 2 — Local Gym Partnerships (5 target gyms)**

*   QR code posters inside gyms: 'Get your free AI diet + gym plan'
*   Gym referral incentive: Rs.50 credit per Pro signup traced to gym
*   Local endorsement builds trust that digital ads cannot

### **Channel 3 — College WhatsApp Groups (10+ groups)**

*   Engineering colleges in Mysuru — direct Arjun persona
*   Personal demo video + invite link
*   Viral hook: shareable 30-day streak achievement card

**9.3 Re-engagement Strategy**
------------------------------

*   Push notifications: 'Your 12-day streak is at risk! Log today's meal'
*   Push notifications: '80% to your monthly target — keep going!'
*   Weekly email: personalised progress summary — weight delta, calorie consistency, streak count

**9.4 Expansion Roadmap**
-------------------------

**Phase**

**Geography**

**Key Changes**

Phase 1

Mysuru

Full feature set — Swiggy + Instamart + Kannada voice

Phase 2

All Karnataka

Scale marketing — IG ads to Bengaluru, Mangaluru, Hubli

Phase 3

South India

Add Tamil voice support, expand food DB to Tamil/Kerala cuisine

Phase 4

Pan India

Hindi-dominant state food DBs, expand to Delhi/Mumbai/Pune

Phase 5

Global

Drop Swiggy/Instamart, meal prep only mode, cuisine-agnostic DB

**10\. Risks & Mitigations**
============================

**Risk**

**Severity**

**Mitigation**

Medical liability from incorrect BMI-based advice

HIGH

Full T&C acceptance before onboarding. Medical disclaimer on every plan. Doctor gate for BMI <16 or >40. FSSAI compliance labels on all food information.

Swiggy MCP or Instamart API downtime

HIGH

API response cache layer — serve last valid response. DIY meal prep fallback displayed automatically. Monitor API terms regularly.

User churn after first plan

HIGH

Photo streak (resets to zero = streak anxiety). Push notifications. Weekly progress email. 15-day check-in. Monthly cheat meal reward. 30-day streak = cheat meal unlock.

HealthifyMe drops price or copies features

MEDIUM

Monitor monthly. Double down on Kannada voice (cultural + technical moat). Regional food DB takes months to copy. Ship new features faster than they can respond.

Nutrition data inaccuracy (crowd-sourced Open Food Facts)

MEDIUM

Custom Indian DB checked first (verified macros). User feedback flag per food item. Flagged items reviewed manually.

ExerciseDB rate limits at scale

LOW

Cache exercise data in Supabase after first fetch. Budget ~$10/month for paid RapidAPI plan when needed.

Voice parse errors in Kannada/Hindi

LOW

Text input fallback shown automatically. Collect failed voice logs to improve parsing over time.

**11\. Success Metrics & KPIs**
===============================

**11.1 Primary Metrics (D30 — Month 1)**
----------------------------------------

**Metric**

**Target**

**Failure Threshold**

**Measurement**

Total signups

50 users

Under 20

Supabase user count

D30 retention

30%

Under 20%

DAU/MAU ratio

Free to Pro conversion

10%

Under 5%

Razorpay subscriptions

7-day photo streak

40% of users

Under 20%

Streak table in Supabase

NPS score

70+

Under 50

In-app check-in survey

**11.2 Secondary Metrics**
--------------------------

**Metric**

**Target**

API uptime (Swiggy + Instamart)

99%

Daily photo compliance

70% of active users log daily

Voice feature usage

30% of meal logs via voice

Monthly Recurring Revenue (Month 3)

Rs.5,000

D30 cheat meal unlocks

At least 30% of active users hit milestone

**11.3 Definition of Success and Failure**
------------------------------------------

**SUCCESS**

30%+ D30 retention AND Rs.5,000 MRR by Month 3 AND NPS > 70

**FAILURE**

Below 20% D30 retention. Signals product-market fit is not yet achieved.

**PIVOT TRIGGER**

If retention < 20% after 30 days: conduct user interviews with all active users before building any new features.

**12\. Immediate Next Steps**
=============================

Complete these in order before writing any code:

**#**

**Action**

**Why First**

1

Build custom Indian food DB spreadsheet

100 items with verified macros — 2-3 days. This is your data moat and must exist before any nutrition logic is built.

2

Set up Next.js 15 + Supabase + shadcn scaffold

Run: npx create-next-app@15 nutricore --ts --tailwind --app

3

Build onboarding quiz → BMI eval → static plan flow

This is the core loop. Build it without AI first — hardcoded sample plan. Get it looking right.

4

Get 5 friends to test before any API integration

Real feedback from real users before you invest in API setup. Watch where they get confused.

5

Integrate Groq + LangChain for AI plan generation

Replace the hardcoded sample plan with real AI output.

6

Add photo streak + voice logging

These are your primary retention hooks. Add early.

7

Integrate Swiggy MCP + Instamart

The differentiator. Add after core loop is stable.

8

Add Razorpay and freemium gates

Only add payments when you have users who want to pay.