"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, Filter, Search } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import Image from "next/image"
import { toast } from "@/components/ui/use-toast"

// Mock add funds history data with updated dates (after March 27, 2025)
const addFundsHistory = [
  {
    id: 1,
    carrier: "digicel",
    amount: 5000,
    voucherCode: "DIG123456789",
    date: "2025-04-10T10:30:00",
    status: "success",
  },
  {
    id: 2,
    carrier: "gtt",
    amount: 10000,
    voucherCode: "GTT987654321",
    date: "2025-04-08T09:20:00",
    status: "success",
  },
  {
    id: 3,
    carrier: "digicel",
    amount: 2000,
    voucherCode: "DIG456789123",
    date: "2025-04-05T14:15:00",
    status: "success",
  },
  {
    id: 4,
    carrier: "gtt",
    amount: 5000,
    voucherCode: "GTT321654987",
    date: "2025-04-01T16:30:00",
    status: "failed",
    error: "Invalid voucher code",
  },
  {
    id: 5,
    carrier: "digicel",
    amount: 1000,
    voucherCode: "DIG789123456",
    date: "2025-03-28T11:45:00",
    status: "success",
  },
]

export default function AddFundsHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCarrier, setFilterCarrier] = useState("all")

  // Filter history based on search term and filter carrier
  const filteredHistory = addFundsHistory.filter((item) => {
    const matchesSearch =
      item.voucherCode.toLowerCase().includes(searchTerm.toLowerCase()) || item.amount.toString().includes(searchTerm)

    const matchesCarrier = filterCarrier === "all" || item.carrier === filterCarrier

    return matchesSearch && matchesCarrier
  })

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your transaction history is being downloaded as CSV.",
      variant: "default",
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/add-funds">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Add Funds History</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle>Prepaid Credit History</CardTitle>
            <CardDescription>View your past prepaid credit transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by voucher code"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterCarrier} onValueChange={setFilterCarrier}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Carriers</SelectItem>
                  <SelectItem value="digicel">Digicel</SelectItem>
                  <SelectItem value="gtt">GTT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <Link href={`/transactions/${item.id}`} key={item.id}>
                <Card className={item.status === "failed" ? "border-red-200" : ""}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <div className="mr-3 overflow-hidden rounded-full bg-white p-1 shadow">
                        <Image
                          src={`https://hebbkx1anhila5yf.public.blob.vercel-storage.com/${
                            item.carrier === "digicel"
                              ? "digicel-logo-MoHV8q1LLOZPdSRJmIs4Bzevlt2Z2x.png"
                              : "gtt-logo-IFcxR74KmUyVwRYub9XSe2FQcxy4MC.png"
                          }`}
                          alt={item.carrier === "digicel" ? "Digicel" : "GTT"}
                          width={24}
                          height={24}
                          className="h-6 w-6 object-contain"
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{item.carrier === "digicel" ? "Digicel" : "GTT"} Voucher</p>
                          {item.status === "failed" && (
                            <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                              Failed
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{new Date(item.date).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">+GYD {item.amount.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Code: {item.voucherCode}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Search className="mb-2 h-8 w-8 text-gray-400" />
                <h3 className="text-lg font-medium">No transactions found</h3>
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
            Export Transaction History
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

