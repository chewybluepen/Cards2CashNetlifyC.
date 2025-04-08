"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, Mail, Phone, MessageSquare } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { FormField } from "@/components/ui/form-field"
import { useForm } from "@/hooks/use-form"

export default function ContactSupport() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { formState, handleChange, handleBlur, validateForm, resetForm } = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      category: "",
      message: "",
    },
    validationRules: {
      name: { required: true, minLength: 2 },
      email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      category: { required: true },
      message: { required: true, minLength: 10 },
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        resetForm()
        setIsSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/help">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Contact Support</h1>
        </div>
        <p className="mt-1 text-center text-xs italic text-gray-500">
          The Future of Your Finances, For a Borderless World
        </p>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>
              We're here to help. Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <FormField
                label="Full Name"
                name="name"
                value={formState.values.name}
                error={formState.touched.name ? formState.errors.name : ""}
                required
              >
                <Input
                  placeholder="Enter your full name"
                  name="name"
                  value={formState.values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormField>

              <FormField
                label="Email Address"
                name="email"
                value={formState.values.email}
                error={formState.touched.email ? formState.errors.email : ""}
                required
              >
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  name="email"
                  value={formState.values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormField>

              <FormField
                label="Phone Number (Optional)"
                name="phone"
                value={formState.values.phone}
                error={formState.touched.phone ? formState.errors.phone : ""}
              >
                <Input
                  placeholder="Enter your phone number"
                  name="phone"
                  value={formState.values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormField>

              <FormField
                label="Category"
                name="category"
                value={formState.values.category}
                error={formState.touched.category ? formState.errors.category : ""}
                required
              >
                <Select
                  value={formState.values.category}
                  onValueChange={(value) => handleChange({ target: { name: "category", value } } as any)}
                  onOpenChange={() => handleBlur({ target: { name: "category" } } as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account">Account Issues</SelectItem>
                    <SelectItem value="payment">Payment Problems</SelectItem>
                    <SelectItem value="cards">Virtual Cards</SelectItem>
                    <SelectItem value="conversion">Currency Conversion</SelectItem>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                label="Message"
                name="message"
                value={formState.values.message}
                error={formState.touched.message ? formState.errors.message : ""}
                required
              >
                <Textarea
                  placeholder="Describe your issue or question in detail"
                  className="min-h-[120px]"
                  name="message"
                  value={formState.values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormField>

              {isSuccess && (
                <Alert className="bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Message Sent!</AlertTitle>
                  <AlertDescription>
                    Thank you for contacting us. We'll get back to you as soon as possible.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
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
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Email Support</h3>
                <p className="text-sm text-gray-600">support@cards2cash.com</p>
                <p className="text-xs text-gray-500">Response time: Within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Phone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Phone Support</h3>
              </div>
              <div>
                <p className="text-sm text-gray-600">+592-123-4567</p>
                <p className="text-xs text-gray-500">Available: Mon-Fri, 8am-6pm</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="rounded-full bg-blue-100 p-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Live Chat</h3>
                <p className="text-sm text-gray-600">Available in the app</p>
                <p className="text-xs text-gray-500">Response time: Typically within minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  )
}

