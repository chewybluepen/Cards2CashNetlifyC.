"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Copy, Gift, Share2, Users } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { AnimatedCard } from "@/components/ui/animated-card"
import { ConfettiAnimation } from "@/components/ui/confetti-animation"
import { useAnimatedCounter } from "@/lib/animation-utils"

// Mock referral data
const referralData = {
  code: "JOHN2025",
  totalReferrals: 12,
  pendingReferrals: 3,
  completedReferrals: 9,
  totalEarned: 9000,
  currency: "GYD",
  nextMilestone: 15,
  reward: 1000,
  history: [
    {
      id: "1",
      name: "Sarah M.",
      date: "2025-03-15T10:30:00",
      status: "completed",
      reward: 1000,
      currency: "GYD",
    },
    {
      id: "2",
      name: "Michael T.",
      date: "2025-03-12T14:45:00",
      status: "completed",
      reward: 1000,
      currency: "GYD",
    },
    {
      id: "3",
      name: "Jessica K.",
      date: "2025-03-10T09:15:00",
      status: "completed",
      reward: 1000,
      currency: "GYD",
    },
    {
      id: "4",
      name: "David R.",
      date: "2025-03-08T16:20:00",
      status: "completed",
      reward: 1000,
      currency: "GYD",
    },
    {
      id: "5",
      name: "Emma S.",
      date: "2025-03-05T11:30:00",
      status: "completed",
      reward: 1000,
      currency: "GYD",
    },
    {
      id: "6",
      name: "Robert L.",
      date: "2025-03-03T13:45:00",
      status: "completed",
      reward: 1000,
      currency: "GYD",
    },
    {
      id: "7",
      name: "Lisa P.",
      date: "2025-03-01T10:00:00",
      status: "completed",
      reward: 1000,
      currency: "GYD",
    },
    {
      id: "8",
      name: "James W.",
      date: "2025-02-28T15:30:00",
      status: "completed",
      reward: 1000,
      currency: "GYD",
    },
    {
      id: "9",
      name: "Olivia H.",
      date: "2025-02-25T09:45:00",
      status: "completed",
      reward: 1000,
      currency: "GYD",
    },
    {
      id: "10",
      name: "William B.",
      date: "2025-03-18T14:15:00",
      status: "pending",
      reward: 0,
      currency: "GYD",
    },
    {
      id: "11",
      name: "Sophia C.",
      date: "2025-03-17T11:20:00",
      status: "pending",
      reward: 0,
      currency: "GYD",
    },
    {
      id: "12",
      name: "Noah A.",
      date: "2025-03-16T16:45:00",
      status: "pending",
      reward: 0,
      currency: "GYD",
    },
  ],
}

export default function ReferralTracking() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<any>(null)

  const animatedTotalReferrals = useAnimatedCounter(data?.totalReferrals || 0)
  const animatedTotalEarned = useAnimatedCounter(data?.totalEarned || 0)

  useEffect(() => {
    // Simulate API call to fetch referral data
    const fetchData = async () => {
      setIsLoading(true)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setData(referralData)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(data.code)
    setShowConfetti(true)

    setTimeout(() => {
      setShowConfetti(false)
    }, 3000)
  }

  const handleShareReferralCode = () => {
    // Simulate share functionality
    if (navigator.share) {
      navigator.share({
        title: "Join Cards2Cash",
        text: `Use my referral code ${data.code} to sign up for Cards2Cash and we'll both get GYD 1,000!`,
        url: "https://cards2cash.com/signup",
      })
    } else {
      handleCopyReferralCode()
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/referral">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Referral Tracking</h1>
          </div>
          <p className="mt-1 text-center text-xs italic text-gray-500">
            The Future of Your Finances, For a Borderless World
          </p>
        </header>

        <main className="flex-1 p-4 pb-20">
          <div className="space-y-4">
            <div className="h-32 animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-24 animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
          </div>
        </main>

        <BottomNavigation />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <ConfettiAnimation trigger={showConfetti} />

      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/referral">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Referral Tracking</h1>
        </div>
        <p className="mt-1 text-center text-xs italic text-gray-500">
          The Future of Your Finances, For a Borderless World
        </p>
      </header>

      <main className="flex-1 p-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <AnimatedCard className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <CardContent className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Your Referral Code</h2>
                <Gift className="h-6 w-6" />
              </div>

              <div className="mb-4 flex items-center justify-between rounded-lg bg-white/10 p-3">
                <p className="font-mono text-2xl font-bold">{data.code}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={handleCopyReferralCode}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1 bg-white text-blue-600 hover:bg-white/90" onClick={handleCopyReferralCode}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Code
                </Button>
                <Button className="flex-1 bg-white text-blue-600 hover:bg-white/90" onClick={handleShareReferralCode}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </AnimatedCard>

          <div className="grid grid-cols-2 gap-4">
            <AnimatedCard>
              <CardContent className="p-4 text-center">
                <Users className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                <h3 className="text-sm font-medium text-gray-500">Total Referrals</h3>
                <p className="text-3xl font-bold">{animatedTotalReferrals}</p>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard>
              <CardContent className="p-4 text-center">
                <Gift className="mx-auto mb-2 h-8 w-8 text-green-600" />
                <h3 className="text-sm font-medium text-gray-500">Total Earned</h3>
                <p className="text-3xl font-bold">
                  {animatedTotalEarned} {data.currency}
                </p>
              </CardContent>
            </AnimatedCard>
          </div>

          <AnimatedCard>
            <CardHeader>
              <CardTitle>Next Milestone</CardTitle>
              <CardDescription>
                Refer {data.nextMilestone - data.totalReferrals} more friends to reach your next milestone
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {data.totalReferrals} / {data.nextMilestone}
                  </span>
                  <span className="text-sm font-medium">
                    {Math.round((data.totalReferrals / data.nextMilestone) * 100)}%
                  </span>
                </div>
                <Progress value={(data.totalReferrals / data.nextMilestone) * 100} className="h-2" />
              </div>

              <div className="rounded-md bg-blue-50 p-3 text-blue-800">
                <p className="flex items-center">
                  <Gift className="mr-2 h-5 w-5 text-blue-600" />
                  <span>
                    Reach {data.nextMilestone} referrals and get a bonus of {data.reward} {data.currency}!
                  </span>
                </p>
              </div>
            </CardContent>
          </AnimatedCard>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All ({data.totalReferrals})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({data.completedReferrals})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({data.pendingReferrals})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>All Referrals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.history.map((referral: any, index: number) => (
                    <motion.div
                      key={referral.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div>
                        <p className="font-medium">{referral.name}</p>
                        <p className="text-xs text-gray-500">{new Date(referral.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        {referral.status === "completed" ? (
                          <>
                            <p className="font-medium text-green-600">
                              +{referral.reward} {referral.currency}
                            </p>
                            <Badge className="bg-green-100 text-green-800">Completed</Badge>
                          </>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </AnimatedCard>
            </TabsContent>

            <TabsContent value="completed" className="mt-4">
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>Completed Referrals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.history
                    .filter((referral: any) => referral.status === "completed")
                    .map((referral: any, index: number) => (
                      <motion.div
                        key={referral.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div>
                          <p className="font-medium">{referral.name}</p>
                          <p className="text-xs text-gray-500">{new Date(referral.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">
                            +{referral.reward} {referral.currency}
                          </p>
                          <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        </div>
                      </motion.div>
                    ))}
                </CardContent>
              </AnimatedCard>
            </TabsContent>

            <TabsContent value="pending" className="mt-4">
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>Pending Referrals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.history
                    .filter((referral: any) => referral.status === "pending")
                    .map((referral: any, index: number) => (
                      <motion.div
                        key={referral.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div>
                          <p className="font-medium">{referral.name}</p>
                          <p className="text-xs text-gray-500">{new Date(referral.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        </div>
                      </motion.div>
                    ))}
                </CardContent>
              </AnimatedCard>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <BottomNavigation />
    </div>
  )
}

