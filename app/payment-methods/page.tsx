"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, BanknoteIcon as Bank, CreditCard, Info, Plus, Trash2 } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

// Mock payment methods
const paymentMethods = [
  {
    id: 1,
    type: "card",
    name: "Visa ending in 4567",
    details: "Expires 05/26",
    isDefault: true,
  },
  {
    id: 2,
    type: "bank",
    name: "Republic Bank",
    details: "Account ending in 7890",
    isDefault: false,
  },
]

export default function PaymentMethods() {
  const [methods, setMethods] = useState(paymentMethods)
  const [status, setStatus] = useState<null | "success" | "error">(null)

  const handleSetDefault = (id: number) => {
    setMethods(
      methods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
    setStatus("success")

    // Reset status after 3 seconds
    setTimeout(() => {
      setStatus(null)
    }, 3000)
  }

  const handleRemove = (id: number) => {
    setMethods(methods.filter((method) => method.id !== id))
    setStatus("success")

    // Reset status after 3 seconds
    setTimeout(() => {
      setStatus(null)
    }, 3000)
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
          <h1 className="text-lg font-semibold">Payment Methods</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Tabs defaultValue="cards" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="bank">Bank Accounts</TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="mt-4 space-y-4">
            {methods.filter((method) => method.type === "card").length > 0 ? (
              methods
                .filter((method) => method.type === "card")
                .map((method) => (
                  <Card key={method.id} className={method.isDefault ? "border-blue-200" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-3 rounded-full bg-blue-100 p-2">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-xs text-gray-500">{method.details}</p>
                            {method.isDefault && (
                              <span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!method.isDefault && (
                            <Button variant="ghost" size="sm" onClick={() => handleSetDefault(method.id)}>
                              Set Default
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleRemove(method.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <CreditCard className="mb-2 h-12 w-12 text-gray-300" />
                  <h3 className="text-lg font-medium">No cards added yet</h3>
                  <p className="text-sm text-gray-500">Add a debit or credit card to make payments</p>
                </CardContent>
              </Card>
            )}

            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/payment-methods/add-card">
                <Plus className="mr-2 h-4 w-4" />
                Add New Card
              </Link>
            </Button>
          </TabsContent>

          <TabsContent value="bank" className="mt-4 space-y-4">
            {methods.filter((method) => method.type === "bank").length > 0 ? (
              methods
                .filter((method) => method.type === "bank")
                .map((method) => (
                  <Card key={method.id} className={method.isDefault ? "border-blue-200" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-3 rounded-full bg-green-100 p-2">
                            <Bank className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-xs text-gray-500">{method.details}</p>
                            {method.isDefault && (
                              <span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!method.isDefault && (
                            <Button variant="ghost" size="sm" onClick={() => handleSetDefault(method.id)}>
                              Set Default
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleRemove(method.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Bank className="mb-2 h-12 w-12 text-gray-300" />
                  <h3 className="text-lg font-medium">No bank accounts added yet</h3>
                  <p className="text-sm text-gray-500">Link a bank account to make transfers</p>
                </CardContent>
              </Card>
            )}

            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/payment-methods/add-bank">
                <Plus className="mr-2 h-4 w-4" />
                Add Bank Account
              </Link>
            </Button>
          </TabsContent>
        </Tabs>

        {status === "success" && (
          <Alert className="mt-4 bg-green-50 text-green-800">
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Your payment methods have been updated successfully.</AlertDescription>
          </Alert>
        )}

        {status === "error" && (
          <Alert className="mt-4" variant="destructive">
            <Info className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>There was a problem updating your payment methods. Please try again.</AlertDescription>
          </Alert>
        )}
      </main>

      <BottomNavigation />
    </div>
  )
}

