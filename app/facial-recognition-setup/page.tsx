"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Camera, CheckCircle, Info } from "lucide-react"
import { FacialRecognition } from "@/components/ui/facial-recognition"
import { CelebrationAnimation } from "@/components/ui/celebration-animation"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function FacialRecognitionSetup() {
  const router = useRouter()
  const [status, setStatus] = useState<null | "success" | "error">(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [showCelebration, setShowCelebration] = useState(false)
  const [step, setStep] = useState<"intro" | "scan" | "complete">("intro")

  const handleFacialSuccess = () => {
    setStatus("success")
    setShowCelebration(true)
    setStep("complete")
  }

  const handleFacialError = (error: string) => {
    setStatus("error")
    setErrorMessage(error)
  }

  const handleComplete = () => {
    router.push("/settings")
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <CelebrationAnimation
        show={showCelebration}
        message="Face ID Setup Complete!"
        onComplete={() => setShowCelebration(false)}
      />

      <header className="sticky top-0 z-10 bg-primary p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2 text-white hover:bg-primary-600">
            <Link href="/settings">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold text-white">Face ID Setup</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card>
          <CardHeader>
            <CardTitle>Set Up Face ID</CardTitle>
            <CardDescription>
              {step === "intro" && "Use your face to quickly and securely authenticate"}
              {step === "scan" && "Position your face in the frame"}
              {step === "complete" && "Face ID has been set up successfully"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === "intro" && (
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 rounded-full bg-primary-50 p-6">
                  <Camera className="h-16 w-16 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Enhance Your Security</h3>
                <p className="mb-4 text-gray-600">
                  Face ID provides a secure and convenient way to authenticate. Your facial data is encrypted and stored
                  only on your device.
                </p>
                <ul className="mb-6 space-y-2 text-left">
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                    <span>Quick and secure authentication</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                    <span>Works in various lighting conditions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                    <span>Your data never leaves your device</span>
                  </li>
                </ul>
              </div>
            )}

            {step === "scan" && (
              <FacialRecognition onSuccess={handleFacialSuccess} onError={handleFacialError} autoStart={true} />
            )}

            {step === "complete" && (
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 rounded-full bg-green-50 p-6">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h3 className="mb-2 text-lg font-medium">Face ID Setup Complete</h3>
                <p className="text-gray-600">
                  You can now use Face ID to quickly and securely authenticate throughout the app.
                </p>
              </div>
            )}

            {status === "error" && (
              <Alert variant="destructive">
                <Info className="h-4 w-4" />
                <AlertTitle>Setup Failed</AlertTitle>
                <AlertDescription>{errorMessage || "Please try again in better lighting conditions."}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            {step === "intro" && (
              <Button
                type="button"
                className="w-full bg-primary text-white hover:bg-primary-600"
                onClick={() => setStep("scan")}
              >
                <Camera className="mr-2 h-4 w-4" />
                Start Face ID Setup
              </Button>
            )}

            {step === "scan" && status === "error" && (
              <Button
                type="button"
                className="w-full bg-primary text-white hover:bg-primary-600"
                onClick={() => {
                  setStatus(null)
                  setStep("scan")
                }}
              >
                Try Again
              </Button>
            )}

            {step === "complete" && (
              <Button
                type="button"
                className="w-full bg-primary text-white hover:bg-primary-600"
                onClick={handleComplete}
              >
                Complete Setup
              </Button>
            )}

            <Button type="button" variant="outline" className="w-full" onClick={() => router.push("/settings")}>
              {step === "complete" ? "Return to Settings" : "Skip for Now"}
            </Button>
          </CardFooter>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  )
}

