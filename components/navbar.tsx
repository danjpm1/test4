"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Facebook, Instagram, Menu, X } from "lucide-react"
import { useMobileMenu } from "./mobile-menu-context"

type NavItem = { path: string; text: string }
type SocialLink = { url: string; icon: typeof Facebook; name: string }

const nav: NavItem[] = [
  { path: "/about", text: "About" },
  { path: "/projects", text: "Projects" },
  { path: "/services", text: "Services" },
  { path: "/contact", text: "Contact Us" },
]

const socials: SocialLink[] = [
  { url: "https://www.facebook.com/anovabuilders", icon: Facebook, name: "Facebook" },
  { url: "https://www.instagram.com/anovabuilders", icon: Instagram, name: "Instagram" },
]

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

interface NavbarProps {
  hidden?: boolean
}

export function Navbar({ hidden = false }: NavbarProps) {
  const { isMenuOpen, setIsMenuOpen } = useMobileMenu()
  const pathname = usePathname()

  return (
    <>
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} currentPath={pathname} />

      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-black h-16 transition-transform duration-500 ease-in-out",
          hidden && "-translate-y-full"
        )}
      >
        <div className="w-full px-8 lg:px-12 xl:px-20 h-full flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {nav.map(({ path, text }) => (
              <NavLink key={path} href={path} active={pathname === path}>
                {text}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <SocialIcons variant="desktop" />
          </div>

          <button
            className="md:hidden text-white p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
    </>
  )
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
      <img src="/antova-logo-gold.svg" alt="Antova Builders" className="h-10 w-auto" />
      <span className="text-lg font-semibold tracking-tight">
        <span className="text-white">Antova</span>
        <span className="text-[#c6912c]"> Builders</span>
      </span>
    </Link>
  )
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={cn(
        "text-[15px] font-semibold transition-colors relative text-white",
        !active && "hover:text-[#c6912c]"
      )}
    >
      {children}
      {active && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#c6912c]" />}
    </Link>
  )
}

function SocialIcons({ variant }: { variant: "desktop" | "mobile" }) {
  const styles = {
    desktop: "text-white hover:text-[#c6912c]",
    mobile: "text-white/70 hover:text-[#c6912c]",
  }

  return (
    <>
      {socials.map(({ url, icon: Icon, name }) => (
        <a
          key={url}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className={cn(styles[variant], "transition-colors")}
        >
          <Icon size={24} />
        </a>
      ))}
    </>
  )
}

function MobileMenu({
  isOpen,
  onClose,
  currentPath,
}: {
  isOpen: boolean
  onClose: () => void
  currentPath: string
}) {
  return (
    <div
      className={cn(
        "md:hidden fixed top-16 right-0 w-[72%] h-[calc(100vh-4rem)] bg-black z-40 transition-opacity duration-700",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="h-full flex flex-col px-10 pt-16">
        <p className="text-[#c6912c] text-sm font-semibold tracking-[0.2em] uppercase mb-8">
          BUILDING YOUR DREAM HOME
        </p>

        <nav className="flex flex-col gap-7">
          {nav.map(({ path, text }) => (
            <Link
              key={path}
              href={path}
              onClick={onClose}
              className={cn(
                "text-2xl font-semibold tracking-wide uppercase transition-colors",
                currentPath === path ? "text-[#c6912c]" : "text-white hover:text-[#c6912c]"
              )}
            >
              {text}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 mt-auto pb-24">
          <SocialIcons variant="mobile" />
        </div>
      </div>
    </div>
  )
}
