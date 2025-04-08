"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, DollarSign, Info } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
// Import the CelebrationAnimation component
import { CelebrationAnimation } from "@/components/ui/celebration-animation"

export default function SpendingLimits() {
  const [dailyLimit, setDailyLimit] = useState(5000)
  const [monthlyLimit, setMonthlyLimit] = useState(50000)
  const [minBalanceAlert, setMinBalanceAlert] = useState(1000)
  const [largeTransactionAlert, setLargeTransactionAlert] = useState(true)
  const [largeTransactionAmount, setLargeTransactionAmount] = useState(10000)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<null | "success" | "error">(null)
  // Add state for celebration
  const [showCelebration, setShowCelebration] = useState(false)

  // Update the handleSubmit function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate saving settings
    setTimeout(() => {
      setIsLoading(false)
      setStatus("success")
      setShowCelebration(true) // Show celebration on success
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <CelebrationAnimation
        show={showCelebration}
        message="Spending Limits Updated!"
        onComplete={() => setShowCelebration(false)}
      />
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/settings">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Spending Limits & Alerts</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card>
          <CardHeader>
            <CardTitle>Customize Spending Limits</CardTitle>
            <CardDescription>Set up spending limits and receive alerts when you approach them</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="daily-limit" className="text-base">
                    Daily Spending Limit
                  </Label>
                  <span className="font-medium">GYD {dailyLimit.toLocaleString()}</span>
                </div>
                <Slider
                  id="daily-limit"
                  min={1000}
                  max={20000}
                  step={1000}
                  value={[dailyLimit]}
                  onValueChange={(value) => setDailyLimit(value[0])}
                  className="py-4"
                />
                <p className="text-xs text-gray-500">
                  You'll receive a notification when you're approaching your daily limit.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="monthly-limit" className="text-base">
                    Monthly Spending Limit
                  </Label>
                  <span className="font-medium">GYD {monthlyLimit.toLocaleString()}</span>
                </div>
                <Slider
                  id="monthly-limit"
                  min={10000}
                  max={100000}
                  step={5000}
                  value={[monthlyLimit]}
                  onValueChange={(value) => setMonthlyLimit(value[0])}
                  className="py-4"
                />
                <p className="text-xs text-gray-500">
                  You'll receive a notification when you're approaching your monthly limit.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="min-balance" className="text-base">
                  Minimum Balance Alert
                </Label>
                <div className="flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
                  <Input
                    id="min-balance"
                    type="number"
                    value={minBalanceAlert}
                    onChange={(e) => setMinBalanceAlert(Number.parseInt(e.target.value))}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-gray-500">You'll be notified when your balance falls below this amount.</p>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="large-transaction" className="text-base">
                    Large Transaction Alerts
                  </Label>
                  <p className="text-xs text-gray-500">Receive notifications for transactions above a certain amount</p>
                </div>
                <Switch
                  id="large-transaction"
                  checked={largeTransactionAlert}
                  onCheckedChange={setLargeTransactionAlert}
                />
              </div>

              {largeTransactionAlert && (
                <div className="space-y-2 rounded-md bg-gray-50 p-3">
                  <Label htmlFor="large-transaction-amount">Alert for transactions above</Label>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
                    <Input
                      id="large-transaction-amount"
                      type="number"
                      value={largeTransactionAmount}
                      onChange={(e) => setLargeTransactionAmount(Number.parseInt(e.target.value))}
                      className="flex-1"
                    />
                  </div>
                </div>
              )}

              {status === "success" && (
                <Alert className="bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Settings Saved</AlertTitle>
                  <AlertDescription>Your spending limits and alert preferences have been updated.</AlertDescription>
                </Alert>
              )}

              {status === "error" && (
                <Alert variant="destructive">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Unable to save your settings. Please try again.</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button type="submit" className="w-full bg-primary hover:bg-primary-600 text-white" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Settings"}
              </Button>
              <Button type="button" variant="outline" className="w-full" asChild>
                <Link href="/settings">Cancel</Link>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  )
}

