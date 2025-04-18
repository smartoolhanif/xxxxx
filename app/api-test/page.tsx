"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Send, Code } from "lucide-react"
import { DashboardLayout } from "@/components/ui/dashboard-layout"
import { ClientOnly } from "@/components/client-only"

// Example response from ariflexlabs
const exampleData = {
  "AccountInfo": {
    "AccountAvatarId": 902000040,
    "AccountBPBadges": 5,
    "AccountBPID": 1001000083,
    "AccountBannerId": 901000009,
    "AccountCreateTime": 1620981175,
    "AccountEXP": 3617080,
    "AccountLastLogin": 1744380963,
    "AccountLevel": 72,
    "AccountLikes": 32216,
    "AccountName": "ɪᴛㅤᴛᴜꜰᴀɴʏᴛ",
    "AccountRegion": "IND",
    "AccountSeasonId": 44,
    "AccountType": 1,
    "BrMaxRank": 315,
    "BrRankPoint": 2679,
    "CsMaxRank": 314,
    "CsRankPoint": 53,
    "EquippedWeapon": [907300002],
    "ReleaseVersion": "OB48",
    "ShowBrRank": true,
    "ShowCsRank": true,
    "Title": 904590058
  },
  "AccountProfileInfo": {
    "EquippedOutfit": [204035021, 205035021, 203035021, 211035030, 211036049, 214000000],
    "EquippedSkills": [16, 605, 8, 1, 16, 6304, 8, 2, 16, 3003, 8, 3, 16, 3406]
  },
  "GuildInfo": {
    "GuildCapacity": 25,
    "GuildID": "3040206225",
    "GuildLevel": 2,
    "GuildMember": 1,
    "GuildName": "GᴀʙʀᴜㅤAʀᴍʏ",
    "GuildOwner": "3149902112"
  },
  "_credits": "Credits: @ariflexlabs Developer @Uncle_chips",
  "captainBasicInfo": {
    "EquippedWeapon": [907300002],
    "accountId": "3149902112",
    "accountType": 1,
    "badgeCnt": 5,
    "badgeId": "1001000083",
    "bannerId": "901000009",
    "createAt": "1620981175",
    "csMaxRank": 314,
    "csRank": 314,
    "csRankingPoints": 53,
    "exp": 3617080,
    "headPic": "902000040",
    "lastLoginAt": "1744380963",
    "level": 72,
    "liked": 32216,
    "maxRank": 315,
    "nickname": "ɪᴛꜱㅤᴛᴜꜰᴀɴʏᴛ",
    "rank": 315,
    "rankingPoints": 2679,
    "region": "IND",
    "releaseVersion": "OB48",
    "seasonId": 44,
    "showBrRank": true,
    "showCsRank": true,
    "title": 904590058
  },
  "creditScoreInfo": {
    "creditScore": 100,
    "periodicSummaryEndTime": "1744682851",
    "periodicSummaryStartTime": "1744423651",
    "rewardState": 1
  },
  "credits": "Credits: @ariflexlabs Developer @Uncle_chips",
  "petInfo": {
    "exp": 540,
    "id": 1300000112,
    "isSelected": true,
    "level": 4,
    "selectedSkillId": 1315000008,
    "skinId": 1310000122
  },
  "socialinfo": {
    "AccountLanguage": "Language_English",
    "AccountPreferMode": "Prefermode_BR",
    "AccountSignature": "ALWAYS NOT HERE TRY YOUR LUCK"
  }
};

export default function ApiTest() {
  const [jsonData, setJsonData] = useState("")
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!jsonData) {
      setError("Please enter JSON data")
      return
    }

    try {
      // Validate JSON
      JSON.parse(jsonData)
    } catch (err) {
      setError("Invalid JSON format")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/player-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "API request failed")
      }

      setResponse(data)
    } catch (err: any) {
      setError(err.message || "An error occurred while making the API request")
    } finally {
      setLoading(false)
    }
  }

  const loadExample = () => {
    setJsonData(JSON.stringify(exampleData, null, 2))
    setError(null)
  }

  return (
    <ClientOnly>
      <DashboardLayout title="API Test" description="Test the Player Info API with custom data">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">API Callback Test</CardTitle>
            <CardDescription>Paste JSON data to send to the Player Info API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadExample} 
                className="text-xs flex items-center gap-1 text-teal-400 hover:text-teal-300 border-teal-800 bg-teal-900/20"
              >
                <Code size={14} /> Load Example Data
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="json-data" className="text-white">
                JSON Data
              </Label>
              <Textarea
                id="json-data"
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
                placeholder="Paste your JSON data here..."
                className="min-h-[200px] font-mono text-xs"
              />
            </div>

            {error && (
              <Alert variant="destructive" className="border-red-800 bg-red-900/30 text-white">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {response && (
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-white">API Response:</h3>
                <div className="bg-slate-800 p-4 rounded-md overflow-auto max-h-[300px]">
                  <pre className="text-xs text-teal-300 font-mono">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSubmit} disabled={loading} className="bg-teal-600 hover:bg-teal-700">
              {loading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center">
                  <Send className="mr-2 h-4 w-4" />
                  Test API
                </div>
              )}
            </Button>
          </CardFooter>
        </Card>
      </DashboardLayout>
    </ClientOnly>
  )
} 