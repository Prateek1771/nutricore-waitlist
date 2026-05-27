import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    // Parse the webhook payload sent by Supabase
    const payload = await req.json()

    // The payload contains the new row inserted into 'pitch_feedback'
    const record = payload.record

    // Only send the email if this is a waitlist registration
    if (record.role !== 'Waitlist User') {
      return new Response(JSON.stringify({ message: "Not a waitlist user, skipping email." }), { status: 200 })
    }

    const { email, name } = record

    if (!email) {
      return new Response(JSON.stringify({ error: "No email provided" }), { status: 400 })
    }

    // Call the Resend API
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        // NOTE: In production, change this to a domain you have verified in Resend (e.g. waitlist@yourdomain.com)
        // 'onboarding@resend.dev' only allows sending to your own personal email for testing.
        from: "NutriCore <onboarding@resend.dev>", 
        to: [email],
        subject: "You're on the list! + Quick Question 🌱",
        html: `
          <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; color: #111; line-height: 1.5;">
            <h2 style="margin-bottom: 24px;">Hey ${name ? name.split(' ')[0] : 'there'},</h2>
            <p>Thank you so much for joining the early access waitlist for NutriCore! We're thrilled to have you on board.</p>
            <p>We are building this app specifically for our early supporters, and we want to make sure it fits your exact needs. If you have 2 minutes, we'd love to hear your thoughts on a few features we are planning.</p>
            <div style="margin: 32px 0;">
              <a href="https://your-domain.com/survey" style="display: inline-block; padding: 12px 24px; background-color: #A7E4C0; color: #111; text-decoration: none; font-weight: bold; border-radius: 8px;">
                Take the 2-minute Survey
              </a>
            </div>
            <p>We'll keep you updated as we get closer to launch.</p>
            <p>Best,<br/>The NutriCore Team</p>
          </div>
        `,
      }),
    })

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: res.status,
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    })
  }
})
