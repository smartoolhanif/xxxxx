"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, User, Shield, FileJson, ChevronRight, Database, Wrench } from "lucide-react"

export function EnhancedSidebar() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<"apis" | "tools">("apis")
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    apis: true,
    tools: true,
  })
  const pathname = usePathname()

  const toggleSidebar = () => setOpen(!open)
  const closeSidebar = () => setOpen(false)

  // Toggle section expansion
  const toggleSection = (section: "apis" | "tools") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
    setActiveSection(section)
  }

  // Define the navigation items
  const apiItems = [
    { name: "Player Info", path: "/player-info", icon: User },
    { name: "Ban Checker", path: "/ban-checker", icon: Shield },
  ]

  const toolItems = [{ name: "Guest Combiner", path: "/guest-combiner", icon: FileJson }]

  // Check if the current path is active
  const isActive = (path: string) => pathname === path

  // Animation variants
  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
  }

  const overlayVariants = {
    open: { opacity: 1, pointerEvents: "auto" as const },
    closed: { opacity: 0, pointerEvents: "none" as const },
  }

  const itemVariants = {
    open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  }

  const sectionVariants = {
    expanded: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, when: "beforeChildren", staggerChildren: 0.05 },
    },
    collapsed: { height: 0, opacity: 0, transition: { duration: 0.3, when: "afterChildren" } },
  }

  return (
    <>
      {/* Hamburger menu button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-black/20 backdrop-blur-lg border border-white/10 hover:bg-white/10"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      <motion.div
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={overlayVariants}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <motion.div
        initial="closed"
        animate={open ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed inset-y-0 left-0 z-50 w-64 bg-black/80 backdrop-blur-lg border-r border-white/10"
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Free Fire Tools
            </h2>
            <p className="text-sm text-white/60 mt-1">Advanced utilities for Free Fire</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            {/* Dashboard button - positioned at the top and styled differently */}
            <div className="mb-6">
              <Link
                href="/"
                onClick={closeSidebar}
                className={`flex items-center px-4 py-3 rounded-lg transition-all transform ${
                  isActive("/")
                    ? "bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium shadow-lg"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
            </div>

            {/* APIs Section */}
            <div className="mb-4">
              <button
                onClick={() => toggleSection("apis")}
                className={`flex items-center justify-between w-full px-4 py-2 rounded-md transition-colors ${
                  activeSection === "apis"
                    ? "bg-purple-900/50 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center">
                  <Database className="mr-2 h-4 w-4" />
                  <span className="font-medium">APIs</span>
                </div>
                <motion.div animate={{ rotate: expandedSections.apis ? 90 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronRight className="h-4 w-4" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {expandedSections.apis && (
                  <motion.div
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    variants={sectionVariants}
                    className="overflow-hidden"
                  >
                    <ul className="mt-2 ml-4 space-y-1">
                      {apiItems.map((item) => (
                        <motion.li key={item.path} variants={itemVariants}>
                          <Link
                            href={item.path}
                            onClick={closeSidebar}
                            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                              isActive(item.path)
                                ? "bg-purple-700/50 text-white"
                                : "text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.name}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tools Section */}
            <div className="mb-4">
              <button
                onClick={() => toggleSection("tools")}
                className={`flex items-center justify-between w-full px-4 py-2 rounded-md transition-colors ${
                  activeSection === "tools"
                    ? "bg-purple-900/50 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center">
                  <Wrench className="mr-2 h-4 w-4" />
                  <span className="font-medium">Tools</span>
                </div>
                <motion.div animate={{ rotate: expandedSections.tools ? 90 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronRight className="h-4 w-4" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {expandedSections.tools && (
                  <motion.div
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    variants={sectionVariants}
                    className="overflow-hidden"
                  >
                    <ul className="mt-2 ml-4 space-y-1">
                      {toolItems.map((item) => (
                        <motion.li key={item.path} variants={itemVariants}>
                          <Link
                            href={item.path}
                            onClick={closeSidebar}
                            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                              isActive(item.path)
                                ? "bg-purple-700/50 text-white"
                                : "text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <item.icon className="mr-2 h-4 w-4" />
                            {item.name}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-white/10">
            <p className="text-xs text-white/40 text-center">© Exe Toolz All Rights Reserved</p>
          </div>
        </div>
      </motion.div>
    </>
  )
}
