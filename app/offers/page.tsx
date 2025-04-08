"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Copy, Search, Tag, ChevronRight } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

// Mock offers data
const offers = [
  {
    id: 1,
    merchant: "TechStore",
    discount: "10% Off",
    code: "TECH10",
    validUntil: "2025-03-31",
    category: "electronics",
    isNew: true,
    isLimited: false,
  },
  {
    id: 2,
    merchant: "FashionHub",
    discount: "15% Off",
    code: "STYLE15",
    validUntil: "2025-04-15",
    category: "fashion",
    isNew: false,
    isLimited: true,
  },
  {
    id: 3,
    merchant: "GroceryMart",
    discount: "5% Cashback",
    code: "GROCERY5",
    validUntil: "2025-05-01",
    category: "groceries",
    isNew: true,
    isLimited: false,
  },
  {
    id: 4,
    merchant: "TravelEasy",
    discount: "20% Off Hotels",
    code: "TRAVEL20",
    validUntil: "2025-06-30",
    category: "travel",
    isNew: false,
    isLimited: false,
  },
  {
    id: 5,
    merchant: "DineDelight",
    discount: "Buy 1 Get 1 Free",
    code: "DINE2FOR1",
    validUntil: "2025-04-30",
    category: "dining",
    isNew: false,
    isLimited: true,
  },
  {
    id: 6,
    merchant: "FitnessFirst",
    discount: "30% Off Annual Membership",
    code: "FIT30",
    validUntil: "2025-03-15",
    category: "fitness",
    isNew: true,
    isLimited: true,
  },
]

export default function PartnerOffers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  // Filter offers based on search term and active tab
  const filteredOffers = offers.filter((offer) => {
    const matchesSearch =
      offer.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.discount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTab =
      activeTab === "all" || (activeTab === "new" && offer.isNew) || (activeTab === "limited" && offer.isLimited)

    return matchesSearch && matchesTab
  })

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedCode(null)
    }, 2000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Partner Offers</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle>Exclusive Discounts</CardTitle>
            <CardDescription>Special offers from our partner merchants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search offers"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Offers</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="limited">Limited Time</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredOffers.length > 0 ? (
                filteredOffers.map((offer) => (
                  <Card key={offer.id} className="overflow-hidden">
                    <Link href={`/offers/${offer.id}`}>
                      <CardContent className="p-0">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{offer.merchant}</h3>
                            <div className="flex gap-1">
                              {offer.isNew && <Badge className="bg-blue-500">New</Badge>}
                              {offer.isLimited && <Badge className="bg-purple-600">Limited</Badge>}
                            </div>
                          </div>
                          <p className="mt-1 text-2xl font-bold">{offer.discount}</p>
                        </div>
                        <div className="p-4">
                          <div className="mb-4 flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-500">Promo Code:</p>
                              <p className="font-mono font-medium">{offer.code}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handleCopyCode(offer.code)
                              }}
                            >
                              {copiedCode === offer.code ? (
                                "Copied!"
                              ) : (
                                <>
                                  <Copy className="mr-1 h-3 w-3" />
                                  Copy
                                </>
                              )}
                            </Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">
                              Valid until {new Date(offer.validUntil).toLocaleDateString()}
                            </p>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))
              ) : (
                <div className="col-span-full">
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <Tag className="mb-2 h-8 w-8 text-gray-400" />
                      <h3 className="text-lg font-medium">No offers found</h3>
                      <p className="text-sm text-gray-500">
                        Try adjusting your search to find what you're looking for.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Refer a Friend</CardTitle>
              <CardDescription>Share Cards2Cash with friends and earn rewards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-gray-50 p-4">
                <p className="mb-2 text-sm font-medium">Your Referral Code</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-lg font-bold">JOHN2025</p>
                  <Button variant="outline" size="sm" onClick={() => handleCopyCode("JOHN2025")}>
                    {copiedCode === "JOHN2025" ? (
                      "Copied!"
                    ) : (
                      <>
                        <Copy className="mr-1 h-3 w-3" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                When your friend signs up using your code and makes their first transaction, you'll both receive GYD
                1,000 in your accounts!
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Share Your Code</Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

