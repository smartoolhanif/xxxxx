"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star, ThumbsUp, MessageSquare, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClientOnly } from "@/components/client-only"

type Rating = {
  id: string
  username: string
  rating: number
  feedback: string
  date: string
  likes: number
  replies: number
}

export default function RatingsPage() {
  const [ratings, setRatings] = useState<Rating[]>([])
  const [loading, setLoading] = useState(true)
  const [averageRating, setAverageRating] = useState(0)
  
  useEffect(() => {
    // Simulate loading data from API
    setTimeout(() => {
      const mockRatings = [
        {
          id: "1",
          username: "FireWarrior99",
          rating: 5,
          feedback: "This tool helped me improve my gameplay significantly!",
          date: "2023-04-08",
          likes: 28,
          replies: 5
        },
        {
          id: "2",
          username: "HeadshotQueen",
          rating: 4,
          feedback: "Great app with useful features. Just wish it had better weapon stats.",
          date: "2023-04-02",
          likes: 15,
          replies: 2
        },
        {
          id: "3",
          username: "BooyahMaster",
          rating: 5,
          feedback: "Absolutely love the sensitivity calculator! Perfect settings now.",
          date: "2023-03-25",
          likes: 42,
          replies: 8
        },
        {
          id: "4",
          username: "SnipeKing",
          rating: 3,
          feedback: "Decent app but needs more map tactics information.",
          date: "2023-03-18",
          likes: 7,
          replies: 1
        },
        {
          id: "5",
          username: "GarenaLegend",
          rating: 5,
          feedback: "The best Free Fire companion app I've used so far.",
          date: "2023-03-12",
          likes: 36,
          replies: 6
        }
      ]
      
      setRatings(mockRatings)
      
      // Calculate average rating
      const total = mockRatings.reduce((sum, rating) => sum + rating.rating, 0)
      setAverageRating(total / mockRatings.length)
      
      setLoading(false)
    }, 1000)
  }, [])
  
  // Loading spinner fallback
  const loadingFallback = (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#031219]">
      <div className="flex flex-col items-center">
        <div className="h-16 w-16 rounded-full border-4 border-yellow-500/30 border-t-yellow-500 animate-spin"></div>
        <p className="mt-4 text-yellow-500">Loading...</p>
      </div>
    </div>
  )

  return (
    <ClientOnly fallback={loadingFallback}>
      <div className="min-h-screen w-full bg-[#031219] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-yellow-500 hover:bg-yellow-500/10 -ml-3">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to Login
              </Button>
            </Link>
          </div>
          
          <motion.div 
            className="text-center mb-12"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-white mb-4">User Ratings & Reviews</h1>
            <div className="flex items-center justify-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-8 w-8 ${
                      star <= Math.round(averageRating) 
                        ? "text-yellow-500 fill-yellow-500" 
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-3 text-2xl font-semibold text-white">
                {averageRating.toFixed(1)}
              </span>
              <span className="ml-2 text-sm text-yellow-300/70">
                ({ratings.length} reviews)
              </span>
            </div>
          </motion.div>
          
          {loading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-500"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {ratings.map((rating, index) => (
                <motion.div 
                  key={rating.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="bg-[#041e2d]/90 border-yellow-500/20">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg text-white">
                          {rating.username}
                        </CardTitle>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= rating.rating 
                                  ? "text-yellow-500 fill-yellow-500" 
                                  : "text-gray-500"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-yellow-300/50 mt-1">
                        {new Date(rating.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/90">{rating.feedback}</p>
                      
                      <div className="flex items-center mt-4 pt-3 border-t border-yellow-500/10">
                        <div className="flex items-center text-yellow-300/70 text-sm">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>{rating.likes}</span>
                        </div>
                        <div className="flex items-center text-yellow-300/70 text-sm ml-4">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          <span>{rating.replies}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link href="/login">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                Sign Up to See More Reviews
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-xs text-yellow-300/40">
              Free Fire Tools &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </ClientOnly>
  )
} 