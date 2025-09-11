import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

interface BookingEmailData {
  customerName: string
  customerEmail: string
  eventDate: string
  eventTime: string
  eventType: string
  guestCount: number
  bookingId: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { bookingData }: { bookingData: BookingEmailData } = await req.json()

    // Email to customer
    const customerEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'bookings@yourdomain.com',
        to: [bookingData.customerEmail],
        subject: 'Booking Confirmation - Event Hall',
        html: `
          <h2>Thank you for your booking!</h2>
          <p>Dear ${bookingData.customerName},</p>
          <p>Your booking has been confirmed with the following details:</p>
          <ul>
            <li><strong>Event Date:</strong> ${bookingData.eventDate}</li>
            <li><strong>Event Time:</strong> ${bookingData.eventTime}</li>
            <li><strong>Event Type:</strong> ${bookingData.eventType}</li>
            <li><strong>Guest Count:</strong> ${bookingData.guestCount}</li>
            <li><strong>Booking ID:</strong> ${bookingData.bookingId}</li>
          </ul>
          <p>We will contact you soon to confirm additional details.</p>
          <p>Best regards,<br>Event Hall Team</p>
        `,
      }),
    })

    // Email to admin
    const adminEmailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'bookings@yourdomain.com',
        to: ['somesh.kandregula@gmail.com'],
        subject: 'New Booking Received',
        html: `
          <h2>New Booking Received</h2>
          <p>A new booking has been made:</p>
          <ul>
            <li><strong>Customer:</strong> ${bookingData.customerName}</li>
            <li><strong>Email:</strong> ${bookingData.customerEmail}</li>
            <li><strong>Event Date:</strong> ${bookingData.eventDate}</li>
            <li><strong>Event Time:</strong> ${bookingData.eventTime}</li>
            <li><strong>Event Type:</strong> ${bookingData.eventType}</li>
            <li><strong>Guest Count:</strong> ${bookingData.guestCount}</li>
            <li><strong>Booking ID:</strong> ${bookingData.bookingId}</li>
          </ul>
          <p>Please contact the customer to confirm details.</p>
        `,
      }),
    })

    return new Response(
      JSON.stringify({ success: true, message: 'Emails sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})