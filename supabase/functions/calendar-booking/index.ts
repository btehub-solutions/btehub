import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts'
import { Resend } from "npm:resend@2.0.0"

const GOOGLE_CALENDAR_API = 'https://www.googleapis.com/calendar/v3'
const resend = new Resend(Deno.env.get('RESEND_API_KEY'))

interface BookingRequest {
  clientName: string
  clientEmail: string
  clientPhone?: string
  serviceType: string
  preferredDate: string
  preferredTime: string
  notes?: string
}

async function getAccessToken() {
  const serviceAccountJson = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_JSON')
  if (!serviceAccountJson) {
    throw new Error('Google service account credentials not found')
  }

  let credentials
  try {
    credentials = JSON.parse(serviceAccountJson)
    console.log('Parsed credentials successfully')
  } catch (error) {
    console.error('Failed to parse Google service account JSON:', error)
    throw new Error('Invalid Google service account JSON format')
  }

  if (!credentials.private_key || !credentials.client_email) {
    console.error('Missing required fields in service account JSON')
    throw new Error('Missing private_key or client_email in service account JSON')
  }
  
  // Create JWT for Google OAuth
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  }

  const now = Math.floor(Date.now() / 1000)
  const payload = {
    iss: credentials.client_email,
    scope: 'https://www.googleapis.com/auth/calendar',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  }

  // Simple JWT implementation for Deno
  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  
  const signatureInput = `${encodedHeader}.${encodedPayload}`
  
  // Import private key
  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    new TextEncoder().encode(credentials.private_key.replace(/\\n/g, '\n')),
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256'
    },
    false,
    ['sign']
  )

  // Sign the JWT
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    privateKey,
    new TextEncoder().encode(signatureInput)
  )

  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

  const jwt = `${signatureInput}.${encodedSignature}`

  // Exchange JWT for access token
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt
    })
  })

  const tokenData = await tokenResponse.json()
  return tokenData.access_token
}

async function createCalendarEvent(booking: BookingRequest, accessToken: string) {
  // Combine date and time for Africa/Lagos timezone
  const eventDateTime = new Date(`${booking.preferredDate}T${booking.preferredTime}:00`)
  const endDateTime = new Date(eventDateTime.getTime() + 60 * 60 * 1000) // 1 hour duration

  const event = {
    summary: `${booking.serviceType} - ${booking.clientName}`,
    description: `Booking with ${booking.clientName} for ${booking.serviceType}`,
    start: {
      dateTime: eventDateTime.toISOString(),
      timeZone: 'Africa/Lagos'
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'Africa/Lagos'
    },
    attendees: [
      {
        email: booking.clientEmail,
        displayName: booking.clientName
      }
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 }, // 24 hours
        { method: 'email', minutes: 60 }       // 1 hour
      ]
    }
  }

  const response = await fetch(`${GOOGLE_CALENDAR_API}/calendars/primary/events`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  })

  if (!response.ok) {
    throw new Error(`Failed to create calendar event: ${response.statusText}`)
  }

  return await response.json()
}

async function sendBookingNotification(booking: BookingRequest) {
  try {
    const emailResponse = await resend.emails.send({
      from: "BTEHub Bookings <onboarding@resend.dev>",
      to: ["bensamoladoyin.btehub@gmail.com"],
      subject: `New Consultation Booking - ${booking.serviceType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Consultation Booking</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Client Details</h3>
            <p><strong>Name:</strong> ${booking.clientName}</p>
            <p><strong>Email:</strong> ${booking.clientEmail}</p>
            ${booking.clientPhone ? `<p><strong>Phone:</strong> ${booking.clientPhone}</p>` : ''}
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Booking Details</h3>
            <p><strong>Service:</strong> ${booking.serviceType}</p>
            <p><strong>Date:</strong> ${booking.preferredDate}</p>
            <p><strong>Time:</strong> ${booking.preferredTime}</p>
            ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
          </div>
          
          <p style="color: #64748b; font-size: 14px;">
            This booking has been automatically added to your Google Calendar.
          </p>
        </div>
      `,
    });

    console.log("Booking notification sent successfully:", emailResponse);
    return emailResponse;
  } catch (error) {
    console.error("Failed to send booking notification:", error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const booking: BookingRequest = await req.json()
    
    // Get access token
    const accessToken = await getAccessToken()
    
    // Create calendar event
    const calendarEvent = await createCalendarEvent(booking, accessToken)
    
    // Send booking notification email
    await sendBookingNotification(booking)
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        eventId: calendarEvent.id,
        eventLink: calendarEvent.htmlLink 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Calendar booking error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})