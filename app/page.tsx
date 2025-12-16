"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"

const SCROLL_THRESHOLD = 50
const SERVICE_CARDS_THRESHOLD = 0.5
const TESTIMONIALS_THRESHOLD = 0.5

const SERVICE_CARDS = [
  {
    title: "Custom Homes.",
    image: "/modern-glass-house-reflecting-in-lake-at-sunset-wi.jpg",
    alt: "Custom homes lifestyle",
    href: "/contact",
  },
  {
    title: "Renovations.",
    image: "/luxury-modern-living-room-wood-ceiling-concrete-fi.jpg",
    alt: "Renovations lifestyle",
    href: "/contact",
  },
  {
    title: "New Construction.",
    image: "/human3.jpg",
    alt: "New construction lifestyle",
    href: "/contact",
  },
]

const OFFER_CARDS = [
  {
    title: "Engineering & Consulting",
    description: "Expert structural solutions and professional consulting for complex builds.",
    price: "Consultation from $500",
    image: "/images/engineering-blueprints.png",
    alt: "Architects working on architectural blueprints and floor plans",
    exploreHref: "/services/engineering-consulting",
    exploreLabel: "Explore Engineering",
  },
  {
    title: "Renovation",
    description: "Modern renovation spaces designed for business excellence.",
    price: "$2k-5k credits",
    image: "/modern-luxury-home-at-night-with-warm-interior-lig.jpg",
    alt: "Modern luxury home at night with mountains",
    exploreHref: "/services/renovation",
    exploreLabel: "Explore Renovation",
  },
]

const TESTIMONIALS = [
  {
    headline: "Expert Guidance",
    service: "Consulting",
    quote:
      "Antova's consulting team transformed our vision into reality. Their AI-powered estimates were spot-on, and the structural insights saved us months of planning time.",
    author: "Michael Chen",
    role: "Owner",
    company: "Aspen Horse Ranch",
    videoThumbnail: "/luxury-modern-cabin-interior-with-large-windows-wo.jpg",
  },
  {
    headline: "Flawless Renovation",
    service: "Renovation",
    quote:
      "Our clinic needed a complete transformation without disrupting patient care. Antova delivered exceptional craftsmanship on schedule.— the attention to detail was extraordinary.",
    author: "Sorin Isparesescu",
    role: "CEO",
    company: "Pain Clinic",
    videoThumbnail: "/project-1.jpg",
  },
  {
    headline: "Dream Home Delivered",
    service: "New Construction",
    quote:
      "From foundation to final walkthrough, Antova exceeded every expectation. Their transparent process and craftsmanship made building our custom home genuinely enjoyable.",
    author: "James Thornton",
    role: "CEO",
    company: "Thornton Capital",
    videoThumbnail: "/project-2.jpg",
  },
]

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
}

function ArrowIcon() {
  return (
    <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-14 h-14 bg-[#c6912c] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  )
}

function QuoteIcon() {
  return (
    <svg className="w-8 h-8 text-[#c6912c]/30" fill="currentColor" viewBox="0 0 24 24">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  )
}

interface ServiceCardProps {
  title: string
  image: string
  alt: string
  href: string
}

function ServiceCard({ title, image, alt, href }: ServiceCardProps) {
  return (
    <Link href={href}>
      <div className="group relative overflow-hidden rounded-xl cursor-pointer transition-transform duration-300 ease-out hover:scale-[1.02] aspect-[4/3]">
        <img src={image || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover object-center text-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 30%, transparent 60%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between">
          <h3 className="text-white font-medium text-base">{title}</h3>
          <ArrowIcon />
        </div>
      </div>
    </Link>
  )
}

interface OfferCardProps {
  title: string
  description: string
  price: string
  image: string
  alt: string
  exploreHref: string
  exploreLabel: string
}

function OfferCard({ title, description, price, image, alt, exploreHref, exploreLabel }: OfferCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
      <div className="relative aspect-[4/5] sm:aspect-[3/2] overflow-hidden">
        <img
          src={image || "/placeholder.svg"}
          alt={alt}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 text-transparent"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/30" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-3">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal text-white tracking-wide">{title}</h3>
          <p className="text-white/90 text-sm lg:text-base leading-relaxed">{description}</p>
          <p className="text-white/70 text-xs sm:text-sm font-medium">{price}</p>
          <div className="flex gap-3 pt-2">
            <Link href={exploreHref} scroll={true}>
              <Button
                size="sm"
                className="bg-white text-black hover:bg-white/90 font-semibold text-xs px-4 py-2 transition-all"
              >
                {exploreLabel}
              </Button>
            </Link>
            <Link href="/contact" scroll={true}>
              <Button
                size="sm"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black text-xs px-4 py-2 transition-all bg-transparent"
              >
                Get Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

interface TestimonialCardProps {
  headline: string
  service: string
  quote: string
  author: string
  role: string
  company: string
  videoThumbnail: string
}

function TestimonialCard({ headline, service, quote, author, role, company, videoThumbnail }: TestimonialCardProps) {
  return (
    <div className="group relative bg-[#111] rounded-2xl overflow-hidden border border-white/10 hover:border-[#c6912c]/40 transition-all duration-500">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c6912c] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-8 lg:p-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[#c6912c] text-xs font-medium tracking-[0.2em] uppercase">{service}</span>
          <QuoteIcon />
        </div>

        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-5 tracking-tight">{headline}</h3>

        <blockquote className="text-white/70 text-base leading-relaxed mb-8">"{quote}"</blockquote>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-[#c6912c]/20 flex items-center justify-center">
            <span className="text-[#c6912c] font-semibold text-sm">{getInitials(author)}</span>
          </div>
          <div>
            <p className="text-white font-medium">{author}</p>
            <p className="text-white/50 text-sm">
              {role}, {company}
            </p>
          </div>
        </div>

        <div className="relative aspect-[2/1] rounded-xl overflow-hidden cursor-pointer">
          <img
            src={videoThumbnail || "/placeholder.svg"}
            alt={`${author} testimonial video`}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 text-transparent"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
          <PlayIcon />

          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 rounded text-white/90 text-xs font-medium">
            2:34
          </div>
        </div>
      </div>
    </div>
  )
}

function useScrollThreshold(ref: React.RefObject<HTMLElement | null>, threshold: number) {
  const [isPastThreshold, setIsPastThreshold] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setIsPastThreshold(rect.top <= window.innerHeight * threshold)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [ref, threshold])

  return isPastThreshold
}

export default function AntovaBuilders() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNavbar, setShowNavbar] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [showSubtitleAndButtons, setShowSubtitleAndButtons] = useState(false)
  const serviceCardsRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)

  const isServiceCardsVisible = useScrollThreshold(serviceCardsRef, SERVICE_CARDS_THRESHOLD)
  const isTestimonialsVisible = useScrollThreshold(testimonialsRef, TESTIMONIALS_THRESHOLD)

  useEffect(() => {
    const titleTimer = setTimeout(() => setShowTitle(true), 300)
    const subtitleTimer = setTimeout(() => setShowSubtitleAndButtons(true), 1000)
    const navbarTimer = setTimeout(() => setShowNavbar(true), 1800)

    return () => {
      clearTimeout(titleTimer)
      clearTimeout(subtitleTimer)
      clearTimeout(navbarTimer)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const topBgColor = isServiceCardsVisible ? "bg-white" : "bg-black"
  const bottomBgColor = isTestimonialsVisible ? "bg-black" : "bg-white"

  return (
    <div className={`min-h-screen ${topBgColor} transition-colors duration-300 ease-in-out overflow-x-hidden`}>
      <Navbar hidden={!showNavbar} />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-winter-mountain-home.png"
            alt="Luxury mountain chalet in winter with warm interior lighting"
            className="w-full h-full object-cover object-center text-transparent"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        <div className="relative z-10 px-6 lg:px-12 xl:px-16 text-center w-full -mt-32 md:-mt-40">
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-2 tracking-tight text-balance text-white transition-all duration-700 ease-out ${
              showTitle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Antova Builders
          </h1>
          <p 
            className={`text-lg md:text-xl lg:text-2xl mb-4 text-white/90 tracking-wide text-balance transition-all duration-700 ease-out ${
              showSubtitleAndButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Precision Built. Luxury Perfected.
          </p>
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-3 transition-all duration-700 ease-out ${
              showSubtitleAndButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto sm:min-w-[264px] h-[40px] bg-[#c6912c] hover:bg-[#a67923] text-black font-medium px-[34px] py-0 text-sm tracking-wide rounded-[4px] shadow-lg hover:shadow-[#c6912c]/50 transition-all hover:scale-105"
            >
              AI Estimator
            </Button>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:min-w-[264px] h-[40px] border-2 border-white text-white hover:bg-white hover:text-black font-medium px-[34px] py-0 text-sm tracking-wide rounded-[4px] transition-all hover:scale-105 bg-transparent"
              >
                Consult With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-black">
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto mb-32 lg:mb-40">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-left text-white">
            Get your offer now.
          </h2>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {OFFER_CARDS.map((card) => (
              <OfferCard key={card.title} {...card} />
            ))}
          </div>
        </div>

        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="max-w-[1000px] border-l-2 border-[#c6912c] pl-8 lg:pl-12">
            <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white leading-snug font-light">
              Luxury is the freedom to relax while experts handle complexity.
            </p>
            <p className="text-lg md:text-xl text-white/60 mt-8 leading-relaxed">
              From blueprint to flourish, Antova commands each variable: harnessing seasoned artisans, AI-powered
              estimating, and a concierge-grade client experience.
            </p>
          </div>
        </div>
      </section>

      <section
        id="services"
        ref={serviceCardsRef}
        className={`py-24 lg:py-32 ${topBgColor} transition-colors duration-300 ease-in-out`}
      >
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {SERVICE_CARDS.map((card) => (
              <ServiceCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 lg:py-32 bg-white">
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-black">
                Smart. Thin. Strong.
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                Our builds redefine precision and performance — crafted with purpose.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/contact" scroll={true} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-[200px] min-h-[48px] h-[48px] bg-[#c6912c] hover:bg-[#a67923] text-white font-medium text-sm tracking-wide rounded-[4px] shadow-lg transition-all hover:scale-105"
                  >
                    Consult With Us
                  </Button>
                </Link>
                <Link href="/projects" scroll={true} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-[200px] min-h-[48px] h-[48px] border border-[#c6912c] text-[#c6912c] hover:bg-[#c6912c] hover:text-white bg-transparent font-medium text-sm tracking-wide rounded-[4px] transition-all hover:scale-105"
                  >
                    View Projects
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative lg:ml-auto flex justify-end">
              <div className="rounded-3xl overflow-hidden shadow-2xl w-full max-w-[520px] lg:max-w-[580px]">
                <img
                  src="/modern-minimalist-architecture-exterior-detail-bla.jpg"
                  alt="Modern architectural detail"
                  className="w-full h-auto object-cover object-center grayscale text-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={testimonialsRef}
        className={`py-24 lg:py-32 ${bottomBgColor} transition-colors duration-300 ease-in-out relative overflow-hidden`}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c6912c]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="max-w-3xl mb-16 lg:mb-20">
            <p className="text-[#c6912c] font-medium tracking-[0.2em] uppercase text-sm mb-4">Testimonials</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Stories of Excellence
            </h2>
            <p className="text-white/60 text-lg md:text-xl leading-relaxed">
              Hear from clients who trusted Antova with their most ambitious projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.headline} {...testimonial} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16 lg:mt-20">
            <Link href="/projects" scroll={true} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:min-w-[264px] h-[48px] bg-[#c6912c] hover:bg-[#a67923] text-white font-medium text-sm tracking-wide rounded-[4px] shadow-lg transition-all hover:scale-105"
              >
                View All Projects
              </Button>
            </Link>
            <Link href="/contact" scroll={true} className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:min-w-[264px] h-[48px] border border-white/20 text-white hover:bg-white hover:text-black bg-transparent font-medium text-sm tracking-wide rounded-[4px] transition-all hover:scale-105"
              >
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
        <div className="absolute inset-0 z-0">
          <img
            src="/modern-luxury-home-at-night-with-warm-interior-lig.jpg"
            alt="Modern home at dusk"
            className="w-full h-full object-cover object-center text-transparent"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 px-6 lg:px-12 xl:px-16 text-center w-full">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-balance">
            Built with Intelligence.
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-black/90 max-w-3xl mx-auto text-balance">
            Powered by AI-driven estimation and real-time material insights.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              className="w-full sm:w-auto sm:min-w-[264px] h-[40px] bg-[#c6912c] hover:bg-[#a67923] text-white font-medium text-sm tracking-wide rounded-[4px] shadow-lg transition-all hover:scale-105"
            >
              Explore AI Estimator
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto sm:min-w-[264px] h-[40px] border border-[#c6912c] text-white hover:bg-[#c6912c] hover:text-white bg-transparent font-medium text-sm tracking-wide rounded-[4px] transition-all hover:scale-105"
            >
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
