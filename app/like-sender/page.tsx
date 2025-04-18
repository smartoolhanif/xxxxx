"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Search, User, Heart, ArrowUp, ArrowDown } from "lucide-react"
import { DashboardLayout } from "@/components/ui/dashboard-layout"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import { ClientOnly } from "@/components/client-only"

interface LikeSenderResponse {
  status: string
  message: string
  data?: {
    status: string
    nickname: string
    uid: number | string
    likesSent: number
    likesBefore: number
    likesAfter: number
  }
  timestamp: string
}

export default function LikeSender() {
  const [uid, setUid] = useState("")
  const [serverName, setServerName] = useState("ind")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<LikeSenderResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const sendLikes = async () => {
    if (!uid) {
      setError("Please enter a player UID")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/like-sender?uid=${uid}&server_name=${serverName}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send likes")
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || "An error occurred while sending likes")
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ClientOnly>
      <DashboardLayout title="Like Sender" description="Send likes to Free Fire players">
        <KeyboardShortcuts />
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Like Sender</CardTitle>
            <CardDescription>Enter a player UID to send likes</CardDescription>
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

            <div className="space-y-2">
              <Label htmlFor="server" className="text-white">
                Server
              </Label>
              <select
                id="server"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                className="flex h-10 w-full rounded-md border border-teal-500/30 bg-[#041e2d]/60 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-teal-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white"
              >
                <option value="ind">India (IND)</option>
                <option value="bd">Bangladesh (BD)</option>
                <option value="sg">Singapore (SG)</option>
              </select>
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
                    result.data.status === "success" ? "bg-teal-900/30" : "bg-red-900/30 border-red-800"
                  }`}>
                    <User className="h-4 w-4 text-teal-400" />
                    <AlertTitle className="text-lg font-bold">{result.data.nickname}</AlertTitle>
                    <AlertDescription className="mt-2">
                      <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="font-medium">UID: {result.data.uid}</div>

                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-pink-400" />
                          <span>
                            Likes Sent: <span className="font-medium">{result.data.likesSent}</span>
                          </span>
                        </div>

                        <div className="mt-2 p-2 bg-teal-900/20 rounded-md">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <ArrowDown className="h-4 w-4 inline mr-1 text-teal-300/70" />
                              <span className="text-teal-300/70">Before:</span>
                              <span className="ml-1 font-medium">{result.data.likesBefore.toLocaleString()}</span>
                            </div>
                            <div>
                              <ArrowUp className="h-4 w-4 inline mr-1 text-teal-300/70" />
                              <span className="text-teal-300/70">After:</span>
                              <span className="ml-1 font-medium">{result.data.likesAfter.toLocaleString()}</span>
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
              <Button onClick={sendLikes} disabled={loading} variant="gradient" className="gap-2">
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-t-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Heart className="w-4 h-4" /> Send Likes
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