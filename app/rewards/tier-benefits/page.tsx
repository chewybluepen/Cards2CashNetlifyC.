"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Star, Trophy, Crown, CheckCircle, Info } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Progress } from "@/components/ui/progress"

// Mock tier data
const tiers = [
  {
    name: "Bronze",
    points: 0,
    icon: Star,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    benefits: [
      "Basic rewards catalog access",
      "Earn 1 point per GYD 100 spent",
      "Monthly newsletter with exclusive offers",
      "Birthday reward (100 bonus points)",
    ],
  },
  {
    name: "Silver",
    points: 2500,
    icon: Trophy,
    color: "text-slate-600",
    bgColor: "bg-slate-100",
    benefits: [
      "All Bronze benefits",
      "Earn 1.5 points per GYD 100 spent",
      "Priority customer support",
      "Quarterly bonus rewards",
      "Early access to new features",
    ],
  },
  {
    name: "Gold",
    points: 5000,
    icon: Crown,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    benefits: [
      "All Silver benefits",
      "Earn 2 points per GYD 100 spent",
      "Dedicated account manager",
      "Monthly bonus rewards",
      "Exclusive Gold-only offers",
      "Fee-free currency conversions",
    ],
  },
]

export default function TierBenefits() {
  const [activeTab, setActiveTab] = useState("bronze")
  const [currentPoints] = useState(2500) // Mock current points

  // Calculate progress to next tier
  const currentTier = tiers.find(
    (tier) =>
      currentPoints >= tier.points &&
      (tiers.findIndex((t) => t.name === tier.name) === tiers.length - 1 ||
        currentPoints < tiers[tiers.findIndex((t) => t.name === tier.name) + 1].points),
  )

  const nextTier = tiers.find((tier) => tier.points > currentPoints)
  const progress = nextTier
    ? ((currentPoints - (currentTier?.points || 0)) / (nextTier.points - (currentTier?.points || 0))) * 100
    : 100

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/rewards">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Tier Benefits</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Your Current Status</CardTitle>
            <CardDescription>
              You are currently at {currentTier?.name} tier with {currentPoints} points
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center">
              <div className={`flex h-16 w-16 items-center justify-center rounded-full ${currentTier?.bgColor}`}>
                {currentTier && <currentTier.icon className={`h-8 w-8 ${currentTier.color}`} />}
              </div>
            </div>

            {nextTier && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress to {nextTier.name}</span>
                  <span>{nextTier.points - currentPoints} points to go</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {!nextTier && (
              <div className="rounded-md bg-green-50 p-3 text-center text-green-800">
                <CheckCircle className="mx-auto mb-1 h-5 w-5" />
                <p className="font-medium">Congratulations! You've reached the highest tier.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tier Benefits</CardTitle>
            <CardDescription>Compare benefits across different tiers</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue={currentTier?.name.toLowerCase() || "bronze"}
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bronze">Bronze</TabsTrigger>
                <TabsTrigger value="silver">Silver</TabsTrigger>
                <TabsTrigger value="gold">Gold</TabsTrigger>
              </TabsList>

              {tiers.map((tier) => (
                <TabsContent key={tier.name} value={tier.name.toLowerCase()} className="space-y-4 pt-4">
                  <div className="flex items-center">
                    <div className={`mr-3 rounded-full p-2 ${tier.bgColor}`}>
                      <tier.icon className={`h-5 w-5 ${tier.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{tier.name} Tier</h3>
                      <p className="text-sm text-gray-500">Requires {tier.points} points</p>
                    </div>
                  </div>

                  <div className="rounded-md border p-4">
                    <h4 className="mb-2 font-medium">Benefits:</h4>
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-600" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {currentPoints < tier.points && (
                    <div className="rounded-md bg-blue-50 p-3 text-blue-800">
                      <Info className="mb-1 h-4 w-4" />
                      <p className="text-sm">You need {tier.points - currentPoints} more points to reach this tier.</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button className="w-full bg-purple-600 hover:bg-purple-700" asChild>
              <Link href="/add-funds">Add Funds to Earn Points</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/rewards">Back to Rewards</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  )
}

