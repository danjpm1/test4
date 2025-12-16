"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { projects } from "./data"

export default function ProjectsPage() {
  const [visibleCount, setVisibleCount] = useState(5)

  const visibleProjects = projects.slice(0, visibleCount)
  const hasMore = visibleCount < projects.length

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, projects.length))
  }

  return (
    <div className="w-full min-h-screen bg-[#000000]">
      <Navbar />

      <main className="pt-16 md:pt-24">
        <section className="bg-black py-4 md:py-16 px-4">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {visibleProjects.map((project, index) => (
              <a key={project.slug} href={`/projects/${project.slug}`} className="group">
                <img
                  src={project.cover || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full object-cover aspect-[16/10] transition-transform duration-700 ease-out group-hover:scale-[1.02] rounded-xl overflow-hidden"
                />
                <div className="mt-2 md:mt-4">
                  <h3 className="text-lg md:text-xl font-semibold text-white">{project.title}</h3>
                  <p className="text-[#F5A623] text-xs md:text-sm">{project.location}</p>
                </div>
              </a>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center py-6 md:py-12">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 text-sm uppercase tracking-[0.15em] text-white border border-[#c6912c] hover:border-[#B87D35] hover:text-[#B87D35] transition-all rounded-[4px]"
              >
                Load More
              </button>
            </div>
          )}
        </section>

        <section className="container mx-auto px-6 py-12 md:py-24 max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-6 md:mb-12">
            <button className="h-10 md:h-11 min-w-[180px] md:min-w-[200px] px-5 md:px-6 bg-[#c6912c] hover:bg-[#B87D35] text-black text-sm md:text-base font-semibold rounded-md">
              AI Estimator
            </button>
            <Link href="/contact">
              <button className="h-10 md:h-11 min-w-[180px] md:min-w-[200px] px-5 md:px-6 bg-white hover:bg-[#D4A574] text-black text-sm md:text-base font-semibold rounded-md border-2 border-[#c6912c]">
                Consult With Us
              </button>
            </Link>
          </div>

          <p className="text-white/80 text-center text-sm md:text-lg lg:text-xl leading-snug md:leading-relaxed max-w-2xl mx-auto">
            At Antova Builders, every project blends craftsmanship and technology. From modern remodels to mountain
            homes, we pursue clarity in form, durable materials, and precise execution.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
