"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SuccessAnimation } from "@/components/ui/success-animation"
import { ArrowLeft } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function DemoSuccessPage() {
  const [showAnimation, setShowAnimation] = useState(false)

  const triggerSuccessAnimation = () => {
    setShowAnimation(true)
  }

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
          <h1 className="text-lg font-semibold text-white">Success Animation Demo</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Positive Feedback Animations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Click the button below to trigger a success animation with confetti and sound effects.
            </p>
            <Button className="w-full btn-primary" onClick={triggerSuccessAnimation}>
              Trigger Success Animation
            </Button>
          </CardContent>
        </Card>

        <SuccessAnimation
          show={showAnimation}
          message="Operation Successful!"
          onComplete={() => setShowAnimation(false)}
        />
      </main>

      <BottomNavigation />
    </div>
  )
}

