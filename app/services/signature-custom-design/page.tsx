"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const STEPS = [
  {
    number: "1",
    title: "Envision",
    description: "We listen to your dreams and translate them into architectural concepts that are uniquely yours.",
    image: "/aerial.jpg",
    alt: "Custom design consultation",
  },
  {
    number: "2",
    title: "Design",
    description: "Every detail is intentional — from floor plans to finishes, crafted around how you live.",
    image: "/luxury-modern-cabin-interior-with-large-windows-wo1.jpg",
    alt: "Custom architectural design",
  },
  {
    number: "3",
    title: "Realize",
    description: "Your one-of-a-kind home comes to life — a signature space that exists nowhere else.",
    image: "/modern-luxury-home-at-night-with-warm-interior-lig.jpg",
    alt: "Completed custom luxury home",
  },
]

const ROTATION_INTERVAL = 4000
const SWIPE_THRESHOLD = 50

export default function CustomDesignPage() {
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

      <section className="relative w-full">
        <div className="flex items-center justify-end px-4 sm:px-8 md:pr-24 lg:pr-32 pt-24 sm:pt-28 md:pt-20 lg:pt-24 pb-8 md:pb-16 lg:pb-20 bg-black">
          <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] font-bold text-white tracking-tight text-right leading-tight">
            SIGNATURE<br />CUSTOM DESIGN
          </h1>
        </div>

        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1]">
          <Image
            src="/luxury-modern-cabin-interior-with-large-windows-wo.jpg"
            alt="Signature custom designed home"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      <div className="bg-black h-16 md:h-32" />
      <div className="w-full h-[2px] bg-[#D4A574]" />

      <section className="bg-black text-white py-12 md:py-32">
        <div className="container mx-auto px-5 md:px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-16 mb-10 md:mb-20">
            <div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1 md:mb-4">
                Your Story.
              </h2>
              <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic text-gray-400">
                Our Craft.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6 text-[15px] md:text-lg text-gray-300 mt-4 lg:mt-0">
              <p className="leading-[1.7] md:leading-8">
                Antova Builder creates bespoke homes designed entirely around you — your lifestyle, your taste, your
                vision. No templates, no compromises, just pure custom architecture.
              </p>
              <p className="leading-[1.7] md:leading-8">
                From the initial sketch to the final walkthrough, every decision reflects your personality. We
                collaborate closely with you to design spaces that feel like they could only belong to you — because
                they do.
              </p>
              <p className="font-semibold text-white pt-1 md:pt-2">One client. One design. One masterpiece.</p>
            </div>
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
              {STEPS.map((step, i) => (
                <div key={i} className="w-full flex-shrink-0">
                  <div className="relative w-full aspect-[4/3] mb-6">
                    <Image src={step.image} alt={step.alt} fill className="object-cover object-center" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4 w-full">
            {STEPS.map((step, i) => {
              const isActive = activeStep === i
              return (
                <button key={i} onClick={() => setActiveStep(i)} className="flex flex-col cursor-pointer">
                  <div className={`h-[2px] w-full transition-colors duration-300 ${isActive ? "bg-white" : "bg-gray-600"}`} />
                  <div className="flex items-center gap-2 mt-4">
                    <span
                      className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300 ${
                        isActive ? "bg-[#c6912c] text-black" : "bg-transparent border border-gray-600 text-gray-600"
                      }`}
                    >
                      {step.number}
                    </span>
                    <h3 className={`text-sm font-semibold transition-colors duration-300 ${isActive ? "text-white" : "text-gray-600"}`}>
                      {step.title}
                    </h3>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="text-left pr-8 mt-2">
            <p className="text-sm text-gray-300 leading-relaxed">{currentStep.description}</p>
          </div>
        </div>

        {/* Desktop carousel */}
        <div className="hidden md:flex w-full justify-center px-6">
          <div className="w-full max-w-[1400px]">
            <div className="relative w-full aspect-[21/9]">
              <Image
                src={currentStep.image}
                alt={currentStep.alt}
                fill
                className="object-cover object-center transition-opacity duration-300"
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
                    className="relative text-center cursor-pointer transition-all hover:opacity-80"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-[2px] transition-colors ${isActive ? "bg-[#c6912c]" : "bg-gray-700"}`} />

                    <div className="flex items-center justify-center gap-3 pt-6 pb-4">
                      <span
                        className={`flex items-center justify-center w-10 h-10 rounded-full text-lg font-bold transition-all duration-300 ${
                          isActive ? "bg-[#c6912c] text-black" : "bg-transparent border-2 border-gray-600 text-gray-600"
                        }`}
                      >
                        {step.number}
                      </span>
                      <h3 className={`text-xl font-semibold transition-colors duration-300 ${isActive ? "text-white" : "text-gray-500"}`}>
                        {step.title}
                      </h3>
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed px-1 sm:px-0 transition-colors ${isActive ? "text-white" : "text-gray-500"}`}>
                      {step.description}
                    </p>
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
