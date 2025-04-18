"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function KeyboardShortcuts() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger shortcuts if no input elements are focused
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement ||
        document.activeElement instanceof HTMLSelectElement
      ) {
        return
      }

      switch (e.key.toUpperCase()) {
        case "B":
          router.push("/ban-checker")
          break
        case "G":
          router.push("/guest-combiner")
          break
        case "P":
          router.push("/player-info")
          break
        case "H":
          router.push("/")
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [router])

  return null // This component doesn't render anything
}
