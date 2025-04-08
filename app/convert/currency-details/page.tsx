"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, ArrowRight, Info, RefreshCw } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function CurrencyDetails() {
  const [isLoading, setIsLoading] = useState(true)
  const [currencyData, setCurrencyData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call to fetch currency details
    setIsLoading(true)

    setTimeout(() => {
      setCurrencyData({
        fromCurrency: "GYD",
        toCurrency: "USD",
        currentRate: 0.0048,
        historicalRates: [
          { date: "2025-03-10", rate: 0.0048 },
          { date: "2025-03-09", rate: 0.0047 },
          { date: "2025-03-08", rate: 0.0049 },
          { date: "2025-03-07", rate: 0.0048 },
          { date: "2025-03-06", rate: 0.0046 },
          { date: "2025-03-05", rate: 0.0047 },
          { date: "2025-03-04", rate: 0.0048 },
        ],
        lastUpdated: new Date().toISOString(),
        fee: 1.5,
      })
      setIsLoading(false)
    }, 1500)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/convert">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Currency Details</h1>
          </div>
        </header>

        <main className="flex-1 p-4 pb-20">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
            <p className="mt-4 text-gray-500">Loading currency details...</p>
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
              <Link href="/convert">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Currency Details</h1>
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
              <Link href="/convert">Return to Conversion</Link>
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
            <Link href="/convert">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Currency Details</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Exchange Rate</CardTitle>
              <Button variant="outline" size="sm" className="h-8">
                <RefreshCw className="mr-1 h-3 w-3" />
                Refresh
              </Button>
            </div>
            <CardDescription>Last updated: {new Date(currencyData.lastUpdated).toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <span className="text-lg font-bold">{currencyData.fromCurrency}</span>
                </div>
                <p className="mt-1 text-sm">Guyanese Dollar</p>
              </div>
              <ArrowRight className="h-6 w-6 text-gray-400" />
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <span className="text-lg font-bold">{currencyData.toCurrency}</span>
                </div>
                <p className="mt-1 text-sm">US Dollar</p>
              </div>
            </div>

            <div className="rounded-md bg-blue-50 p-4 text-center">
              <p className="text-sm text-blue-800">Current Exchange Rate</p>
              <p className="text-2xl font-bold text-blue-800">
                1 {currencyData.fromCurrency} = {currencyData.currentRate} {currencyData.toCurrency}
              </p>
              <p className="text-sm text-blue-600">Fee: {currencyData.fee}% of transaction amount</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Historical Rates</CardTitle>
            <CardDescription>7-day rate history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 w-full">
              <div className="flex h-full flex-col justify-between">
                {currencyData.historicalRates.map((rate: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{new Date(rate.date).toLocaleDateString()}</span>
                    <div className="flex flex-1 items-center px-4">
                      <div
                        className="h-2 bg-blue-500"
                        style={{
                          width: `${(rate.rate / 0.005) * 100}%`,
                          maxWidth: "100%",
                        }}
                      ></div>
                    </div>
                    <span className="font-medium">{rate.rate}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Calculator</CardTitle>
            <CardDescription>Quick conversion estimates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md bg-gray-50 p-3 text-center">
                <p className="text-sm text-gray-500">1,000 GYD</p>
                <p className="text-lg font-medium">{(1000 * currencyData.currentRate).toFixed(2)} USD</p>
              </div>
              <div className="rounded-md bg-gray-50 p-3 text-center">
                <p className="text-sm text-gray-500">5,000 GYD</p>
                <p className="text-lg font-medium">{(5000 * currencyData.currentRate).toFixed(2)} USD</p>
              </div>
              <div className="rounded-md bg-gray-50 p-3 text-center">
                <p className="text-sm text-gray-500">10,000 GYD</p>
                <p className="text-lg font-medium">{(10000 * currencyData.currentRate).toFixed(2)} USD</p>
              </div>
              <div className="rounded-md bg-gray-50 p-3 text-center">
                <p className="text-sm text-gray-500">50,000 GYD</p>
                <p className="text-lg font-medium">{(50000 * currencyData.currentRate).toFixed(2)} USD</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/convert">
                <RefreshCw className="mr-2 h-4 w-4" />
                Convert Currency
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  )
}

