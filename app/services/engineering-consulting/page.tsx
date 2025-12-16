"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function EngineeringConsultingPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full overflow-x-hidden bg-black">
      <Navbar />

      <section className="relative w-full">
        <div className="flex items-center justify-end px-4 sm:px-8 md:pr-24 lg:pr-32 pt-24 sm:pt-28 md:pt-20 lg:pt-24 pb-8 md:pb-16 lg:pb-20 bg-black">
          <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[4rem] lg:text-[5.5rem] font-bold text-white tracking-tight text-right leading-tight">
            ENGINEERING<br />& CONSULTING
          </h1>
        </div>

        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[3/1]">
          <Image
            src="images/Consulting.png"
            alt="Engineering project"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      <div className="bg-black h-16 md:h-32" />
      <div className="w-full h-[2px] bg-[#D4A574]" />

      <Footer />
    </div>
  )
}
