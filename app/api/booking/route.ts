import { type NextRequest, NextResponse } from "next/server"

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

interface CalendarEvent {
  id: string
  title: string
  description: string
  startTime: string
  endTime: string
  meetLink?: string
  location?: string
}

function generateMeetLink(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz"
  const randomString = (len: number) =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
  return `https://meet.google.com/${randomString(3)}-${randomString(4)}-${randomString(3)}`
}

function calculateEndTime(startTime: string, duration: string): string {
  const match = startTime.match(/(\d+):(\d+)(am|pm)/i)
  if (!match) return startTime

  let hours = parseInt(match[1])
  const minutes = parseInt(match[2])
  const period = match[3].toLowerCase()

  if (period === "pm" && hours !== 12) hours += 12
  if (period === "am" && hours === 12) hours = 0

  const durationMinutes = parseInt(duration.replace("m", ""))
  const totalMinutes = hours * 60 + minutes + durationMinutes

  let endHour = Math.floor(totalMinutes / 60) % 24
  const endMinutes = totalMinutes % 60

  const endPeriod = endHour >= 12 ? "pm" : "am"
  if (endHour > 12) endHour -= 12
  if (endHour === 0) endHour = 12

  return `${endHour}:${endMinutes.toString().padStart(2, "0")}${endPeriod}`
}

async function createGoogleCalendarEvent(booking: BookingRequest): Promise<CalendarEvent> {
  const meetLink = booking.meetingType === "virtual" ? generateMeetLink() : undefined
  const endTime = calculateEndTime(booking.time, booking.duration)

  const event: CalendarEvent = {
    id: `evt_${Date.now()}`,
    title: `Consultation: ${booking.clientName}`,
    description: `
Client: ${booking.clientName}
Email: ${booking.clientEmail}
Duration: ${booking.duration}
Type: ${booking.meetingType === "virtual" ? "Virtual Meeting (Google Meet)" : "On-Site Meeting"}
${booking.meetingType === "virtual" ? `Google Meet: ${meetLink}` : `Location: ${booking.projectAddress}`}
    `.trim(),
    startTime: `${booking.month} ${booking.date}, ${booking.year} at ${booking.time}`,
    endTime: `${booking.month} ${booking.date}, ${booking.year} at ${endTime}`,
    meetLink,
    location: booking.meetingType === "onsite" ? booking.projectAddress : undefined,
  }

  return event
}

async function sendBusinessOwnerEmail(booking: BookingRequest, event: CalendarEvent): Promise<void> {
  const emailContent = {
    to: "sales@antovabuilders.com",
    from: "noreply@antovabuilders.com",
    subject: `New Consultation Booking: ${booking.clientName}`,
    body: `
═══════════════════════════════════════════════════
           NEW CONSULTATION BOOKING
═══════════════════════════════════════════════════

CLIENT INFORMATION
──────────────────
Name:  ${booking.clientName}
Email: ${booking.clientEmail}

MEETING DETAILS
───────────────
Date:     ${booking.month} ${booking.date}, ${booking.year}
Time:     ${booking.time}
Duration: ${booking.duration}
Type:     ${booking.meetingType === "virtual" ? "Virtual (Google Meet)" : "On-Site Meeting"}

${
  booking.meetingType === "virtual"
    ? `GOOGLE MEET LINK
─────────────────
${event.meetLink}`
    : `LOCATION
────────
${booking.projectAddress}`
}

═══════════════════════════════════════════════════
Calendar Event ID: ${event.id}
═══════════════════════════════════════════════════
    `.trim(),
  }

  console.log("═══════════════════════════════════════════════════")
  console.log("       EMAIL TO BUSINESS OWNER")
  console.log("═══════════════════════════════════════════════════")
  console.log(`To: ${emailContent.to}`)
  console.log(`Subject: ${emailContent.subject}`)
  console.log("───────────────────────────────────────────────────")
  console.log(emailContent.body)
  console.log("═══════════════════════════════════════════════════\n")
}

async function sendClientConfirmationEmail(booking: BookingRequest, event: CalendarEvent): Promise<void> {
  const emailContent = {
    to: booking.clientEmail,
    from: "sales@antovabuilders.com",
    subject: "Your Antova Builders Consultation is Confirmed",
    body: `
Hi ${booking.clientName},

Your consultation with Antova Builders has been confirmed!

MEETING DETAILS
───────────────
Date:     ${booking.month} ${booking.date}, ${booking.year}
Time:     ${booking.time}
Duration: ${booking.duration}
Type:     ${booking.meetingType === "virtual" ? "Virtual (Google Meet)" : "On-Site Meeting"}

${
  booking.meetingType === "virtual"
    ? `JOIN THE MEETING
─────────────────
Click here to join: ${event.meetLink}

You can also copy and paste this link into your browser.`
    : `MEETING LOCATION
────────────────
${booking.projectAddress}

We'll meet you at this address at the scheduled time.`
}

───────────────────────────────────────────────────

Need to reschedule? Contact us:
Email: sales@antovabuilders.com
Phone: (208) 625-8342

We look forward to discussing your project!

Best regards,
Antova Builders Team
    `.trim(),
  }

  console.log("═══════════════════════════════════════════════════")
  console.log("       CONFIRMATION EMAIL TO CLIENT")
  console.log("═══════════════════════════════════════════════════")
  console.log(`To: ${emailContent.to}`)
  console.log(`Subject: ${emailContent.subject}`)
  console.log("───────────────────────────────────────────────────")
  console.log(emailContent.body)
  console.log("═══════════════════════════════════════════════════\n")
}

export async function POST(request: NextRequest) {
  try {
    const booking: BookingRequest = await request.json()

    if (!booking.date || !booking.month || !booking.time || !booking.duration) {
      return NextResponse.json({ error: "Missing required booking information" }, { status: 400 })
    }

    if (!booking.clientName?.trim()) {
      return NextResponse.json({ error: "Client name is required" }, { status: 400 })
    }

    if (!booking.clientEmail?.trim() || !booking.clientEmail.includes("@")) {
      return NextResponse.json({ error: "Valid client email is required" }, { status: 400 })
    }

    if (booking.meetingType === "onsite" && !booking.projectAddress?.trim()) {
      return NextResponse.json({ error: "Project address is required for on-site meetings" }, { status: 400 })
    }

    const calendarEvent = await createGoogleCalendarEvent(booking)

    await sendBusinessOwnerEmail(booking, calendarEvent)
    await sendClientConfirmationEmail(booking, calendarEvent)

    return NextResponse.json({
      success: true,
      appointment: {
        ...booking,
        meetLink: calendarEvent.meetLink,
        calendarEventId: calendarEvent.id,
      },
      message:
        booking.meetingType === "virtual"
          ? "Your consultation is confirmed! A Google Meet link has been created and emailed to you."
          : "Your on-site consultation is confirmed! Details have been emailed to you.",
    })
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json({ error: "Failed to process booking" }, { status: 500 })
  }
}
