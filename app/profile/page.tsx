"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Camera, CheckCircle, Info, Pencil } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { CelebrationAnimation } from "@/components/ui/celebration-animation"
import { EnhancedAvatar } from "@/components/enhanced-avatar"
import { useAvatar } from "@/contexts/avatar-context"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<null | "success" | "error">(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+592 123 4567",
    address: "123 Main St, Georgetown, Guyana",
    dateOfBirth: "1990-01-01",
  })

  const { avatarUrl, initials } = useAvatar()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStatus("success")
      setIsEditing(false)
      setShowCelebration(true)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <CelebrationAnimation
        show={showCelebration}
        message="Profile Updated Successfully!"
        onComplete={() => setShowCelebration(false)}
      />

      <header className="sticky top-0 z-10 bg-primary p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2 text-white hover:bg-primary-600">
              <Link href="/settings">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold text-white">Personal Information</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-primary-600"
            onClick={() => {
              if (isEditing) {
                setIsEditing(false)
                setStatus(null)
              } else {
                setIsEditing(true)
              }
            }}
          >
            {isEditing ? (
              "Cancel"
            ) : (
              <>
                <Pencil className="mr-1 h-4 w-4" />
                Edit
              </>
            )}
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <div className="mb-6 flex flex-col items-center">
          <div className="relative mb-2">
            <EnhancedAvatar
              src={avatarUrl || ""}
              alt="User"
              initials={initials}
              size="xl"
              className="border-2 border-white shadow-md"
            />
            <Button
              size="icon"
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-white hover:bg-primary-600"
              asChild
            >
              <Link href="/profile/avatar">
                <Camera className="h-4 w-4" />
                <span className="sr-only">Change Avatar</span>
              </Link>
            </Button>
          </div>
          <h2 className="text-xl font-semibold">{formData.fullName}</h2>
          <p className="text-sm text-gray-500">Member since March 2025</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>
              {isEditing ? "Update your personal information" : "Your personal information is secure and private"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {status === "success" && (
                <Alert className="bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>Your profile information has been updated successfully.</AlertDescription>
                </Alert>
              )}

              {status === "error" && (
                <Alert variant="destructive">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>There was a problem updating your profile. Please try again.</AlertDescription>
                </Alert>
              )}
            </CardContent>

            {isEditing && (
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-primary text-white hover:bg-primary-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            )}
          </form>
        </Card>

        <div className="mt-4">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/profile/security-questions">Security Questions</Link>
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

