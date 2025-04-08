"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  ArrowLeft,
  CreditCard,
  Download,
  Flag,
  Info,
  MessageSquare,
  Plus,
  RefreshCw,
  Share2,
  CheckCircle,
  XCircle,
  ChevronRight,
} from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { AnimatedCard } from "@/components/ui/animated-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { ConfettiAnimation } from "@/components/ui/confetti-animation"
import { CompactCurrencyDisplay } from "@/components/ui/currency-display"

// Mock transaction data
const transactions = [
  {
    id: "1",
    type: "add",
    title: "Added Funds",
    amount: 5000,
    currency: "GYD",
    date: "2025-03-10T10:30:00",
    status: "success",
    details: {
      method: "Digicel Voucher",
      voucherCode: "XXXX-XXXX-1234",
      fee: 250,
      exchangeRate: null,
      notes: "Prepaid credit conversion",
      reference: "TRX123456789",
    },
  },
  {
    id: "2",
    type: "card",
    title: "Virtual Card",
    amount: 2500,
    currency: "GYD",
    date: "2025-03-09T15:45:00",
    status: "success",
    details: {
      cardType: "Visa",
      cardNumber: "4*** **** **** 1234",
      merchant: "Amazon",
      category: "Shopping",
      fee: 50,
      notes: "Monthly subscription",
      reference: "TRX987654321",
    },
  },
  {
    id: "3",
    type: "convert",
    title: "Currency Conversion",
    amount: 10000,
    currency: "GYD",
    convertedAmount: 48,
    convertedCurrency: "USD",
    date: "2025-03-09T14:15:00",
    status: "success",
    details: {
      fromCurrency: "GYD",
      toCurrency: "USD",
      exchangeRate: 0.0048,
      fee: 150,
      notes: "Conversion for online purchase",
      reference: "TRX456789123",
    },
  },
  {
    id: "4",
    type: "add",
    title: "Added Funds",
    amount: 10000,
    currency: "GYD",
    date: "2025-03-08T09:20:00",
    status: "success",
    details: {
      method: "GTT Voucher",
      voucherCode: "XXXX-XXXX-5678",
      fee: 500,
      exchangeRate: null,
      notes: "Prepaid credit conversion",
      reference: "TRX234567891",
    },
  },
  {
    id: "5",
    type: "card",
    title: "Virtual Card",
    amount: 5000,
    currency: "GYD",
    date: "2025-03-07T16:30:00",
    status: "failed",
    details: {
      cardType: "Mastercard",
      cardNumber: "5*** **** **** 5678",
      merchant: "Netflix",
      category: "Entertainment",
      fee: 100,
      notes: "Payment failed due to insufficient funds",
      reference: "TRX345678912",
    },
  },
  {
    id: "6",
    type: "convert",
    title: "Currency Conversion",
    amount: 20000,
    currency: "GYD",
    convertedAmount: 96,
    convertedCurrency: "USD",
    date: "2025-03-06T11:45:00",
    status: "success",
    details: {
      fromCurrency: "GYD",
      toCurrency: "USD",
      exchangeRate: 0.0048,
      fee: 300,
      notes: "Conversion for online purchase",
      reference: "TRX567891234",
    },
  },
]

export default function TransactionDetails() {
  const params = useParams()
  const router = useRouter()
  const [transaction, setTransaction] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isReportingIssue, setIsReportingIssue] = useState(false)
  const [reportSubmitted, setReportSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch transaction details
    const fetchTransaction = async () => {
      setIsLoading(true)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const foundTransaction = transactions.find((t) => t.id === params.id)

      if (foundTransaction) {
        setTransaction(foundTransaction)
      }

      setIsLoading(false)
    }

    fetchTransaction()
  }, [params.id])

  const handleReportIssue = () => {
    setIsReportingIssue(true)
  }

  const handleSubmitReport = () => {
    // Simulate API call to submit report
    setTimeout(() => {
      setReportSubmitted(true)
      setShowConfetti(true)

      // Reset after 3 seconds
      setTimeout(() => {
        setIsReportingIssue(false)
        setReportSubmitted(false)
      }, 3000)
    }, 1000)
  }

  const handleDownloadReceipt = () => {
    // Simulate download
    alert("Receipt downloaded successfully!")
  }

  const handleShareTransaction = () => {
    // Simulate share
    alert("Transaction details copied to clipboard!")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/transactions">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Transaction Details</h1>
          </div>
          <p className="mt-1 text-center text-xs italic text-gray-500">
            The Future of Your Finances, For a Borderless World
          </p>
        </header>

        <main className="flex-1 p-4 pb-20">
          <div className="space-y-4">
            <div className="h-32 animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-24 animate-pulse rounded-lg bg-gray-200"></div>
          </div>
        </main>

        <BottomNavigation />
      </div>
    )
  }

  if (!transaction) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/transactions">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Transaction Details</h1>
          </div>
          <p className="mt-1 text-center text-xs italic text-gray-500">
            The Future of Your Finances, For a Borderless World
          </p>
        </header>

        <main className="flex-1 p-4 pb-20">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <Info className="mb-2 h-12 w-12 text-gray-400" />
              <h3 className="text-lg font-medium">Transaction Not Found</h3>
              <p className="text-sm text-gray-500">
                The transaction you're looking for doesn't exist or has been removed.
              </p>
              <Button asChild className="mt-4">
                <Link href="/transactions">View All Transactions</Link>
              </Button>
            </CardContent>
          </Card>
        </main>

        <BottomNavigation />
      </div>
    )
  }

  const getStatusColor = () => {
    switch (transaction.status) {
      case "success":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = () => {
    switch (transaction.status) {
      case "success":
        return "Successful"
      case "pending":
        return "Pending"
      case "failed":
        return "Failed"
      default:
        return "Unknown"
    }
  }

  const getIconByType = () => {
    switch (transaction.type) {
      case "add":
        return <Plus className="h-6 w-6 text-white" />
      case "card":
        return <CreditCard className="h-6 w-6 text-white" />
      case "convert":
        return <RefreshCw className="h-6 w-6 text-white" />
      default:
        return <Info className="h-6 w-6 text-white" />
    }
  }

  const getBackgroundByType = () => {
    switch (transaction.type) {
      case "add":
        return "bg-green-600"
      case "card":
        return "bg-red-600"
      case "convert":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <ConfettiAnimation trigger={showConfetti} />

      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/transactions">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Transaction Details</h1>
        </div>
        <p className="mt-1 text-center text-xs italic text-gray-500">
          The Future of Your Finances, For a Borderless World
        </p>
      </header>

      <main className="flex-1 p-4 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <AnimatedCard className="mb-4 overflow-hidden">
            <div className={`p-4 text-white ${getBackgroundByType()}`}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3 rounded-full bg-white/20 p-2">{getIconByType()}</div>
                  <div>
                    <h2 className="text-xl font-bold">{transaction.title}</h2>
                    <p className="text-sm text-white/80">
                      {new Date(transaction.date).toLocaleDateString()} at{" "}
                      {new Date(transaction.date).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <Badge
                  className={`${transaction.status === "success" ? "bg-green-400" : transaction.status === "failed" ? "bg-red-400" : "bg-yellow-400"} text-white`}
                >
                  {getStatusText()}
                </Badge>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-white/80">Amount</p>
                <div className="flex items-center justify-center">
                  <h3 className="text-3xl font-bold">
                    {transaction.type === "convert" ? (
                      <>
                        <CompactCurrencyDisplay amount={transaction.amount} currency={transaction.currency} /> →{" "}
                        <CompactCurrencyDisplay
                          amount={transaction.convertedAmount || 0}
                          currency={transaction.convertedCurrency || ""}
                        />
                      </>
                    ) : (
                      <>
                        <CompactCurrencyDisplay amount={transaction.amount} currency={transaction.currency} />
                      </>
                    )}
                  </h3>
                </div>
              </div>
            </div>
          </AnimatedCard>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="actions">Actions</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-4 space-y-4">
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>Transaction Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Reference ID</p>
                      <p className="font-mono font-medium">{transaction.details.reference}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium">{new Date(transaction.date).toLocaleString()}</p>
                    </div>

                    {transaction.type === "add" && (
                      <>
                        <div>
                          <p className="text-sm text-gray-500">Method</p>
                          <p className="font-medium">{transaction.details.method}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Voucher Code</p>
                          <p className="font-medium">{transaction.details.voucherCode}</p>
                        </div>
                      </>
                    )}

                    {transaction.type === "card" && (
                      <>
                        <div>
                          <p className="text-sm text-gray-500">Card Type</p>
                          <p className="font-medium">{transaction.details.cardType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Card Number</p>
                          <p className="font-medium">{transaction.details.cardNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Merchant</p>
                          <p className="font-medium">{transaction.details.merchant}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Category</p>
                          <p className="font-medium">{transaction.details.category}</p>
                        </div>
                      </>
                    )}

                    {transaction.type === "convert" && (
                      <>
                        <div>
                          <p className="text-sm text-gray-500">From Currency</p>
                          <p className="font-medium">{transaction.details.fromCurrency}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">To Currency</p>
                          <p className="font-medium">{transaction.details.toCurrency}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Exchange Rate</p>
                          {transaction.type === "convert" && (
                            <p className="font-medium">
                              1 {transaction.details.fromCurrency} = {transaction.details.exchangeRate}{" "}
                              {transaction.details.toCurrency}
                            </p>
                          )}
                        </div>
                      </>
                    )}

                    <div>
                      <p className="text-sm text-gray-500">Fee</p>
                      <p className="font-medium">
                        <CompactCurrencyDisplay amount={transaction.details.fee} currency={transaction.currency} />
                      </p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Notes</p>
                      <p className="font-medium">{transaction.details.notes || "No notes"}</p>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>

              {transaction.status === "failed" && (
                <AnimatedCard className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-red-700">Failure Reason</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-red-700">
                      {transaction.type === "card"
                        ? "This transaction failed due to insufficient funds in your account. Please ensure you have enough balance before attempting again."
                        : "This transaction failed. Please contact customer support for assistance."}
                    </p>
                  </CardContent>
                </AnimatedCard>
              )}
            </TabsContent>

            <TabsContent value="timeline" className="mt-4">
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>Transaction Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="h-6 w-6 rounded-full bg-green-500 text-white">
                          <CheckCircle className="h-6 w-6" />
                        </div>
                        <div className="h-full w-0.5 bg-gray-200"></div>
                      </div>
                      <div>
                        <p className="font-medium">Transaction Initiated</p>
                        <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="h-6 w-6 rounded-full bg-green-500 text-white">
                          <CheckCircle className="h-6 w-6" />
                        </div>
                        <div className="h-full w-0.5 bg-gray-200"></div>
                      </div>
                      <div>
                        <p className="font-medium">Processing</p>
                        <p className="text-sm text-gray-500">
                          {new Date(new Date(transaction.date).getTime() + 30000).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div
                          className={`h-6 w-6 rounded-full ${transaction.status === "success" ? "bg-green-500" : "bg-red-500"} text-white`}
                        >
                          {transaction.status === "success" ? (
                            <CheckCircle className="h-6 w-6" />
                          ) : (
                            <XCircle className="h-6 w-6" />
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">{transaction.status === "success" ? "Completed" : "Failed"}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(new Date(transaction.date).getTime() + 60000).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            </TabsContent>

            <TabsContent value="actions" className="mt-4 space-y-4">
              {isReportingIssue ? (
                <AnimatedCard>
                  <CardHeader>
                    <CardTitle>Report an Issue</CardTitle>
                    <CardDescription>
                      Please provide details about the issue you're experiencing with this transaction
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {reportSubmitted ? (
                      <Alert className="bg-green-50 text-green-800">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Report Submitted</AlertTitle>
                        <AlertDescription>
                          Thank you for reporting this issue. Our support team will review it and get back to you within
                          24 hours.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="issue-type" className="block text-sm font-medium">
                            Issue Type
                          </label>
                          <select id="issue-type" className="w-full rounded-md border border-gray-300 p-2">
                            <option>Incorrect amount</option>
                            <option>Transaction failed but was charged</option>
                            <option>Duplicate transaction</option>
                            <option>Other issue</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="description" className="block text-sm font-medium">
                            Description
                          </label>
                          <textarea
                            id="description"
                            className="w-full rounded-md border border-gray-300 p-2"
                            rows={4}
                            placeholder="Please describe the issue in detail..."
                          ></textarea>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {!reportSubmitted && (
                      <>
                        <Button variant="outline" onClick={() => setIsReportingIssue(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSubmitReport}>Submit Report</Button>
                      </>
                    )}
                  </CardFooter>
                </AnimatedCard>
              ) : (
                <>
                  <AnimatedButton className="w-full justify-between" onClick={handleDownloadReceipt}>
                    <div className="flex items-center">
                      <Download className="mr-2 h-5 w-5" />
                      <span>Download Receipt</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </AnimatedButton>

                  <AnimatedButton className="w-full justify-between" onClick={handleShareTransaction}>
                    <div className="flex items-center">
                      <Share2 className="mr-2 h-5 w-5" />
                      <span>Share Transaction</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </AnimatedButton>

                  <AnimatedButton className="w-full justify-between" onClick={handleReportIssue}>
                    <div className="flex items-center">
                      <Flag className="mr-2 h-5 w-5" />
                      <span>Report an Issue</span>
                    </div>
                    <ChevronRight className="h-5 w-5" />
                  </AnimatedButton>

                  <AnimatedButton className="w-full justify-between" asChild>
                    <Link href="/chat">
                      <div className="flex items-center">
                        <MessageSquare className="mr-2 h-5 w-5" />
                        <span>Chat with Support</span>
                      </div>
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  </AnimatedButton>
                </>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <BottomNavigation />
    </div>
  )
}

