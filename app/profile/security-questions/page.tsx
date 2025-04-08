"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, Info, Shield } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function SecurityQuestions() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<null | "success" | "error">(null)
  const [questions, setQuestions] = useState({
    question1: "",
    answer1: "",
    question2: "",
    answer2: "",
    question3: "",
    answer3: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setQuestions((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setQuestions((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStatus("success")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/profile">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Security Questions</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card>
          <CardHeader>
            <CardTitle>Set Security Questions</CardTitle>
            <CardDescription>
              These questions will help verify your identity if you need to reset your password
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="question1">Question 1</Label>
                <Select value={questions.question1} onValueChange={(value) => handleSelectChange("question1", value)}>
                  <SelectTrigger id="question1">
                    <SelectValue placeholder="Select a security question" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pet">What was the name of your first pet?</SelectItem>
                    <SelectItem value="school">What was the name of your first school?</SelectItem>
                    <SelectItem value="city">In what city were you born?</SelectItem>
                    <SelectItem value="mother">What is your mother's maiden name?</SelectItem>
                    <SelectItem value="car">What was your first car?</SelectItem>
                  </SelectContent>
                </Select>

                <Label htmlFor="answer1">Answer</Label>
                <Input
                  id="answer1"
                  name="answer1"
                  value={questions.answer1}
                  onChange={handleChange}
                  required
                  disabled={!questions.question1}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="question2">Question 2</Label>
                <Select value={questions.question2} onValueChange={(value) => handleSelectChange("question2", value)}>
                  <SelectTrigger id="question2">
                    <SelectValue placeholder="Select a security question" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="street">What street did you grow up on?</SelectItem>
                    <SelectItem value="book">What is the title of your favorite book?</SelectItem>
                    <SelectItem value="teacher">Who was your favorite teacher?</SelectItem>
                    <SelectItem value="friend">What is the name of your childhood best friend?</SelectItem>
                    <SelectItem value="food">What is your favorite food?</SelectItem>
                  </SelectContent>
                </Select>

                <Label htmlFor="answer2">Answer</Label>
                <Input
                  id="answer2"
                  name="answer2"
                  value={questions.answer2}
                  onChange={handleChange}
                  required
                  disabled={!questions.question2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="question3">Question 3</Label>
                <Select value={questions.question3} onValueChange={(value) => handleSelectChange("question3", value)}>
                  <SelectTrigger id="question3">
                    <SelectValue placeholder="Select a security question" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="movie">What is your favorite movie?</SelectItem>
                    <SelectItem value="vacation">Where was your first vacation?</SelectItem>
                    <SelectItem value="job">What was your first job?</SelectItem>
                    <SelectItem value="hero">Who is your childhood hero?</SelectItem>
                    <SelectItem value="sport">What is your favorite sport?</SelectItem>
                  </SelectContent>
                </Select>

                <Label htmlFor="answer3">Answer</Label>
                <Input
                  id="answer3"
                  name="answer3"
                  value={questions.answer3}
                  onChange={handleChange}
                  required
                  disabled={!questions.question3}
                />
              </div>

              <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-800">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-blue-800">Security Tip</h3>
                    <p className="mt-1">
                      Choose answers that are easy for you to remember but difficult for others to guess. Avoid using
                      information that can be found on social media.
                    </p>
                  </div>
                </div>
              </div>

              {status === "success" && (
                <Alert className="bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>Your security questions have been updated successfully.</AlertDescription>
                </Alert>
              )}

              {status === "error" && (
                <Alert variant="destructive">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    There was a problem updating your security questions. Please try again.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={
                  isLoading ||
                  !questions.question1 ||
                  !questions.answer1 ||
                  !questions.question2 ||
                  !questions.answer2 ||
                  !questions.question3 ||
                  !questions.answer3
                }
              >
                {isLoading ? "Saving..." : "Save Security Questions"}
              </Button>
              <Button type="button" variant="outline" className="w-full" asChild>
                <Link href="/profile">Cancel</Link>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  )
}

