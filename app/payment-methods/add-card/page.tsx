"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, CreditCard, Info, Lock } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { InteractiveButton } from "@/components/ui/interactive-button"
import { validateInput, showFeedback } from "@/lib/feedback-utils"

export default function AddCard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [status, setStatus] = useState<null | "success" | "error">(null)
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    setAsDefault: true,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
      setFormData((prev) => ({ ...prev, [name]: formatted }))
      return
    }

    // Format expiry date with slash
    if (name === "expiryDate") {
      const cleaned = value.replace(/\D/g, "")
      let formatted = cleaned

      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
      }

      setFormData((prev) => ({ ...prev, [name]: formatted }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    validateField(name, formData[name as keyof typeof formData])
  }

  const validateField = (name: string, value: string) => {
    let error = ""

    switch (name) {
      case "cardNumber":
        const cardNumberValidation = validateInput(value.replace(/\s/g, ""), {
          required: true,
          minLength: 16,
          maxLength: 16,
          pattern: /^\d{16}$/,
        })
        error = cardNumberValidation.valid ? "" : cardNumberValidation.message || "Invalid card number"
        break
      case "cardholderName":
        const nameValidation = validateInput(value, {
          required: true,
          minLength: 3,
        })
        error = nameValidation.valid ? "" : nameValidation.message || "Invalid name"
        break
      case "expiryDate":
        const expiryValidation = validateInput(value, {
          required: true,
          pattern: /^\d{2}\/\d{2}$/,
          custom: (val) => {
            const [month, year] = val.split("/").map(Number)
            const now = new Date()
            const currentYear = now.getFullYear() % 100
            const currentMonth = now.getMonth() + 1

            return month >= 1 && month <= 12 && (year > currentYear || (year === currentYear && month >= currentMonth))
          },
        })
        error = expiryValidation.valid ? "" : expiryValidation.message || "Invalid expiry date"
        break
      case "cvv":
        const cvvValidation = validateInput(value, {
          required: true,
          minLength: 3,
          maxLength: 4,
          pattern: /^\d{3,4}$/,
        })
        error = cvvValidation.valid ? "" : cvvValidation.message || "Invalid CVV"
        break
      default:
        break
    }

    setErrors((prev) => ({ ...prev, [name]: error }))
    return !error
  }

  const validateForm = () => {
    const fields = ["cardNumber", "cardholderName", "expiryDate", "cvv"]
    const touchedFields = { ...touched }

    fields.forEach((field) => {
      touchedFields[field] = true
      validateField(field, formData[field as keyof typeof formData])
    })

    setTouched(touchedFields)

    return fields.every((field) => !errors[field])
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, setAsDefault: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      showFeedback("error", {
        description: "Please correct the errors in the form",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowSuccess(true)
      setStatus("success")

      showFeedback("success", {
        title: "Card Added",
        description: "Your card has been added successfully",
        action: {
          label: "View Cards",
          onClick: () => router.push("/payment-methods"),
        },
      })

      // Redirect after success
      setTimeout(() => {
        router.push("/payment-methods")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/payment-methods">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Add New Card</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card>
          <CardHeader>
            <CardTitle>Card Details</CardTitle>
            <CardDescription>Add a debit or credit card to your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    className={cn("pl-10", errors.cardNumber && touched.cardNumber ? "border-red-500" : "")}
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={19}
                    required
                  />
                </div>
                {errors.cardNumber && touched.cardNumber && <p className="text-xs text-red-500">{errors.cardNumber}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardholderName">Cardholder Name</Label>
                <Input
                  id="cardholderName"
                  name="cardholderName"
                  className={cn(errors.cardholderName && touched.cardholderName ? "border-red-500" : "")}
                  placeholder="John Doe"
                  value={formData.cardholderName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {errors.cardholderName && touched.cardholderName && (
                  <p className="text-xs text-red-500">{errors.cardholderName}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    className={cn(errors.expiryDate && touched.expiryDate ? "border-red-500" : "")}
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={5}
                    required
                  />
                  {errors.expiryDate && touched.expiryDate && (
                    <p className="text-xs text-red-500">{errors.expiryDate}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    type="password"
                    className={cn(errors.cvv && touched.cvv ? "border-red-500" : "")}
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength={4}
                    required
                  />
                  {errors.cvv && touched.cvv && <p className="text-xs text-red-500">{errors.cvv}</p>}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="setAsDefault" checked={formData.setAsDefault} onCheckedChange={handleCheckboxChange} />
                <label
                  htmlFor="setAsDefault"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Set as default payment method
                </label>
              </div>

              <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-800">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Lock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p>
                      Your card information is encrypted and securely stored. We never share your details with
                      merchants.
                    </p>
                  </div>
                </div>
              </div>

              {status === "success" && (
                <Alert className="bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Card Added Successfully!</AlertTitle>
                  <AlertDescription>Your card has been added to your payment methods.</AlertDescription>
                </Alert>
              )}

              {status === "error" && (
                <Alert variant="destructive">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    There was a problem adding your card. Please check your card details and try again.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <InteractiveButton
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                loading={isLoading}
                loadingText="Adding Card..."
                showSuccess={showSuccess}
                successText="Card Added!"
              >
                Add Card
              </InteractiveButton>
              <Button type="button" variant="outline" className="w-full" asChild>
                <Link href="/payment-methods">Cancel</Link>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  )
}

// Helper function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}

