"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Search, User, Globe, Database, Heart, Calendar, MessageSquare, Award, Star, Clock } from "lucide-react"
import { DashboardLayout } from "@/components/ui/dashboard-layout"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import { ClientOnly } from "@/components/client-only"

interface PlayerInfo {
  status: string
  message: string
  data?: {
    basic_info: {
      id: string
      name: string
      level?: number | null
      likes?: number | null
      server?: string
      bio?: string | null
      account_created?: string | null
      last_login?: string | null
      credit_score?: number | null
      release_version?: string | null
      preferred_mode?: string | null
      language?: string | null
      rank?: {
        br?: {
          current?: number | null
          max_rank?: number | null
          show?: boolean
        }
        cs?: {
          current?: number | null
          max_rank?: number | null
          show?: boolean
        }
      }
    }
    Guild?: {
      name: string
      id: string
      level?: number | null
      members_count?: number | null
      capacity?: number | null
      leader?: {
        id?: string | null
        name?: string | null
        level?: number | null
      } | null
    } | null
    social_info?: {
      signature?: string | null
      language?: string | null
      preferred_mode?: string | null
    } | null
    animal?: {
      name?: string
      id?: number | null
      level?: number | null
      exp?: number | null
      is_selected?: boolean
      skin_id?: number | null
      selected_skill_id?: number | null
    } | null
    outfit?: number[]
    skills?: number[]
  }
  credits?: string
  timestamp: string
}

export default function PlayerInfo() {
  const [playerId, setPlayerId] = useState("")
  const [region, setRegion] = useState("ind")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PlayerInfo | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchPlayerInfo = async () => {
    if (!playerId) {
      setError("Please enter a player ID")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/player-info?id=${playerId}&region=${region}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch player information")
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching player information")
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ClientOnly>
      <DashboardLayout title="Player Info" description="Get detailed information about a Free Fire player">
        <KeyboardShortcuts />
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Player Information</CardTitle>
            <CardDescription>Enter a player ID to fetch detailed information</CardDescription>
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

            <div className="space-y-2">
              <Label htmlFor="region" className="text-white">
                Region
              </Label>
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="flex h-10 w-full rounded-md border border-teal-500/30 bg-[#041e2d]/60 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-teal-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white"
              >
                <option value="ind">India (IND)</option>
                <option value="bd">Bangladesh (BD)</option>
                <option value="pk">Pakistan (PK)</option>
                <option value="sg">Singapore (SG)</option>
                <option value="id">Indonesia (ID)</option>
                <option value="br">Brazil (BR)</option>
                <option value="th">Thailand (TH)</option>
                <option value="vn">Vietnam (VN)</option>
                <option value="tw">Taiwan (TW)</option>
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
                  <Alert className="bg-teal-900/30 border-teal-700/50 text-white">
                    <User className="h-4 w-4 text-teal-400" />
                    <AlertTitle className="text-lg font-bold">{result.data.basic_info.name}</AlertTitle>
                    <AlertDescription className="mt-2">
                      <motion.div
                        className="space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="font-medium">Player ID: {result.data.basic_info.id}</div>

                        {result.data.basic_info.level && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-teal-300/70" />
                            <span>
                              Level: <span className="font-medium">{result.data.basic_info.level}</span>
                            </span>
                          </div>
                        )}

                        {result.data.basic_info.likes && (
                          <div className="flex items-center gap-2">
                            <Heart className="h-4 w-4 text-teal-300/70" />
                            <span>
                              Likes: <span className="font-medium">{result.data.basic_info.likes.toLocaleString()}</span>
                            </span>
                          </div>
                        )}

                        {result.data.basic_info.server && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-teal-300/70" />
                            <span>
                              Region: <span className="font-medium">{result.data.basic_info.server}</span>
                            </span>
                          </div>
                        )}

                        {result.data.Guild && (
                          <div className="flex items-center gap-2">
                            <Database className="h-4 w-4 text-teal-300/70" />
                            <span>
                              Guild: <span className="font-medium">{result.data.Guild.name}</span>
                              {result.data.Guild.level && (
                                <span className="ml-1 text-sm text-teal-300/70">(Level {result.data.Guild.level})</span>
                              )}
                            </span>
                          </div>
                        )}

                        {result.data.basic_info.preferred_mode && (
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-teal-300/70" />
                            <span>
                              Preferred Mode: <span className="font-medium">{result.data.basic_info.preferred_mode}</span>
                            </span>
                          </div>
                        )}

                        {result.data.basic_info.credit_score && (
                          <div className="flex items-center gap-2">
                            <Award className="h-4 w-4 text-teal-300/70" />
                            <span>
                              Credit Score: <span className="font-medium">{result.data.basic_info.credit_score}</span>
                            </span>
                          </div>
                        )}

                        {(result.data.basic_info.rank?.br?.current || result.data.basic_info.rank?.cs?.current) && (
                          <div className="mt-2 p-2 bg-teal-900/20 rounded-md">
                            <h4 className="text-sm font-medium mb-1 text-teal-200">Rank Information</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              {result.data.basic_info.rank.br?.show && result.data.basic_info.rank.br?.current && (
                                <div>
                                  <span className="text-teal-300/70">BR Rank:</span>
                                  <span className="ml-1 font-medium">{result.data.basic_info.rank.br.current}</span>
                                </div>
                              )}
                              {result.data.basic_info.rank.cs?.show && result.data.basic_info.rank.cs?.current && (
                                <div>
                                  <span className="text-teal-300/70">CS Rank:</span>
                                  <span className="ml-1 font-medium">{result.data.basic_info.rank.cs.current}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {result.data.social_info?.signature && (
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-teal-300/70" />
                            <span>
                              Bio: <span className="font-medium italic">{result.data.social_info.signature}</span>
                            </span>
                          </div>
                        )}

                        {/* Pet Information */}
                        {result.data.animal && (
                          <div className="mt-2 p-2 bg-teal-900/20 rounded-md">
                            <h4 className="text-sm font-medium mb-1 text-teal-200">Pet Information</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-teal-300/70">Pet Level:</span>
                                <span className="ml-1 font-medium">{result.data.animal.level}</span>
                              </div>
                              <div>
                                <span className="text-teal-300/70">EXP:</span>
                                <span className="ml-1 font-medium">{result.data.animal.exp}</span>
                              </div>
                              <div>
                                <span className="text-teal-300/70">Pet ID:</span>
                                <span className="ml-1 font-medium">{result.data.animal.id}</span>
                              </div>
                              <div>
                                <span className="text-teal-300/70">Skin ID:</span>
                                <span className="ml-1 font-medium">{result.data.animal.skin_id}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Equipment Information */}
                        {(result.data.outfit && result.data.outfit.length > 0) || 
                         (result.data.basic_info.equipped_weapon && result.data.basic_info.equipped_weapon.length > 0) ? (
                          <div className="mt-2 p-2 bg-teal-900/20 rounded-md">
                            <h4 className="text-sm font-medium mb-1 text-teal-200">Equipment</h4>
                            <div className="grid grid-cols-1 gap-2 text-sm">
                              {result.data.basic_info.equipped_weapon && result.data.basic_info.equipped_weapon.length > 0 && (
                                <div>
                                  <span className="text-teal-300/70">Weapon ID:</span>
                                  <span className="ml-1 font-medium">
                                    {result.data.basic_info.equipped_weapon.join(", ")}
                                  </span>
                                </div>
                              )}
                              {result.data.outfit && result.data.outfit.length > 0 && (
                                <div className="mt-1">
                                  <span className="text-teal-300/70">Outfit IDs:</span>
                                  <span className="ml-1 font-medium text-xs block mt-1 text-teal-300/90">
                                    {result.data.outfit.join(", ")}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : null}

                        {/* Skills Information */}
                        {result.data.skills && result.data.skills.length > 0 && (
                          <div className="mt-2 p-2 bg-teal-900/20 rounded-md">
                            <h4 className="text-sm font-medium mb-1 text-teal-200">Skills</h4>
                            <div className="grid grid-cols-1 gap-2 text-sm">
                              <div>
                                <span className="text-teal-300/70">Skill IDs:</span>
                                <span className="ml-1 font-medium text-xs block mt-1 text-teal-300/90">
                                  {result.data.skills.join(", ")}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="mt-3 pt-3 border-t border-white/20 grid grid-cols-2 gap-2 text-sm">
                          {result.data.basic_info.account_created && (
                            <div>
                              <Calendar className="h-3 w-3 inline mr-1 text-teal-300/70" />
                              <span className="text-teal-300/70">Created:</span>
                              <span className="ml-1">{result.data.basic_info.account_created}</span>
                            </div>
                          )}
                          
                          {result.data.basic_info.last_login && (
                            <div>
                              <Clock className="h-3 w-3 inline mr-1 text-teal-300/70" />
                              <span className="text-teal-300/70">Last Login:</span>
                              <span className="ml-1">{result.data.basic_info.last_login}</span>
                            </div>
                          )}
                          
                          {result.data.basic_info.release_version && (
                            <div className="col-span-2 mt-1">
                              <span className="text-teal-300/70">Version:</span>
                              <span className="ml-1">{result.data.basic_info.release_version}</span>
                            </div>
                          )}
                        </div>

                        {result.credits && (
                          <div className="mt-2 text-xs text-teal-300/50 text-right">
                            {result.credits}
                          </div>
                        )}
                      </motion.div>
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex justify-end">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button onClick={fetchPlayerInfo} disabled={loading} variant="gradient">
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-t-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  "Get Player Info"
                )}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </DashboardLayout>
    </ClientOnly>
  )
}
