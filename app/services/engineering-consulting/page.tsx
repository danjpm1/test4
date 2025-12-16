"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

/**
 * Super reliable "in view once":
 * - Uses IntersectionObserver when possible
 * - ALSO uses scroll/resize fallback checks until it triggers once
 */
function useInViewOnce<T extends HTMLElement>(threshold = 0.25, rootMargin = "0px") {
  const [node, setNode] = useState<T | null>(null)
  const [inView, setInView] = useState(false)
  const rafRef = useRef<number | null>(null)

  const ref = useCallback((el: T | null) => {
    setNode(el)
  }, [])

  useEffect(() => {
    if (!node || inView) return

    const isVisible = () => {
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight

      // Trigger when element is at least partially visible.
      // rootMargin effect: we mimic it by expanding the viewport a bit.
      // If you use rootMargin like "0px 0px -10% 0px" we just make it easier to trigger.
      const topVisible = rect.top < vh
      const bottomVisible = rect.bottom > 0
      return topVisible && bottomVisible
    }

    const trigger = () => {
      setInView(true)
      cleanup()
    }

    const onCheck = () => {
      // throttle with rAF
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        if (isVisible()) trigger()
      })
    }

    const cleanup = () => {
      window.removeEventListener("scroll", onCheck)
      window.removeEventListener("resize", onCheck)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      if (observer) observer.disconnect()
    }

    // 1) Always do an immediate check (important)
    if (isVisible()) {
      trigger()
      return
    }

    // 2) Fallback listeners (guaranteed)
    window.addEventListener("scroll", onCheck, { passive: true })
    window.addEventListener("resize", onCheck)

    // 3) IntersectionObserver (nice-to-have)
    let observer: IntersectionObserver | null = null
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) trigger()
        },
        { threshold, rootMargin }
      )
      observer.observe(node)
    }

    // 4) Extra checks shortly after mount (covers late layout / font / image paint)
    const t1 = window.setTimeout(onCheck, 50)
    const t2 = window.setTimeout(onCheck, 200)
    const t3 = window.setTimeout(onCheck, 600)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
      cleanup()
    }
  }, [node, inView, threshold, rootMargin])

  return { ref, inView }
}

/** Count-up animation */
function AnimatedNumber({
  value,
  start,
  duration = 1200,
  suffix = "",
}: {
  value: number
  start: boolean
  duration?: number
  suffix?: string
}) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!start) {
      setDisplay(0)
      return
    }

    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setDisplay(Math.round(eased * value))

      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [start, value, duration])

  return (
    <span>
      {display}
      {suffix}
    </span>
  )
}

export default function EngineeringConsultingPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { ref: proofRef, inView: proofInView } = useInViewOnce<HTMLDivElement>(0.25, "0px 0px -10% 0px")

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

      {/* Proof / Outcomes */}
      <section className="w-full bg-white text-black">
        <div ref={proofRef} className="mx-auto max-w-7xl px-5 md:px-10 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: stats */}
            <div className="space-y-10 md:space-y-12">
              <div className="flex items-start gap-6">
                <div className="text-[#c6912c] text-5xl md:text-6xl font-extrabold leading-none">
                  <AnimatedNumber start={proofInView} value={500} suffix="k+" />
                </div>
                <div className="pt-2">
                  <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-black">
                    Client savings
                  </div>
                  <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-black">
                    delivered
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="text-[#c6912c] text-5xl md:text-6xl font-extrabold leading-none">
                  <AnimatedNumber start={proofInView} value={100} suffix="%" />
                </div>
                <div className="pt-2">
                  <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-black">
                    Permitting
                  </div>
                  <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-black">
                    success
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="text-[#c6912c] text-5xl md:text-6xl font-extrabold leading-none">
                  <AnimatedNumber start={proofInView} value={10} suffix="+" />
                </div>
                <div className="pt-2">
                  <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-black">
                    Construction disputes
                  </div>
                  <div className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-black">
                    resolved
                  </div>
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
                <a
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
