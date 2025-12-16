"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { projects } from "../data"

const ChevronLeft = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
)

const ChevronRight = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
)

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = projects.find((p) => p.slug === slug)

  const [currentImage, setCurrentImage] = useState(0)
  const galleryImages = project?.images || []

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-[#000000]">
        <Navbar />
        <div className="pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center py-20">
            <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
            <p className="text-white/60 mb-8">The project you're looking for doesn't exist.</p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[#F5A623] hover:text-[#B87D35] transition-colors"
            >
              Back to Projects
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-[#000000]">
      <Navbar />

      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-[#F5A623] hover:text-[#B87D35] transition-colors mb-8"
          >
            Back to Projects
          </Link>
        </div>
      </div>

      <div className="w-full mb-12">
        <img src={project.cover || "/placeholder.svg"} alt={project.title} className="w-full h-[70vh] object-cover" />
      </div>

      <main className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h1>
              <p className="text-[#F5A623] text-lg mb-8">{project.location}</p>

              <div className="prose prose-invert max-w-none">
                <p className="text-white/80 text-lg leading-relaxed">{project.description}</p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[#1a1a1a] p-8 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-6">Project Details</h3>
                <dl className="space-y-4">
                  {project.year && (
                    <div>
                      <dt className="text-[#F5A623] text-sm uppercase tracking-wider mb-1">Year</dt>
                      <dd className="text-white text-lg">{project.year}</dd>
                    </div>
                  )}
                  {project.size && (
                    <div>
                      <dt className="text-[#F5A623] text-sm uppercase tracking-wider mb-1">Size</dt>
                      <dd className="text-white text-lg">{project.size}</dd>
                    </div>
                  )}
                  {project.type && (
                    <div>
                      <dt className="text-[#F5A623] text-sm uppercase tracking-wider mb-1">Type</dt>
                      <dd className="text-white text-lg">{project.type}</dd>
                    </div>
                  )}
                  {project.services && (
                    <div>
                      <dt className="text-[#F5A623] text-sm uppercase tracking-wider mb-1">Services</dt>
                      <dd className="text-white text-lg">{project.services}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </div>

          <div className="mt-20 mb-20">
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/projects"
                className="text-white/60 hover:text-white transition-colors text-sm uppercase tracking-wider flex items-center gap-2"
              >
                <ChevronLeft />
                ALL PROJECTS
              </Link>
              <h2 className="text-3xl font-bold text-white tracking-wider">GALLERY</h2>
              <div className="w-32"></div>
            </div>

            {galleryImages.length > 0 && (
              <div className="relative w-full h-[400px] sm:h-[600px] bg-black group">
                <img
                  src={galleryImages[currentImage] || "/placeholder.svg"}
                  alt={`${project.title} - Gallery image ${currentImage + 1}`}
                  className="w-full h-full object-cover"
                />

                <button
                  onClick={prevImage}
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all sm:opacity-0 sm:group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all sm:opacity-0 sm:group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight />
                </button>

                <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 text-white text-sm bg-black/50 px-4 py-2 rounded">
                  {currentImage + 1} / {galleryImages.length}
                </div>
              </div>
            )}

            <div className="mt-12 h-px bg-[#D4A574]"></div>
          </div>

          <div className="mt-20 text-center py-16 border-t border-white/10">
            <h2 className="text-3xl font-semibold text-white mb-6">Ready to Start Your Project?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="h-11 w-full max-w-[200px] px-6 bg-[#D4A574] hover:bg-[#C9A36A] text-black font-semibold rounded-md transition-colors">
                AI Estimator
              </button>
              <Link href="/contact" className="w-full max-w-[200px]">
                <button className="h-11 w-full px-6 bg-transparent hover:bg-[#D4A574] hover:text-black text-white font-semibold rounded-md border-2 border-[#D4A574] transition-colors">
                  Consult With Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
