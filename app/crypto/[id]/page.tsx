"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronDown,
  ChevronUp,
  Share2,
  Star,
  Bitcoin,
  Coins,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedNetflixCard } from "@/components/ui/animated-netflix-card"
import { InteractiveButton } from "@/components/ui/interactive-button"
import { EnhancedBottomNavigation } from "@/components/enhanced-bottom-navigation"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AppRoutes, navigateTo, goBack } from "@/lib/navigation"
import { toast } from "@/components/ui/use-toast"

// Mock crypto data
const cryptoDetails = {
  bitcoin: {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    currentPrice: 68432.51,
    change24h: 2.34,
    high24h: 69102.45,
    low24h: 67245.89,
    marketCap: "1.32T",
    volume24h: "42.5B",
    circulatingSupply: "19.4M",
    allTimeHigh: 73750.0,
    allTimeHighDate: "2025-02-15",
    description:
      "Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.",
    color: "#F7931A",
    icon: Bitcoin,
  },
  ethereum: {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    currentPrice: 3245.78,
    change24h: -1.25,
    high24h: 3312.45,
    low24h: 3198.76,
    marketCap: "389.5B",
    volume24h: "18.7B",
    circulatingSupply: "120.2M",
    allTimeHigh: 4865.0,
    allTimeHighDate: "2025-01-10",
    description:
      "Ethereum is a decentralized, open-source blockchain with smart contract functionality. Ether is the native cryptocurrency of the platform.",
    color: "#627EEA",
    icon: Coins,
  },
  solana: {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    currentPrice: 142.65,
    change24h: 5.67,
    high24h: 145.32,
    low24h: 134.21,
    marketCap: "62.8B",
    volume24h: "4.2B",
    circulatingSupply: "440.3M",
    allTimeHigh: 260.0,
    allTimeHighDate: "2025-03-05",
    description:
      "Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale.",
    color: "#00FFA3",
    icon: Coins,
  },
}

// Mock price history data
const generatePriceHistory = (basePrice: number, volatility: number, days: number) => {
  const data = []
  let currentPrice = basePrice

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    // Random price movement with trend
    const change = (Math.random() - 0.5) * volatility * basePrice
    currentPrice = Math.max(currentPrice + change, basePrice * 0.7)

    data.push({
      date: date.toISOString().split("T")[0],
      price: Number.parseFloat(currentPrice.toFixed(2)),
    })
  }

  return data
}

// Mock transactions
const generateTransactions = (cryptoId: string, symbol: string) => {
  return [
    {
      id: 1,
      type: "buy",
      amount: cryptoId === "bitcoin" ? 0.015 : cryptoId === "ethereum" ? 0.35 : 2.5,
      value: cryptoId === "bitcoin" ? 1026.49 : cryptoId === "ethereum" ? 1136.02 : 356.63,
      date: "2025-04-10T14:32:00",
      status: "completed",
      fee: cryptoId === "bitcoin" ? 5.13 : cryptoId === "ethereum" ? 5.68 : 1.78,
    },
    {
      id: 2,
      type: "buy",
      amount: cryptoId === "bitcoin" ? 0.01 : cryptoId === "ethereum" ? 0.15 : 0.7,
      value: cryptoId === "bitcoin" ? 684.33 : cryptoId === "ethereum" ? 486.87 : 99.86,
      date: "2025-03-25T09:15:00",
      status: "completed",
      fee: cryptoId === "bitcoin" ? 3.42 : cryptoId === "ethereum" ? 2.43 : 0.5,
    },
  ]
}

export default function CryptoDetailPage() {
  const router = useRouter()
  const params = useParams()
  const cryptoId = params.id as string

  const [timeframe, setTimeframe] = useState("1W")
  const [isFavorite, setIsFavorite] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [priceHistory, setPriceHistory] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])

  // Get crypto details or redirect if not found
  const crypto = cryptoDetails[cryptoId as keyof typeof cryptoDetails]

  useEffect(() => {
    if (!crypto) {
      router.push(AppRoutes.CRYPTO)
      return
    }

    // Generate price history based on the crypto
    const volatility = cryptoId === "bitcoin" ? 0.03 : cryptoId === "ethereum" ? 0.04 : 0.06
    const days = timeframe === "1D" ? 1 : timeframe === "1W" ? 7 : timeframe === "1M" ? 30 : 365
    setPriceHistory(generatePriceHistory(crypto.currentPrice, volatility, days))

    // Generate transactions
    setTransactions(generateTransactions(cryptoId, crypto.symbol))
  }, [cryptoId, timeframe, router, crypto])

  if (!crypto) {
    return null // Will redirect in useEffect
  }

  const handleBuy = () => {
    navigateTo(`${AppRoutes.CRYPTO_BUY}?coin=${cryptoId}`, router)
  }

  const handleSell = () => {
    navigateTo(`${AppRoutes.CRYPTO_SELL}?coin=${cryptoId}`, router)
  }

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe)
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: `${crypto.name} has been ${isFavorite ? "removed from" : "added to"} your favorites.`,
      variant: "default",
    })
  }

  const handleShare = () => {
    toast({
      title: "Share link copied",
      description: `A link to ${crypto.name} has been copied to your clipboard.`,
      variant: "default",
    })
  }

  return (
    <div className="min-h-screen bg-[#000000] pb-16">
      <header className="sticky top-0 z-10 bg-[#141414] p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 text-white hover:bg-[#333333]"
              onClick={() => goBack(router)}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <div className="mr-2 rounded-full p-2" style={{ backgroundColor: `${crypto.color}20` }}>
                <crypto.icon className="h-6 w-6" style={{ color: crypto.color }} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{crypto.name}</h1>
                <p className="text-xs text-gray-400">{crypto.symbol}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className={`text-white hover:bg-[#333333] ${isFavorite ? "text-yellow-500" : ""}`}
              onClick={handleToggleFavorite}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Star className="h-5 w-5" fill={isFavorite ? "#EAB308" : "none"} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-[#333333]"
              onClick={handleShare}
              aria-label="Share"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="p-4">
        <section className="mb-6">
          <AnimatedNetflixCard>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-4xl font-bold text-white">${crypto.currentPrice.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <div className={`flex items-center ${crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {crypto.change24h >= 0 ? (
                        <TrendingUp className="mr-1 h-4 w-4" />
                      ) : (
                        <TrendingDown className="mr-1 h-4 w-4" />
                      )}
                      <span className="font-medium">
                        {crypto.change24h >= 0 ? "+" : ""}
                        {crypto.change24h}%
                      </span>
                    </div>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-400">24h</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <InteractiveButton
                    variant="netflix"
                    size="sm"
                    onClick={handleBuy}
                    aria-label={`Buy ${crypto.symbol}`}
                  >
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    Buy
                  </InteractiveButton>
                  <InteractiveButton
                    variant="outline"
                    size="sm"
                    className="border-[#333333] text-white hover:bg-[#333333]"
                    onClick={handleSell}
                    aria-label={`Sell ${crypto.symbol}`}
                  >
                    <ArrowDownRight className="mr-2 h-4 w-4" />
                    Sell
                  </InteractiveButton>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    {["1D", "1W", "1M", "1Y"].map((period) => (
                      <Button
                        key={period}
                        variant={timeframe === period ? "default" : "outline"}
                        size="sm"
                        className={
                          timeframe === period
                            ? "bg-[#E50914] hover:bg-[#C30812] text-white"
                            : "border-[#333333] text-white hover:bg-[#333333]"
                        }
                        onClick={() => handleTimeframeChange(period)}
                      >
                        {period}
                      </Button>
                    ))}
                  </div>

                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>
                      {new Date().toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="h-64">
                  <ChartContainer
                    config={{
                      price: {
                        label: "Price",
                        color: crypto.color,
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={priceHistory} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                        <XAxis
                          dataKey="date"
                          stroke="#666666"
                          tickFormatter={(value) => {
                            const date = new Date(value)
                            return timeframe === "1D"
                              ? date.getHours() + ":" + date.getMinutes()
                              : date.getDate() + "/" + (date.getMonth() + 1)
                          }}
                        />
                        <YAxis
                          stroke="#666666"
                          domain={["auto", "auto"]}
                          tickFormatter={(value) => `$${value.toLocaleString()}`}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke={crypto.color}
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 6, fill: crypto.color }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </CardContent>
          </AnimatedNetflixCard>
        </section>

        <section className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <AnimatedNetflixCard>
              <CardContent className="p-4">
                <p className="text-sm text-gray-400">24h High</p>
                <p className="text-lg font-bold text-white">${crypto.high24h.toLocaleString()}</p>
              </CardContent>
            </AnimatedNetflixCard>

            <AnimatedNetflixCard>
              <CardContent className="p-4">
                <p className="text-sm text-gray-400">24h Low</p>
                <p className="text-lg font-bold text-white">${crypto.low24h.toLocaleString()}</p>
              </CardContent>
            </AnimatedNetflixCard>

            <AnimatedNetflixCard>
              <CardContent className="p-4">
                <p className="text-sm text-gray-400">Market Cap</p>
                <p className="text-lg font-bold text-white">${crypto.marketCap}</p>
              </CardContent>
            </AnimatedNetflixCard>

            <AnimatedNetflixCard>
              <CardContent className="p-4">
                <p className="text-sm text-gray-400">Volume (24h)</p>
                <p className="text-lg font-bold text-white">${crypto.volume24h}</p>
              </CardContent>
            </AnimatedNetflixCard>
          </div>
        </section>

        <section className="mb-6">
          <AnimatedNetflixCard>
            <CardHeader className="pb-2">
              <CardTitle className="text-white">About {crypto.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                {showFullDescription ? crypto.description : `${crypto.description.substring(0, 120)}...`}
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 text-[#E50914] hover:bg-[#333333] p-0"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? (
                  <span className="flex items-center">
                    Show Less <ChevronUp className="ml-1 h-4 w-4" />
                  </span>
                ) : (
                  <span className="flex items-center">
                    Read More <ChevronDown className="ml-1 h-4 w-4" />
                  </span>
                )}
              </Button>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Circulating Supply</p>
                  <p className="text-white">
                    {crypto.circulatingSupply} {crypto.symbol}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">All Time High</p>
                  <p className="text-white">${crypto.allTimeHigh.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">{new Date(crypto.allTimeHighDate).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </AnimatedNetflixCard>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Your Transactions</h2>
            <Button
              variant="link"
              className="text-sm text-[#E50914] hover:underline p-0"
              onClick={() => navigateTo(AppRoutes.CRYPTO_TRANSACTIONS, router)}
              aria-label="View all transactions"
            >
              View All
            </Button>
          </div>

          <AnimatedNetflixCard>
            <CardContent className="p-0">
              <ul className="divide-y divide-[#333333]">
                {transactions.map((transaction) => (
                  <li
                    key={transaction.id}
                    className="flex items-center justify-between p-4 hover:bg-[rgba(51,51,51,0.5)] transition-colors cursor-pointer"
                    onClick={() => navigateTo(AppRoutes.CRYPTO_TRANSACTION_DETAIL(transaction.id), router)}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 rounded-full bg-[#333333] p-2">
                        {transaction.type === "buy" ? (
                          <ArrowUpRight className="h-5 w-5 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {transaction.type === "buy" ? "Bought" : "Sold"} {transaction.amount} {crypto.symbol}
                        </p>
                        <div className="flex items-center text-xs text-gray-400">
                          <Clock className="mr-1 h-3 w-3" />
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">${transaction.value.toLocaleString()}</p>
                      <p className="text-xs text-green-500">Completed</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </AnimatedNetflixCard>
        </section>
      </main>

      <EnhancedBottomNavigation />
    </div>
  )
}

