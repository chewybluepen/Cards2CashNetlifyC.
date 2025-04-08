"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Calendar, Copy, ExternalLink, Info, Share2 } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { toast } from "@/components/ui/use-toast"

// Mock offers data with updated dates (after March 27, 2025)
const offers = [
  {
    id: 1,
    merchant: "TechStore",
    discount: "10% Off",
    code: "TECH10",
    validUntil: "2025-05-31",
    category: "electronics",
    isNew: true,
    isLimited: false,
    description: "Get 10% off on all electronics at TechStore. Valid for both online and in-store purchases.",
    terms: [
      "Minimum purchase of GYD 5,000 required",
      "Cannot be combined with other offers",
      "Valid until May 31, 2025",
      "Excludes already discounted items",
    ],
    website: "https://techstore.gy",
    locations: ["Georgetown Mall, 123 Main St", "Berbice Shopping Center, 456 New St"],
  },
  {
    id: 2,
    merchant: "FashionHub",
    discount: "15% Off",
    code: "STYLE15",
    validUntil: "2025-06-15",
    category: "fashion",
    isNew: false,
    isLimited: true,
    description: "Enjoy 15% off on all clothing and accessories at FashionHub. Limited time offer!",
    terms: [
      "Valid for all products except sale items",
      "One-time use per customer",
      "Valid until June 15, 2025",
      "In-store and online",
    ],
    website: "https://fashionhub.gy",
    locations: ["Stabroek Market, 789 Fashion Ave"],
  },
  {
    id: 3,
    merchant: "GroceryMart",
    discount: "5% Cashback",
    code: "GROCERY5",
    validUntil: "2025-07-01",
    category: "groceries",
    isNew: true,
    isLimited: false,
    description:
      "Earn 5% cashback on all grocery purchases at GroceryMart. Cashback will be credited to your Cards2Cash account.",
    terms: [
      "Maximum cashback of GYD 2,000 per transaction",
      "Valid for all grocery items",
      "Valid until July 1, 2025",
      "Must pay using Cards2Cash virtual card",
    ],
    website: "https://grocerymart.gy",
    locations: ["123 Food St, Georgetown", "456 Market Rd, New Amsterdam", "789 Grocery Ln, Linden"],
  },
]

export default function OfferDetails() {
  const params = useParams()
  const router = useRouter()
  const [offer, setOffer] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch offer details
    setIsLoading(true)

    setTimeout(() => {
      const id = Number(params.id)
      const foundOffer = offers.find((o) => o.id === id)

      if (foundOffer) {
        setOffer(foundOffer)
        setError(null)
      } else {
        setError("Offer not found")
      }

      setIsLoading(false)
    }, 1000)
  }, [params.id])

  const handleCopyCode = () => {
    if (!offer) return

    navigator.clipboard.writeText(offer.code)
    setCopiedCode(true)

    toast({
      title: "Code Copied",
      description: `Promo code ${offer?.code} has been copied to clipboard.`,
      variant: "default",
    })

    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedCode(false)
    }, 2000)
  }

  const handleShare = () => {
    toast({
      title: "Share Offer",
      description: "Sharing options opened.",
      variant: "default",
    })
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/offers">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Offer Details</h1>
          </div>
        </header>

        <main className="flex-1 p-4 pb-20">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
            <p className="mt-4 text-gray-500">Loading offer details...</p>
          </div>
        </main>

        <BottomNavigation />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/offers">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Offer Details</h1>
          </div>
        </header>

        <main className="flex-1 p-4 pb-20">
          <Alert variant="destructive">
            <Info className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>

          <div className="mt-4 flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/offers">Return to Offers</Link>
            </Button>
          </div>
        </main>

        <BottomNavigation />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/offers">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Offer Details</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{offer.merchant}</h2>
              <div className="flex gap-1">
                {offer.isNew && <Badge className="bg-blue-500">New</Badge>}
                {offer.isLimited && <Badge className="bg-purple-600">Limited</Badge>}
              </div>
            </div>
            <p className="mt-2 text-3xl font-bold">{offer.discount}</p>
            <div className="mt-4 flex items-center text-sm">
              <Calendar className="mr-1 h-4 w-4" />
              <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
            </div>
          </div>

          <CardContent className="space-y-6 p-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Description</h3>
              <p className="text-gray-700">{offer.description}</p>
            </div>

            <div className="rounded-md bg-gray-50 p-4">
              <p className="mb-2 text-sm font-medium">Promo Code:</p>
              <div className="flex items-center justify-between">
                <p className="font-mono text-lg font-bold">{offer.code}</p>
                <Button variant="outline" size="sm" onClick={handleCopyCode}>
                  {copiedCode ? (
                    "Copied!"
                  ) : (
                    <>
                      <Copy className="mr-1 h-4 w-4" />
                      Copy Code
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Terms & Conditions</h3>
              <ul className="list-inside list-disc space-y-1 text-gray-700">
                {offer.terms.map((term: string, index: number) => (
                  <li key={index}>{term}</li>
                ))}
              </ul>
            </div>

            {offer.locations && offer.locations.length > 0 && (
              <div>
                <h3 className="mb-2 text-lg font-semibold">Locations</h3>
                <ul className="list-inside list-disc space-y-1 text-gray-700">
                  {offer.locations.map((location: string, index: number) => (
                    <li key={index}>{location}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 border-t bg-gray-50 p-6">
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleCopyCode}>
              {copiedCode ? "Code Copied!" : "Copy Promo Code"}
            </Button>

            {offer.website && (
              <Button variant="outline" className="w-full" asChild>
                <Link href={offer.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit {offer.merchant} Website
                </Link>
              </Button>
            )}

            <Button variant="outline" className="w-full" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share This Offer
            </Button>
          </CardFooter>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  )
}

