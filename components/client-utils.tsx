"use client"

import React, { useEffect, useState } from "react"

// A wrapper component to ensure client-side rendering for potentially problematic components
export function ClientOnly({ 
  children, 
  fallback = null 
}: { 
  children: React.ReactNode
  fallback?: React.ReactNode 
}) {
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
export function createHydrationSafeComponent<P extends React.ComponentProps<any>>(
  Component: React.ComponentType<P>,
  fallback: React.ReactNode = null
): React.FC<P> {
  const SafeComponent: React.FC<P> = (props) => (
    <ClientOnly fallback={fallback}>
      <Component {...props} />
    </ClientOnly>
  )
  
  return SafeComponent
} 