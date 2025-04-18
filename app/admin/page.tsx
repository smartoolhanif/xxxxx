"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Users, Activity, CreditCard, Search, Zap, Shield, 
  UserPlus, AlertTriangle, Database, BarChart, ChevronsUp
} from "lucide-react"
import { ClientOnly } from "@/components/client-only"
import { useAuth } from "@/app/contexts/auth-context"

type User = {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
}

type UserWithStats = User & {
  balance: number;
  apiCalls: number;
  lastLogin?: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<UserWithStats[]>([])
  const [logs, setLogs] = useState<any[]>([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalApiCalls, setTotalApiCalls] = useState(0)
  const [totalCredits, setTotalCredits] = useState(0)
  const [recentRegistrations, setRecentRegistrations] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const { user } = useAuth()
  const router = useRouter()

  // Fetch admin data
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/login')
          return
        }

        // Fetch users data
        const usersResponse = await fetch('/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        // Fetch logs data
        const logsResponse = await fetch('/api/admin/logs', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        // Fetch statistics
        const statsResponse = await fetch('/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (usersResponse.ok && logsResponse.ok && statsResponse.ok) {
          const usersData = await usersResponse.json()
          const logsData = await logsResponse.json()
          const statsData = await statsResponse.json()
          
          setUsers(usersData.users || [])
          setLogs(logsData.logs || [])
          setTotalUsers(statsData.totalUsers || 0)
          setTotalApiCalls(statsData.totalApiCalls || 0)
          setTotalCredits(statsData.totalCredits || 0)
          setRecentRegistrations(statsData.recentRegistrations || 0)
        } else {
          console.error('Failed to fetch admin data')
          // Redirect if unauthorized
          if (usersResponse.status === 403 || logsResponse.status === 403) {
            router.push('/dashboard')
          }
        }
      } catch (error) {
        console.error('Error fetching admin data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAdminData()
  }, [router])

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Filter users by search query
  const filteredUsers = searchQuery 
    ? users.filter(user => 
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users

  // Handler for adjusting user balance
  const handleAdjustBalance = async (userId: string, amount: number) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/adjust-balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          amount,
          reason: 'Admin adjustment'
        })
      })

      if (response.ok) {
        // Update the user in the list
        setUsers(users.map(user => 
          user._id === userId ? { ...user, balance: user.balance + amount } : user
        ))
      }
    } catch (error) {
      console.error('Error adjusting balance:', error)
    }
  }

  return (
    <ClientOnly>
      <div className="min-h-screen w-full bg-[#031219] py-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-yellow-300/70 mt-2">
                Manage users, view logs, and monitor system activity
              </p>
            </div>
            <div className="px-4 py-2 bg-yellow-500/20 rounded-md flex items-center">
              <Shield className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-yellow-400 font-medium">Admin Access</span>
            </div>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-[#041e2d]/90 border-yellow-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center text-lg">
                  <Users className="h-5 w-5 mr-2 text-yellow-500" />
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="animate-pulse h-10 bg-gray-700/30 rounded"></div>
                ) : (
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-yellow-500">
                      {totalUsers}
                    </span>
                    <span className="ml-2 text-yellow-300/70 text-sm">
                      {recentRegistrations > 0 && `+${recentRegistrations} new`}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#041e2d]/90 border-yellow-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center text-lg">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  API Calls
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="animate-pulse h-10 bg-gray-700/30 rounded"></div>
                ) : (
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-yellow-500">
                      {totalApiCalls}
                    </span>
                    <span className="ml-2 text-yellow-300/70 text-sm">total</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#041e2d]/90 border-yellow-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center text-lg">
                  <CreditCard className="h-5 w-5 mr-2 text-yellow-500" />
                  Total Credits
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="animate-pulse h-10 bg-gray-700/30 rounded"></div>
                ) : (
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-yellow-500">
                      {totalCredits}
                    </span>
                    <span className="ml-2 text-yellow-300/70 text-sm">in circulation</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#041e2d]/90 border-yellow-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center text-lg">
                  <Activity className="h-5 w-5 mr-2 text-yellow-500" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="animate-pulse h-10 bg-gray-700/30 rounded"></div>
                ) : (
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-white font-medium">Operational</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="users" className="space-y-4">
            <TabsList className="bg-[#041e2d]/90 border-yellow-500/20">
              <TabsTrigger value="users" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-[#041e2d]">
                <Users className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="logs" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-[#041e2d]">
                <Activity className="h-4 w-4 mr-2" />
                Logs
              </TabsTrigger>
              <TabsTrigger value="tools" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-[#041e2d]">
                <Zap className="h-4 w-4 mr-2" />
                Tools
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="space-y-4">
              <Card className="bg-[#041e2d]/90 border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-white">User Management</CardTitle>
                  <CardDescription>View and manage user accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 relative">
                    <Input
                      type="text"
                      placeholder="Search users by username or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10 bg-[#031219]/50 border-yellow-500/20 focus:border-yellow-500/50 text-white"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-300/50" />
                  </div>

                  {isLoading ? (
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="animate-pulse h-16 bg-gray-700/30 rounded"></div>
                      ))}
                    </div>
                  ) : filteredUsers.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-left border-b border-yellow-500/20">
                            <th className="px-4 py-2 text-yellow-300/70">Username</th>
                            <th className="px-4 py-2 text-yellow-300/70">Email</th>
                            <th className="px-4 py-2 text-yellow-300/70">Credits</th>
                            <th className="px-4 py-2 text-yellow-300/70">API Calls</th>
                            <th className="px-4 py-2 text-yellow-300/70">Registration</th>
                            <th className="px-4 py-2 text-yellow-300/70">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((user) => (
                            <tr key={user._id} className="border-b border-yellow-500/10">
                              <td className="px-4 py-3 text-white">{user.username}</td>
                              <td className="px-4 py-3 text-white">{user.email}</td>
                              <td className="px-4 py-3 text-yellow-500 font-medium">{user.balance}</td>
                              <td className="px-4 py-3 text-white">{user.apiCalls}</td>
                              <td className="px-4 py-3 text-white text-sm">
                                {formatDate(user.createdAt)}
                              </td>
                              <td className="px-4 py-3">
                                <div className="flex space-x-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="border-green-500/30 text-green-500 hover:bg-green-500/10 py-0 h-8"
                                    onClick={() => handleAdjustBalance(user._id, 100)}
                                  >
                                    <ChevronsUp className="h-3 w-3 mr-1" />
                                    Add Credits
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 py-0 h-8"
                                  >
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    Ban
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-yellow-300/70">No users found</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10">
                    Previous
                  </Button>
                  <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create User
                  </Button>
                  <Button variant="outline" className="border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10">
                    Next
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="logs" className="space-y-4">
              <Card className="bg-[#041e2d]/90 border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-white">System Logs</CardTitle>
                  <CardDescription>Authentication and system activity logs</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="animate-pulse h-16 bg-gray-700/30 rounded"></div>
                      ))}
                    </div>
                  ) : logs.length > 0 ? (
                    <div className="space-y-2">
                      {logs.map((log) => (
                        <div 
                          key={log._id}
                          className={`p-3 rounded-md border ${
                            log.success 
                              ? 'border-green-500/20 bg-green-500/10' 
                              : 'border-red-500/20 bg-red-500/10'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-white font-medium">
                                {log.action}
                                {log.userId && (
                                  <span className="ml-2 text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full">
                                    User: {log.userId}
                                  </span>
                                )}
                              </p>
                              <p className="text-sm text-yellow-300/70 mt-1">
                                {log.details?.reason || log.details?.description || 'No details'}
                              </p>
                            </div>
                            <span className="text-xs text-yellow-300/50">
                              {log.timestamp ? formatDate(log.timestamp) : 'Unknown time'}
                            </span>
                          </div>
                          <div className="mt-2 text-xs">
                            <span className="text-yellow-300/50">IP: {log.ip || 'Unknown'}</span>
                            <span className="text-yellow-300/50 ml-4">User Agent: {log.userAgent?.substring(0, 50) || 'Unknown'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-yellow-300/70">No logs found</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10">
                    Previous
                  </Button>
                  <Button variant="outline" className="border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10">
                    Export Logs
                  </Button>
                  <Button variant="outline" className="border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10">
                    Next
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="tools" className="space-y-4">
              <Card className="bg-[#041e2d]/90 border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-white">API Tools Management</CardTitle>
                  <CardDescription>Configure and manage available API tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tool Card */}
                    <div className="p-4 rounded-md bg-[#031219]/50 border border-yellow-500/10">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-[#052638]">
                            <Zap className="h-5 w-5 text-yellow-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-white font-medium">Sensitivity Calculator</p>
                            <p className="text-xs text-yellow-300/50">
                              /api/tools/sensitivity
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full mr-2">
                            Active
                          </span>
                          <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full">
                            1 Credit
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div>
                          <p className="text-sm text-yellow-300/70">Usage: 143 calls</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10"
                        >
                          Configure
                        </Button>
                      </div>
                    </div>

                    {/* Tool Card */}
                    <div className="p-4 rounded-md bg-[#031219]/50 border border-yellow-500/10">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-[#052638]">
                            <BarChart className="h-5 w-5 text-yellow-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-white font-medium">Stats Analyzer</p>
                            <p className="text-xs text-yellow-300/50">
                              /api/tools/stats
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full mr-2">
                            Active
                          </span>
                          <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full">
                            2 Credits
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div>
                          <p className="text-sm text-yellow-300/70">Usage: 82 calls</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10"
                        >
                          Configure
                        </Button>
                      </div>
                    </div>

                    {/* Tool Card */}
                    <div className="p-4 rounded-md bg-[#031219]/50 border border-yellow-500/10">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-[#052638]">
                            <Database className="h-5 w-5 text-yellow-500" />
                          </div>
                          <div className="ml-3">
                            <p className="text-white font-medium">Weapon Database</p>
                            <p className="text-xs text-yellow-300/50">
                              /api/tools/weapons
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full mr-2">
                            Active
                          </span>
                          <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full">
                            1 Credit
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div>
                          <p className="text-sm text-yellow-300/70">Usage: 257 calls</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10"
                        >
                          Configure
                        </Button>
                      </div>
                    </div>

                    {/* Tool Card (Disabled) */}
                    <div className="p-4 rounded-md bg-[#031219]/50 border border-red-500/10 opacity-60">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-[#052638]">
                            <Activity className="h-5 w-5 text-red-400" />
                          </div>
                          <div className="ml-3">
                            <p className="text-white font-medium">Performance Tracker</p>
                            <p className="text-xs text-yellow-300/50">
                              /api/tools/performance
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full mr-2">
                            Disabled
                          </span>
                          <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full">
                            3 Credits
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div>
                          <p className="text-sm text-yellow-300/70">Usage: 0 calls</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                          Enable
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                    Add New API Tool
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </ClientOnly>
  )
} 