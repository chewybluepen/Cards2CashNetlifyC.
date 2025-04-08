"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  X,
  TrendingUp,
  TrendingDown,
  Filter,
  ArrowUpDown,
  Bitcoin,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { AnimatedNetflixCard } from "@/components/ui/animated-netflix-card"
import { InteractiveButton } from "@/components/ui/interactive-button"
import { EnhancedBottomNavigation } from "@/components/enhanced-bottom-navigation"
import { Input } from "@/components/ui/input"
import { EnhancedDropdown, DropdownItem } from "@/components/ui/enhanced-dropdown"
import { AppRoutes, navigateTo } from "@/lib/navigation"
import { toast } from "@/components/ui/use-toast"
import { CryptoNavigation } from "@/components/crypto-navigation"
import { CompactCurrencyDisplay } from "@/components/ui/currency-display"

// Mock crypto data
const cryptoList = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 68432.51,
    change24h: 2.34,
    marketCap: "1.32T",
    volume24h: "42.5B",
    owned: true,
    amount: 0.025,
    value: 1710.81,
    icon: Bitcoin,
    color: "#F7931A",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 3245.78,
    change24h: -1.25,
    marketCap: "389.5B",
    volume24h: "18.7B",
    owned: true,
    amount: 0.5,
    value: 1622.89,
    icon: Coins,
    color: "#627EEA",
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 142.65,
    change24h: 5.67,
    marketCap: "62.8B",
    volume24h: "4.2B",
    owned: true,
    amount: 3.2,
    value: 456.48,
    icon: Coins,
    color: "#00FFA3",
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: 0.58,
    change24h: 1.23,
    marketCap: "20.5B",
    volume24h: "1.2B",
    owned: false,
    amount: 0,
    value: 0,
    icon: Coins,
    color: "#0033AD",
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "XRP",
    price: 0.62,
    change24h: -0.87,
    marketCap: "33.8B",
    volume24h: "2.1B",
    owned: false,
    amount: 0,
    value: 0,
    icon: Coins,
    color: "#23292F",
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    price: 7.85,
    change24h: 3.42,
    marketCap: "10.2B",
    volume24h: "0.8B",
    owned: false,
    amount: 0,
    value: 0,
    icon: Coins,
    color: "#E6007A",
  },
]

export default function CryptoPage() {
  const router = useRouter()
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [activeSort, setActiveSort] = useState("marketCap")
  const [filteredCryptos, setFilteredCryptos] = useState(cryptoList)

  // Calculate total portfolio value
  const totalPortfolioValue = cryptoList
    .filter((crypto) => crypto.owned)
    .reduce((total, crypto) => total + crypto.value, 0)

  // Handle search, filter, and sort
  useEffect(() => {
    let result = [...cryptoList]

    // Apply search
    if (searchQuery) {
      result = result.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply filter
    if (activeFilter === "owned") {
      result = result.filter((crypto) => crypto.owned)
    } else if (activeFilter === "gainers") {
      result = result.filter((crypto) => crypto.change24h > 0)
    } else if (activeFilter === "losers") {
      result = result.filter((crypto) => crypto.change24h < 0)
    }

    // Apply sort
    if (activeSort === "marketCap") {
      result.sort((a, b) => Number.parseFloat(b.marketCap) - Number.parseFloat(a.marketCap))
    } else if (activeSort === "price") {
      result.sort((a, b) => b.price - a.price)
    } else if (activeSort === "change") {
      result.sort((a, b) => b.change24h - a.change24h)
    } else if (activeSort === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredCryptos(result)
  }, [searchQuery, activeFilter, activeSort])

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive)
    if (isSearchActive) {
      setSearchQuery("")
    }
  }

  const handleFilterSelect = (filter: string) => {
    setActiveFilter(filter)
    toast({
      title: "Filter Applied",
      description: `Showing ${filter === "all" ? "all cryptocurrencies" : filter}`,
      variant: "default",
    })
  }

  const handleSortSelect = (sort: string) => {
    setActiveSort(sort)
    toast({
      title: "Sort Applied",
      description: `Sorted by ${sort}`,
      variant: "default",
    })
  }

  const handleViewCryptoDetails = (cryptoId: string) => {
    navigateTo(AppRoutes.CRYPTO_DETAIL(cryptoId), router)
  }

  const handleBuyCrypto = (cryptoId: string) => {
    navigateTo(`${AppRoutes.CRYPTO_BUY}?coin=${cryptoId}`, router)
  }

  const handleSellCrypto = (cryptoId: string) => {
    navigateTo(`${AppRoutes.CRYPTO_SELL}?coin=${cryptoId}`, router)
  }

  const handleViewPortfolio = () => {
    navigateTo(AppRoutes.CRYPTO_PORTFOLIO, router)
  }

  const filterOptions = [
    { value: "all", label: "All Cryptocurrencies" },
    { value: "owned", label: "My Holdings" },
    { value: "gainers", label: "Gainers" },
    { value: "losers", label: "Losers" },
  ]

  const sortOptions = [
    { value: "marketCap", label: "Market Cap" },
    { value: "price", label: "Price" },
    { value: "change", label: "24h Change" },
    { value: "name", label: "Name" },
  ]

  return (
    <div className="min-h-screen bg-[#000000] pb-16">
      <header className="sticky top-0 z-10 bg-[#141414] p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Cryptocurrency</h1>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-[#333333]"
              onClick={handleSearchToggle}
              aria-label="Search cryptocurrencies"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isSearchActive ? (
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
        ) : (
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <EnhancedDropdown
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#333333] text-white hover:bg-[#333333]"
                    aria-label="Filter cryptocurrencies"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                }
                width="w-56"
              >
                {filterOptions.map((option) => (
                  <DropdownItem
                    key={option.value}
                    onClick={() => handleFilterSelect(option.value)}
                    className={activeFilter === option.value ? "bg-[#E50914]" : ""}
                  >
                    {option.label}
                  </DropdownItem>
                ))}
              </EnhancedDropdown>

              <EnhancedDropdown
                trigger={
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#333333] text-white hover:bg-[#333333]"
                    aria-label="Sort cryptocurrencies"
                  >
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Sort
                  </Button>
                }
                width="w-48"
              >
                {sortOptions.map((option) => (
                  <DropdownItem
                    key={option.value}
                    onClick={() => handleSortSelect(option.value)}
                    className={activeSort === option.value ? "bg-[#E50914]" : ""}
                  >
                    {option.label}
                  </DropdownItem>
                ))}
              </EnhancedDropdown>
            </div>
          </div>
        )}
      </header>

      <main className="p-4">
        <div className="container px-4 py-6 space-y-6">
          <CryptoNavigation />
          {activeFilter === "owned" || activeFilter === "all" ? (
            <section className="mb-6">
              <AnimatedNetflixCard>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Portfolio Value</p>
                      <p className="text-2xl font-bold text-white">${totalPortfolioValue.toLocaleString()}</p>
                      <p className="text-sm text-green-500">+12.5% all time</p>
                    </div>
                    <InteractiveButton
                      variant="netflix"
                      size="sm"
                      onClick={handleViewPortfolio}
                      aria-label="View portfolio details"
                    >
                      View Portfolio
                    </InteractiveButton>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-md bg-[#333333] p-2 text-center">
                      <p className="text-xs text-gray-400">Assets</p>
                      <p className="text-sm font-medium text-white">3</p>
                    </div>
                    <div className="rounded-md bg-[#333333] p-2 text-center">
                      <p className="text-xs text-gray-400">24h Change</p>
                      <p className="text-sm font-medium text-green-500">+$87.45</p>
                    </div>
                    <div className="rounded-md bg-[#333333] p-2 text-center">
                      <p className="text-xs text-gray-400">Transactions</p>
                      <p className="text-sm font-medium text-white">12</p>
                    </div>
                  </div>
                </CardContent>
              </AnimatedNetflixCard>
            </section>
          ) : null}

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                {activeFilter === "all"
                  ? "All Cryptocurrencies"
                  : activeFilter === "owned"
                    ? "My Holdings"
                    : activeFilter === "gainers"
                      ? "Top Gainers"
                      : "Top Losers"}
              </h2>
              <p className="text-sm text-gray-400">{filteredCryptos.length} assets</p>
            </div>

            <div className="space-y-4">
              {filteredCryptos.length === 0 ? (
                <AnimatedNetflixCard>
                  <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                    <Search className="h-12 w-12 text-gray-600 mb-3" />
                    <h3 className="text-xl font-medium text-white">No cryptocurrencies found</h3>
                    <p className="text-gray-400 mt-2">Try different filters or check your search query</p>
                  </CardContent>
                </AnimatedNetflixCard>
              ) : (
                filteredCryptos.map((crypto) => (
                  <AnimatedNetflixCard
                    key={crypto.id}
                    className="cursor-pointer hover:border-[#E50914]"
                    onClick={() => handleViewCryptoDetails(crypto.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="mr-3 rounded-full p-2" style={{ backgroundColor: `${crypto.color}20` }}>
                            <crypto.icon className="h-6 w-6" style={{ color: crypto.color }} />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium text-white">{crypto.name}</p>
                              {crypto.owned && (
                                <div className="ml-2 rounded-full bg-[#333333] px-2 py-0.5">
                                  <p className="text-xs text-white">Owned</p>
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-gray-400">{crypto.symbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-white">
                            <CompactCurrencyDisplay amount={crypto.price} currency="USD" />
                          </p>
                          <div className="flex items-center justify-end">
                            {crypto.change24h >= 0 ? (
                              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                            ) : (
                              <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                            )}
                            <p className={`text-sm ${crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                              {crypto.change24h >= 0 ? "+" : ""}
                              {crypto.change24h}%
                            </p>
                          </div>
                        </div>
                      </div>

                      {crypto.owned && (
                        <div className="mt-2 flex items-center justify-between rounded-md bg-[#333333] p-2">
                          <div>
                            <p className="text-xs text-gray-400">Your Balance</p>
                            <p className="text-sm font-medium text-white">
                              {crypto.amount} {crypto.symbol} (
                              <CompactCurrencyDisplay amount={crypto.value} currency="USD" />)
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-[#444444] bg-[#222222] text-white hover:bg-[#333333]"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleBuyCrypto(crypto.id)
                              }}
                            >
                              <ArrowUpRight className="mr-1 h-3 w-3" />
                              Buy
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 border-[#444444] bg-[#222222] text-white hover:bg-[#333333]"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleSellCrypto(crypto.id)
                              }}
                            >
                              <ArrowDownRight className="mr-1 h-3 w-3" />
                              Sell
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-gray-400">Market Cap</p>
                          <p className="font-medium text-white">${crypto.marketCap}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Volume (24h)</p>
                          <p className="font-medium text-white">${crypto.volume24h}</p>
                        </div>
                        <div className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 p-0 text-[#E50914] hover:bg-transparent hover:text-[#E50914]"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleBuyCrypto(crypto.id)
                            }}
                          >
                            Trade Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </AnimatedNetflixCard>
                ))
              )}
            </div>
          </section>
        </div>
      </main>

      <EnhancedBottomNavigation />
    </div>
  )
}

