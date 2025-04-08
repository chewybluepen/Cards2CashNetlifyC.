"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Copy, CreditCard, Eye, EyeOff, Lock, RefreshCw, Shield, Trash2, Wallet } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { toast } from "@/components/ui/use-toast"
import { AnimatedNetflixCard } from "@/components/ui/animated-netflix-card"

// Mock card data
const cardsData = [
  {
    id: 1,
    name: "Amazon Gift Card",
    balance: 150,
    expiryDate: "12/27",
    lastFour: "4582",
    type: "Visa",
    cardNumber: "4111111111114582",
    cvv: "123",
    status: "active",
    createdAt: "2025-03-15T10:30:00",
    transactions: [
      { id: 101, date: "2025-04-10", amount: 25, merchant: "Amazon.com", status: "completed" },
      { id: 102, date: "2025-04-05", amount: 15, merchant: "Amazon Prime", status: "completed" },
      { id: 103, date: "2025-03-28", amount: 10, merchant: "Amazon Music", status: "completed" },
    ],
    limits: {
      daily: 500,
      monthly: 5000,
      international: true,
      onlineTransactions: true,
    },
  },
  {
    id: 2,
    name: "Netflix Gift Card",
    balance: 75,
    expiryDate: "09/26",
    lastFour: "9371",
    type: "Mastercard",
    cardNumber: "5111111111119371",
    cvv: "456",
    status: "active",
    createdAt: "2025-02-20T14:45:00",
    transactions: [
      { id: 201, date: "2025-04-12", amount: 15, merchant: "Netflix", status: "completed" },
      { id: 202, date: "2025-03-12", amount: 15, merchant: "Netflix", status: "completed" },
      { id: 203, date: "2025-02-12", amount: 15, merchant: "Netflix", status: "completed" },
    ],
    limits: {
      daily: 300,
      monthly: 3000,
      international: true,
      onlineTransactions: true,
    },
  },
  {
    id: 3,
    name: "Steam Wallet",
    balance: 200,
    expiryDate: "03/28",
    lastFour: "6294",
    type: "Visa",
    cardNumber: "4111111111116294",
    cvv: "789",
    status: "active",
    createdAt: "2025-04-01T09:15:00",
    transactions: [
      { id: 301, date: "2025-04-15", amount: 60, merchant: "Steam Store", status: "completed" },
      { id: 302, date: "2025-04-08", amount: 40, merchant: "Steam Store", status: "completed" },
    ],
    limits: {
      daily: 1000,
      monthly: 10000,
      international: true,
      onlineTransactions: true,
    },
  },
]

export default function CardDetails() {
  const params = useParams()
  const router = useRouter()
  const [card, setCard] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showCardNumber, setShowCardNumber] = useState(false)
  const [showCVV, setShowCVV] = useState(false)
  const [isFreezingCard, setIsFreezingCard] = useState(false)
  const [isCardFrozen, setIsCardFrozen] = useState(false)
  const [limits, setLimits] = useState({
    daily: 0,
    monthly: 0,
    international: true,
    onlineTransactions: true,
  })

  useEffect(() => {
    // Simulate API call to fetch card details
    setIsLoading(true)

    setTimeout(() => {
      const id = Number(params.id)
      const foundCard = cardsData.find((c) => c.id === id)

      if (foundCard) {
        setCard(foundCard)
        setLimits(foundCard.limits)
        setError(null)
      } else {
        setError("Card not found")
      }

      setIsLoading(false)
    }, 1000)
  }, [params.id])

  const handleCopyCardNumber = () => {
    if (!card) return

    navigator.clipboard.writeText(card.cardNumber)

    toast({
      title: "Card Number Copied",
      description: "Card number has been copied to clipboard.",
      variant: "default",
    })
  }

  const handleCopyCVV = () => {
    if (!card) return

    navigator.clipboard.writeText(card.cvv)

    toast({
      title: "CVV Copied",
      description: "CVV has been copied to clipboard.",
      variant: "default",
    })
  }

  const handleFreezeCard = () => {
    setIsFreezingCard(true)

    // Simulate API call
    setTimeout(() => {
      setIsFreezingCard(false)
      setIsCardFrozen(!isCardFrozen)

      toast({
        title: isCardFrozen ? "Card Unfrozen" : "Card Frozen",
        description: isCardFrozen
          ? "Your card has been unfrozen and is now active."
          : "Your card has been frozen. No transactions will be processed.",
        variant: "default",
      })
    }, 1500)
  }

  const handleDeleteCard = () => {
    const confirmDelete = confirm("Are you sure you want to delete this card? This action cannot be undone.")

    if (confirmDelete) {
      toast({
        title: "Card Deleted",
        description: "Your card has been deleted successfully.",
        variant: "default",
      })

      // Navigate back to cards list
      setTimeout(() => {
        router.push("/generate-card")
      }, 1000)
    }
  }

  const handleUpdateLimits = () => {
    toast({
      title: "Limits Updated",
      description: "Your card limits have been updated successfully.",
      variant: "default",
    })
  }

  const handleConvertToBalance = () => {
    toast({
      title: "Converting Card",
      description: "Redirecting to conversion page...",
      variant: "default",
    })

    // Navigate to conversion page
    setTimeout(() => {
      router.push(`/convert?cardId=${card.id}`)
    }, 500)
  }

  const formatCardNumber = (number: string) => {
    return number.replace(/(\d{4})/g, "$1 ").trim()
  }

  const maskCardNumber = (number: string) => {
    return "•••• •••• •••• " + number.slice(-4)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#000000]">
        <header className="sticky top-0 z-10 bg-[#141414] p-4 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2 text-white hover:bg-[#333333]">
              <Link href="/generate-card">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold text-white">Card Details</h1>
          </div>
          <p className="mt-1 text-xs italic text-gray-400">The Future of Your Finances, For a Borderless World</p>
        </header>

        <main className="flex-1 p-4 pb-20">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#E50914]"></div>
            <p className="mt-4 text-gray-400">Loading card details...</p>
          </div>
        </main>

        <BottomNavigation />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-[#000000]">
        <header className="sticky top-0 z-10 bg-[#141414] p-4 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2 text-white hover:bg-[#333333]">
              <Link href="/generate-card">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold text-white">Card Details</h1>
          </div>
          <p className="mt-1 text-xs italic text-gray-400">The Future of Your Finances, For a Borderless World</p>
        </header>

        <main className="flex-1 p-4 pb-20">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>

          <div className="mt-4 flex justify-center">
            <Button variant="outline" asChild className="border-[#333333] text-white hover:bg-[#333333]">
              <Link href="/generate-card">Return to Cards</Link>
            </Button>
          </div>
        </main>

        <BottomNavigation />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#000000]">
      <header className="sticky top-0 z-10 bg-[#141414] p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2 text-white hover:bg-[#333333]">
              <Link href="/generate-card">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold text-white">Card Details</h1>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-[#333333]" onClick={handleDeleteCard}>
            <Trash2 className="h-5 w-5 text-[#E50914]" />
          </Button>
        </div>
        <p className="mt-1 text-xs italic text-gray-400">The Future of Your Finances, For a Borderless World</p>
      </header>

      <main className="flex-1 p-4 pb-20">
        <AnimatedNetflixCard className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-[#E50914] to-[#B20710] p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">{card.name}</h2>
                <p className="text-sm text-white opacity-80">{card.type} Virtual Card</p>
              </div>
              <CreditCard className="h-8 w-8 text-white" />
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs text-white opacity-80">Card Number</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-lg font-medium text-white">
                    {showCardNumber ? formatCardNumber(card.cardNumber) : maskCardNumber(card.cardNumber)}
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30"
                      onClick={() => setShowCardNumber(!showCardNumber)}
                    >
                      {showCardNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full bg-white/20 text-white hover:bg-white/30"
                      onClick={handleCopyCardNumber}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <p className="text-xs text-white opacity-80">Expiry Date</p>
                  <p className="font-mono text-base font-medium text-white">{card.expiryDate}</p>
                </div>
                <div>
                  <p className="text-xs text-white opacity-80">CVV</p>
                  <div className="flex items-center space-x-2">
                    <p className="font-mono text-base font-medium text-white">{showCVV ? card.cvv : "•••"}</p>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full bg-white/20 text-white hover:bg-white/30"
                        onClick={() => setShowCVV(!showCVV)}
                      >
                        {showCVV ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full bg-white/20 text-white hover:bg-white/30"
                        onClick={handleCopyCVV}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-xs text-white opacity-80">Balance</p>
                <p className="text-2xl font-bold text-white">${card.balance}.00</p>
              </div>
              <div
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  isCardFrozen ? "bg-gray-600 text-white" : "bg-green-500 text-white"
                }`}
              >
                {isCardFrozen ? "Frozen" : "Active"}
              </div>
            </div>
          </div>

          <CardContent className="p-0">
            <div className="flex border-t border-[#333333]">
              <Button
                variant="ghost"
                className="flex-1 rounded-none border-r border-[#333333] py-4 text-white hover:bg-[#333333]"
                onClick={handleFreezeCard}
                disabled={isFreezingCard}
              >
                {isFreezingCard ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Lock className="mr-2 h-4 w-4" />
                )}
                {isCardFrozen ? "Unfreeze Card" : "Freeze Card"}
              </Button>
              <Button
                variant="ghost"
                className="flex-1 rounded-none py-4 text-white hover:bg-[#333333]"
                onClick={handleConvertToBalance}
              >
                <Wallet className="mr-2 h-4 w-4" />
                Convert to Cash
              </Button>
            </div>
          </CardContent>
        </AnimatedNetflixCard>

        <AnimatedNetflixCard className="mb-6">
          <CardHeader>
            <CardTitle className="text-white">Card Limits & Security</CardTitle>
            <CardDescription className="text-gray-400">Manage spending limits and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="daily-limit" className="text-sm text-white">
                  Daily Spending Limit
                </Label>
                <div className="flex items-center space-x-2">
                  <span className="text-white">$</span>
                  <Input
                    id="daily-limit"
                    type="number"
                    value={limits.daily}
                    onChange={(e) => setLimits({ ...limits, daily: Number.parseInt(e.target.value) || 0 })}
                    className="bg-[#333333] border-[#444444] text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly-limit" className="text-sm text-white">
                  Monthly Spending Limit
                </Label>
                <div className="flex items-center space-x-2">
                  <span className="text-white">$</span>
                  <Input
                    id="monthly-limit"
                    type="number"
                    value={limits.monthly}
                    onChange={(e) => setLimits({ ...limits, monthly: Number.parseInt(e.target.value) || 0 })}
                    className="bg-[#333333] border-[#444444] text-white"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-md bg-[#1A1A1A] p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="international" className="text-sm font-medium text-white">
                    International Transactions
                  </label>
                  <p className="text-xs text-gray-400">Allow this card to be used for international purchases</p>
                </div>
                <Switch
                  id="international"
                  checked={limits.international}
                  onCheckedChange={(checked) => setLimits({ ...limits, international: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label htmlFor="online" className="text-sm font-medium text-white">
                    Online Transactions
                  </label>
                  <p className="text-xs text-gray-400">Allow this card to be used for online purchases</p>
                </div>
                <Switch
                  id="online"
                  checked={limits.onlineTransactions}
                  onCheckedChange={(checked) => setLimits({ ...limits, onlineTransactions: checked })}
                />
              </div>
            </div>

            <div className="flex items-start space-x-3 rounded-md bg-[#1A1A1A] p-4">
              <Shield className="h-5 w-5 text-[#E50914]" />
              <div>
                <h3 className="text-sm font-medium text-white">Enhanced Security</h3>
                <p className="text-xs text-gray-400">
                  This card is protected with 3D Secure and real-time fraud monitoring.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#E50914] hover:bg-[#B20710] text-white" onClick={handleUpdateLimits}>
              Save Security Settings
            </Button>
          </CardFooter>
        </AnimatedNetflixCard>

        <AnimatedNetflixCard>
          <CardHeader>
            <CardTitle className="text-white">Recent Transactions</CardTitle>
            <CardDescription className="text-gray-400">
              Last {card.transactions.length} transactions with this card
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {card.transactions.length > 0 ? (
              <ul className="divide-y divide-[#333333]">
                {card.transactions.map((transaction: any) => (
                  <li key={transaction.id} className="flex items-center justify-between p-4 hover:bg-[#1A1A1A]">
                    <div>
                      <p className="font-medium text-white">{transaction.merchant}</p>
                      <p className="text-xs text-gray-400">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                    <p className="font-medium text-white">-${transaction.amount}.00</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-gray-400">No transactions yet</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t border-[#333333]">
            <Button variant="outline" className="w-full border-[#333333] text-white hover:bg-[#333333]" asChild>
              <Link href="/transactions">View All Transactions</Link>
            </Button>
          </CardFooter>
        </AnimatedNetflixCard>
      </main>

      <BottomNavigation />
    </div>
  )
}

