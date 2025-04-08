"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Fingerprint, Info, Lock, Scan, Camera } from "lucide-react"
import { FacialRecognition } from "@/components/ui/facial-recognition"
import { CelebrationAnimation } from "@/components/ui/celebration-animation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BiometricAuth() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<null | "success" | "error">(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [progress, setProgress] = useState(0)
  const [authMethod, setAuthMethod] = useState<"fingerprint" | "face">("fingerprint")
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if (isLoading && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + 10, 100))
      }, 200)

      return () => clearTimeout(timer)
    }

    if (progress === 100) {
      setTimeout(() => {
        setIsLoading(false)
        setStatus("success")
        setShowCelebration(true)

        // Redirect to dashboard after successful authentication
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      }, 500)
    }
  }, [isLoading, progress, router])

  const handleBiometricAuth = () => {
    setIsLoading(true)
    setStatus(null)
    setProgress(0)

    // Simulate biometric authentication
    // In a real app, this would use the Web Authentication API or a native bridge
  }

  const handleCancel = () => {
    setIsLoading(false)
    setProgress(0)
  }

  const handleFallback = () => {
    router.push("/")
  }

  const handleFacialSuccess = () => {
    setStatus("success")
    setShowCelebration(true)

    // Redirect to dashboard after successful authentication
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  const handleFacialError = (error: string) => {
    setStatus("error")
    setErrorMessage(error)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <CelebrationAnimation show={showCelebration} message="Authentication Successful!" />

      <div className="w-full max-w-md">
        <div className="mb-4">
          <Button variant="ghost" size="icon" asChild className="mb-2">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Biometric Authentication</CardTitle>
            <CardDescription>Use your biometrics to securely log in</CardDescription>
          </CardHeader>

          <Tabs defaultValue="fingerprint" onValueChange={(value) => setAuthMethod(value as "fingerprint" | "face")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="fingerprint">Fingerprint</TabsTrigger>
              <TabsTrigger value="face">Face ID</TabsTrigger>
            </TabsList>

            <TabsContent value="fingerprint" className="space-y-6 pt-4">
              <div className="flex justify-center">
                {isLoading ? (
                  <div className="relative flex h-24 w-24 items-center justify-center">
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle className="stroke-gray-200" cx="50" cy="50" r="40" fill="none" strokeWidth="8" />
                      <circle
                        className="stroke-blue-600"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        strokeWidth="8"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - (251.2 * progress) / 100}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <Scan className="absolute h-12 w-12 text-blue-600 animate-pulse" />
                  </div>
                ) : (
                  <Fingerprint className="h-24 w-24 text-blue-600" />
                )}
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  {isLoading
                    ? "Scanning... Please keep your finger on the sensor"
                    : "Tap the button below to authenticate with your fingerprint"}
                </p>
              </div>

              {status === "success" && (
                <Alert className="bg-green-50 text-green-800">
                  <Lock className="h-4 w-4" />
                  <AlertTitle>Authentication Successful</AlertTitle>
                  <AlertDescription>You are being redirected to your dashboard...</AlertDescription>
                </Alert>
              )}

              {status === "error" && (
                <Alert variant="destructive">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Authentication Failed</AlertTitle>
                  <AlertDescription>{errorMessage || "Please try again or use another login method."}</AlertDescription>
                </Alert>
              )}

              <CardFooter className="flex flex-col space-y-2 px-0">
                {isLoading ? (
                  <Button type="button" variant="outline" className="w-full" onClick={handleCancel}>
                    Cancel
                  </Button>
                ) : (
                  <>
                    <Button
                      type="button"
                      className="w-full bg-primary hover:bg-primary-600 text-white"
                      onClick={handleBiometricAuth}
                      disabled={status === "success"}
                    >
                      <Fingerprint className="mr-2 h-4 w-4" />
                      Authenticate with Fingerprint
                    </Button>
                    <Button type="button" variant="outline" className="w-full" onClick={handleFallback}>
                      Use Password Instead
                    </Button>
                  </>
                )}
              </CardFooter>
            </TabsContent>

            <TabsContent value="face" className="space-y-6 pt-4">
              <FacialRecognition onSuccess={handleFacialSuccess} onError={handleFacialError} autoStart={false} />

              {status === "success" && (
                <Alert className="bg-green-50 text-green-800">
                  <Lock className="h-4 w-4" />
                  <AlertTitle>Authentication Successful</AlertTitle>
                  <AlertDescription>You are being redirected to your dashboard...</AlertDescription>
                </Alert>
              )}

              {status === "error" && (
                <Alert variant="destructive">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Authentication Failed</AlertTitle>
                  <AlertDescription>{errorMessage || "Please try again or use another login method."}</AlertDescription>
                </Alert>
              )}

              <CardFooter className="flex flex-col space-y-2 px-0">
                <Button
                  type="button"
                  className="w-full bg-primary hover:bg-primary-600 text-white"
                  onClick={() => {
                    const facialRecognition = document.querySelector('button[class*="bg-primary"]')
                    if (facialRecognition) {
                      ;(facialRecognition as HTMLButtonElement).click()
                    }
                  }}
                  disabled={status === "success" || isLoading}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Start Face Recognition
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={handleFallback}>
                  Use Password Instead
                </Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

