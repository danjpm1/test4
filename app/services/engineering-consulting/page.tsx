"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number
  suffix?: string
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimatedRef = useRef(false)

  // Intersection Observer to detect visibility
  useEffect(() => {
    const element = ref.current
    if (!element || typeof window === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  // Animation logic - runs when visible
  useEffect(() => {
    if (!isVisible || hasAnimatedRef.current) return
    hasAnimatedRef.current = true

    let startTime: number | null = null
    let animationId: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setCount(Math.floor(end * easeOut))

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [isVisible, end, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

const STATS = [
  { end: 500, suffix: "k+", label: "CLIENT SAVINGS\nSAVED" },
  { end: 100, suffix: "%", label: "PERMITTING\nSUCCESS" },
  { end: 10, suffix: "+", label: "CONSTRUCTION DISPUTES\nRESOLUTION" },
]

export default function EngineeringConsultingPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full overflow-x-hidden bg-black">
      <Navbar />

      {/* HERO */}
      <section className="relative w-full bg-black">
        <div className="flex items-center justify-end px-4 sm:px-8 md:pr-24 lg:pr-32 pt-24 sm:pt-28 md:pt-20 lg:pt-24 pb-8 md:pb-16 lg:pb-20">
          <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] font-bold text-white tracking-tight text-right leading-tight">
            ENGINEERING
            <br />
            & CONSULTING
          </h1>
        </div>
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1]">
          <Image
            src="/luxury-modern-cabin-interior-with-large-windows-wo.jpg"
            alt="Complex engineering project"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* GOLD LINE - Clean transition */}
      <div className="w-full h-[2px] bg-[#D4A574]" />

      {/* STATS SECTION */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* LEFT: ANIMATED STATS */}
            <div className="space-y-10 md:space-y-12">
              {STATS.map((stat, index) => (
                <div key={index} className="flex items-start gap-8">
                  <div className="text-[#c6912c] font-extrabold leading-none text-[56px] sm:text-[70px] md:text-[82px]">
                    <AnimatedCounter
                      end={stat.end}
                      suffix={stat.suffix}
                      duration={2000 + index * 200}
                    />
                  </div>
                  <div className="pt-3">
                    <p className="text-black/90 font-semibold tracking-[0.18em] text-xs sm:text-sm whitespace-pre-line">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: HEADLINE + BUTTON */}
            <div className="lg:pl-8">
              <h2 className="font-extrabold tracking-tight leading-[0.95] text-[44px] sm:text-[56px] md:text-[72px]">
                <span className="text-[#6b6b6b]">WHAT CAN</span>
                <br />
                <span className="text-[#c6912c]">ANTOVA BUILDERS</span>
                <br />
                <span className="text-[#6b6b6b]">DO FOR YOU?</span>
              </h2>
              <div className="mt-8">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-3 border border-[#c6912c] px-6 py-3 text-xs sm:text-sm font-semibold tracking-[0.18em] text-[#c6912c] hover:bg-[#c6912c] hover:text-white transition-colors"
                >
                  VIEW OUR SUCCESS STORIES
                  <span aria-hidden className="text-lg leading-none">›</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
