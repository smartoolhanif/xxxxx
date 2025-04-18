"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Search, Eye, Clock, ArrowUp } from "lucide-react"
import { DashboardLayout } from "@/components/ui/dashboard-layout"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import { ClientOnly } from "@/components/client-only"

interface VisitSenderResponse {
  status: string
  message: string
  data?: {
    success: boolean
    totalTimeTakes: number
    totalViewsSent: number
    uid: string | number
  }
  timestamp: string
}

export default function VisitSender() {
  const [uid, setUid] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<VisitSenderResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const sendVisits = async () => {
    if (!uid) {
      setError("Please enter a player UID")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/visit-sender?uid=${uid}&server_name=bd`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to send visits")
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || "An error occurred while sending visits")
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ClientOnly>
      <DashboardLayout title="Visit Sender" description="Send visits to Free Fire players (BD server only)">
        <KeyboardShortcuts />
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Visit Sender</CardTitle>
            <CardDescription>Enter a player UID to send visits (Bangladesh server only)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="player-uid" className="text-white">
                Player UID
              </Label>
              <div className="relative">
                <Input
                  id="player-uid"
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  placeholder="Enter player UID"
                  className="pr-10"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-300/50">
                  <Search size={18} />
                </div>
              </div>
            </div>

            <div className="bg-amber-800/20 border border-amber-600/30 rounded-md p-3 text-amber-200 text-sm">
              <AlertCircle className="h-4 w-4 inline-block mr-2" />
              This feature only works with Bangladesh (BD) server.
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert variant="destructive" className="border-red-800 bg-red-900/30 text-white">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {result && result.data && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Alert className={`border-teal-700/50 text-white ${
                    result.data.success ? "bg-teal-900/30" : "bg-red-900/30 border-red-800"
                  }`}>
                    <Eye className="h-4 w-4 text-teal-400" />
                    <AlertTitle className="text-lg font-bold">Visit Sent Successfully</AlertTitle>
                    <AlertDescription className="mt-2">
                      <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="font-medium">UID: {result.data.uid}</div>

                        <div className="mt-2 p-2 bg-teal-900/20 rounded-md">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <ArrowUp className="h-4 w-4 inline mr-1 text-teal-300/70" />
                              <span className="text-teal-300/70">Visits Sent:</span>
                              <span className="ml-1 font-medium">{result.data.totalViewsSent}</span>
                            </div>
                            <div>
                              <Clock className="h-4 w-4 inline mr-1 text-teal-300/70" />
                              <span className="text-teal-300/70">Time Taken:</span>
                              <span className="ml-1 font-medium">{result.data.totalTimeTakes.toFixed(3)}s</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex justify-end">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button onClick={sendVisits} disabled={loading} variant="gradient" className="gap-2">
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-t-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Eye className="w-4 h-4" /> Send Visits
                  </>
                )}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </DashboardLayout>
    </ClientOnly>
  )
} 