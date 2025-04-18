"use client"

import React, { useEffect, useState } from "react"
import "./globals.css"
import { Poppins } from "next/font/google"
import { useRouter } from "next/navigation"

// Use Poppins for a more modern portfolio look
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

// A wrapper component to ensure client-side rendering for potentially problematic components
export function ClientOnly({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// A specialized wrapper for components that might cause hydration issues
export function HydrationSafe<P extends object>(
  Component: React.ComponentType<P>,
  fallback: React.ReactNode = null
): React.FC<P> {
  return function SafeComponent(props: P) {
    return (
      <ClientOnly fallback={fallback}>
        <Component {...props} />
      </ClientOnly>
    )
  }
}

export default function ClientLayout({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  const router = useRouter()

  useEffect(() => {
    document.title = title || "Free Fire Tools"
  }, [title])

  return <main className={`${poppins.variable}`}>{children}</main>
}
