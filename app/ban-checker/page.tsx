"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Search, User, Globe } from "lucide-react"
import { DashboardLayout } from "@/components/ui/dashboard-layout"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"

interface BanCheckResult {
  player_id: string
  nickname?: string | null
  region?: string | null
  is_banned: boolean
  status: string
  ban_period?: string | null
  ban_message?: string
}

export default function BanChecker() {
  const [playerId, setPlayerId] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<BanCheckResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const checkBanStatus = async () => {
    if (!playerId) {
      setError("Please enter a player ID")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/check?check=checkbanned&id=${playerId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to check ban status")
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || "An error occurred while checking ban status")
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout title="Ban Checker" description="Check if a Free Fire player account has been banned">
      <KeyboardShortcuts />
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Player Status Check</CardTitle>
          <CardDescription>Enter a player ID to check ban status and information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="player-id" className="text-white">
              Player ID
            </Label>
            <div className="relative">
              <Input
                id="player-id"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                placeholder="Enter player ID"
                className="pr-10"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-300/50">
                <Search size={18} />
              </div>
            </div>
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

            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                <Alert
                  className={
                    result.status === "BANNED"
                      ? "bg-red-900/30 border-red-700/50 text-white"
                      : "bg-teal-900/30 border-teal-700/50 text-white"
                  }
                >
                  {result.status === "BANNED" ? (
                    <AlertCircle className="h-4 w-4 text-red-400" />
                  ) : result.status === "NOT BANNED" ? (
                    <CheckCircle className="h-4 w-4 text-teal-400" />
                  ) : null}
                  <AlertTitle className="text-lg font-bold">{result.status || "Result"}</AlertTitle>
                  <AlertDescription className="mt-2">
                    {result.player_id ? (
                      <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="font-medium">Player ID: {result.player_id}</div>

                        {result.nickname && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-teal-300/70" />
                            <span>
                              Nickname: <span className="font-medium">{result.nickname}</span>
                            </span>
                          </div>
                        )}

                        {result.region && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-teal-300/70" />
                            <span>
                              Region: <span className="font-medium">{result.region}</span>
                            </span>
                          </div>
                        )}

                        {result.ban_period && (
                          <div className="mt-2 pt-2 border-t border-white/20">
                            <span className="text-red-300">Ban Duration: {result.ban_period}</span>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      result.message
                    )}
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-end">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button onClick={checkBanStatus} disabled={loading} variant="gradient">
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                  className="mr-2"
                >
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </motion.div>
              ) : (
                "Check Player Status"
              )}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </DashboardLayout>
  )
}
