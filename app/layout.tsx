import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { ModernNavigation } from "@/components/modern-navigation"
import { AnimatedBackground } from "@/components/animated-background"
import { ClientOnly } from "@/components/client-only"

// Use Poppins for a more modern look
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "HANIF - Free Fire Tools Dashboard",
  description: "Advanced tools for Free Fire game by HANIF",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
        className={`${poppins.variable} font-sans bg-[#041e2d] text-white`}
        suppressHydrationWarning={true}
      >
        <ClientOnly>
          <AnimatedBackground />
          <ModernNavigation />
          <div className="min-h-screen pt-16 md:pl-20">{children}</div>
        </ClientOnly>
      </body>
    </html>
  )
}


import './globals.css'