"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const STEPS = [
  { number: "1", title: "", description: "", image: "/placeholder.jpg", alt: "" },
  { number: "2", title: "", description: "", image: "/placeholder.jpg", alt: "" },
  { number: "3", title: "", description: "", image: "/placeholder.jpg", alt: "" },
]

const ROTATION_INTERVAL = 4000
const SWIPE_THRESHOLD = 50

export default function EngineeringConsultingPage() {
  const [activeStep, setActiveStep] = useState(0)
  const touchStartX = useRef(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length)
    }, ROTATION_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return

    const direction = deltaX > 0 ? 1 : -1
    setActiveStep((prev) => (prev + direction + STEPS.length) % STEPS.length)
  }

  const currentStep = STEPS[activeStep]

  return (
    <div className="w-full overflow-x-hidden bg-black">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full">
        <div className="h-40 md:h-64 bg-black" />
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1]">
          <Image
            src="/placeholder.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      <div className="bg-black h-16 md:h-32" />
      <div className="w-full h-[2px] bg-[#D4A574]" />

      {/* Content shell */}
      <section className="bg-black text-white py-12 md:py-32">
        <div className="container mx-auto px-5 md:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-16 mb-10 md:mb-20">
            <div className="h-24" />
            <div className="h-24" />
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden w-full px-5">
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative overflow-hidden"
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeStep * 100}%)` }}
            >
              {STEPS.map((_, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <div className="relative w-full aspect-[4/3] mb-6">
                    <Image src="/placeholder.jpg" alt="" fill className="object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 w-full">
            {STEPS.map((step, i) => {
              const isActive = activeStep === i
              return (
                <button key={i} onClick={() => setActiveStep(i)} className="flex flex-col">
                  <div className={`h-[2px] w-full ${isActive ? "bg-white" : "bg-gray-600"}`} />
                  <div className="flex items-center gap-2 mt-4">
                    <span
                      className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                        isActive
                          ? "bg-[#c6912c] text-black"
                          : "border border-gray-600 text-gray-600"
                      }`}
                    >
                      {step.number}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Desktop carousel */}
        <div className="hidden md:flex w-full justify-center px-6">
          <div className="w-full max-w-[1400px]">
            <div className="relative w-full aspect-[21/9]">
              <Image
                src={currentStep.image}
                alt=""
                fill
                className="object-cover transition-opacity duration-300"
                key={activeStep}
              />
            </div>

            <div className="grid grid-cols-3 gap-8 pt-12">
              {STEPS.map((step, i) => {
                const isActive = activeStep === i
                return (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className="relative text-center"
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] ${
                        isActive ? "bg-[#c6912c]" : "bg-gray-700"
                      }`}
                    />
                    <div className="pt-10" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
