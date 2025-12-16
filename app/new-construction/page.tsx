import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function NewConstructionPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/image.png" alt="Construction worker" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/80 to-orange-400/40" />
        </div>

        <div className="relative z-10 px-8 lg:px-16 xl:px-24 w-full">
          <div className="max-w-2xl">
            <p className="text-white/90 text-lg md:text-xl mb-4 tracking-wide">CONTACT US</p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none">
              GET IN TOUCH
            </h1>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
