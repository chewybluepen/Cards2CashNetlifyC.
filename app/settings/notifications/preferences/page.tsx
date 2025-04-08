"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Bell, CheckCircle, CreditCard, DollarSign, RefreshCw, Shield } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { AnimatedCard } from "@/components/ui/animated-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { ConfettiAnimation } from "@/components/ui/confetti-animation"

// Mock notification settings
const initialSettings = {
  transactions: {
    all: true,
    deposits: true,
    withdrawals: true,
    cardTransactions: true,
    largeTransactions: true,
  },
  account: {
    balanceUpdates: true,
    lowBalanceAlerts: true,
    securityAlerts: true,
    loginAlerts: true,
  },
  marketing: {
    promotions: false,
    newFeatures: true,
    partnerOffers: false,
    surveys: false,
  },
  preferences: {
    email: true,
    push: true,
    sms: false,
    inApp: true,
  },
}

export default function NotificationPreferences() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [settings, setSettings] = useState(initialSettings)
  const [hasChanges, setHasChanges] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch notification settings
    const fetchSettings = async () => {
      setIsLoading(true)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSettings(initialSettings)
      setIsLoading(false)
    }

    fetchSettings()
  }, [])

  useEffect(() => {
    // Check if settings have changed from initial state
    if (!isLoading) {
      const initialJSON = JSON.stringify(initialSettings)
      const currentJSON = JSON.stringify(settings)
      setHasChanges(initialJSON !== currentJSON)
    }
  }, [settings, isLoading])

  const handleToggle = (category: string, setting: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }))

    // Reset success message when changes are made
    setSaveSuccess(false)
  }

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call to save settings
    setTimeout(() => {
      setIsSaving(false)
      setSaveSuccess(true)
      setShowConfetti(true)

      // Reset confetti after 3 seconds
      setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
    }, 1500)
  }

  const handleReset = () => {
    setSettings(initialSettings)
    setSaveSuccess(false)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/settings/notifications">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Notification Preferences</h1>
          </div>
          <p className="mt-1 text-center text-xs italic text-gray-500">
            The Future of Your Finances, For a Borderless World
          </p>
        </header>

        <main className="flex-1 p-4 pb-20">
          <div className="space-y-4">
            <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
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
            <Link href="/settings/notifications">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Notification Preferences</h1>
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
          {saveSuccess && (
            <Alert className="bg-green-50 text-green-800">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>Your notification preferences have been updated successfully.</AlertDescription>
            </Alert>
          )}

          <AnimatedCard>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-blue-600" />
                Transaction Notifications
              </CardTitle>
              <CardDescription>Notifications related to your financial transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">All Transactions</p>
                  <p className="text-sm text-gray-500">Receive notifications for all transactions</p>
                </div>
                <Switch
                  checked={settings.transactions.all}
                  onCheckedChange={(value) => handleToggle("transactions", "all", value)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Deposits</p>
                  <p className="text-sm text-gray-500">Notifications when funds are added to your account</p>
                </div>
                <Switch
                  checked={settings.transactions.deposits}
                  onCheckedChange={(value) => handleToggle("transactions", "deposits", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Withdrawals</p>
                  <p className="text-sm text-gray-500">Notifications when funds leave your account</p>
                </div>
                <Switch
                  checked={settings.transactions.withdrawals}
                  onCheckedChange={(value) => handleToggle("transactions", "withdrawals", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Card Transactions</p>
                  <p className="text-sm text-gray-500">Notifications for virtual card usage</p>
                </div>
                <Switch
                  checked={settings.transactions.cardTransactions}
                  onCheckedChange={(value) => handleToggle("transactions", "cardTransactions", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Large Transactions</p>
                  <p className="text-sm text-gray-500">Notifications for transactions above your set threshold</p>
                </div>
                <Switch
                  checked={settings.transactions.largeTransactions}
                  onCheckedChange={(value) => handleToggle("transactions", "largeTransactions", value)}
                />
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-blue-600" />
                Account Notifications
              </CardTitle>
              <CardDescription>Notifications related to your account status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Balance Updates</p>
                  <p className="text-sm text-gray-500">Regular updates about your account balance</p>
                </div>
                <Switch
                  checked={settings.account.balanceUpdates}
                  onCheckedChange={(value) => handleToggle("account", "balanceUpdates", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Low Balance Alerts</p>
                  <p className="text-sm text-gray-500">Alerts when your balance falls below a threshold</p>
                </div>
                <Switch
                  checked={settings.account.lowBalanceAlerts}
                  onCheckedChange={(value) => handleToggle("account", "lowBalanceAlerts", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Security Alerts</p>
                  <p className="text-sm text-gray-500">Notifications about security-related events</p>
                </div>
                <Switch
                  checked={settings.account.securityAlerts}
                  onCheckedChange={(value) => handleToggle("account", "securityAlerts", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Login Alerts</p>
                  <p className="text-sm text-gray-500">Notifications when someone logs into your account</p>
                </div>
                <Switch
                  checked={settings.account.loginAlerts}
                  onCheckedChange={(value) => handleToggle("account", "loginAlerts", value)}
                />
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-blue-600" />
                Marketing Notifications
              </CardTitle>
              <CardDescription>Promotional and informational notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Promotions</p>
                  <p className="text-sm text-gray-500">Special offers and promotions from Cards2Cash</p>
                </div>
                <Switch
                  checked={settings.marketing.promotions}
                  onCheckedChange={(value) => handleToggle("marketing", "promotions", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Features</p>
                  <p className="text-sm text-gray-500">Updates about new app features and improvements</p>
                </div>
                <Switch
                  checked={settings.marketing.newFeatures}
                  onCheckedChange={(value) => handleToggle("marketing", "newFeatures", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Partner Offers</p>
                  <p className="text-sm text-gray-500">Offers and promotions from our partner companies</p>
                </div>
                <Switch
                  checked={settings.marketing.partnerOffers}
                  onCheckedChange={(value) => handleToggle("marketing", "partnerOffers", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Surveys</p>
                  <p className="text-sm text-gray-500">Invitations to participate in surveys and feedback</p>
                </div>
                <Switch
                  checked={settings.marketing.surveys}
                  onCheckedChange={(value) => handleToggle("marketing", "surveys", value)}
                />
              </div>
            </CardContent>
          </AnimatedCard>

          <AnimatedCard>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-blue-600" />
                Delivery Preferences
              </CardTitle>
              <CardDescription>How you want to receive your notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.preferences.email}
                  onCheckedChange={(value) => handleToggle("preferences", "email", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive notifications on your device</p>
                </div>
                <Switch
                  checked={settings.preferences.push}
                  onCheckedChange={(value) => handleToggle("preferences", "push", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-gray-500">Receive notifications via text message</p>
                </div>
                <Switch
                  checked={settings.preferences.sms}
                  onCheckedChange={(value) => handleToggle("preferences", "sms", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">In-App Notifications</p>
                  <p className="text-sm text-gray-500">Receive notifications within the app</p>
                </div>
                <Switch
                  checked={settings.preferences.inApp}
                  onCheckedChange={(value) => handleToggle("preferences", "inApp", value)}
                />
              </div>
            </CardContent>
          </AnimatedCard>

          <div className="flex space-x-2">
            <AnimatedButton className="flex-1" onClick={handleSave} disabled={isSaving || !hasChanges}>
              {isSaving ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Preferences"
              )}
            </AnimatedButton>

            <AnimatedButton
              variant="outline"
              className="flex-1"
              onClick={handleReset}
              disabled={isSaving || !hasChanges}
            >
              Reset
            </AnimatedButton>
          </div>
        </motion.div>
      </main>

      <BottomNavigation />
    </div>
  )
}

