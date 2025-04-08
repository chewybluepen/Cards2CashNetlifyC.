"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, Filter, RefreshCw, Search } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { toast } from "@/components/ui/use-toast"

// Mock conversion history data with updated dates (after March 27, 2025)
const conversionHistory = [
  {
    id: 1,
    fromCurrency: "GYD",
    toCurrency: "USD",
    fromAmount: 10000,
    toAmount: 48,
    rate: 0.0048,
    fee: 150,
    date: "2025-04-10T14:30:00",
    status: "success",
  },
  {
    id: 2,
    fromCurrency: "GYD",
    toCurrency: "EUR",
    fromAmount: 20000,
    toAmount: 88,
    rate: 0.0044,
    fee: 300,
    date: "2025-04-08T09:15:00",
    status: "success",
  },
  {
    id: 3,
    fromCurrency: "USD",
    toCurrency: "GYD",
    fromAmount: 100,
    toAmount: 20865,
    rate: 208.65,
    fee: 313,
    date: "2025-04-05T16:45:00",
    status: "success",
  },
  {
    id: 4,
    fromCurrency: "GYD",
    toCurrency: "GBP",
    fromAmount: 15000,
    toAmount: 57,
    rate: 0.0038,
    fee: 225,
    date: "2025-04-01T11:20:00",
    status: "success",
  },
  {
    id: 5,
    fromCurrency: "GYD",
    toCurrency: "CAD",
    fromAmount: 5000,
    toAmount: 32.5,
    rate: 0.0065,
    fee: 75,
    date: "2025-03-28T13:10:00",
    status: "failed",
    error: "Insufficient funds",
  },
]

export function ConversionHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCurrency, setFilterCurrency] = useState("all")
  const [filteredHistory, setFilteredHistory] = useState(conversionHistory)

  useEffect(() => {
    // Filter history based on search term and filter currency
    const filtered = conversionHistory.filter((conversion) => {
      const lowerCaseSearch = searchTerm.toLowerCase()
      const matchesSearch =
        conversion.fromCurrency.toLowerCase().includes(lowerCaseSearch) ||
        conversion.toCurrency.toLowerCase().includes(lowerCaseSearch) ||
        conversion.fromAmount.toString().includes(searchTerm) ||
        conversion.toAmount.toString().includes(searchTerm)

      const matchesCurrency =
        filterCurrency === "all" ||
        conversion.fromCurrency === filterCurrency ||
        conversion.toCurrency === filterCurrency

      return matchesSearch && matchesCurrency
    })

    setFilteredHistory(filtered)
  }, [searchTerm, filterCurrency])

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your conversion history is being downloaded as CSV.",
      variant: "default",
    })
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
          <h1 className="text-lg font-semibold">Conversion History</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle>Currency Conversions</CardTitle>
            <CardDescription>View your past currency conversions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search conversions"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterCurrency} onValueChange={setFilterCurrency}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Currencies</SelectItem>
                  <SelectItem value="GYD">GYD</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="CAD">CAD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((conversion) => (
              <Link href={`/transactions/${conversion.id}`} key={conversion.id}>
                <Card className={conversion.status === "failed" ? "border-red-200" : ""}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <div className="mr-3 rounded-full bg-blue-100 p-2">
                        <RefreshCw className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">
                            {conversion.fromCurrency} → {conversion.toCurrency}
                          </p>
                          {conversion.status === "failed" && (
                            <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                              Failed
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(conversion.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-blue-600">
                        {conversion.fromAmount.toLocaleString()} {conversion.fromCurrency}
                      </p>
                      <p className="text-xs">
                        = {conversion.toAmount.toLocaleString()} {conversion.toCurrency}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Search className="mb-2 h-8 w-8 text-gray-400" />
                <h3 className="text-lg font-medium">No conversions found</h3>
                <p className="text-sm text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <Button variant="outline" className="w-full" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Export Conversion History
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConversionHistory />
    </Suspense>
  )
}
