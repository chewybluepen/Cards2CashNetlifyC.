"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, CreditCard, Download, Filter, Plus, RefreshCw, Search } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { CompactCurrencyDisplay } from "@/components/ui/currency-display"

const transactions = [
  {
    id: 1,
    type: "add",
    title: "Added Funds",
    amount: 5000,
    currency: "GYD",
    date: "2025-03-10T10:30:00",
    status: "success",
  },
  {
    id: 2,
    type: "card",
    title: "Virtual Card",
    amount: 2500,
    currency: "GYD",
    date: "2025-03-09T15:45:00",
    status: "success",
  },
  {
    id: 3,
    type: "convert",
    title: "Currency Conversion",
    amount: 10000,
    currency: "GYD",
    convertedAmount: 48,
    convertedCurrency: "USD",
    date: "2025-03-09T14:15:00",
    status: "success",
  },
  {
    id: 4,
    type: "add",
    title: "Added Funds",
    amount: 10000,
    currency: "GYD",
    date: "2025-03-08T09:20:00",
    status: "success",
  },
  {
    id: 5,
    type: "card",
    title: "Virtual Card",
    amount: 5000,
    currency: "GYD",
    date: "2025-03-07T16:30:00",
    status: "failed",
  },
  {
    id: 6,
    type: "convert",
    title: "Currency Conversion",
    amount: 20000,
    currency: "GYD",
    convertedAmount: 96,
    convertedCurrency: "USD",
    date: "2025-03-06T11:45:00",
    status: "success",
  },
]

export default function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || transaction.type === filterType
    return matchesSearch && matchesType
  })

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
          <h1 className="text-lg font-semibold">Transaction History</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle>Transactions</CardTitle>
            <CardDescription>View and filter your transaction history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search transactions"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="add">Added Funds</SelectItem>
                  <SelectItem value="card">Virtual Cards</SelectItem>
                  <SelectItem value="convert">Conversions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <div className="space-y-2">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <Card key={transaction.id} className={transaction.status === "failed" ? "border-red-200" : ""}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center">
                        <div
                          className={`mr-3 rounded-full p-2 ${
                            transaction.type === "add"
                              ? "bg-green-100"
                              : transaction.type === "card"
                                ? "bg-red-100"
                                : "bg-blue-100"
                          }`}
                        >
                          {transaction.type === "add" && <Plus className="h-4 w-4 text-green-600" />}
                          {transaction.type === "card" && <CreditCard className="h-4 w-4 text-red-600" />}
                          {transaction.type === "convert" && <RefreshCw className="h-4 w-4 text-blue-600" />}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{transaction.title}</p>
                            {transaction.status === "failed" && (
                              <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                                Failed
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {transaction.type === "convert" ? (
                          <div>
                            <p className="font-medium text-blue-600">
                              {transaction.currency} → {transaction.convertedCurrency}
                            </p>
                            <p className="text-xs">
                              <CompactCurrencyDisplay amount={transaction.amount} currency={transaction.currency} /> ={" "}
                              <CompactCurrencyDisplay
                                amount={transaction.convertedAmount || 0}
                                currency={transaction.convertedCurrency}
                              />
                            </p>
                          </div>
                        ) : (
                          <p
                            className={`font-medium ${transaction.type === "add" ? "text-green-600" : "text-red-600"}`}
                          >
                            {transaction.type === "add" ? "+" : "-"}
                            <CompactCurrencyDisplay amount={transaction.amount} currency={transaction.currency} />
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
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
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-center">
                  <Calendar className="h-16 w-16 text-gray-400" />
                </div>
                <p className="mt-4 text-center text-sm text-gray-500">
                  Calendar view will display your transactions organized by date.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-4 flex justify-center">
          <Button variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Export Transactions
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}
