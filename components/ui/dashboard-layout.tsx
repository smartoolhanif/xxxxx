import type { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  description?: string
}

export function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Main content */}
      <main className="flex-grow flex flex-col p-4 pt-16 md:pl-24 md:p-8 md:pt-8">
        <div className="container mx-auto max-w-6xl">
          {/* Page header */}
          <div className="mb-8 mt-4">
            <h1 className="text-3xl font-bold text-white neon-text">{title}</h1>
            {description && <p className="text-teal-300/80 mt-2">{description}</p>}
          </div>

          {/* Page content */}
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-teal-300/50 text-xs relative z-10 border-t border-teal-500/20 mt-auto">
        <div className="container mx-auto px-4 md:pl-24">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>Free Fire Tools • Advanced utilities for Free Fire game</p>
            <p className="mt-1 md:mt-0">
              Developed by{" "}
              <a
                href="https://instagram.com/rahulexez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300"
              >
                @rahulexez
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
