"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, Info } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { CelebrationAnimation } from "@/components/ui/celebration-animation"

// Language options
const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
]

export default function LanguageSettings() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<null | "success" | "error">(null)
  const [showCelebration, setShowCelebration] = useState(false)

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
  }

  const handleSave = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStatus("success")
      setShowCelebration(true) // Show celebration on success

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
        message="Language Updated Successfully!"
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
          <h1 className="text-lg font-semibold">Language</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card>
          <CardHeader>
            <CardTitle>Select Language</CardTitle>
            <CardDescription>Choose your preferred language for the app</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={selectedLanguage} onValueChange={handleLanguageChange} className="space-y-2">
              {languages.map((language) => (
                <div key={language.code} className="flex items-center space-x-2">
                  <RadioGroupItem value={language.code} id={language.code} />
                  <Label
                    htmlFor={language.code}
                    className="flex w-full cursor-pointer items-center rounded-md p-2 hover:bg-gray-100"
                  >
                    <span className="mr-2 text-xl">{language.flag}</span>
                    <span>{language.name}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <p className="text-xs text-gray-500">Note: Changing the language will reload the app.</p>

            {status === "success" && (
              <Alert className="bg-green-50 text-green-800">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>Language preference has been updated.</AlertDescription>
              </Alert>
            )}

            {status === "error" && (
              <Alert variant="destructive">
                <Info className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  There was a problem updating your language preference. Please try again.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex space-x-2">
              <Button
                className="flex-1 bg-primary hover:bg-primary-600 text-white"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link href="/settings">Cancel</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  )
}

