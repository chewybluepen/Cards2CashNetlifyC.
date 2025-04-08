"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, Info, QrCode, Shield, Smartphone } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
// Import the CelebrationAnimation component
import { CelebrationAnimation } from "@/components/ui/celebration-animation"

export default function TwoFactorAuthentication() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<null | "success" | "error">(null)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [activeTab, setActiveTab] = useState("app")
  const [verificationCode, setVerificationCode] = useState("")
  const [showQRCode, setShowQRCode] = useState(false)
  // Add state for celebration
  const [showCelebration, setShowCelebration] = useState(false)

  const handleToggle2FA = (checked: boolean) => {
    if (checked) {
      setShowQRCode(true)
    } else {
      setIsLoading(true)

      // Simulate API call to disable 2FA
      setTimeout(() => {
        setIsLoading(false)
        setTwoFactorEnabled(false)
        setStatus("success")

        // Reset status after 3 seconds
        setTimeout(() => {
          setStatus(null)
        }, 3000)
      }, 1500)
    }
  }

  // Update the handleVerify function
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      if (verificationCode === "123456" || verificationCode.length === 6) {
        setTwoFactorEnabled(true)
        setShowQRCode(false)
        setStatus("success")
        setShowCelebration(true) // Show celebration on success
      } else {
        setStatus("error")
      }

      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus(null)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <CelebrationAnimation
        show={showCelebration}
        message="Two-Factor Authentication Enabled!"
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
          <h1 className="text-lg font-semibold">Two-Factor Authentication</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </div>
              <Switch checked={twoFactorEnabled} onCheckedChange={handleToggle2FA} disabled={isLoading || showQRCode} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-800">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div className="ml-3">
                  <p>
                    Two-factor authentication adds an additional layer of security to your account by requiring a
                    verification code in addition to your password.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {showQRCode && (
          <Card>
            <CardHeader>
              <CardTitle>Set Up Two-Factor Authentication</CardTitle>
              <CardDescription>Scan the QR code with your authenticator app</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="app">Authenticator App</TabsTrigger>
                  <TabsTrigger value="sms">SMS</TabsTrigger>
                </TabsList>

                <TabsContent value="app" className="space-y-4">
                  <div className="flex justify-center py-4">
                    <div className="rounded-lg border bg-white p-2">
                      <QrCode className="h-48 w-48 text-blue-600" />
                    </div>
                  </div>

                  <div className="space-y-2 text-center">
                    <p className="text-sm text-gray-500">
                      Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                    </p>
                    <p className="text-sm font-medium">
                      Or enter this code manually: <span className="font-mono">ABCD EFGH IJKL MNOP</span>
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="sms" className="space-y-4">
                  <div className="flex justify-center py-4">
                    <Smartphone className="h-24 w-24 text-blue-600" />
                  </div>

                  <div className="space-y-2 text-center">
                    <p className="text-sm text-gray-500">
                      We'll send a verification code to your phone number each time you log in.
                    </p>
                    <p className="text-sm font-medium">Phone number: +592 XXX XXXX</p>
                    <Button variant="outline" size="sm">
                      Change Phone Number
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="verificationCode">Verification Code</Label>
                  <Input
                    id="verificationCode"
                    placeholder="Enter the 6-digit code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                    required
                  />
                  <p className="text-xs text-gray-500">Enter the verification code from your authenticator app</p>
                </div>

                {status === "success" && (
                  <Alert className="bg-green-50 text-green-800">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>Two-factor authentication has been enabled for your account.</AlertDescription>
                  </Alert>
                )}

                {status === "error" && (
                  <Alert variant="destructive">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Invalid verification code. Please try again.</AlertDescription>
                  </Alert>
                )}

                <div className="flex space-x-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary-600 text-white"
                    disabled={isLoading || verificationCode.length !== 6}
                  >
                    {isLoading ? "Verifying..." : "Verify"}
                  </Button>
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setShowQRCode(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {twoFactorEnabled && !showQRCode && (
          <Card>
            <CardHeader>
              <CardTitle>Recovery Codes</CardTitle>
              <CardDescription>Save these recovery codes in a secure place</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-gray-50 p-4 font-mono text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded bg-white p-2">ABCD-1234-EFGH</div>
                  <div className="rounded bg-white p-2">IJKL-5678-MNOP</div>
                  <div className="rounded bg-white p-2">QRST-9012-UVWX</div>
                  <div className="rounded bg-white p-2">YZ12-3456-7890</div>
                  <div className="rounded bg-white p-2">ABCD-7890-EFGH</div>
                  <div className="rounded bg-white p-2">IJKL-1234-MNOP</div>
                </div>
              </div>

              <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="ml-3">
                    <p>
                      If you lose access to your authenticator app, you can use these recovery codes to log in. Each
                      code can only be used once.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  Download Codes
                </Button>
                <Button variant="outline" className="flex-1">
                  Copy Codes
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <BottomNavigation />
    </div>
  )
}

