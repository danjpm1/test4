"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { User, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"text" | "fade" | "logo" | "reveal">("text")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    let animationId: number

    const animate = () => {
      ctx.fillStyle = "#0a0a0a"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 8
        data[i] = Math.max(0, Math.min(255, data[i] + noise))
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise))
      }
      
      ctx.putImageData(imageData, 0, 0)

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("fade"), 1500)
    const timer2 = setTimeout(() => setPhase("logo"), 2000)
    const timer3 = setTimeout(() => setPhase("reveal"), 3500)
    const timer4 = setTimeout(() => onComplete(), 4200)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-700 ${
        phase === "reveal" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      <div
        className={`absolute z-10 transition-opacity duration-500 ease-in-out ${
          phase === "text" ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1
          className="text-[55px] md:text-[66px] lg:text-[77px] font-normal tracking-wide"
          style={{ 
            background: "linear-gradient(90deg, white 0%, white 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 100%)",
            backgroundSize: "200% 100%",
            backgroundPosition: "100% 0",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "textReveal 1.2s ease-out forwards",
          }}
        >
          About Us
        </h1>
      </div>

      <div
        className={`absolute z-10 transition-opacity duration-500 ease-in-out ${
          phase === "logo" || phase === "reveal" ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src="/antova-logo-gold.svg"
          alt="Antova Logo"
          className="h-[100px] md:h-[133px] lg:h-[166px] w-auto"
        />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes textReveal {
            0% {
              background-position: 100% 0;
            }
            100% {
              background-position: 0% 0;
            }
          }
        `
      }} />
    </div>
  )
}

const teamMembers = [
  { 
    name: "Matthew Shaffer", 
    title: "CEO, Managing Principal",
    image: "/images/team/matthew-shaffer.jpg",
    bio: "Matthew founded Antova Builders on the principle that exceptional craftsmanship should come with exceptional service. His sharp vision for luxury construction and client-first approach drives every project we undertake."
  },
  { 
    name: "Ragnar", 
    title: "Construction Engineer",
    image: "/images/team/ragnar.jpg",
    bio: "A master of structural engineering, Ragnar brings precision and innovation to every build. His expertise in modern construction techniques ensures our projects exceed industry standards."
  },
  { 
    name: "Lagertha", 
    title: "Construction Engineer",
    image: "/images/team/lagertha.jpg",
    bio: "Lagertha specializes in sustainable building practices and green certifications. Her commitment to environmental responsibility shapes our approach to modern luxury construction."
  },
  { 
    name: "Rollo", 
    title: "Construction Engineer",
    image: "/images/team/rollo.jpg",
    bio: "With a background in commercial and residential mega-projects, Rollo manages complex builds with remarkable efficiency. His leadership ensures timelines and budgets are always respected."
  },
  { 
    name: "Floki", 
    title: "Construction Engineer",
    image: "/images/team/floki.jpg",
    bio: "Floki is our creative problem-solver, bringing artistic sensibility to technical challenges. His innovative solutions have become signature elements in many of our most celebrated projects."
  },
  { 
    name: "Daniel Anghel", 
    title: "IT & AI Systems Support",
    image: "/images/team/daniel-anghel.jpg",
    bio: "Daniel drives our technological innovation, integrating cutting-edge AI systems and IT infrastructure to streamline operations. His expertise ensures Antova Builders stays at the forefront of construction technology."
  },
]

const sections = [
  {
    number: "01",
    title: "Vision",
    description: "Create a world where every detail is under control and every home reflects refined order. We envision spaces where precision meets artistry, and structure creates freedom.",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Establish clear structures, set the benchmark for craftsmanship, and deliver a seamless journey. From initial consultation to final handover, we orchestrate every element with precision.",
  },
  {
    number: "03",
    title: "Experience",
    description: "Our team brings refined expertise, blending technical mastery with creative problem-solving. Years of dedication translate into flawless execution across every project phase.",
  },
]

const SectionCard = ({
  number,
  title,
  description,
  cardRef,
  isActive,
  zIndex,
}: {
  number: string
  title: string
  description: string
  cardRef: React.RefObject<HTMLDivElement>
  isActive: boolean
  zIndex: number
}) => (
  <div
    ref={cardRef}
    className="sticky top-0 min-h-[50vh] flex items-center px-6 md:px-12 lg:px-20 py-10 transition-colors duration-300 border-t"
    style={{
      zIndex,
      backgroundColor: isActive ? "var(--card-active)" : "black",
      borderTopColor: isActive ? "var(--primary)" : "transparent",
    }}
  >
    <div className="w-full grid grid-cols-1 gap-y-6 gap-x-16 lg:grid-cols-[auto_1fr] items-center">
      <div
        className="leading-none font-bold tracking-tight"
        style={{ fontSize: "var(--text-number-xl)", color: "var(--primary)" }}
      >
        {number}
      </div>
      <div className="flex flex-col justify-center">
        <h3
          className="mb-4 font-medium"
          style={{ fontSize: "var(--text-heading-md)", color: "var(--primary)", lineHeight: 1.1 }}
        >
          {title}
        </h3>
        <p
          className="leading-relaxed max-w-5xl"
          style={{ fontSize: "var(--text-body-md)", color: "var(--text-light)", lineHeight: 1.7 }}
        >
          {description}
        </p>
      </div>
    </div>
  </div>
)

interface TeamMember {
  name: string
  title: string
  image: string
  bio: string
}

const TeamMemberModal = ({ 
  member, 
  isOpen, 
  onClose 
}: { 
  member: TeamMember | null
  isOpen: boolean
  onClose: () => void 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  if (!member) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      {/* Backdrop - lighter blur to see cards behind */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
      
      {/* Close Button - Fixed position top right */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:top-8 md:right-8 z-20 w-12 h-12 flex items-center justify-center bg-black rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Close modal"
      >
        <X size={20} className="text-white" />
      </button>

      {/* Modal Content */}
      <div
        className={`relative z-10 w-full max-w-2xl mx-4 md:mx-auto px-6 md:px-0 transition-all duration-500 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title Section */}
        <div className="mb-8">
          <p className="text-base md:text-lg tracking-widest uppercase text-gray-500 mb-3 font-medium">
            {member.title}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight leading-none">
            {member.name}
          </h2>
        </div>

        {/* Image */}
        <div className="w-full aspect-[16/10] overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center mb-8 shadow-2xl">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none"
                e.currentTarget.nextElementSibling?.classList.remove("hidden")
              }}
            />
          ) : null}
          <div className={`flex items-center justify-center ${member.image ? "hidden" : ""}`}>
            <User size={120} className="text-[#c6912c]/30" />
          </div>
        </div>

        {/* Bio Text */}
        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-xl font-normal">
          {member.bio}
        </p>
      </div>
    </div>
  )
}

const TeamMemberCard = ({ 
  member, 
  onExpand 
}: { 
  member: TeamMember
  onExpand: () => void 
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative flex flex-col border-t-2 pt-6 transition-all duration-300 cursor-pointer group rounded-lg overflow-hidden"
      style={{ 
        backgroundColor: "rgba(0,0,0,0.02)",
        borderTopColor: "var(--primary)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onExpand}
    >
      {/* Expand Button */}
      <button
        className={`absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-white rounded-full shadow-md transition-all duration-300 ${
          isHovered ? "scale-110 shadow-lg" : "scale-100"
        }`}
        aria-label={`Learn more about ${member.name}`}
        onClick={(e) => {
          e.stopPropagation()
          onExpand()
        }}
      >
        <svg 
          width="14" 
          height="14" 
          viewBox="0 0 14 14" 
          fill="none" 
          className={`transition-transform duration-300 ${isHovered ? "rotate-90" : ""}`}
        >
          <path 
            d="M7 1V13M1 7H13" 
            stroke="#1a1a1a" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Image Placeholder */}
      <div 
        className="w-full aspect-[4/3] overflow-hidden mb-6 flex items-center justify-center bg-gray-100 transition-all duration-500 group-hover:bg-gray-50"
      >
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none"
              e.currentTarget.nextElementSibling?.classList.remove("hidden")
            }}
          />
        ) : null}
        <div className={`flex items-center justify-center ${member.image ? "hidden" : ""}`}>
          <User size={72} className="text-[#c6912c]/30" />
        </div>
      </div>

      {/* Text Content */}
      <div className="px-5 pb-6">
        <h3 
          className="text-lg md:text-xl tracking-[0.1em] mb-1 text-gray-900 transition-colors duration-300 group-hover:text-[#c6912c]"
          style={{ fontWeight: 500 }}
        >
          {member.name}
        </h3>
        <p className="text-sm tracking-wide text-gray-600">
          {member.title}
        </p>
      </div>

      {/* Hover Overlay Hint */}
      <div className={`absolute inset-0 border-2 border-[#c6912c] pointer-events-none transition-opacity duration-300 rounded-lg ${
        isHovered ? "opacity-100" : "opacity-0"
      }`} />
    </div>
  )
}

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0)
  const [activeCard, setActiveCard] = useState(1)
  const [showIntro, setShowIntro] = useState(true)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.findIndex((ref) => ref.current === entry.target)
            if (index !== -1) setActiveCard(index + 1)
          }
        })
      },
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" }
    )

    sectionRefs.forEach((ref) => ref.current && observer.observe(ref.current))
    return () => observer.disconnect()
  }, [])

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false)
  }, [])

  const handleExpandMember = (member: TeamMember) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedMember(null), 300)
  }

  return (
    <div className="min-h-screen w-full bg-black">
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      
      <Navbar />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-black">
        <div className="px-4 lg:px-8 xl:px-12 w-full max-w-[1800px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center min-h-[50vh]">
            <h1
              className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight"
              style={{ color: "var(--primary)" }}
            >
              ABOUT US
            </h1>

            <div
              className="border-l-2 pl-8 lg:pl-12"
              style={{ borderColor: "var(--primary)" }}
            >
              <p className="text-lg md:text-xl text-white/60 mb-4">
                Antova Builders began with a singular belief:
              </p>
              <p className="text-2xl md:text-3xl lg:text-4xl text-white leading-snug font-light">
                True luxury is the freedom to relax while experts handle{" "}
                <span style={{ color: "var(--primary)" }}>the complexity.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative w-full bg-black -mb-16"
        style={{
          transform: `translateY(${scrollY * -0.1}px)`,
          transition: "transform 0.45s ease-out",
        }}
      >
        <img
          src="/images/team-construction-new.png"
          alt="Construction team reviewing plans"
          className="h-[250px] w-full object-cover md:h-auto"
        />
      </section>

      <section className="relative w-full bg-black">
        {sections.map((section, index) => (
          <SectionCard
            key={section.title}
            number={section.number}
            title={section.title}
            description={section.description}
            cardRef={sectionRefs[index]}
            isActive={activeCard === index + 1}
            zIndex={index + 1}
          />
        ))}
      </section>

      <section className="relative w-full bg-white py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="mb-16 md:mb-20">
            <h2 
              className="text-3xl md:text-4xl tracking-[0.2em] uppercase text-gray-900"
              style={{ fontWeight: 500 }}
            >
              OUR TEAM
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard 
                key={`${member.name}-${index}`}
                member={member}
                onExpand={() => handleExpandMember(member)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal */}
      <TeamMemberModal 
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
