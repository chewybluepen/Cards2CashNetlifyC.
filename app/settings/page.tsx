"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  CreditCard,
  Fingerprint,
  HelpCircle,
  Info,
  Lock,
  LogOut,
  Shield,
  User,
  Wallet,
} from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
// Add imports for EnhancedAvatar and useAvatar
import { EnhancedAvatar } from "@/components/ui/enhanced-avatar"
import { useAvatar } from "@/contexts/avatar-context"

// Inside the Settings component, add the useAvatar hook
export default function Settings() {
  // Add this line near other state declarations
  const { avatarUrl, initials } = useAvatar()
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-primary p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2 text-white hover:bg-primary-600">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold text-white">Settings</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        {/* Add this near the top of your settings list or profile section: */}
        <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg mb-4">
          <EnhancedAvatar
            src={avatarUrl || ""}
            alt="User profile"
            initials={initials}
            size="lg"
            className="border-2 border-white shadow-md"
          />
          <div>
            <h2 className="text-xl font-semibold">Your Profile</h2>
            <p className="text-sm text-gray-400">Manage your account settings</p>
          </div>
        </div>

        <div className="mb-6 flex items-center">
          <Avatar className="mr-4 h-16 w-16 border-2 border-white shadow-md">
            <AvatarImage
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Display%20Picture-lTJxvWvl6No7YQMsgUyVESc1acHx51.png"
              alt="User"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-sm text-gray-500">+592 XXX XXXX • john@example.com</p>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Account</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                <Link href="/profile" className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <User className="mr-3 h-5 w-5 text-gray-500" />
                    <span>Personal Information</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
                <Link href="/payment-methods" className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <CreditCard className="mr-3 h-5 w-5 text-gray-500" />
                    <span>Payment Methods</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
                <Link href="/spending-limits" className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Wallet className="mr-3 h-5 w-5 text-gray-500" />
                    <span>Spending Limits & Alerts</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Security</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                <Link href="/change-password" className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Lock className="mr-3 h-5 w-5 text-gray-500" />
                    <span>Change Password</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Fingerprint className="mr-3 h-5 w-5 text-gray-500" />
                    <span>Biometric Authentication</span>
                  </div>
                  <Switch
                    checked={biometricEnabled}
                    onCheckedChange={setBiometricEnabled}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
                <Link href="/two-factor" className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Shield className="mr-3 h-5 w-5 text-gray-500" />
                    <span>Two-Factor Authentication</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Bell className="mr-3 h-5 w-5 text-gray-500" />
                    <span>Push Notifications</span>
                  </div>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
                <Link href="/language" className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <span className="mr-3 text-lg">🌐</span>
                    <span>Language</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm text-gray-500">English</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Support & Legal</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                <Link href="/help" className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <HelpCircle className="mr-3 h-5 w-5 text-gray-500" />
                    <span>Help & Support</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
                <Link href="/chat" className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <span className="mr-3 text-lg">🤖</span>
                    <span>AI Assistant</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
                <Link href="/terms" className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Info className="mr-3 h-5 w-5 text-gray-500" />
                    <span>Terms & Privacy Policy</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Button variant="outline" className="w-full text-red-600 hover:bg-red-50 hover:text-red-700" asChild>
            <Link href="/">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Link>
          </Button>

          <p className="mt-4 text-center text-xs text-gray-500">Cards2Cash v1.0.0 • © 2025</p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

