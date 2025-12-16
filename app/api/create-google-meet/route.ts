import { NextResponse } from "next/server"

// This endpoint creates a Google Calendar event with Google Meet link
// In production, you would use Google Calendar API with OAuth2
// For now, this is a mock implementation with placeholders for API keys

interface BookingRequest {
  date: number
  month: string
  year: number
  time: string
  duration: string
  meetingType: "virtual" | "onsite"
  projectAddress?: string
  clientName: string
  clientEmail: string
}

// Generate a mock Google Meet link (in production, this comes from Google Calendar API)
function generateMeetLink(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz"
  const randomString = (len: number) =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
  return `https://meet.google.com/${randomString(3)}-${randomString(4)}-${randomString(3)}`
}

// Convert duration string to minutes
function getDurationMinutes(duration: string): number {
  const match = duration.match(/(\d+)/)
  return match ? Number.parseInt(match[1]) : 30
}

// Generate ICS file content for calendar download
function generateICSContent(booking: BookingRequest, meetLink: string): string {
  const durationMinutes = getDurationMinutes(booking.duration)
  const startDate = new Date(`${booking.month} ${booking.date}, ${booking.year} ${booking.time}`)
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000)

  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  }

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Antova Builders//Consultation//EN
BEGIN:VEVENT
UID:${Date.now()}@antovabuilders.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:Consultation with Antova Builders
DESCRIPTION:Virtual consultation via Google Meet\\n\\nJoin: ${meetLink}\\n\\nClient: ${booking.clientName}
LOCATION:${meetLink}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`
}

// Mock function to send confirmation email
// In production, use a service like SendGrid, Resend, or Nodemailer
async function sendConfirmationEmail(booking: BookingRequest, meetLink: string) {
  const durationMinutes = getDurationMinutes(booking.duration)

  // Log email content (replace with actual email sending in production)
  console.log("=== SENDING CONFIRMATION EMAIL ===")
  console.log(`To: ${booking.clientEmail}`)
  console.log(`Subject: Your Antova Builders Consultation is Confirmed`)
  console.log(`---`)
  console.log(`Dear ${booking.clientName},`)
  console.log(``)
  console.log(`Your consultation with Antova Builders has been scheduled!`)
  console.log(``)
  console.log(`Meeting Details:`)
  console.log(`- Date: ${booking.month} ${booking.date}, ${booking.year}`)
  console.log(`- Time: ${booking.time}`)
  console.log(`- Duration: ${durationMinutes} minutes`)
  console.log(`- Google Meet Link: ${meetLink}`)
  console.log(``)
  console.log(`Click the link above to join the meeting at the scheduled time.`)
  console.log(``)
  console.log(`Add to your calendar:`)
  console.log(
    `- Google Calendar: https://calendar.google.com/calendar/render?action=TEMPLATE&text=Consultation+with+Antova+Builders`,
  )
  console.log(`- Download ICS file: [attached]`)
  console.log(``)
  console.log(`Contact Us:`)
  console.log(`- Phone: (208) 625-8342`)
  console.log(`- Email: sales@antovabuilders.com`)
  console.log(`- Address: 280 Tower Road, Cocolalla, ID 83813`)
  console.log(``)
  console.log(`We look forward to speaking with you!`)
  console.log(``)
  console.log(`Best regards,`)
  console.log(`Antova Builders Team`)
  console.log("==================================")

  // In production, you would call your email service here:
  // await resend.emails.send({
  //   from: 'Antova Builders <noreply@antovabuilders.com>',
  //   to: booking.clientEmail,
  //   subject: 'Your Antova Builders Consultation is Confirmed',
  //   html: emailTemplate,
  //   attachments: [{ filename: 'consultation.ics', content: generateICSContent(booking, meetLink) }]
  // })

  return true
}

// Mock function to create Google Calendar event
// In production, use Google Calendar API with OAuth2
async function createGoogleCalendarEvent(booking: BookingRequest) {
  const meetLink = generateMeetLink()
  const durationMinutes = getDurationMinutes(booking.duration)

  // Log the event that would be created
  console.log("=== CREATING GOOGLE CALENDAR EVENT ===")
  console.log(`Title: Consultation with Antova Builders`)
  console.log(`Date: ${booking.month} ${booking.date}, ${booking.year}`)
  console.log(`Time: ${booking.time}`)
  console.log(`Duration: ${durationMinutes} minutes`)
  console.log(`Client: ${booking.clientName} (${booking.clientEmail})`)
  console.log(`Google Meet Link: ${meetLink}`)
  console.log("======================================")

  // In production, you would call Google Calendar API:
  // const calendar = google.calendar({ version: 'v3', auth: oauth2Client })
  // const event = await calendar.events.insert({
  //   calendarId: 'primary',
  //   conferenceDataVersion: 1,
  //   requestBody: {
  //     summary: 'Consultation with Antova Builders',
  //     description: `Client: ${booking.clientName}\nEmail: ${booking.clientEmail}`,
  //     start: { dateTime: startDateTime, timeZone: 'America/Seattle' },
  //     end: { dateTime: endDateTime, timeZone: 'America/Seattle' },
  //     attendees: [{ email: booking.clientEmail }],
  //     conferenceData: {
  //       createRequest: { requestId: Date.now().toString() }
  //     }
  //   }
  // })

  return {
    eventId: `event_${Date.now()}`,
    meetLink,
    calendarLink: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Consultation+with+Antova+Builders&dates=${booking.year}${String(new Date(`${booking.month} 1`).getMonth() + 1).padStart(2, "0")}${String(booking.date).padStart(2, "0")}`,
    icsContent: generateICSContent(booking, meetLink),
  }
}

export async function POST(request: Request) {
  try {
    const body: BookingRequest = await request.json()

    // Validate required fields
    if (!body.clientName || !body.clientEmail) {
      return NextResponse.json({ error: "Name and email are required for virtual meetings" }, { status: 400 })
    }

    if (!body.date || !body.time || !body.duration) {
      return NextResponse.json({ error: "Date, time, and duration are required" }, { status: 400 })
    }

    // Create Google Calendar event with Meet link
    const calendarEvent = await createGoogleCalendarEvent(body)

    // Send confirmation email to client
    await sendConfirmationEmail(body, calendarEvent.meetLink)

    return NextResponse.json({
      success: true,
      message: "Booking confirmed! A confirmation email has been sent.",
      meetLink: calendarEvent.meetLink,
      eventId: calendarEvent.eventId,
      calendarLink: calendarEvent.calendarLink,
      appointment: {
        ...body,
        meetLink: calendarEvent.meetLink,
      },
    })
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json({ error: "Failed to create booking. Please try again." }, { status: 500 })
  }
}
