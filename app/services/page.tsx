"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ArrowRight from "@/components/icons/arrow-right"

export default function ServicesPage() {
  const services = [
    {
      title: "Renovations",
      description: "Transform your space with expert craftsmanship. Modern updates to complete makeovers.",
      price: "$2k-5k credits",
      exploreText: "Learn More",
      exploreLink: "/services/renovation",
      quoteLink: "/contact",
      image: "/modern-luxury-home-at-night-with-warm-interior-lig.jpg",
    },
    {
      title: "New Builds",
      description: "Built to last. From concept to completion, we handle every detail.",
      price: "New home from $250k",
      exploreText: "Learn More",
      exploreLink: "/services/new-builds",
      quoteLink: "/contact",
      image: "/luxury-modern-cabin-interior-with-large-windows-wo1.jpg",
    },
    {
      title: "Engineering & Consulting",
      description: "Solving structural challenges with our team. Fast, reliable, quality-driven.",
      price: "Custom pricing available",
      exploreText: "Learn More",
      exploreLink: "/services/engineering-consulting",
      quoteLink: "/contact",
      image: "/images/engineering-blueprints.png",
    },
    {
      title: "Remote Work",
      description:
        "Flexible to relocate to your dream location. Wherever your vision takes you, we'll bring it to life.",
      price: "Nationwide service",
      exploreText: "Learn More",
      exploreLink: "/services/remote-work",
      quoteLink: "/contact",
      image: "/modern-glass-house-reflecting-in-lake-at-sunset-wi.jpg",
    },
    {
      title: "Commercial Projects",
      description: "Large-scale commercial construction. From retail to office buildings, we deliver excellence.",
      price: "Project-based pricing",
      exploreText: "Learn More",
      exploreLink: "/services/commercial-projects",
      quoteLink: "/contact",
      image: "/modern-commercial-building-exterior-glass-facade.jpg",
    },
    {
      title: "Signature Custom Design",
      description: "Bespoke designs tailored to your vision. One-of-a-kind architectural masterpieces.",
      price: "Premium custom pricing",
      exploreText: "Learn More",
      exploreLink: "/services/signature-custom-design",
      quoteLink: "/contact",
      image: "/luxury-custom-home-interior-design-modern-architec.jpg",
    },
  ]

  const phases = [
    { step: "01", title: "Consultation", desc: "Discuss your vision and requirements" },
    { step: "02", title: "Design & Planning", desc: "Create detailed plans and estimates" },
    { step: "03", title: "Build & Deliver", desc: "Execute with precision and care" },
  ]

  return (
    <div className="w-full overflow-x-hidden bg-black">
      <Navbar />

      <main className="pt-20 bg-black min-h-screen">
        {/* Hero Section */}
        <section className="py-20">
          <div className="px-8 lg:px-12 xl:px-20">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-lg md:text-xl text-white/70">
              Comprehensive solutions for modern living, powered by precision and innovation.
            </p>
          </div>
        </section>

        {/* Services Cards - Updated to Porsche-style immersive cards */}
        <section className="pb-24">
          <div className="px-4 md:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {services.map((service, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg cursor-pointer">
                  <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
                    <img
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Subtle gradient only at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    {/* Title centered at top like Porsche */}
                    <div className="absolute top-8 md:top-12 left-0 right-0 text-center">
                      <Link href={service.exploreLink}>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white tracking-[0.15em] uppercase hover:text-[#c6912c] transition-colors cursor-pointer">
                          {service.title}
                        </h3>
                      </Link>
                    </div>

                    {/* Bottom bar with horizontal layout like Porsche */}
                    <div className="absolute bottom-0 left-0 right-0 px-5 py-5 md:px-8 md:py-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
                        {/* Left side: Badge only */}
                        <div className="flex items-center gap-4">
                          <span className="inline-block w-fit px-3 py-1 text-xs md:text-sm font-medium text-white border border-white/40 rounded">
                            {service.price}
                          </span>
                        </div>

                        {/* Right side: CTAs with arrow icon like Porsche */}
                        <div className="flex items-center gap-4">
                          <Link href={service.exploreLink} scroll={true}>
                            <Button
                              size="sm"
                              className="bg-white text-black hover:bg-white/90 font-medium text-sm px-5 py-2.5 rounded-sm transition-all"
                            >
                              {service.exploreText}
                            </Button>
                          </Link>
                          <Link
                            href={service.quoteLink}
                            className="flex items-center gap-2 text-white text-sm font-light hover:text-primary transition-colors"
                          >
                            Get Quote
                            <ArrowRight className="w-5 h-5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section - Updated colors for dark theme */}
        <section className="py-10 md:py-20 bg-zinc-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">
              <h2 className="text-2xl md:text-5xl font-bold text-white mb-3 md:mb-6">Our Process</h2>
              <p className="text-sm md:text-xl text-white/70">
                From concept to completion, we ensure every step is executed with precision.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-8 max-w-5xl mx-auto">
              {phases.map((phase, index) => (
                <div key={index} className="text-center flex flex-col">
                  <div className="text-3xl md:text-6xl font-bold text-[#c6912c]/20 mb-1 md:mb-4">{phase.step}</div>
                  <h3 className="text-sm md:text-2xl font-bold text-white mb-1 md:mb-3 min-h-[2.5rem] md:min-h-0 flex items-center justify-center">
                    {phase.title}
                  </h3>
                  <div className="w-8 md:w-12 h-0.5 md:h-1 bg-[#c6912c] mx-auto mb-1 md:mb-4" />
                  <p className="text-[10px] md:text-base text-white/70 leading-tight">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Updated colors for dark theme */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-6 text-center">
            {/* Two CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/estimator">
                <Button className="h-11 min-w-[200px] px-6 bg-[#c6912c] hover:bg-[#a67923] text-black font-semibold rounded-md transition-all">
                  AI Estimator
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="h-11 min-w-[200px] px-6 bg-transparent hover:bg-[#c6912c] text-white hover:text-black font-semibold rounded-md border-2 border-[#c6912c] transition-all">
                  Contact Us
                </Button>
              </Link>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Let's Build Something <span className="text-[#c6912c]">Amazing</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Ready to start your project? Get in touch with our team today.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  )
}
