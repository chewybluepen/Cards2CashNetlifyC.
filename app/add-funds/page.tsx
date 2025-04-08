"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, History, Info, Wifi, WifiOff, Calculator } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { CelebrationAnimation } from "@/components/ui/celebration-animation"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { SearchFilterBar } from "@/components/search-filter-bar"
import { CarrierSection } from "@/components/carrier-section"
import { FaqSection } from "@/components/faq-section"
import {
  carriers,
  getCarriersByRegion,
  getRecentlyUsedCarriers,
  searchCarriers,
  filterCarriersByCurrency,
  type Carrier,
} from "@/lib/carrier-data"

export default function AddFunds() {
  // State for carrier selection and voucher code
  const [selectedCarrier, setSelectedCarrier] = useState("digicel")
  const [voucherCode, setVoucherCode] = useState("")

  // State for loading and status
  const [isLoading, setIsLoading] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [status, setStatus] = useState<null | "success" | "error">(null)
  const [isOffline, setIsOffline] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  // State for carrier data
  const [filteredCarriers, setFilteredCarriers] = useState<Carrier[]>(carriers)
  const [recentlyUsedCarriers, setRecentlyUsedCarriers] = useState<Carrier[]>([])

  // Load carrier data with simulated delay
  useEffect(() => {
    const loadData = async () => {
      setIsDataLoading(true)
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setRecentlyUsedCarriers(getRecentlyUsedCarriers())
      setIsDataLoading(false)
    }

    loadData()
  }, [])

  // Handle search
  const handleSearch = (query: string) => {
    setFilteredCarriers(searchCarriers(query))
  }

  // Handle currency filter
  const handleCurrencyFilter = (currency: string) => {
    setFilteredCarriers(filterCarriersByCurrency(currency))
  }

  // Handle carrier selection
  const handleSelectCarrier = (carrier: Carrier) => {
    setSelectedCarrier(carrier.id)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate processing
    setTimeout(() => {
      setIsLoading(false)
      if (voucherCode.length >= 10) {
        setStatus("success")
        setShowCelebration(true) // Show celebration on success

        // Update recently used carriers (in a real app, this would be saved to localStorage or API)
        const selectedCarrierData = carriers.find((c) => c.id === selectedCarrier)
        if (selectedCarrierData) {
          const updatedRecent = [
            selectedCarrierData,
            ...recentlyUsedCarriers.filter((c) => c.id !== selectedCarrier).slice(0, 2),
          ]
          setRecentlyUsedCarriers(updatedRecent)
        }
      } else {
        setStatus("error")
      }
    }, 1500)
  }

  // Toggle offline mode
  const toggleOfflineMode = () => {
    setIsOffline(!isOffline)
  }

  // Organize carriers by region
  const { guyaneseCarriers, carriersByRegion } = getCarriersByRegion()

  // Get the selected carrier details
  const selectedCarrierDetails = carriers.find((c) => c.id === selectedCarrier)

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <CelebrationAnimation
        show={showCelebration}
        message="Funds Added Successfully!"
        onComplete={() => setShowCelebration(false)}
      />

      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Add Prepaid Credit</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card>
          <CardHeader>
            <CardTitle>Load Prepaid Credit</CardTitle>
            <CardDescription>Convert your prepaid phone credit into digital funds</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {isOffline && (
              <Alert className="bg-amber-50 text-amber-800">
                <WifiOff className="h-4 w-4" />
                <AlertTitle>Offline Mode</AlertTitle>
                <AlertDescription>
                  Your transaction will be queued and processed when you're back online.
                </AlertDescription>
              </Alert>
            )}

            {/* Search and Filter Bar */}
            <SearchFilterBar onSearch={handleSearch} onFilterCurrency={handleCurrencyFilter} />

            {isDataLoading ? (
              <div className="py-8 flex justify-center">
                <LoadingSpinner text="Loading carriers..." />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Recently Used Carriers */}
                {recentlyUsedCarriers.length > 0 && (
                  <CarrierSection
                    title="Recently Used"
                    carriers={recentlyUsedCarriers}
                    selectedCarrier={selectedCarrier}
                    onSelectCarrier={handleSelectCarrier}
                  />
                )}

                {/* Guyanese Carriers */}
                <CarrierSection
                  title="Guyanese Carriers"
                  carriers={guyaneseCarriers.filter((c) => filteredCarriers.some((fc) => fc.id === c.id))}
                  selectedCarrier={selectedCarrier}
                  onSelectCarrier={handleSelectCarrier}
                  className="border-b pb-4"
                />

                {/* International Carriers by Region */}
                {Object.entries(carriersByRegion).map(([region, regionCarriers]) => {
                  const filteredRegionCarriers = regionCarriers.filter((c) =>
                    filteredCarriers.some((fc) => fc.id === c.id),
                  )

                  if (filteredRegionCarriers.length === 0) return null

                  return (
                    <CarrierSection
                      key={region}
                      title={`${region} Carriers`}
                      carriers={filteredRegionCarriers}
                      selectedCarrier={selectedCarrier}
                      onSelectCarrier={handleSelectCarrier}
                    />
                  )
                })}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4 mt-6">
                {selectedCarrierDetails && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Selected Carrier</h3>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-white rounded-full p-1 mr-3 flex items-center justify-center">
                        <img
                          src={selectedCarrierDetails.logo || "/placeholder.svg"}
                          alt={selectedCarrierDetails.name}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=32&width=32"
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{selectedCarrierDetails.name}</p>
                        <p className="text-xs text-gray-500">
                          {selectedCarrierDetails.country} • Supported currencies:{" "}
                          {selectedCarrierDetails.currencies.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="voucher-code">Voucher Code</Label>
                  <Input
                    id="voucher-code"
                    placeholder="Enter your voucher code"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500">Enter the code from your prepaid voucher card</p>
                </div>

                {status === "success" && (
                  <Alert className="bg-green-50 text-green-800">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>
                      Your prepaid credit has been successfully added to your account.
                    </AlertDescription>
                  </Alert>
                )}

                {status === "error" && (
                  <Alert variant="destructive">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>Invalid voucher code. Please check and try again.</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="mt-6">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Add Credit"}
                </Button>
              </div>
            </form>

            {/* FAQ Section */}
            <FaqSection />
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <Button type="button" variant="outline" className="w-full" onClick={toggleOfflineMode}>
              {isOffline ? <Wifi className="mr-2 h-4 w-4" /> : <WifiOff className="mr-2 h-4 w-4" />}
              {isOffline ? "Switch to Online Mode" : "Simulate Offline Mode"}
            </Button>
            <div className="grid grid-cols-2 gap-2 w-full">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/add-funds/history">
                  <History className="mr-2 h-4 w-4" />
                  View History
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/add-funds/rates">
                  <Calculator className="mr-2 h-4 w-4" />
                  View Rates
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  )
}

