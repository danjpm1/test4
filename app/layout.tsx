import type React from "react"
import type { Metadata } from "next"
import { Inter, Bebas_Neue } from "next/font/google"
import "./globals.css"
import { MobileMenuProvider } from "@/components/mobile-menu-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
})

export const metadata: Metadata = {
  title: "Antova Builders - Modern Precision Construction",
  description:
    "All Out Modern. All Out Precision. Built with Intelligence. Powered by AI-driven estimation and real-time material insights.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebas.variable} font-sans antialiased`}>
        <MobileMenuProvider>{children}</MobileMenuProvider>
      </body>
    </html>
  )
}
