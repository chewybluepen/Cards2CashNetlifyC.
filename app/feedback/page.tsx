"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, Mail, MessageSquare, Star, ThumbsUp } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function Feedback() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [rating, setRating] = useState<string | null>(null)
  const [feedback, setFeedback] = useState("")
  const [errors, setErrors] = useState<{ rating?: string; feedback?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const newErrors: { rating?: string; feedback?: string } = {}
    if (!rating) {
      newErrors.rating = "Please select a rating"
    }
    if (!feedback.trim()) {
      newErrors.feedback = "Please provide some feedback"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setRating(null)
        setFeedback("")
        setIsSuccess(false)
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
          <h1 className="text-lg font-semibold">Feedback</h1>
        </div>
        <p className="mt-1 text-center text-xs italic text-gray-500">
          The Future of Your Finances, For a Borderless World
        </p>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Share Your Feedback</CardTitle>
            <CardDescription>Help us improve Cards2Cash by sharing your experience and suggestions</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">How would you rate your experience?</h3>
                <RadioGroup value={rating || ""} onValueChange={setRating}>
                  <div className="flex justify-between">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex flex-col items-center space-y-1">
                        <RadioGroupItem value={value.toString()} id={`rating-${value}`} className="peer sr-only" />
                        <Label
                          htmlFor={`rating-${value}`}
                          className="flex h-12 w-12 cursor-pointer flex-col items-center justify-center rounded-full border-2 peer-data-[state=checked]:border-blue-600 peer-data-[state=checked]:bg-blue-50"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              rating === value.toString() ? "fill-blue-600 text-blue-600" : "text-gray-400"
                            }`}
                          />
                          <span className="text-xs">{value}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
                {errors.rating && <p className="text-xs text-red-500">{errors.rating}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback" className="text-sm font-medium">
                  What do you like or what can we improve?
                </Label>
                <Textarea
                  id="feedback"
                  placeholder="Share your thoughts, suggestions, or report any issues..."
                  className="min-h-[120px]"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                {errors.feedback && <p className="text-xs text-red-500">{errors.feedback}</p>}
              </div>

              {isSuccess && (
                <Alert className="bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Thank You!</AlertTitle>
                  <AlertDescription>
                    Your feedback has been submitted successfully. We appreciate your input!
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading || isSuccess}>
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Submit Feedback
                  </>
                )}
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/settings">Cancel</Link>
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Other Ways to Reach Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="rounded-full bg-blue-100 p-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Chat Support</h3>
                <p className="text-sm text-gray-600">Get real-time assistance through our in-app chat support.</p>
                <Button variant="link" className="h-auto p-0 text-sm" asChild>
                  <Link href="/chat">Open Chat Support</Link>
                </Button>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Email Support</h3>
                <p className="text-sm text-gray-600">Send us a detailed message at support@cards2cash.com</p>
                <Button variant="link" className="h-auto p-0 text-sm" asChild>
                  <Link href="/help/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  )
}

