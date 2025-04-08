"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Filter, Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BottomNavigation } from "@/components/bottom-navigation"
import { AnimatedNetflixCard } from "@/components/ui/animated-netflix-card"
import { ProviderLogo } from "@/components/provider-logo"

// Mock data for conversion history
const conversions = [
  {
    id: 1,
    provider: "Rogers",
    providerId: "rogers",
    amount: 50,
    convertedAmount: 41.25,
    date: "2025-03-28T14:30:00",
    status: "completed",
    exchangeRate: 0.85,
    fee: 1.25,
  },
  {
    id: 2,
    provider: "Bell",
    providerId: "bell",
    amount: 100,
    convertedAmount: 80.75,
    date: "2025-03-25T10:15:00",
    status: "completed",
    exchangeRate: 0.83,
    fee: 2.25,
  },
  {
    id: 3,
    provider: "AT&T",
    providerId: "att",
    amount: 75,
    convertedAmount: 66.38,
    date: "2025-03-20T16:45:00",
    status: "completed",
    exchangeRate: 0.9,
    fee: 1.13,
  },
  {
    id: 4,
    provider: "Verizon",
    providerId: "verizon",
    amount: 200,
    convertedAmount: 172.8,
    date: "2025-03-15T09:30:00",
    status: "completed",
    exchangeRate: 0.88,
    fee: 3.2,
  },
  {
    id: 5,
    provider: "T-Mobile",
    providerId: "tmobile",
    amount: 150,
    convertedAmount: 127.58,
    date: "2025-03-10T13:20:00",
    status: "completed",
    exchangeRate: 0.87,
    fee: 2.93,
  },
  {
    id: 6,
    provider: "Telus",
    providerId: "telus",
    amount: 80,
    convertedAmount: 63.84,
    date: "2025-03-05T11:10:00",
    status: "completed",
    exchangeRate: 0.82,
    fee: 1.76,
  },
  {
    id: 7,
    provider: "Vodafone",
    providerId: "vodafone",
    amount: 120,
    convertedAmount: 93.6,
    date: "2025-02-28T15:45:00",
    status: "completed",
    exchangeRate: 0.8,
    fee: 2.4,
  },
  {
    id: 8,
    provider: "Orange",
    providerId: "orange",
    amount: 90,
    convertedAmount: 68.33,
    date: "2025-02-20T10:30:00",
    status: "completed",
    exchangeRate: 0.78,
    fee: 1.89,
  },
]

export default function ConversionHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterProvider, setFilterProvider] = useState("all")
  const [filterTimeframe, setFilterTimeframe] = useState("all")
  const [selectedConversion, setSelectedConversion] = useState<number | null>(null)

  // Filter conversions based on search term, provider, and timeframe
  const filteredConversions = conversions.filter((conversion) => {
    const matchesSearch =
      conversion.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversion.convertedAmount.toString().includes(searchTerm) ||
      conversion.amount.toString().includes(searchTerm)

    const matchesProvider = filterProvider === "all" || conversion.providerId === filterProvider

    let matchesTimeframe = true
    const conversionDate = new Date(conversion.date)
    const now = new Date()

    if (filterTimeframe === "week") {
      const oneWeekAgo = new Date()
      oneWeekAgo.setDate(now.getDate() - 7)
      matchesTimeframe = conversionDate >= oneWeekAgo
    } else if (filterTimeframe === "month") {
      const oneMonthAgo = new Date()
      oneMonthAgo.setMonth(now.getMonth() - 1)
      matchesTimeframe = conversionDate >= oneMonthAgo
    } else if (filterTimeframe === "year") {
      const oneYearAgo = new Date()
      oneYearAgo.setFullYear(now.getFullYear() - 1)
      matchesTimeframe = conversionDate >= oneYearAgo
    }

    return matchesSearch && matchesProvider && matchesTimeframe
  })

  const toggleConversionDetails = (id: number) => {
    if (selectedConversion === id) {
      setSelectedConversion(null)
    } else {
      setSelectedConversion(id)
    }
  }

  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#000000] text-white">Loading conversion history...</div>}>
      <div className="flex min-h-screen flex-col bg-[#000000]">
        <header className="sticky top-0 z-10 bg-[#141414] p-4 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2 text-white hover:bg-[#333333]">
              <Link href="/phone-credit">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-white">Conversion History</h1>
          </div>
        </header>

        <main className="flex-1 p-4 pb-20">
          <Card className="mb-4 bg-[#141414] border-[#333333]">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Phone Credit Conversions</CardTitle>
              <CardDescription className="text-gray-400">View and filter your conversion history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search conversions"
                    className="pl-8 bg-[#333333] border-[#444444] text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterProvider} onValueChange={setFilterProvider}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-[#333333] border-[#444444] text-white">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Provider" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F1F1F] border-[#444444] text-white">
                    <SelectItem value="all">All Providers</SelectItem>
                    <SelectItem value="rogers">Rogers</SelectItem>
                    <SelectItem value="bell">Bell</SelectItem>
                    <SelectItem value="telus">Telus</SelectItem>
                    <SelectItem value="att">AT&T</SelectItem>
                    <SelectItem value="verizon">Verizon</SelectItem>
                    <SelectItem value="tmobile">T-Mobile</SelectItem>
                    <SelectItem value="vodafone">Vodafone</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterTimeframe} onValueChange={setFilterTimeframe}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-[#333333] border-[#444444] text-white">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Timeframe" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1F1F1F] border-[#444444] text-white">
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#141414] text-white">
              <TabsTrigger value="list" className="data-[state=active]:bg-[#E50914]">
                List View
              </TabsTrigger>
              <TabsTrigger value="summary" className="data-[state=active]:bg-[#E50914]">
                Summary
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="mt-4 space-y-4">
              {filteredConversions.length > 0 ? (
                filteredConversions.map((conversion) => (
                  <AnimatedNetflixCard key={conversion.id} className="overflow-hidden">
                    <div
                      className="flex cursor-pointer items-center justify-between p-4"
                      onClick={() => toggleConversionDetails(conversion.id)}
                    >
                      <div className="flex items-center">
                        <div className="mr-4 h-10 w-10 overflow-hidden rounded-full bg-white p-1">
                          <ProviderLogo provider={conversion.providerId} />
                        </div>
                        <div>
                          <p className="font-medium text-white">{conversion.provider}</p>
                          <div className="flex items-center text-xs text-gray-400">
                            {new Date(conversion.date).toLocaleDateString()} •{" "}
                            {new Date(conversion.date).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">${conversion.convertedAmount.toFixed(2)}</p>
                        <p className="text-xs text-green-500">Completed</p>
                      </div>
                    </div>

                    {selectedConversion === conversion.id && (
                      <div className="border-t border-[#333333] bg-[#1F1F1F] p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-400">Original Amount</p>
                            <p className="font-medium text-white">${conversion.amount.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Converted Amount</p>
                            <p className="font-medium text-white">${conversion.convertedAmount.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Exchange Rate</p>
                            <p className="font-medium text-white">{conversion.exchangeRate.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400">Processing Fee</p>
                            <p className="font-medium text-white">${conversion.fee.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button variant="outline" size="sm" className="border-[#333333] text-white hover:bg-[#333333]">
                            <Download className="mr-2 h-3 w-3" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    )}
                  </AnimatedNetflixCard>
                ))
              ) : (
                <Card className="bg-[#141414] border-[#333333]">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <Search className="mb-2 h-8 w-8 text-gray-400" />
                    <h3 className="text-lg font-medium text-white">No conversions found</h3>
                    <p className="text-sm text-gray-400">
                      Try adjusting your search or filter to find what you're looking for.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="summary" className="mt-4">
              <AnimatedNetflixCard className="mb-4">
                <CardHeader>
                  <CardTitle className="text-white">Conversion Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-[#1F1F1F] p-4">
                      <p className="text-sm text-gray-400">Total Conversions</p>
                      <p className="text-2xl font-bold text-white">{filteredConversions.length}</p>
                    </div>
                    <div className="rounded-lg bg-[#1F1F1F] p-4">
                      <p className="text-sm text-gray-400">Total Value</p>
                      <p className="text-2xl font-bold text-white">
                        ${filteredConversions.reduce((sum, conv) => sum + conv.convertedAmount, 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-[#1F1F1F] p-4">
                      <p className="text-sm text-gray-400">Average Conversion</p>
                      <p className="text-2xl font-bold text-white">
                        $
                        {(
                          filteredConversions.reduce((sum, conv) => sum + conv.convertedAmount, 0) /
                          (filteredConversions.length || 1)
                        ).toFixed(2)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-[#1F1F1F] p-4">
                      <p className="text-sm text-gray-400">Total Fees Paid</p>
                      <p className="text-2xl font-bold text-white">
                        ${filteredConversions.reduce((sum, conv) => sum + conv.fee, 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="mb-3 font-medium text-white">Conversions by Provider</h3>
                    <div className="space-y-2">
                      {Array.from(new Set(filteredConversions.map((c) => c.providerId))).map((providerId) => {
                        const providerConversions = filteredConversions.filter((c) => c.providerId === providerId)
                        const totalValue = providerConversions.reduce((sum, conv) => sum + conv.convertedAmount, 0)
                        const percentage =
                          (totalValue / filteredConversions.reduce((sum, conv) => sum + conv.convertedAmount, 0)) * 100

                        return (
                          <div key={providerId} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="mr-2 h-6 w-6 overflow-hidden rounded-full bg-white p-0.5">
                                  <ProviderLogo provider={providerId} />
                                </div>
                                <span className="text-sm text-white">{providerConversions[0].provider}</span>
                              </div>
                              <span className="text-sm text-white">${totalValue.toFixed(2)}</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-[#333333]">
                              <div
                                className="h-full bg-[#E50914] transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </AnimatedNetflixCard>

              <Button variant="outline" className="w-full border-[#333333] text-white hover:bg-[#333333]">
                <Download className="mr-2 h-4 w-4" />
                Export Summary
              </Button>
            </TabsContent>
          </Tabs>
        </main>

        <BottomNavigation />
      </div>
    </Suspense>
  )
}
