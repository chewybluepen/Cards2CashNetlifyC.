"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Copy, Gift, Share2, Users, Info } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { toast } from "@/components/ui/use-toast"

export default function ReferralProgram() {
  const [copiedCode, setCopiedCode] = useState(false)
  const referralCode = "CARDS2CASH25"
  const referralLink = "https://cards2cash.com/ref/CARDS2CASH25"

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopiedCode(true)

    toast({
      title: "Referral Code Copied",
      description: "Your referral code has been copied to clipboard.",
      variant: "default",
    })

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedCode(false)
    }, 2000)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)

    toast({
      title: "Referral Link Copied",
      description: "Your referral link has been copied to clipboard.",
      variant: "default",
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join Cards2Cash",
        text: "Use my referral code to sign up for Cards2Cash and get GYD 500 bonus! Code: " + referralCode,
        url: referralLink,
      })
    } else {
      toast({
        title: "Share",
        description: "Use the copy button to share your referral code.",
        variant: "default",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/settings">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Referral Program</h1>
        </div>
        <p className="mt-1 text-center text-xs italic text-gray-500">
          The Future of Your Finances, For a Borderless World
        </p>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <div className="flex items-center justify-center">
              <Gift className="mr-2 h-6 w-6" />
              <h2 className="text-xl font-bold">Invite Friends & Earn Rewards</h2>
            </div>
            <p className="mt-2 text-center">
              For every friend who signs up using your referral code, you both get GYD 500!
            </p>
          </div>

          <CardContent className="space-y-4 p-6">
            <div className="rounded-md bg-gray-50 p-4">
              <p className="mb-2 text-sm font-medium">Your Referral Code:</p>
              <div className="flex items-center justify-between">
                <p className="font-mono text-lg font-bold">{referralCode}</p>
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

            <div className="space-y-2">
              <p className="text-sm font-medium">Share Your Referral Link:</p>
              <div className="flex items-center space-x-2">
                <Input value={referralLink} readOnly className="font-mono text-sm" />
                <Button variant="outline" size="icon" onClick={handleCopyLink}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share with Friends
            </Button>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">1</div>
              <div>
                <h3 className="font-medium">Share Your Code</h3>
                <p className="text-sm text-gray-600">Share your unique referral code with friends and family.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">2</div>
              <div>
                <h3 className="font-medium">Friend Signs Up</h3>
                <p className="text-sm text-gray-600">
                  Your friend downloads the Cards2Cash app and enters your referral code during signup.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">3</div>
              <div>
                <h3 className="font-medium">Both Get Rewarded</h3>
                <p className="text-sm text-gray-600">
                  Once your friend completes their first transaction, you both receive GYD 500 bonus!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Your Referrals</CardTitle>
            <CardDescription>Track your referral rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Total Referrals</span>
                </div>
                <span className="text-lg font-bold">3</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Gift className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Total Earned</span>
                </div>
                <span className="text-lg font-bold">GYD 1,500</span>
              </div>

              <div className="rounded-md bg-gray-50 p-4">
                <h3 className="mb-2 font-medium">Recent Referrals</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">John D.</p>
                      <p className="text-xs text-gray-500">April 10, 2025</p>
                    </div>
                    <span className="text-green-600">+GYD 500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sarah M.</p>
                      <p className="text-xs text-gray-500">April 5, 2025</p>
                    </div>
                    <span className="text-green-600">+GYD 500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Michael T.</p>
                      <p className="text-xs text-gray-500">March 28, 2025</p>
                    </div>
                    <span className="text-green-600">+GYD 500</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/transactions">View All Rewards</Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-800">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-blue-800">Referral Program Terms</h3>
              <p className="mt-1">
                Referral bonuses are awarded after your friend completes their first transaction of at least GYD 1,000.
                Maximum of 20 referrals per month. Terms and conditions apply.
              </p>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

