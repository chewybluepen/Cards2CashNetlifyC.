"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, Info, ShoppingBag, Plane, Utensils, Copy, ExternalLink } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { toast } from "@/components/ui/use-toast"

// Mock rewards data with updated dates (after March 27, 2025)
const availableRewards = [
  {
    id: 1,
    category: "shopping",
    title: "15% off at FashionHub",
    points: 1000,
    expires: "2025-06-15",
    icon: ShoppingBag,
    description:
      "Get 15% off on all clothing and accessories at FashionHub. Valid for both online and in-store purchases.",
    code: "FASHION15",
    terms: [
      "Valid for all products except sale items",
      "One-time use per customer",
      "Valid until June 15, 2025",
      "In-store and online",
    ],
    website: "https://fashionhub.gy",
  },
  {
    id: 2,
    category: "travel",
    title: "Airport Lounge Access",
    points: 2500,
    expires: "2025-08-30",
    icon: Plane,
    description:
      "Enjoy complimentary access to the executive lounge at Cheddi Jagan International Airport for one visit.",
    code: "LOUNGE25",
    terms: [
      "Valid for one-time access only",
      "Must present digital voucher at lounge reception",
      "Valid until August 30, 2025",
      "Subject to lounge capacity",
    ],
    website: "https://airport.gy/lounges",
  },
  {
    id: 3,
    category: "dining",
    title: "Buy 1 Get 1 Free at DineDelight",
    points: 750,
    expires: "2025-06-30",
    icon: Utensils,
    description:
      "Buy one main course and get a second main course of equal or lesser value for free at DineDelight restaurant.",
    code: "DINE2FOR1",
    terms: [
      "Valid for dine-in only",
      "Not valid on holidays or weekends",
      "Valid until June 30, 2025",
      "One voucher per table",
    ],
    website: "https://dinedelight.gy",
  },
]

export default function RewardDetails() {
  const params = useParams()
  const router = useRouter()
  const [reward, setReward] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [redeemStatus, setRedeemStatus] = useState<null | "success" | "error" | "processing">(null)
  const [copiedCode, setCopiedCode] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch reward details
    setIsLoading(true)

    setTimeout(() => {
      const id = Number(params.id)
      const foundReward = availableRewards.find((r) => r.id === id)

      if (foundReward) {
        setReward(foundReward)
        setError(null)
      } else {
        setError("Reward not found")
      }

      setIsLoading(false)
    }, 1000)
  }, [params.id])

  const handleRedeem = () => {
    setRedeemStatus("processing")

    toast({
      title: "Redeeming Reward",
      description: "Processing your redemption request...",
      variant: "default",
    })

    // Simulate API call to redeem reward
    setTimeout(() => {
      setRedeemStatus("success")

      toast({
        title: "Reward Redeemed",
        description: `You have successfully redeemed ${reward?.title}`,
        variant: "default",
      })
    }, 1500)
  }

  const handleCopyCode = () => {
    if (!reward) return

    navigator.clipboard.writeText(reward.code)
    setCopiedCode(true)

    toast({
      title: "Code Copied",
      description: `Promo code ${reward.code} has been copied to clipboard.`,
      variant: "default",
    })

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedCode(false)
    }, 2000)
  }

  if (isLoading) {
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
            <h1 className="text-lg font-semibold">Reward Details</h1>
          </div>
        </header>

        <main className="flex-1 p-4 pb-20">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600"></div>
            <p className="mt-4 text-gray-500">Loading reward details...</p>
          </div>
        </main>

        <BottomNavigation />
      </div>
    )
  }

  if (error) {
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
            <h1 className="text-lg font-semibold">Reward Details</h1>
          </div>
        </header>

        <main className="flex-1 p-4 pb-20">
          <Alert variant="destructive">
            <Info className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>

          <div className="mt-4 flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/rewards">Return to Rewards</Link>
            </Button>
          </div>
        </main>

        <BottomNavigation />
      </div>
    )
  }

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
          <h1 className="text-lg font-semibold">Reward Details</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{reward.title}</h2>
              <Badge className="bg-white text-purple-700">{reward.points} Points</Badge>
            </div>
            <div className="mt-4 flex items-center">
              <reward.icon className="mr-2 h-5 w-5" />
              <span className="text-sm">{reward.category.charAt(0).toUpperCase() + reward.category.slice(1)}</span>
            </div>
            <p className="mt-2 text-sm">Expires on {new Date(reward.expires).toLocaleDateString()}</p>
          </div>

          <CardContent className="space-y-6 p-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Description</h3>
              <p className="text-gray-700">{reward.description}</p>
            </div>

            {redeemStatus === "success" && (
              <div className="rounded-md bg-gray-50 p-4">
                <p className="mb-2 text-sm font-medium">Promo Code:</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-lg font-bold">{reward.code}</p>
                  <Button variant="outline" size="sm" onClick={handleCopyCode}>
                    {copiedCode ? (
                      "Copied!"
                    ) : (
                      <>
                        <Copy className="mr-1 h-4 w-4" />
                        Copy Code
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            <div>
              <h3 className="mb-2 text-lg font-semibold">Terms & Conditions</h3>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                {reward.terms.map((term: string, index: number) => (
                  <li key={index}>{term}</li>
                ))}
              </ul>
            </div>

            {redeemStatus === "success" && (
              <Alert className="bg-green-50 text-green-800">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Redeemed Successfully!</AlertTitle>
                <AlertDescription>
                  You have successfully redeemed this reward. The points have been deducted from your balance.
                </AlertDescription>
              </Alert>
            )}

            {redeemStatus === "error" && (
              <Alert variant="destructive">
                <Info className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>There was a problem redeeming this reward. Please try again later.</AlertDescription>
              </Alert>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 border-t bg-gray-50 p-6">
            {redeemStatus === null && (
              <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleRedeem}>
                Redeem for {reward.points} Points
              </Button>
            )}

            {redeemStatus === "processing" && (
              <Button className="w-full bg-purple-600" disabled>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Processing...
              </Button>
            )}

            {redeemStatus === "success" && reward.website && (
              <Button variant="outline" className="w-full" asChild>
                <Link href={reward.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit{" "}
                  {reward.category === "shopping" ? "Store" : reward.category === "dining" ? "Restaurant" : "Website"}
                </Link>
              </Button>
            )}

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

