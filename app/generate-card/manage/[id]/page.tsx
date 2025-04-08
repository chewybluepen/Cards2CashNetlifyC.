"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertCircle,
  ArrowLeft,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  Lock,
  MessageSquare,
  RefreshCw,
  Shield,
  Trash2,
} from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { AnimatedCard } from "@/components/ui/animated-card"
import { AnimatedButton } from "@/components/ui/animated-button"
import { ConfettiAnimation } from "@/components/ui/confetti-animation"

// Mock card data
const cards = [
  {
    id: "1",
    type: "visa",
    name: "Amazon Shopping Card",
    number: "4111 1111 1111 1111",
    expiry: "05/26",
    cvv: "123",
    balance: 2500,
    currency: "GYD",
    status: "active",
    createdAt: "2025-03-10T10:30:00",
    transactions: [
      {
        id: "t1",
        merchant: "Amazon",
        amount: 500,
        currency: "GYD",
        date: "2025-03-12T14:30:00",
        status: "completed",
      },
      {
        id: "t2",
        merchant: "Amazon Prime",
        amount: 200,
        currency: "GYD",
        date: "2025-03-11T09:15:00",
        status: "completed",
      },
    ],
    limits: {
      daily: 5000,
      monthly: 50000,
      international: true,
      atm: false,
      online: true,
    },
  },
  {
    id: "2",
    type: "mastercard",
    name: "Netflix Subscription",
    number: "5555 5555 5555 4444",
    expiry: "08/27",
    cvv: "456",
    balance: 1000,
    currency: "GYD",
    status: "active",
    createdAt: "2025-03-05T16:45:00",
    transactions: [
      {
        id: "t3",
        merchant: "Netflix",
        amount: 300,
        currency: "GYD",
        date: "2025-03-10T00:01:00",
        status: "completed",
      },
    ],
    limits: {
      daily: 2000,
      monthly: 10000,
      international: true,
      atm: false,
      online: true,
    },
  },
  {
    id: "3",
    type: "visa",
    name: "Travel Card",
    number: "4222 2222 2222 2222",
    expiry: "12/26",
    cvv: "789",
    balance: 10000,
    currency: "GYD",
    status: "frozen",
    createdAt: "2025-02-20T11:30:00",
    transactions: [
      {
        id: "t4",
        merchant: "Airbnb",
        amount: 5000,
        currency: "GYD",
        date: "2025-02-25T13:45:00",
        status: "completed",
      },
      {
        id: "t5",
        merchant: "Uber",
        amount: 1000,
        currency: "GYD",
        date: "2025-02-26T19:20:00",
        status: "completed",
      },
      {
        id: "t6",
        merchant: "Unknown Merchant",
        amount: 2000,
        currency: "GYD",
        date: "2025-02-28T22:15:00",
        status: "declined",
      },
    ],
    limits: {
      daily: 20000,
      monthly: 100000,
      international: true,
      atm: true,
      online: true,
    },
  },
]

export default function CardManagement() {
  const params = useParams()
  const router = useRouter()
  const [card, setCard] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showCardDetails, setShowCardDetails] = useState(false)
  const [showCvv, setShowCvv] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Card limit states
  const [dailyLimit, setDailyLimit] = useState(0)
  const [monthlyLimit, setMonthlyLimit] = useState(0)
  const [allowInternational, setAllowInternational] = useState(false)
  const [allowAtm, setAllowAtm] = useState(false)
  const [allowOnline, setAllowOnline] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch card details
    const fetchCard = async () => {
      setIsLoading(true)

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const foundCard = cards.find((c) => c.id === params.id)

      if (foundCard) {
        setCard(foundCard)
        setDailyLimit(foundCard.limits.daily)
        setMonthlyLimit(foundCard.limits.monthly)
        setAllowInternational(foundCard.limits.international)
        setAllowAtm(foundCard.limits.atm)
        setAllowOnline(foundCard.limits.online)
      }

      setIsLoading(false)
    }

    fetchCard()
  }, [params.id])

  const handleCopyCardNumber = () => {
    navigator.clipboard.writeText(card.number.replace(/\s/g, ""))
    alert("Card number copied to clipboard!")
  }

  const handleCopyCvv = () => {
    navigator.clipboard.writeText(card.cvv)
    alert("CVV copied to clipboard!")
  }

  const handleFreezeCard = () => {
    setIsUpdating(true)

    // Simulate API call
    setTimeout(() => {
      setCard({
        ...card,
        status: card.status === "active" ? "frozen" : "active",
      })
      setIsUpdating(false)
      setShowConfetti(true)

      setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
    }, 1000)
  }

  const handleUpdateLimits = () => {
    setIsUpdating(true)

    // Simulate API call
    setTimeout(() => {
      setCard({
        ...card,
        limits: {
          daily: dailyLimit,
          monthly: monthlyLimit,
          international: allowInternational,
          atm: allowAtm,
          online: allowOnline,
        },
      })
      setIsUpdating(false)
      setShowConfetti(true)

      setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
    }, 1000)
  }

  const handleDeleteCard = () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true)
      return
    }

    setIsUpdating(true)

    // Simulate API call
    setTimeout(() => {
      router.push("/generate-card")
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/generate-card">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Card Management</h1>
          </div>
          <p className="mt-1 text-center text-xs italic text-gray-500">
            The Future of Your Finances, For a Borderless World
          </p>
        </header>

        <main className="flex-1 p-4 pb-20">
          <div className="space-y-4">
            <div className="h-48 animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-64 animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-24 animate-pulse rounded-lg bg-gray-200"></div>
          </div>
        </main>

        <BottomNavigation />
      </div>
    )
  }

  if (!card) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/generate-card">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Card Management</h1>
          </div>
          <p className="mt-1 text-center text-xs italic text-gray-500">
            The Future of Your Finances, For a Borderless World
          </p>
        </header>

        <main className="flex-1 p-4 pb-20">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <AlertCircle className="mb-2 h-12 w-12 text-gray-400" />
              <h3 className="text-lg font-medium">Card Not Found</h3>
              <p className="text-sm text-gray-500">The card you're looking for doesn't exist or has been deleted.</p>
              <Button asChild className="mt-4">
                <Link href="/generate-card">View All Cards</Link>
              </Button>
            </CardContent>
          </Card>
        </main>

        <BottomNavigation />
      </div>
    )
  }

  const getCardTypeColor = () => {
    switch (card.type) {
      case "visa":
        return "from-blue-600 to-blue-700"
      case "mastercard":
        return "from-red-600 to-red-700"
      case "amex":
        return "from-purple-600 to-purple-700"
      default:
        return "from-gray-600 to-gray-700"
    }
  }

  const formatCardNumber = (number: string) => {
    if (!showCardDetails) {
      return number.replace(/\d(?=\d{4})/g, "•")
    }
    return number
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <ConfettiAnimation trigger={showConfetti} />

      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/generate-card">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Card Management</h1>
        </div>
        <p className="mt-1 text-center text-xs italic text-gray-500">
          The Future of Your Finances, For a Borderless World
        </p>
      </header>

      <main className="flex-1 p-4 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <AnimatedCard className="mb-4 overflow-hidden">
            <div className={`bg-gradient-to-r ${getCardTypeColor()} p-4 text-white`}>
              <div className="mb-4 flex justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{card.name}</h2>
                  <Badge className={card.status === "active" ? "bg-green-400" : "bg-red-400"}>
                    {card.status === "active" ? "Active" : "Frozen"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-6 w-6" />
                  <span className="font-bold uppercase">{card.type}</span>
                </div>
              </div>

              <div className="mb-4 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-white/80">Card Number</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 p-0 text-white/80 hover:bg-white/20 hover:text-white"
                    onClick={() => setShowCardDetails(!showCardDetails)}
                  >
                    {showCardDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-lg font-medium">{formatCardNumber(card.number)}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 p-0 text-white/80 hover:bg-white/20 hover:text-white"
                    onClick={handleCopyCardNumber}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="space-y-1">
                  <p className="text-xs text-white/80">Expiry Date</p>
                  <p className="font-medium">{card.expiry}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-white/80">CVV</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 p-0 text-white/80 hover:bg-white/20 hover:text-white"
                      onClick={() => setShowCvv(!showCvv)}
                    >
                      {showCvv ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{showCvv ? card.cvv : "•••"}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 p-0 text-white/80 hover:bg-white/20 hover:text-white"
                      onClick={handleCopyCvv}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs text-white/80">Available Balance</p>
                <p className="text-xl font-bold">
                  {card.balance.toLocaleString()} {card.currency}
                </p>
              </div>
            </div>
          </AnimatedCard>

          <Tabs defaultValue="transactions" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="limits">Limits</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="mt-4 space-y-4">
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {card.transactions.length > 0 ? (
                    card.transactions.map((transaction: any) => (
                      <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium">{transaction.merchant}</p>
                          <p className="text-xs text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <p
                            className={
                              transaction.status === "completed"
                                ? "font-medium text-red-600"
                                : "font-medium text-gray-600"
                            }
                          >
                            {transaction.status === "completed" ? "-" : ""}
                            {transaction.amount.toLocaleString()} {transaction.currency}
                          </p>
                          <Badge
                            className={
                              transaction.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {transaction.status === "completed" ? "Completed" : "Declined"}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <CreditCard className="mb-2 h-12 w-12 text-gray-300" />
                      <h3 className="text-lg font-medium">No Transactions Yet</h3>
                      <p className="text-sm text-gray-500">This card hasn't been used for any transactions yet.</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/transactions">View All Transactions</Link>
                  </Button>
                </CardFooter>
              </AnimatedCard>
            </TabsContent>

            <TabsContent value="limits" className="mt-4 space-y-4">
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>Card Limits</CardTitle>
                  <CardDescription>Customize spending limits for this card</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="daily-limit" className="block text-sm font-medium">
                      Daily Spending Limit ({card.currency})
                    </label>
                    <Input
                      id="daily-limit"
                      type="number"
                      value={dailyLimit}
                      onChange={(e) => setDailyLimit(Number(e.target.value))}
                    />
                    <p className="text-xs text-gray-500">Maximum amount that can be spent in a single day</p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="monthly-limit" className="block text-sm font-medium">
                      Monthly Spending Limit ({card.currency})
                    </label>
                    <Input
                      id="monthly-limit"
                      type="number"
                      value={monthlyLimit}
                      onChange={(e) => setMonthlyLimit(Number(e.target.value))}
                    />
                    <p className="text-xs text-gray-500">Maximum amount that can be spent in a month</p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Allow International Transactions</p>
                        <p className="text-xs text-gray-500">Enable transactions outside your country</p>
                      </div>
                      <Switch checked={allowInternational} onCheckedChange={setAllowInternational} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Allow ATM Withdrawals</p>
                        <p className="text-xs text-gray-500">Enable cash withdrawals at ATMs</p>
                      </div>
                      <Switch checked={allowAtm} onCheckedChange={setAllowAtm} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Allow Online Purchases</p>
                        <p className="text-xs text-gray-500">Enable transactions on websites and apps</p>
                      </div>
                      <Switch checked={allowOnline} onCheckedChange={setAllowOnline} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleUpdateLimits} disabled={isUpdating}>
                    {isUpdating ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Limits"
                    )}
                  </Button>
                </CardFooter>
              </AnimatedCard>
            </TabsContent>

            <TabsContent value="security" className="mt-4 space-y-4">
              <AnimatedCard>
                <CardHeader>
                  <CardTitle>Card Security</CardTitle>
                  <CardDescription>Manage security settings for this card</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-md bg-blue-50 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Security Tips</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <ul className="list-disc space-y-1 pl-5">
                            <li>Never share your card details with anyone</li>
                            <li>Freeze your card immediately if lost or stolen</li>
                            <li>Regularly check your transactions for suspicious activity</li>
                            <li>Use strong limits to protect against fraud</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <AnimatedButton
                      className={`w-full ${card.status === "active" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                      onClick={handleFreezeCard}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          {card.status === "active" ? "Freeze Card" : "Unfreeze Card"}
                        </>
                      )}
                    </AnimatedButton>

                    {showDeleteConfirm ? (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Are you sure?</AlertTitle>
                        <AlertDescription>
                          This action cannot be undone. This will permanently delete your card.
                        </AlertDescription>
                        <div className="mt-4 flex space-x-2">
                          <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="flex-1">
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={handleDeleteCard}
                            className="flex-1"
                            disabled={isUpdating}
                          >
                            {isUpdating ? "Deleting..." : "Yes, Delete"}
                          </Button>
                        </div>
                      </Alert>
                    ) : (
                      <AnimatedButton
                        variant="outline"
                        className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={handleDeleteCard}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Card
                      </AnimatedButton>
                    )}

                    <AnimatedButton variant="outline" className="w-full" asChild>
                      <Link href="/chat">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact Support
                      </Link>
                    </AnimatedButton>
                  </div>
                </CardContent>
              </AnimatedCard>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <BottomNavigation />
    </div>
  )
}

