"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

function useInViewOnce<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [inView, threshold])

  return { ref, inView }
}

function AnimatedNumber({
  value,
  duration = 1200,
  suffix = "",
  start = false,
}: {
  value: number
  duration?: number
  suffix?: string
  start?: boolean
}) {
  const [display, setDisplay] = useState(0)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!start || hasStarted.current) return
    
    hasStarted.current = true
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      
      setDisplay(Math.round(eased * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [start, value, duration])

  return (
    <span>
      {display}
      {suffix}
    </span>
  )
}

export default function EngineeringConsultingPage() {
  const { ref: proofRef, inView: proofInView } = useInViewOnce<HTMLDivElement>(0.15)

  return (
    <div className="w-full overflow-x-hidden bg-black">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full">
        <div className="flex items-center justify-end px-4 sm:px-8 md:pr-24 lg:pr-32 pt-24 sm:pt-28 md:pt-20 lg:pt-24 pb-8 md:pb-16 lg:pb-20 bg-black">
          <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] font-bold text-white tracking-tight text-right leading-tight whitespace-nowrap">
            ENGINEERING & CONSULTING
          </h1>
        </div>

        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1]">
          <Image
            src="/images/Consulting.png"
            alt="Engineering consulting"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* Proof / Outcomes (white section) */}
      <section className="w-full bg-white text-black">
        <div ref={proofRef} className="mx-auto max-w-7xl px-5 md:px-10 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: stats */}
            <div className="space-y-10 md:space-y-12">
              <div className="flex items-start gap-6">
                <div className="text-[#c6912c] text-5xl md:text-6xl font-extrabold leading-none">
                  <AnimatedNumber value={500} suffix="k+" start={proofInView} />
                </div>
                <div className="pt-2">
                  <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-black">Client savings</div>
                  <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-black">delivered</div>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="text-[#c6912c] text-5xl md:text-6xl font-extrabold leading-none">
                  <AnimatedNumber value={100} suffix="%" start={proofInView} />
                </div>
                <div className="pt-2">
                  <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-black">Permitting</div>
                  <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-black">success</div>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="text-[#c6912c] text-5xl md:text-6xl font-extrabold leading-none">
                  <AnimatedNumber value={10} suffix="+" start={proofInView} />
                </div>
                <div className="pt-2">
                  <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-black">
                    Construction disputes
                  </div>
                  <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-black">resolved</div>
                </div>
              </div>
            </div>

            {/* Right: headline + CTA */}
            <div className="relative">
              <div className="hidden lg:block absolute -left-8 top-0 h-full w-px bg-black/10" />

              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-right">
                <span className="text-[#6b6b6b]">WHAT CAN</span>
                <br />
                <span className="text-[#c6912c]">ANTOVA BUILDERS</span>
                <br />
                <span className="text-[#6b6b6b]">DO FOR YOU?</span>
              </h2>

              <div className="mt-8 flex justify-end">
                
                  href="/projects"
                  className="inline-flex items-center gap-3 border border-[#c6912c] px-6 py-3 text-xs md:text-sm font-bold tracking-[0.15em] uppercase text-[#c6912c] hover:bg-[#c6912c] hover:text-black transition-colors"
                >
                  View our success stories
                  <span aria-hidden className="text-lg leading-none">
                    ›
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean transition back to black */}
      <div className="w-full h-[2px] bg-[#D4A574]" />
      <div className="bg-black h-10 md:h-16" />

      <Footer />
    </div>
  )
}
