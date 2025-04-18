"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home, Database, Wrench, Shield, FileJson, User, Settings, Info, Heart, Eye } from "lucide-react"

export function ModernNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const menuItems = [
    { name: "Dashboard", path: "/", icon: Home },
    {
      name: "API Tools",
      icon: Database,
      submenu: [
        { name: "Player Info", path: "/player-info", icon: User },
        { name: "Like Sender", path: "/like-sender", icon: Heart },
        { name: "Visit Sender", path: "/visit-sender", icon: Eye },
        { name: "Ban Checker", path: "/ban-checker", icon: Shield },
      ],
    },
    {
      name: "Utilities",
      icon: Wrench,
      submenu: [{ name: "Guest Combiner", path: "/guest-combiner", icon: FileJson }],
    },
  ]

  const isActive = (path: string) => pathname === path

  if (!mounted) return null

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-teal-500/20 backdrop-blur-md border border-teal-500/30 text-white md:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 h-full w-20 bg-[#041e2d]/80 backdrop-blur-md border-r border-teal-500/20 flex-col items-center py-8 z-40">
        <div className="mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
            <span className="text-[#041e2d] font-bold text-sm">HANIF</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center space-y-6">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group">
              {item.submenu ? (
                <>
                  <button className="w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-teal-400 transition-colors relative">
                    <item.icon size={24} />
                  </button>

                  {/* Submenu tooltip */}
                  <div className="absolute left-20 top-0 hidden group-hover:block">
                    <div className="bg-[#062c3e] border border-teal-500/20 rounded-lg shadow-lg py-2 px-1 min-w-40">
                      <div className="text-xs text-teal-400 font-medium px-3 pb-1 mb-1 border-b border-teal-500/20">
                        {item.name}
                      </div>
                      {item.submenu.map((subitem, subindex) => (
                        <Link
                          key={subindex}
                          href={subitem.path}
                          className={`flex items-center px-3 py-2 rounded-md text-sm ${
                            isActive(subitem.path)
                              ? "bg-teal-500/20 text-white"
                              : "text-white/70 hover:bg-teal-500/10 hover:text-white"
                          }`}
                        >
                          <subitem.icon size={16} className="mr-2" />
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.path}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    isActive(item.path) ? "bg-teal-500/20 text-white" : "text-white/70 hover:text-teal-400"
                  }`}
                >
                  <item.icon size={24} />

                  {/* Tooltip */}
                  <div className="absolute left-20 hidden group-hover:block">
                    <div className="bg-[#062c3e] border border-teal-500/20 rounded-lg shadow-lg py-2 px-4">
                      <span className="whitespace-nowrap text-sm">{item.name}</span>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="mt-auto space-y-4">
          <button className="w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-teal-400 transition-colors group relative">
            <Settings size={20} />

            {/* Tooltip */}
            <div className="absolute left-20 hidden group-hover:block">
              <div className="bg-[#062c3e] border border-teal-500/20 rounded-lg shadow-lg py-2 px-4">
                <span className="whitespace-nowrap text-sm">Settings</span>
              </div>
            </div>
          </button>

          <button className="w-12 h-12 rounded-full flex items-center justify-center text-white/70 hover:text-teal-400 transition-colors group relative">
            <Info size={20} />

            {/* Tooltip */}
            <div className="absolute left-20 hidden group-hover:block">
              <div className="bg-[#062c3e] border border-teal-500/20 rounded-lg shadow-lg py-2 px-4">
                <span className="whitespace-nowrap text-sm">About</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMenu} />

            <motion.div
              className="absolute right-0 top-0 bottom-0 w-64 bg-[#041e2d]/95 backdrop-blur-md border-l border-teal-500/20 shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
            >
              <div className="flex flex-col h-full p-4">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-teal-500/20">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center mr-3">
                      <span className="text-[#041e2d] font-bold text-xs">HANIF</span>
                    </div>
                    <span className="text-white font-medium">Free Fire Tools</span>
                  </div>
                  <button onClick={closeMenu} className="text-white/70 hover:text-white">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <nav className="space-y-1">
                    <Link
                      href="/"
                      onClick={closeMenu}
                      className={`flex items-center px-3 py-3 rounded-lg ${
                        isActive("/")
                          ? "bg-teal-500/20 text-white"
                          : "text-white/70 hover:bg-teal-500/10 hover:text-white"
                      }`}
                    >
                      <Home size={20} className="mr-3" />
                      Dashboard
                    </Link>

                    {menuItems.slice(1).map((category, index) => (
                      <div key={index} className="mt-4">
                        <div className="px-3 py-2 text-xs font-medium text-teal-400 uppercase tracking-wider">
                          {category.name}
                        </div>
                        <div className="mt-1 space-y-1">
                          {category.submenu?.map((item, subIndex) => (
                            <Link
                              key={subIndex}
                              href={item.path}
                              onClick={closeMenu}
                              className={`flex items-center px-3 py-2 rounded-lg ${
                                isActive(item.path)
                                  ? "bg-teal-500/20 text-white"
                                  : "text-white/70 hover:bg-teal-500/10 hover:text-white"
                              }`}
                            >
                              <item.icon size={18} className="mr-3" />
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </nav>
                </div>

                <div className="mt-auto pt-4 border-t border-teal-500/20">
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>© HANIF</span>
                    <span>v1.0.0</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
