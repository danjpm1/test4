"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Calendar,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Copy,
  MessageCircle,
  Video,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Check,
  X,
} from "lucide-react"

type MeetingType = "virtual" | "onsite"

interface Appointment {
  date: number
  month: string
  year: number
  time: string
  duration: string
  meetingType: MeetingType
  projectAddress?: string
  meetLink?: string
}

const TIME_SLOTS = [
  "9:00am",
  "9:30am",
  "10:00am",
  "10:30am",
  "11:00am",
  "11:30am",
  "1:00pm",
  "1:30pm",
  "2:00pm",
  "2:30pm",
  "3:00pm",
  "3:30pm",
  "4:00pm",
]

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function ContactPage() {
  const today = new Date()

  const [duration, setDuration] = useState("30")
  const [meetingType, setMeetingType] = useState<MeetingType>("virtual")
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [formError, setFormError] = useState("")
  const [booked, setBooked] = useState(false)
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [calMonth, setCalMonth] = useState(today.getMonth())
  const [calYear, setCalYear] = useState(today.getFullYear())

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(calYear, calMonth, 1).getDay()
  const isCurrentMonth = today.getFullYear() === calYear && today.getMonth() === calMonth

  function isPastDate(day: number) {
    if (calYear < today.getFullYear()) return true
    if (calYear === today.getFullYear() && calMonth < today.getMonth()) return true
    if (isCurrentMonth && day < today.getDate()) return true
    return false
  }

  function prevMonth() {
    if (calMonth === 0) {
      setCalMonth(11)
      setCalYear(calYear - 1)
    } else {
      setCalMonth(calMonth - 1)
    }
    setSelectedDate(null)
  }

  function nextMonth() {
    if (calMonth === 11) {
      setCalMonth(0)
      setCalYear(calYear + 1)
    } else {
      setCalMonth(calMonth + 1)
    }
    setSelectedDate(null)
  }

  function selectTime(time: string) {
    setSelectedTime(time)
    setShowModal(true)
    setFormError("")
  }

  function closeModal() {
    setShowModal(false)
    setName("")
    setEmail("")
    setFormError("")
  }

  async function submitBooking() {
    if (!name.trim()) {
      setFormError("Name is required")
      return
    }
    if (!email.includes("@")) {
      setFormError("Enter a valid email")
      return
    }
    if (meetingType === "onsite" && !address.trim()) {
      setFormError("Address required for on-site")
      return
    }

    setLoading(true)
    setFormError("")

    try {
      const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`

      let time24 = selectedTime || "09:00"
      const match = time24.match(/(\d+):(\d+)(am|pm)/i)
      if (match) {
        let h = Number.parseInt(match[1])
        if (match[3].toLowerCase() === "pm" && h !== 12) h += 12
        if (match[3].toLowerCase() === "am" && h === 12) h = 0
        time24 = `${h.toString().padStart(2, "0")}:${match[2]}`
      }

      const params = new URLSearchParams({
        name: name.trim(),
        email: email.trim(),
        date: dateStr,
        time: time24,
        duration,
        type: meetingType === "virtual" ? "Virtual" : "On-Site",
      })
      if (meetingType === "onsite") params.set("location", address.trim())

      window.open(`https://koalendar.com/e/meet-with-antova-builders?${params}`, "_blank")

      closeModal()
      setSelectedTime(null)
      setSelectedDate(null)
      setAddress("")
    } catch (e) {
      setFormError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  function renderCalendarDays() {
    const days = []

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const past = isPastDate(day)
      const selected = selectedDate === day

      let className = "aspect-square flex items-center justify-center text-sm rounded-lg transition-colors "
      if (past) className += "text-gray-300 cursor-not-allowed"
      else if (selected) className += "bg-amber-500 text-white font-medium"
      else className += "text-gray-700 hover:bg-gray-100"

      days.push(
        <button key={day} disabled={past} onClick={() => setSelectedDate(day)} className={className}>
          {day}
        </button>,
      )
    }

    return days
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <section className="relative bg-[#0a0a0a] py-24 mt-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight mb-6">CONTACT</h1>
            <a
              href="tel:2086258342"
              className="text-white/90 text-2xl md:text-3xl hover:text-amber-500 transition-colors"
            >
              (208) 625-8342
            </a>
            <p className="text-white/50 mt-4">Response within 24 hours</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <div className="border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
              <Zap className="w-5 h-5 text-white/70 mb-4" />
              <h3 className="text-white font-medium mb-1">Project Completion</h3>
              <p className="text-white/50 text-sm">4-6 weeks</p>
            </div>
            <div className="border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
              <Shield className="w-5 h-5 text-white/70 mb-4" />
              <h3 className="text-white font-medium mb-1">100% Guarantee</h3>
              <p className="text-white/50 text-sm">Precision Built</p>
            </div>
            <div className="border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
              <Clock className="w-5 h-5 text-white/70 mb-4" />
              <h3 className="text-white font-medium mb-1">24/7 Support</h3>
              <p className="text-white/50 text-sm">Always available</p>
            </div>
            <div className="border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors">
              <TrendingUp className="w-5 h-5 text-white/70 mb-4" />
              <h3 className="text-white font-medium mb-1">Performance</h3>
              <p className="text-white/50 text-sm">Optimized</p>
            </div>
          </div>

          <div className="mb-10">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Email</p>
            <button
              onClick={() => navigator.clipboard.writeText("sales@antovabuilders.com")}
              className="w-full border border-white/10 rounded-lg p-5 flex items-center justify-between hover:border-white/20 transition-colors group"
            >
              <span className="text-white text-lg font-mono">sales@antovabuilders.com</span>
              <Copy className="w-5 h-5 text-white/30 group-hover:text-white/50 transition-colors" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-white/10 rounded-lg p-8 flex flex-col items-center hover:border-white/20 transition-colors group"
            >
              <Calendar className="w-6 h-6 text-white/50 mb-3 group-hover:text-white/70" />
              <span className="text-white font-medium">Schedule a Call</span>
              <span className="text-white/50 text-sm mt-1">Book online</span>
            </button>

            <a
              href="sms:+15096717386?body=Hi, I would like to schedule a consultation."
              className="border border-white/10 rounded-lg p-8 flex flex-col items-center hover:border-white/20 transition-colors group"
            >
              <MessageCircle className="w-6 h-6 text-white/50 mb-3 group-hover:text-white/70" />
              <span className="text-white font-medium">Text Us</span>
              <span className="text-white/50 text-sm mt-1">Quick questions</span>
            </a>
          </div>
        </div>
      </section>

      <section id="booking" className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {booked && appointment ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Booking Confirmed</h3>
                <p className="text-gray-500 mb-8">Check your email for details.</p>
                <button
                  onClick={() => {
                    setBooked(false)
                    setAppointment(null)
                  }}
                  className="px-6 py-2.5 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
                >
                  Book Another
                </button>
              </div>
            ) : (
              <div className="grid lg:grid-cols-[340px_1fr_240px] divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <svg width="36" height="36" viewBox="0 0 1500 1500">
                      <g transform="matrix(4.16667,0,0,4.16667,0,0)">
                        <g transform="translate(76.457,331.061)">
                          <path d="M0,-102.938L103.164,-102.938L51.625,0L-51.543,0L0,-102.938Z" fill="#C6912C" />
                        </g>
                        <g transform="translate(231.34,21.3845)">
                          <path
                            d="M0,309.676L103.676,309.676L-51.375,0L-103.031,103.18L-103.211,103.539L0,309.676Z"
                            fill="#C6912C"
                          />
                        </g>
                      </g>
                    </svg>
                    <span className="text-gray-500 text-sm">Antova Builders</span>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-3">Plan your project</h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    Virtual or on-site - we will go over your ideas and figure out next steps together.
                  </p>

                  <Link href="/projects" className="text-amber-600 text-sm hover:underline">
                    View our work
                  </Link>

                  <hr className="my-6" />

                  <div className="flex items-center gap-2 mb-5">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div className="flex gap-1">
                      {["15", "30", "60"].map((d) => (
                        <button
                          key={d}
                          onClick={() => setDuration(d)}
                          className={`px-3 py-1 rounded text-sm ${duration === d ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-600"}`}
                        >
                          {d}m
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-5">
                    <p className="text-gray-400 text-xs uppercase">Meeting Type</p>
                    <button
                      onClick={() => setMeetingType("virtual")}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-left ${
                        meetingType === "virtual"
                          ? "border-amber-500 bg-amber-50 text-amber-700"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <Video className="w-4 h-4" />
                      Virtual (Google Meet)
                    </button>
                    <button
                      onClick={() => setMeetingType("onsite")}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-sm text-left ${
                        meetingType === "onsite"
                          ? "border-amber-500 bg-amber-50 text-amber-700"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      On-Site
                    </button>
                  </div>

                  {meetingType === "onsite" && (
                    <div className="mb-4">
                      <label className="block text-sm text-gray-600 mb-1">Project Address *</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Where should we meet?"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  )}

                  <p className="text-gray-400 text-xs mt-4">Pacific Time (PT)</p>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {MONTHS[calMonth]} <span className="text-gray-400">{calYear}</span>
                    </h4>
                    <div className="flex gap-1">
                      <button onClick={prevMonth} className="p-1.5 hover:bg-gray-100 rounded">
                        <ChevronLeft className="w-5 h-5 text-gray-400" />
                      </button>
                      <button onClick={nextMonth} className="p-1.5 hover:bg-gray-100 rounded">
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {DAYS.map((d) => (
                      <div key={d} className="text-center text-gray-400 text-xs py-2">
                        {d}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
                </div>

                <div className="p-8">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">
                    {selectedDate
                      ? `${DAYS[new Date(calYear, calMonth, selectedDate).getDay()]} ${selectedDate}`
                      : "Select a date"}
                  </h4>

                  {selectedDate ? (
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {TIME_SLOTS.map((time) => (
                        <button
                          key={time}
                          onClick={() => selectTime(time)}
                          className={`w-full py-2.5 px-4 rounded-lg border text-sm transition-colors ${
                            selectedTime === time
                              ? "border-amber-500 bg-amber-50 text-amber-700"
                              : "border-gray-200 text-gray-700 hover:border-gray-300"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">Pick a date first</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Confirm Booking</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4 text-amber-500" />
                {MONTHS[calMonth]} {selectedDate}, {calYear} at {selectedTime}
              </div>
              <div className="flex items-center gap-2 text-gray-500 mt-2">
                <Clock className="w-4 h-4 text-amber-500" />
                {duration} min - {meetingType === "virtual" ? "Google Meet" : "On-Site"}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              {meetingType === "onsite" && (
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Address *</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Project location"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              )}
            </div>

            {formError && <p className="text-red-500 text-sm mt-4">{formError}</p>}

            <div className="flex gap-3 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitBooking}
                disabled={loading}
                className="flex-1 py-2.5 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 disabled:opacity-50"
              >
                {loading ? "..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="bg-black py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps?q=Antova+Builders,+280+Tower+Road,+Cocolalla,+ID+83813&output=embed"
              className="w-full h-96 lg:h-[500px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="bg-white p-12 flex flex-col items-center justify-center text-center">
              <MapPin className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Visit Us</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Antova Builders
                <br />
                280 Tower Road
                <br />
                Cocolalla, ID 83813
              </p>
              <a
                href="https://maps.google.com/?q=280+Tower+Road+Cocolalla+ID+83813"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-900 hover:text-amber-600 uppercase tracking-wide"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
