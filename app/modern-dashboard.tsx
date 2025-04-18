"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Shield, FileJson, User, ChevronRight, Zap, Clock, Info, Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ModernDashboard() {
  const [activeCard, setActiveCard] = useState<string | null>(null)

  const tools = [
    {
      id: "player-info",
      title: "Player Info",
      description: "Get detailed information about a Free Fire player",
      icon: <User className="h-6 w-6 text-blue-400" />,
      path: "/player-info",
      shortcut: "P",
      color: "from-blue-500/20 to-indigo-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      id: "like-sender",
      title: "Like Sender",
      description: "Send likes to Free Fire players",
      icon: <Heart className="h-6 w-6 text-pink-400" />,
      path: "/like-sender",
      shortcut: "L",
      color: "from-pink-500/20 to-purple-500/20",
      borderColor: "border-pink-500/30",
    },
    {
      id: "visit-sender",
      title: "Visit Sender",
      description: "Send visits to Free Fire player profiles",
      icon: <Eye className="h-6 w-6 text-violet-400" />,
      path: "/visit-sender",
      shortcut: "V",
      color: "from-violet-500/20 to-indigo-500/20",
      borderColor: "border-violet-500/30",
    },
    {
      id: "ban-checker",
      title: "Ban Checker",
      description: "Check if a Free Fire player account has been banned",
      icon: <Shield className="h-6 w-6 text-teal-400" />,
      path: "/ban-checker",
      shortcut: "B",
      color: "from-teal-500/20 to-cyan-500/20",
      borderColor: "border-teal-500/30",
    },
    {
      id: "guest-combiner",
      title: "Guest Combiner",
      description: "Combine multiple .dat files into a single JSON file",
      icon: <FileJson className="h-6 w-6 text-cyan-400" />,
      path: "/guest-combiner",
      shortcut: "G",
      color: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/30",
    },
  ]

  const stats = [
    { label: "API Calls", value: "1,234", icon: <Zap className="h-5 w-5 text-teal-400" /> },
    { label: "Last Used", value: "2 mins ago", icon: <Clock className="h-5 w-5 text-cyan-400" /> },
    { label: "Status", value: "Online", icon: <Info className="h-5 w-5 text-blue-400" /> },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">HANIF</span> Free Fire Tools
            </h1>
            <p className="text-teal-300/70">Advanced utilities for Free Fire game</p>
          </div>

          <div className="mt-4 md:mt-0">
            <Button variant="gradient">
              Get Started
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="bg-[#062c3e]/60 backdrop-blur-md border border-teal-500/20 rounded-lg p-4 flex items-center"
            >
              <div className="p-3 rounded-full bg-[#041e2d] mr-4">{stat.icon}</div>
              <div>
                <p className="text-sm text-teal-300/70">{stat.label}</p>
                <p className="text-xl font-semibold text-white">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tools section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <span className="w-8 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mr-3"></span>
          Available Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
              onMouseEnter={() => setActiveCard(tool.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <Link href={tool.path} className="block h-full">
                <div
                  className={`h-full bg-gradient-to-br ${tool.color} backdrop-blur-md border ${tool.borderColor} rounded-xl p-6 transition-all duration-300 ${activeCard === tool.id ? "shadow-lg shadow-teal-500/10" : ""}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-full bg-[#041e2d]">{tool.icon}</div>
                    <kbd className="px-2 py-1 bg-[#041e2d]/80 rounded text-xs text-teal-300/70 border border-teal-500/20">
                      {tool.shortcut}
                    </kbd>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">{tool.title}</h3>
                  <p className="text-sm text-teal-300/70">{tool.description}</p>

                  <div
                    className={`mt-4 flex items-center text-teal-400 transition-all duration-300 ${activeCard === tool.id ? "opacity-100" : "opacity-0"}`}
                  >
                    <span className="text-sm font-medium">Open tool</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12 text-center"
      >
        <div className="p-4 bg-[#062c3e]/40 backdrop-blur-sm rounded-lg border border-teal-500/20 inline-block">
          <p className="text-sm text-teal-300/70">
            <strong className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">HANIF</strong> Tools - All utilities are for educational purposes only. Use them responsibly.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
