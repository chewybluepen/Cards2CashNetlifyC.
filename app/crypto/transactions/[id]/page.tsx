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
  ArrowUpRight,
  Download,
  ExternalLink,
  Flag,
  Info,
  MessageSquare,
  CheckCircle,
  ChevronRight,
} from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { AnimatedCard } from "@/components/ui/animated-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { ConfettiAnimation } from "@/components/ui/confetti-animation"

// Mock crypto transaction data
const cryptoTransactions = [
  {
    id: "1",
    type: "buy",
    coin: "Bitcoin",
    symbol: "BTC",
    amount: 0.0025,
    fiatAmount: 1000,
    fiatCurrency: "USD",
    date: "2025-03-10T10:30:00",
    status: "completed",
    txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    fee: 5,
    feeCurrency: "USD",
    price: 40000,
    notes: "First Bitcoin purchase",
  },
  {
    id: "2",
    type: "sell",
    coin: "Ethereum",
    symbol: "ETH",
    amount: 0.5,
    fiatAmount: 1200,
    fiatCurrency: "USD",
    date: "2025-03-09T15:45:00",
    status: "completed",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    fee: 6,
    feeCurrency: "USD",
    price: 2400,
    notes: "Profit taking",
  },
  {
    id: "3",
    type: "transfer",
    coin: "Bitcoin",
    symbol: "BTC",
    amount: 0.01,
    fiatAmount: null,
    fiatCurrency: null,
    date: "2025-03-08T14:15:00",
    status: "completed",
    txHash: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
    fee: 0.0001,
    feeCurrency: "BTC",
    price: null,
    notes: "Transfer to hardware wallet",
    destination: "bc1q...",
  },
  {
    id: "4",
    type: "buy",
    coin: "Solana",
    symbol: "SOL",
    amount: 10,
    fiatAmount: 800,
    fiatCurrency: "USD",
    date: "2025-03-07T09:20:00",
    status: "completed",
    txHash: "0xdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abc",
    fee: 4,
    feeCurrency: "USD",
    price: 80,
    notes: "DCA strategy",
  },
  {
    id: "5",
    type: "buy",
    coin: "Ethereum",
    symbol: "ETH",
    amount: 0.2,
    fiatAmount: 480,
    fiatCurrency: "USD",
    date: "2025-03-06T16:30:00",
    status: "failed",
    txHash: null,
    fee: 0,
    feeCurrency: "USD",
    price: 2400,
    notes: "Payment failed due to card issue",
  },
]

export default function CryptoTransactionDetails() {
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

      const foundTransaction = cryptoTransactions.find((t) => t.id === params.id)

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

  const handleViewOnBlockchain = () => {
    // Simulate opening blockchain explorer
    alert("Opening blockchain explorer in a new tab!")
  }

  const handleDownloadReceipt = () => {
    // Simulate download
    alert("Receipt downloaded successfully!")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/crypto">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Crypto Transaction</h1>
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
              <Link href="/crypto">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Crypto Transaction</h1>
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
                <Link href="/crypto">View All Crypto</Link>
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
      case "completed":
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
      case "completed":
        return "Completed"
      case "pending":
        return "Pending"
      case "failed":
        return "Failed"
      default:
        return "Unknown"
    }
  }

  const getTypeColor = () => {
    switch (transaction.type) {
      case "buy":
        return "bg-green-600"
      case "sell":
        return "bg-red-600"
      case "transfer":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  const getTypeText = () => {
    switch (transaction.type) {
      case "buy":
        return "Bought"
      case "sell":
        return "Sold"
      case "transfer":
        return "Transferred"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <ConfettiAnimation trigger={showConfetti} />

      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/crypto">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Crypto Transaction</h1>
        </div>
        <p className="mt-1 text-center text-xs italic text-gray-500">
          The Future of Your Finances, For a Borderless World
        </p>
      </header>

      <main className="flex-1 p-4 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <AnimatedCard className="mb-4 overflow-hidden">
            <div className={`p-4 text-white ${getTypeColor()}`}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3 rounded-full bg-white/20 p-2">
                    <ArrowUpRight className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {getTypeText()} {transaction.coin}
                    </h2>
                    <p className="text-sm text-white/80">
                      {new Date(transaction.date).toLocaleDateString()} at{" "}
                      {new Date(transaction.date).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <Badge
                  className={`${transaction.status === "completed" ? "bg-green-400" : transaction.status === "failed" ? "bg-red-400" : "bg-yellow-400"} text-white`}
                >
                  {getStatusText()}
                </Badge>
              </div>

              <div className="mt-4 text-center">
                <p className="text-sm text-white/80">Amount</p>
                <div className="flex items-center justify-center">
                  <h3 className="text-3xl font-bold">
                    {transaction.amount} {transaction.symbol}
                  </h3>
                </div>
                {transaction.fiatAmount && (
                  <p className="mt-1 text-white/80">
                    ≈ {transaction.fiatAmount.toLocaleString()} {transaction.fiatCurrency}
                  </p>
                )}
              </div>
            </div>
          </AnimatedCard>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
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
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-medium capitalize">{transaction.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p className="font-medium">{new Date(transaction.date).toLocaleString()}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Coin</p>
                      <p className="font-medium">
                        {transaction.coin} ({transaction.symbol})
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="font-medium">
                        {transaction.amount} {transaction.symbol}
                      </p>
                    </div>

                    {transaction.price && (
                      <div>
                        <p className="text-sm text-gray-500">Price per {transaction.symbol}</p>
                        <p className="font-medium">
                          {transaction.price.toLocaleString()} {transaction.fiatCurrency}
                        </p>
                      </div>
                    )}

                    {transaction.fiatAmount && (
                      <div>
                        <p className="text-sm text-gray-500">Total Value</p>
                        <p className="font-medium">
                          {transaction.fiatAmount.toLocaleString()} {transaction.fiatCurrency}
                        </p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-gray-500">Fee</p>
                      <p className="font-medium">
                        {transaction.fee} {transaction.feeCurrency}
                      </p>
                    </div>

                    {transaction.destination && (
                      <div>
                        <p className="text-sm text-gray-500">Destination</p>
                        <p className="font-medium truncate">{transaction.destination}</p>
                      </div>
                    )}

                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Notes</p>
                      <p className="font-medium">{transaction.notes || "No notes"}</p>
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
                      {transaction.notes || "This transaction failed. Please contact customer support for assistance."}
                    </p>
                  </CardContent>
                </AnimatedCard>
              )}
            </TabsContent>

            <TabsContent value="blockchain" className="mt-4">
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>Blockchain Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {transaction.txHash ? (
                    <>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Transaction Hash</p>
                        <div className="overflow-x-auto rounded-md bg-gray-100 p-2">
                          <p className="font-mono text-xs">{transaction.txHash}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Network</p>
                        <p className="font-medium">
                          {transaction.symbol === "BTC"
                            ? "Bitcoin Mainnet"
                            : transaction.symbol === "ETH"
                              ? "Ethereum Mainnet"
                              : transaction.symbol === "SOL"
                                ? "Solana Mainnet"
                                : "Mainnet"}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm text-gray-500">Confirmations</p>
                        <p className="font-medium">
                          {transaction.status === "completed" ? "100+ (Confirmed)" : "Pending"}
                        </p>
                      </div>

                      <Button className="w-full" onClick={handleViewOnBlockchain}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View on Blockchain Explorer
                      </Button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <Info className="mb-2 h-12 w-12 text-gray-300" />
                      <h3 className="text-lg font-medium">No Blockchain Data</h3>
                      <p className />
                      <h3 className="text-lg font-medium">No Blockchain Data</h3>
                      <p className="text-sm text-gray-500">
                        This transaction doesn't have blockchain data available. This could be because the transaction
                        failed or was processed internally.
                      </p>
                    </div>
                  )}
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
                            <option>Transaction not showing in wallet</option>
                            <option>Wrong amount</option>
                            <option>Transaction stuck pending</option>
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
                  {transaction.txHash && (
                    <AnimatedButton className="w-full justify-between" onClick={handleViewOnBlockchain}>
                      <div className="flex items-center">
                        <ExternalLink className="mr-2 h-5 w-5" />
                        <span>View on Blockchain Explorer</span>
                      </div>
                      <ChevronRight className="h-5 w-5" />
                    </AnimatedButton>
                  )}

                  <AnimatedButton className="w-full justify-between" onClick={handleDownloadReceipt}>
                    <div className="flex items-center">
                      <Download className="mr-2 h-5 w-5" />
                      <span>Download Receipt</span>
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

