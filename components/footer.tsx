import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black w-full">
      {/* Thin gold line at top */}
      <div className="w-full h-[1px] bg-[#F5A623]" />

      {/* Main footer content */}
      <div className="px-4 md:px-6 lg:px-12 xl:px-20 py-6 md:py-12 w-full">
        <div className="flex flex-row justify-between items-center gap-4 lg:items-start lg:gap-12">
          {/* Left - Navigation */}
          <div>
            <nav className="flex gap-4 md:gap-8 text-sm md:text-base text-white">
              <Link href="/about" className="hover:text-[#F5A623] transition-colors">
                About
              </Link>
              <Link href="/projects" className="hover:text-[#F5A623] transition-colors">
                Projects
              </Link>
              <Link href="/services" className="hover:text-[#F5A623] transition-colors">
                Services
              </Link>
            </nav>
          </div>

          {/* Right - Contact Text */}
          <div className="text-right">
            <Link href="/contact">
              <h2 className="text-2xl md:text-5xl lg:text-7xl font-bold tracking-tight lowercase text-white hover:text-[#F5A623] transition-colors cursor-pointer">
                contact us
              </h2>
            </Link>
          </div>
        </div>

        {/* Bottom row: Logo and Copyright */}
        <div className="mt-6 md:mt-16 pt-4 md:pt-8 border-t border-gray-800 flex flex-row justify-between items-center gap-4 md:gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
            <img src="/antova-logo-gold.svg" alt="Antova Builders Logo" className="h-6 md:h-8 w-auto" />
            <div className="text-sm md:text-lg font-semibold tracking-tight">
              <span className="text-white">Antova</span>
              <span className="text-[#C6912C]"> Builders</span>
            </div>
          </Link>

          {/* Copyright */}
          <div className="text-xs md:text-sm text-gray-500">© 2025 Antova Builders.</div>
        </div>
      </div>
    </footer>
  )
}
