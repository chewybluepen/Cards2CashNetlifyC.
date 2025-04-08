"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Bitcoin,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Search,
  X,
  PieChart,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { AnimatedNetflixCard } from "@/components/ui/animated-netflix-card"
import { InteractiveButton } from "@/components/ui/interactive-button"
import { EnhancedBottomNavigation } from "@/components/enhanced-bottom-navigation"
import { Input } from "@/components/ui/input"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Line, LineChart as RechartsLineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AppRoutes, navigateTo, goBack } from "@/lib/navigation"
import { CryptoNavigation } from "@/components/crypto-navigation"
import { CompactCurrencyDisplay } from "@/components/ui/currency-display"

// Mock crypto holdings
const cryptoHoldings = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 68432.51,
    change24h: 2.34,
    amount: 0.025,
    value: 1710.81,
    icon: Bitcoin,
    color: "#F7931A",
    percentOfPortfolio: 45.14,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 3245.78,
    change24h: -1.25,
    amount: 0.5,
    value: 1622.89,
    icon: Coins,
    color: "#627EEA",
    percentOfPortfolio: 42.82,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 142.65,
    change24h: 5.67,
    amount: 3.2,
    value: 456.48,
    icon: Coins,
    color: "#00FFA3",
    percentOfPortfolio: 12.04,
  },
]

// Mock transactions
const transactions = [
  {
    id: 1,
    type: "buy",
    crypto: "bitcoin",
    cryptoName: "Bitcoin",
    cryptoSymbol: "BTC",
    amount: 0.015,
    value: 1026.49,
    date: "2025-04-10T14:32:00",
    status: "completed",
    color: "#F7931A",
  },
  {
    id: 2,
    type: "buy",
    crypto: "ethereum",
    cryptoName: "Ethereum",
    cryptoSymbol: "ETH",
    amount: 0.35,
    value: 1136.02,
    date: "2025-04-05T09:15:00",
    status: "completed",
    color: "#627EEA",
  },
  {
    id: 3,
    type: "sell",
    crypto: "solana",
    cryptoName: "Solana",
    cryptoSymbol: "SOL",
    amount: 1.5,
    value: 213.98,
    date: "2025-03-28T16:45:00",
    status: "completed",
    color: "#00FFA3",
  },
]

// Mock portfolio performance data
const generatePortfolioPerformance = (days: number) => {
  const data = []
  let value = 3500

  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    // Random value change with slight upward trend
    const change = (Math.random() - 0.4) * 100
    value = Math.max(value + change, 3000)

    data.push({
      date: date.toISOString().split("T")[0],
      value: Number.parseFloat(value.toFixed(2)),
    })
  }

  return data
}

export default function CryptoPortfolioPage() {
  const router = useRouter()
  const [timeframe, setTimeframe] = useState("1M")
  const [activeTab, setActiveTab] = useState("allocation")
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredHoldings, setFilteredHoldings] = useState(cryptoHoldings)
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)
  const [portfolioPerformance, setPortfolioPerformance] = useState<any[]>([])

  // Calculate total portfolio value
  const totalPortfolioValue = cryptoHoldings.reduce((total, crypto) => total + crypto.value, 0)

  // Generate portfolio performance data based on timeframe
  useEffect(() => {
    const days = timeframe === "1D" ? 1 : timeframe === "1W" ? 7 : timeframe === "1M" ? 30 : 365
    setPortfolioPerformance(generatePortfolioPerformance(days))
  }, [timeframe])

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredHoldings(cryptoHoldings)
      setFilteredTransactions(transactions)
      return
    }

    const query = searchQuery.toLowerCase()

    // Filter holdings
    const matchedHoldings = cryptoHoldings.filter(
      (crypto) => crypto.name.toLowerCase().includes(query) || crypto.symbol.toLowerCase().includes(query),
    )

    // Filter transactions
    const matchedTransactions = transactions.filter(
      (transaction) =>
        transaction.cryptoName.toLowerCase().includes(query) || transaction.cryptoSymbol.toLowerCase().includes(query),
    )

    setFilteredHoldings(matchedHoldings)
    setFilteredTransactions(matchedTransactions)
  }, [searchQuery])

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive)
    if (isSearchActive) {
      setSearchQuery("")
      setFilteredHoldings(cryptoHoldings)
      setFilteredTransactions(transactions)
    }
  }

  const handleBuyCrypto = () => {
    navigateTo(AppRoutes.CRYPTO_BUY, router)
  }

  const handleSellCrypto = () => {
    navigateTo(AppRoutes.CRYPTO_SELL, router)
  }

  const handleViewCryptoDetails = (cryptoId: string) => {
    navigateTo(AppRoutes.CRYPTO_DETAIL(cryptoId), router)
  }

  // Prepare data for pie chart
  const pieChartData = cryptoHoldings.map((crypto) => ({
    name: crypto.symbol,
    value: crypto.value,
    color: crypto.color,
  }))

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
            <h1 className="text-xl font-bold text-white">Crypto Portfolio</h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-[#333333]"
              onClick={handleSearchToggle}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isSearchActive && (
          <div className="mt-4 flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search cryptocurrencies..."
                className="pl-9 pr-9 bg-[#333333] border-[#444444] text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-white"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-[#333333] text-white hover:bg-[#333333]"
              onClick={handleSearchToggle}
            >
              Cancel
            </Button>
          </div>
        )}
      </header>

      <main className="p-4">
        <div className="container px-4 py-6 space-y-6">
          <CryptoNavigation />
          <section className="mb-6">
            <AnimatedNetflixCard>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Total Portfolio Value</p>
                    <p className="text-3xl font-bold text-white">
                      <CompactCurrencyDisplay amount={totalPortfolioValue} currency="USD" />
                    </p>
                    <p className="text-sm text-green-500">+12.5% all time</p>
                  </div>
                  <div className="flex space-x-2">
                    <InteractiveButton
                      variant="netflix"
                      size="sm"
                      onClick={handleBuyCrypto}
                      aria-label="Buy cryptocurrency"
                    >
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Buy
                    </InteractiveButton>
                    <InteractiveButton
                      variant="outline"
                      size="sm"
                      className="border-[#333333] text-white hover:bg-[#333333]"
                      onClick={handleSellCrypto}
                      aria-label="Sell cryptocurrency"
                    >
                      <ArrowDownRight className="mr-2 h-4 w-4" />
                      Sell
                    </InteractiveButton>
                  </div>
                </div>

                <div className="flex space-x-2 mb-4">
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

                <div className="h-48">
                  <ChartContainer
                    config={{
                      value: {
                        label: "Portfolio Value",
                        color: "#E50914",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={portfolioPerformance} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
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
                          dataKey="value"
                          stroke="#E50914"
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 6, fill: "#E50914" }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </AnimatedNetflixCard>
          </section>

          <section className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Portfolio Analysis</h2>
              <div className="flex space-x-2">
                <Button
                  variant={activeTab === "allocation" ? "default" : "outline"}
                  size="sm"
                  className={
                    activeTab === "allocation"
                      ? "bg-[#E50914] hover:bg-[#C30812] text-white"
                      : "border-[#333333] text-white hover:bg-[#333333]"
                  }
                  onClick={() => handleTabChange("allocation")}
                >
                  <PieChart className="mr-2 h-4 w-4" />
                  Allocation
                </Button>
                <Button
                  variant={activeTab === "performance" ? "default" : "outline"}
                  size="sm"
                  className={
                    activeTab === "performance"
                      ? "bg-[#E50914] hover:bg-[#C30812] text-white"
                      : "border-[#333333] text-white hover:bg-[#333333]"
                  }
                  onClick={() => handleTabChange("performance")}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Performance
                </Button>
              </div>
            </div>

            <AnimatedNetflixCard>
              <CardContent className="p-4">
                {activeTab === "allocation" ? (
                  <div>
                    <div className="flex items-center justify-center mb-4">
                      <div className="h-64 w-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={pieChartData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              labelLine={false}
                            >
                              {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value: number) => [`$${value.toFixed(2)}`, "Value"]}
                              contentStyle={{ backgroundColor: "#141414", borderColor: "#333333" }}
                              itemStyle={{ color: "#ffffff" }}
                            />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {cryptoHoldings.map((crypto) => (
                        <div key={crypto.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: crypto.color }}></div>
                            <p className="text-white">
                              {crypto.name} ({crypto.symbol})
                            </p>
                          </div>
                          <p className="text-white">{crypto.percentOfPortfolio.toFixed(1)}%</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-4">
                      {cryptoHoldings.map((crypto) => (
                        <div key={crypto.id} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="mr-2 rounded-full p-1" style={{ backgroundColor: `${crypto.color}20` }}>
                                <crypto.icon className="h-4 w-4" style={{ color: crypto.color }} />
                              </div>
                              <p className="font-medium text-white">{crypto.name}</p>
                            </div>
                            <p className={`text-sm ${crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                              {crypto.change24h >= 0 ? "+" : ""}
                              {crypto.change24h}%
                            </p>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-[#333333]">
                            <div
                              className="h-full transition-all duration-1000"
                              style={{
                                width: `${Math.min(Math.max(50 + crypto.change24h * 5, 10), 90)}%`,
                                backgroundColor: crypto.color,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </AnimatedNetflixCard>
          </section>

          <section className="mb-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Your Assets</h2>
            </div>

            <div className="space-y-4">
              {filteredHoldings.map((crypto) => (
                <AnimatedNetflixCard
                  key={crypto.id}
                  className="cursor-pointer hover:border-[#E50914]"
                  onClick={() => handleViewCryptoDetails(crypto.id)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <div className="mr-3 rounded-full p-2" style={{ backgroundColor: `${crypto.color}20` }}>
                        <crypto.icon className="h-6 w-6" style={{ color: crypto.color }} />
                      </div>
                      <div>
                        <p className="font-medium text-white">{crypto.name}</p>
                        <p className="text-sm text-gray-400">
                          {crypto.amount} {crypto.symbol}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div>
                        <p className="text-sm text-gray-400">Value</p>
                        <p className="text-lg font-bold text-white">
                          <CompactCurrencyDisplay amount={crypto.value} currency="USD" />
                        </p>
                      </div>
                      <p className={`text-sm ${crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {crypto.change24h >= 0 ? "+" : ""}
                        {crypto.change24h}%
                      </p>
                    </div>
                  </CardContent>
                </AnimatedNetflixCard>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
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
                  {filteredTransactions.map((transaction) => (
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
                            {transaction.type === "buy" ? "Bought" : "Sold"} {transaction.amount}{" "}
                            {transaction.cryptoSymbol}
                          </p>
                          <div className="flex items-center text-xs text-gray-400">
                            <Clock className="mr-1 h-3 w-3" />
                            {new Date(transaction.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">
                          <CompactCurrencyDisplay amount={transaction.value} currency="USD" />
                        </p>
                        <p className="text-xs text-green-500">Completed</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </AnimatedNetflixCard>
          </section>
        </div>
      </main>

      <EnhancedBottomNavigation />
    </div>
  )
}

