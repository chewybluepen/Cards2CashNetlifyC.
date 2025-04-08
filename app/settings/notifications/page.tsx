"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Bell, CheckCircle, Info } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { toast } from "@/components/ui/use-toast"

export default function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<null | "success" | "error">(null)
  const [settings, setSettings] = useState({
    transactionAlerts: true,
    securityAlerts: true,
    promotionalOffers: false,
    accountUpdates: true,
    rewardNotifications: true,
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
  })

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleSave = () => {
    setIsLoading(true)
    setStatus(null)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStatus("success")

      toast({
        title: "Settings Saved",
        description: "Your notification preferences have been updated successfully.",
        variant: "default",
      })

      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus(null)
      }, 3000)
    }, 1500)
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
          <h1 className="text-lg font-semibold">Notification Settings</h1>
        </div>
        <p className="mt-1 text-center text-xs italic text-gray-500">
          The Future of Your Finances, For a Borderless World
        </p>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Notification Types</CardTitle>
            <CardDescription>Choose which notifications you want to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label htmlFor="transaction-alerts" className="text-sm font-medium">
                  Transaction Alerts
                </label>
                <p className="text-xs text-gray-500">Receive notifications for deposits, withdrawals, and card usage</p>
              </div>
              <Switch
                id="transaction-alerts"
                checked={settings.transactionAlerts}
                onCheckedChange={() => handleToggle("transactionAlerts")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label htmlFor="security-alerts" className="text-sm font-medium">
                  Security Alerts
                </label>
                <p className="text-xs text-gray-500">
                  Get notified about login attempts, password changes, and suspicious activity
                </p>
              </div>
              <Switch
                id="security-alerts"
                checked={settings.securityAlerts}
                onCheckedChange={() => handleToggle("securityAlerts")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label htmlFor="promotional-offers" className="text-sm font-medium">
                  Promotional Offers
                </label>
                <p className="text-xs text-gray-500">Receive updates about special offers, discounts, and promotions</p>
              </div>
              <Switch
                id="promotional-offers"
                checked={settings.promotionalOffers}
                onCheckedChange={() => handleToggle("promotionalOffers")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label htmlFor="account-updates" className="text-sm font-medium">
                  Account Updates
                </label>
                <p className="text-xs text-gray-500">Get notified about changes to your account settings and profile</p>
              </div>
              <Switch
                id="account-updates"
                checked={settings.accountUpdates}
                onCheckedChange={() => handleToggle("accountUpdates")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label htmlFor="reward-notifications" className="text-sm font-medium">
                  Reward Notifications
                </label>
                <p className="text-xs text-gray-500">
                  Receive updates about points earned, rewards available, and tier status
                </p>
              </div>
              <Switch
                id="reward-notifications"
                checked={settings.rewardNotifications}
                onCheckedChange={() => handleToggle("rewardNotifications")}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Notification Channels</CardTitle>
            <CardDescription>Choose how you want to receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label htmlFor="email-notifications" className="text-sm font-medium">
                  Email Notifications
                </label>
                <p className="text-xs text-gray-500">Receive notifications via email</p>
              </div>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggle("emailNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label htmlFor="push-notifications" className="text-sm font-medium">
                  Push Notifications
                </label>
                <p className="text-xs text-gray-500">Receive notifications on your device</p>
              </div>
              <Switch
                id="push-notifications"
                checked={settings.pushNotifications}
                onCheckedChange={() => handleToggle("pushNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label htmlFor="sms-notifications" className="text-sm font-medium">
                  SMS Notifications
                </label>
                <p className="text-xs text-gray-500">Receive notifications via text message</p>
              </div>
              <Switch
                id="sms-notifications"
                checked={settings.smsNotifications}
                onCheckedChange={() => handleToggle("smsNotifications")}
              />
            </div>
          </CardContent>
        </Card>

        <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-800">
          <div className="flex">
            <div className="flex-shrink-0">
              <Bell className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-blue-800">Important Note</h3>
              <p className="mt-1">
                Security alerts cannot be disabled as they are essential for the security of your account.
              </p>
            </div>
          </div>
        </div>

        {status === "success" && (
          <Alert className="mt-4 bg-green-50 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Your notification settings have been updated successfully.</AlertDescription>
          </Alert>
        )}

        {status === "error" && (
          <Alert className="mt-4" variant="destructive">
            <Info className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was a problem updating your notification settings. Please try again.
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-4 space-y-2">
          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Saving...
              </>
            ) : (
              "Save Settings"
            )}
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/settings">Cancel</Link>
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

