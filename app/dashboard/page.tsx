"use client"

import { useState, useCallback, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowUpRight,
  Wallet,
  RefreshCw,
  Bell,
  Settings,
  ChevronRight,
  Filter,
  TrendingUp,
  MoreHorizontal,
  Search,
  Calendar,
  Clock,
  X,
  Bitcoin,
  Coins,
  ArrowUpDown,
  Gift,
  Award,
} from "lucide-react"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// Update the import for the bottom navigation component
import { EnhancedBottomNavigation } from "@/components/enhanced-bottom-navigation"
import { EnhancedDropdown, DropdownItem, DropdownSeparator } from "@/components/ui/enhanced-dropdown"
import { InteractiveButton } from "@/components/ui/interactive-button"
import { AnimatedNetflixCard } from "@/components/ui/animated-netflix-card"
import { toast } from "@/components/ui/use-toast"
import { AppRoutes, navigateTo } from "@/lib/navigation"
import { CryptoDashboardWidget } from "@/components/crypto-dashboard-widget"
import { PhoneCreditWidget } from "@/components/phone-credit-widget"
import { EnhancedAvatar } from "@/components/ui/enhanced-avatar"
import { useAvatar } from "@/contexts/avatar-context"
import { CompactCurrencyDisplay } from "@/components/ui/currency-display"

// Mock data with updated dates (after March 27, 2025)
const cards = [
  {
    id: 1,
    name: "Amazon Gift Card",
    balance: 150,
    expiryDate: "12/27",
    lastFour: "4582",
    type: "Visa",
  },
  {
    id: 2,
    name: "Netflix Gift Card",
    balance: 75,
    expiryDate: "09/26",
    lastFour: "9371",
    type: "Mastercard",
  },
  {
    id: 3,
    name: "Steam Wallet",
    balance: 200,
    expiryDate: "03/28",
    lastFour: "6294",
    type: "Visa",
  },
]

const transactions = [
  {
    id: 1,
    type: "conversion",
    amount: 50,
    date: "2025-04-15",
    status: "completed",
    description: "Amazon Gift Card to Cash",
  },
  {
    id: 2,
    type: "withdrawal",
    amount: 75,
    date: "2025-04-10",
    status: "completed",
    description: "Withdrawal to Bank Account",
  },
  {
    id: 3,
    type: "conversion",
    amount: 100,
    date: "2025-04-05",
    status: "completed",
    description: "Steam Gift Card to Cash",
  },
]

// Mock crypto data
const cryptoAssets = [
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
  },
]

// Mock rewards data
const rewardsData = {
  points: 1250,
  tier: "Gold",
  nextTier: "Platinum",
  progress: 65,
  pointsToNextTier: 750,
  recentRewards: [
    {
      id: 1,
      name: "5% Cashback",
      description: "On your next conversion",
      expires: "2025-05-15",
      icon: "percent",
    },
    {
      id: 2,
      name: "Free Transfer",
      description: "No fees on your next transfer",
      expires: "2025-05-30",
      icon: "gift",
    },
  ],
}

export default function Dashboard() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [filteredCards, setFilteredCards] = useState(cards)
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<{
    cards: typeof cards
    transactions: typeof transactions
    crypto: typeof cryptoAssets
  }>({ cards: [], transactions: [], crypto: [] })
  const { avatarUrl, initials } = useAvatar()

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCards(cards)
      setFilteredTransactions(transactions)
      setSearchResults({ cards: [], transactions: [], crypto: [] })
      return
    }

    const query = searchQuery.toLowerCase()

    // Filter cards
    const matchedCards = cards.filter(
      (card) =>
        card.name.toLowerCase().includes(query) ||
        card.type.toLowerCase().includes(query) ||
        card.lastFour.includes(query) ||
        card.balance.toString().includes(query),
    )

    // Filter transactions
    const matchedTransactions = transactions.filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(query) ||
        transaction.type.toLowerCase().includes(query) ||
        transaction.amount.toString().includes(query) ||
        transaction.date.includes(query),
    )

    // Filter crypto
    const matchedCrypto = cryptoAssets.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(query) ||
        crypto.symbol.toLowerCase().includes(query) ||
        crypto.price.toString().includes(query),
    )

    if (isSearchActive) {
      setSearchResults({
        cards: matchedCards,
        transactions: matchedTransactions,
        crypto: matchedCrypto,
      })
    } else {
      setFilteredCards(matchedCards)
      setFilteredTransactions(matchedTransactions)
    }
  }, [searchQuery, isSearchActive])

  // Handle refresh with actual data update simulation
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true)

    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Dashboard Refreshed",
        description: "Your dashboard data has been updated.",
        variant: "default",
      })
    }, 1500)
  }, [])

  // Handle notification with toast
  const handleNotification = useCallback(() => {
    setShowNotification(true)

    // Show notification and toast
    toast({
      title: "New Notification",
      description: "Your Amazon Gift Card has been successfully added to your account.",
      variant: "default",
    })

    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }, [])

  // Handle filter selection
  const handleFilterSelect = useCallback((filterValue: string) => {
    setActiveFilter(filterValue)

    // Actually filter the cards
    if (filterValue === "all") {
      setFilteredCards(cards)
    } else {
      const filtered = cards.filter((card) => {
        if (filterValue === "visa" || filterValue === "mastercard") {
          return card.type.toLowerCase() === filterValue.toLowerCase()
        } else {
          return card.name.toLowerCase().includes(filterValue.toLowerCase())
        }
      })
      setFilteredCards(filtered)
    }

    toast({
      title: "Filter Applied",
      description: `Showing ${filterValue === "all" ? "all cards" : filterValue + " cards"}`,
      variant: "default",
    })
  }, [])

  // Handle sort selection
  const handleSortSelect = useCallback(
    (sortValue: string) => {
      let sorted = [...filteredCards]

      switch (sortValue) {
        case "newest":
          // For demo purposes, we'll just reverse the array
          sorted = sorted.reverse()
          break
        case "oldest":
          // Current order is fine for demo
          break
        case "highest":
          sorted = sorted.sort((a, b) => b.balance - a.balance)
          break
        case "lowest":
          sorted = sorted.sort((a, b) => a.balance - b.balance)
          break
      }

      setFilteredCards(sorted)

      toast({
        title: "Sort Applied",
        description: `Cards sorted by: ${sortValue}`,
        variant: "default",
      })
    },
    [filteredCards],
  )

  // Handle timeframe selection
  const handleTimeframeSelect = useCallback((timeValue: string) => {
    toast({
      title: "Timeframe Selected",
      description: `Showing data for: ${timeValue}`,
      variant: "default",
    })
  }, [])

  // Handle search
  const handleSearchToggle = useCallback(() => {
    setIsSearchActive(!isSearchActive)
    if (isSearchActive) {
      setSearchQuery("")
      setFilteredCards(cards)
      setFilteredTransactions(transactions)
    }
  }, [isSearchActive])

  // Handle card conversion
  const handleConvertCard = useCallback(
    (cardName: string) => {
      toast({
        title: "Converting Card",
        description: `Initiating conversion process for ${cardName}`,
        variant: "default",
      })

      // Navigate to conversion page
      setTimeout(() => {
        router.push("/convert")
      }, 500)
    },
    [router],
  )

  // Handle card details view
  const handleViewCardDetails = useCallback(
    (cardId: number) => {
      toast({
        title: "Viewing Card Details",
        description: "Loading card information...",
        variant: "default",
      })

      // Navigate to card details page
      setTimeout(() => {
        router.push(`/generate-card?id=${cardId}`)
      }, 500)
    },
    [router],
  )

  // Handle card deletion
  const handleDeleteCard = useCallback(
    (cardName: string) => {
      const confirmDelete = confirm(`Are you sure you want to delete ${cardName}?`)

      if (confirmDelete) {
        // Filter out the deleted card
        const updatedCards = filteredCards.filter((card) => card.name !== cardName)
        setFilteredCards(updatedCards)

        toast({
          title: "Card Deleted",
          description: `${cardName} has been removed from your account.`,
          variant: "default",
        })
      }
    },
    [filteredCards],
  )

  // Handle withdraw action
  const handleWithdraw = useCallback(() => {
    toast({
      title: "Withdraw Funds",
      description: "Redirecting to withdrawal page...",
      variant: "default",
    })

    setTimeout(() => {
      router.push("/payment-methods")
    }, 500)
  }, [router])

  // Handle convert action
  const handleConvert = useCallback(() => {
    toast({
      title: "Convert Funds",
      description: "Redirecting to conversion page...",
      variant: "default",
    })

    setTimeout(() => {
      router.push("/convert")
    }, 500)
  }, [router])

  // Handle crypto actions
  const handleBuyCrypto = useCallback(() => {
    navigateTo(AppRoutes.CRYPTO_BUY, router)
  }, [router])

  const handleSellCrypto = useCallback(() => {
    navigateTo(AppRoutes.CRYPTO_SELL, router)
  }, [router])

  const handleViewCryptoDetails = useCallback(
    (cryptoId: string) => {
      navigateTo(AppRoutes.CRYPTO_DETAIL(cryptoId), router)
    },
    [router],
  )

  const handleViewCryptoPortfolio = useCallback(() => {
    navigateTo(AppRoutes.CRYPTO_PORTFOLIO, router)
  }, [router])

  // Handle rewards and referrals
  const handleViewRewards = useCallback(() => {
    navigateTo(AppRoutes.REWARDS, router)
  }, [router])

  const handleViewReferrals = useCallback(() => {
    navigateTo(AppRoutes.REFERRAL, router)
  }, [router])

  const filterOptions = [
    { value: "all", label: "All Cards" },
    { value: "visa", label: "Visa Cards" },
    { value: "mastercard", label: "Mastercard" },
    { value: "amazon", label: "Amazon Cards" },
    { value: "netflix", label: "Netflix Cards" },
    { value: "steam", label: "Steam Cards" },
  ]

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "highest", label: "Highest Balance" },
    { value: "lowest", label: "Lowest Balance" },
  ]

  const timeframeOptions = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" },
  ]

  return (
    <div className="min-h-screen bg-[#000000] pb-16">
      <header className="sticky top-0 z-10 bg-[#141414] p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Cards2Cash</h1>
            <p className="text-xs italic text-gray-400">The Future of Your Finances, For a Borderless World</p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-[#333333]"
              onClick={handleRefresh}
              aria-label="Refresh dashboard"
            >
              <RefreshCw className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-[#333333]"
                onClick={handleNotification}
                aria-label="View notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#E50914]"></span>
              </Button>

              {showNotification && (
                <div className="absolute right-0 mt-2 w-64 rounded-md border border-[#333333] bg-[#141414] p-3 shadow-lg">
                  <p className="text-sm font-medium text-white">New Card Added</p>
                  <p className="text-xs text-gray-400">
                    Your Amazon Gift Card has been successfully added to your account.
                  </p>
                </div>
              )}
            </div>

            <Button variant="ghost" size="icon" asChild className="text-white hover:bg-[#333333]" aria-label="Settings">
              <Link href="/settings">
                <Settings className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {isSearchActive ? (
          <div className="mt-4 flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search cards, transactions..."
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
                    aria-label="Filter cards"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                }
                width="w-48"
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
                    aria-label="Sort cards"
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Sort
                  </Button>
                }
                width="w-48"
              >
                {sortOptions.map((option) => (
                  <DropdownItem key={option.value} onClick={() => handleSortSelect(option.value)}>
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
                    aria-label="Select timeframe"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Time
                  </Button>
                }
                width="w-48"
              >
                {timeframeOptions.map((option) => (
                  <DropdownItem key={option.value} onClick={() => handleTimeframeSelect(option.value)}>
                    {option.label}
                  </DropdownItem>
                ))}
              </EnhancedDropdown>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="border-[#333333] text-white hover:bg-[#333333]"
              onClick={handleSearchToggle}
              aria-label="Search cards"
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        )}
      </header>

      <main className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <EnhancedAvatar
            src={avatarUrl || ""}
            alt="User profile"
            initials={initials}
            size="md"
            className="border-2 border-white shadow-md"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-gray-400">Your dashboard is ready</p>
          </div>
        </div>
        {isSearchActive && searchQuery ? (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Search Results for "{searchQuery}"</h2>

            {searchResults.cards.length === 0 &&
            searchResults.transactions.length === 0 &&
            searchResults.crypto.length === 0 ? (
              <AnimatedNetflixCard>
                <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                  <Search className="h-12 w-12 text-gray-600 mb-3" />
                  <h3 className="text-xl font-medium text-white">No results found</h3>
                  <p className="text-gray-400 mt-2">Try different keywords or check your spelling</p>
                </CardContent>
              </AnimatedNetflixCard>
            ) : (
              <>
                {searchResults.crypto.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-300 mb-3">Crypto ({searchResults.crypto.length})</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {searchResults.crypto.map((crypto, index) => (
                        <AnimatedNetflixCard key={crypto.id} delay={index * 0.1} hoverScale={1.03} hoverY={-5}>
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="mr-2 rounded-full p-2" style={{ backgroundColor: `${crypto.color}20` }}>
                                  <crypto.icon className="h-5 w-5" style={{ color: crypto.color }} />
                                </div>
                                <CardTitle className="text-white">{crypto.name}</CardTitle>
                              </div>
                              <EnhancedDropdown
                                trigger={
                                  <MoreHorizontal className="h-5 w-5 cursor-pointer text-gray-400 hover:text-white" />
                                }
                                align="right"
                                width="w-48"
                              >
                                <DropdownItem onClick={() => handleViewCryptoDetails(crypto.id)}>
                                  View Details
                                </DropdownItem>
                                <DropdownItem onClick={handleBuyCrypto}>Buy More</DropdownItem>
                                <DropdownItem onClick={handleSellCrypto}>Sell</DropdownItem>
                              </EnhancedDropdown>
                            </div>
                            <CardDescription className="text-gray-400">
                              {crypto.symbol} • ${crypto.price.toLocaleString()}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-400">Amount</p>
                                <p className="text-lg font-bold text-white">
                                  {crypto.amount} {crypto.symbol}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400">Value</p>
                                <p className="text-lg font-bold text-white">
                                  <CompactCurrencyDisplay amount={crypto.value} currency="USD" />
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400">24h</p>
                                <p
                                  className={`text-sm font-medium ${crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                                >
                                  {crypto.change24h >= 0 ? "+" : ""}
                                  {crypto.change24h}%
                                </p>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <InteractiveButton
                              variant="netflix"
                              size="sm"
                              className="w-full"
                              onClick={() => handleViewCryptoDetails(crypto.id)}
                              aria-label={`View details for ${crypto.name}`}
                            >
                              View Details
                            </InteractiveButton>
                          </CardFooter>
                        </AnimatedNetflixCard>
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.cards.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-md font-medium text-gray-300 mb-3">Cards ({searchResults.cards.length})</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {searchResults.cards.map((card, index) => (
                        <AnimatedNetflixCard key={card.id} delay={index * 0.1} hoverScale={1.03} hoverY={-5}>
                          <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-white">{card.name}</CardTitle>
                              <EnhancedDropdown
                                trigger={
                                  <MoreHorizontal className="h-5 w-5 cursor-pointer text-gray-400 hover:text-white" />
                                }
                                align="right"
                                width="w-48"
                              >
                                <DropdownItem onClick={() => handleConvertCard(card.name)}>
                                  Convert to Cash
                                </DropdownItem>
                                <DropdownItem onClick={() => handleViewCardDetails(card.id)}>View Details</DropdownItem>
                                <DropdownSeparator />
                                <DropdownItem onClick={() => handleDeleteCard(card.name)}>Delete Card</DropdownItem>
                              </EnhancedDropdown>
                            </div>
                            <CardDescription className="text-gray-400">
                              {card.type} •••• {card.lastFour}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-400">Balance</p>
                                <p className="text-2xl font-bold text-white">
                                  <CompactCurrencyDisplay amount={card.balance} currency="USD" />
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400">Expires</p>
                                <p className="text-sm text-white">{card.expiryDate}</p>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0">
                            <InteractiveButton
                              variant="netflix"
                              size="sm"
                              className="w-full"
                              onClick={() => handleConvertCard(card.name)}
                              aria-label={`Convert ${card.name} to cash`}
                            >
                              Convert Now
                            </InteractiveButton>
                          </CardFooter>
                        </AnimatedNetflixCard>
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.transactions.length > 0 && (
                  <div>
                    <h3 className="text-md font-medium text-gray-300 mb-3">
                      Transactions ({searchResults.transactions.length})
                    </h3>
                    <AnimatedNetflixCard>
                      <CardContent className="p-0">
                        <ul className="divide-y divide-[#333333]">
                          {searchResults.transactions.map((transaction) => (
                            <li
                              key={transaction.id}
                              className="flex items-center justify-between p-4 hover:bg-[rgba(51,51,51,0.5)] transition-colors cursor-pointer"
                              onClick={() => router.push(`/transactions/${transaction.id}`)}
                            >
                              <div className="flex items-center">
                                <div className="mr-4 rounded-full bg-[#333333] p-2">
                                  {transaction.type === "conversion" ? (
                                    <RefreshCw className="h-5 w-5 text-[#E50914]" />
                                  ) : (
                                    <ArrowUpRight className="h-5 w-5 text-green-500" />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-white">{transaction.description}</p>
                                  <div className="flex items-center text-xs text-gray-400">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {new Date(transaction.date).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-white">
                                  <CompactCurrencyDisplay amount={transaction.amount} currency="USD" />
                                </p>
                                <p className="text-xs text-green-500">Completed</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </AnimatedNetflixCard>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <>
            <section className="mb-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Your Balance</h2>
                <Link
                  href="/add-funds"
                  className="text-sm text-[#E50914] hover:underline"
                  aria-label="Add funds to your account"
                >
                  Add Funds
                </Link>
              </div>

              <AnimatedNetflixCard className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Balance</p>
                      <p className="text-3xl font-bold text-white">
                        <CompactCurrencyDisplay amount={425} currency="USD" />
                      </p>
                      <p className="mt-1 text-xs italic text-gray-400">
                        The Future of Your Finances, For a Borderless World
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <InteractiveButton
                        variant="netflix"
                        size="sm"
                        onClick={handleWithdraw}
                        aria-label="Withdraw funds"
                      >
                        <Wallet className="mr-2 h-4 w-4" />
                        Withdraw
                      </InteractiveButton>
                      <InteractiveButton
                        variant="outline"
                        size="sm"
                        className="border-[#333333] text-white hover:bg-[#333333]"
                        onClick={handleConvert}
                        aria-label="Convert funds"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Convert
                      </InteractiveButton>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm text-gray-400">Monthly Growth</p>
                      <Link
                        href="/monthly-growth"
                        className="flex items-center text-xs text-[#E50914] hover:underline"
                        aria-label="View monthly growth details"
                      >
                        View Details
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#333333]">
                      <div className="h-full w-[65%] bg-[#E50914] transition-all duration-1000"></div>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <p className="text-xs text-gray-400">
                        <CompactCurrencyDisplay amount={260} currency="USD" /> last month
                      </p>
                      <p className="text-xs font-medium text-[#E50914]">+65%</p>
                    </div>
                  </div>
                </CardContent>
              </AnimatedNetflixCard>
            </section>

            {/* Rewards Section */}
            <section className="mb-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Rewards & Referrals</h2>
                <div className="flex space-x-2">
                  <Link
                    href="/rewards"
                    className="text-sm text-[#E50914] hover:underline flex items-center"
                    aria-label="View rewards"
                  >
                    <Award className="mr-1 h-4 w-4" />
                    Rewards
                  </Link>
                  <Link
                    href="/referral"
                    className="text-sm text-[#E50914] hover:underline flex items-center"
                    aria-label="View referrals"
                  >
                    <Gift className="mr-1 h-4 w-4" />
                    Referrals
                  </Link>
                </div>
              </div>

              <AnimatedNetflixCard className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center">
                        <div className="mr-2 rounded-full bg-[#E50914] p-2">
                          <Award className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{rewardsData.tier} Member</p>
                          <p className="text-xs text-gray-400">{rewardsData.points} points</p>
                        </div>
                      </div>
                    </div>
                    <InteractiveButton
                      variant="netflix"
                      size="sm"
                      onClick={handleViewRewards}
                      aria-label="View rewards"
                    >
                      View Rewards
                    </InteractiveButton>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-400">Progress to {rewardsData.nextTier}</span>
                      <span className="text-white">{rewardsData.progress}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#333333] mb-3">
                      <div
                        className="h-full bg-[#E50914] transition-all duration-1000"
                        style={{ width: `${rewardsData.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">
                      {rewardsData.pointsToNextTier} more points needed for {rewardsData.nextTier}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {rewardsData.recentRewards.map((reward) => (
                      <div key={reward.id} className="border border-[#333333] rounded-lg p-3 flex items-center">
                        <div className="mr-3 rounded-full bg-[#333333] p-2">
                          {reward.icon === "percent" ? (
                            <RefreshCw className="h-4 w-4 text-[#E50914]" />
                          ) : (
                            <Gift className="h-4 w-4 text-[#E50914]" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{reward.name}</p>
                          <p className="text-xs text-gray-400">{reward.description}</p>
                          <p className="text-xs text-gray-500">
                            Expires: {new Date(reward.expires).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </AnimatedNetflixCard>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <PhoneCreditWidget />
              <CryptoDashboardWidget />
            </div>

            {/* Crypto Portfolio Section */}
            <section className="mb-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Crypto Portfolio</h2>
                <Link
                  href={AppRoutes.CRYPTO_PORTFOLIO}
                  className="text-sm text-[#E50914] hover:underline"
                  aria-label="View full crypto portfolio"
                >
                  View All
                </Link>
              </div>

              <AnimatedNetflixCard className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Portfolio Value</p>
                      <p className="text-2xl font-bold text-white">
                        <CompactCurrencyDisplay amount={3790.18} currency="USD" />
                      </p>
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
                        <ArrowUpDown className="mr-2 h-4 w-4" />
                        Sell
                      </InteractiveButton>
                    </div>
                  </div>

                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#333333] mb-1">
                    <div className="h-full w-[45%] bg-[#F7931A] transition-all duration-1000"></div>
                  </div>
                  <div className="flex items-center justify-between text-xs mb-4">
                    <p className="text-[#F7931A]">BTC 45%</p>
                    <p className="text-[#627EEA]">ETH 43%</p>
                    <p className="text-[#00FFA3]">SOL 12%</p>
                  </div>
                </CardContent>
              </AnimatedNetflixCard>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cryptoAssets.map((crypto, index) => (
                  <AnimatedNetflixCard key={crypto.id} delay={index * 0.1} hoverScale={1.03} hoverY={-5}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="mr-2 rounded-full p-2" style={{ backgroundColor: `${crypto.color}20` }}>
                            <crypto.icon className="h-5 w-5" style={{ color: crypto.color }} />
                          </div>
                          <CardTitle className="text-white">{crypto.name}</CardTitle>
                        </div>
                        <EnhancedDropdown
                          trigger={<MoreHorizontal className="h-5 w-5 cursor-pointer text-gray-400 hover:text-white" />}
                          align="right"
                          width="w-48"
                        >
                          <DropdownItem onClick={() => handleViewCryptoDetails(crypto.id)}>View Details</DropdownItem>
                          <DropdownItem onClick={handleBuyCrypto}>Buy More</DropdownItem>
                          <DropdownItem onClick={handleSellCrypto}>Sell</DropdownItem>
                        </EnhancedDropdown>
                      </div>
                      <CardDescription className="text-gray-400">
                        {crypto.symbol} • ${crypto.price.toLocaleString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Amount</p>
                          <p className="text-lg font-bold text-white">
                            {crypto.amount} {crypto.symbol}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Value</p>
                          <p className="text-lg font-bold text-white">
                            <CompactCurrencyDisplay amount={crypto.value} currency="USD" />
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">24h</p>
                          <p
                            className={`text-sm font-medium ${crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                          >
                            {crypto.change24h >= 0 ? "+" : ""}
                            {crypto.change24h}%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <InteractiveButton
                        variant="netflix"
                        size="sm"
                        className="w-full"
                        onClick={() => handleViewCryptoDetails(crypto.id)}
                        aria-label={`View details for ${crypto.name}`}
                      >
                        View Details
                      </InteractiveButton>
                    </CardFooter>
                  </AnimatedNetflixCard>
                ))}
              </div>
            </section>

            <section className="mb-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Your Cards</h2>
                <Link
                  href="/generate-card"
                  className="text-sm text-[#E50914] hover:underline"
                  aria-label="Add a new card"
                >
                  Add New Card
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCards.map((card, index) => (
                  <AnimatedNetflixCard key={card.id} delay={index * 0.1} hoverScale={1.03} hoverY={-5}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">{card.name}</CardTitle>
                        <EnhancedDropdown
                          trigger={<MoreHorizontal className="h-5 w-5 cursor-pointer text-gray-400 hover:text-white" />}
                          align="right"
                          width="w-48"
                        >
                          <DropdownItem onClick={() => handleConvertCard(card.name)}>Convert to Cash</DropdownItem>
                          <DropdownItem onClick={() => handleViewCardDetails(card.id)}>View Details</DropdownItem>
                          <DropdownSeparator />
                          <DropdownItem onClick={() => handleDeleteCard(card.name)}>Delete Card</DropdownItem>
                        </EnhancedDropdown>
                      </div>
                      <CardDescription className="text-gray-400">
                        {card.type} •••• {card.lastFour}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-400">Balance</p>
                          <p className="text-2xl font-bold text-white">
                            <CompactCurrencyDisplay amount={card.balance} currency="USD" />
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Expires</p>
                          <p className="text-sm text-white">{card.expiryDate}</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <InteractiveButton
                        variant="netflix"
                        size="sm"
                        className="w-full"
                        onClick={() => handleConvertCard(card.name)}
                        aria-label={`Convert ${card.name} to cash`}
                      >
                        Convert Now
                      </InteractiveButton>
                    </CardFooter>
                  </AnimatedNetflixCard>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
                <Link
                  href="/transactions"
                  className="text-sm text-[#E50914] hover:underline"
                  aria-label="View all transactions"
                >
                  View All
                </Link>
              </div>

              <AnimatedNetflixCard>
                <CardContent className="p-0">
                  <ul className="divide-y divide-[#333333]">
                    {filteredTransactions.map((transaction) => (
                      <li
                        key={transaction.id}
                        className="flex items-center justify-between p-4 hover:bg-[rgba(51,51,51,0.5)] transition-colors cursor-pointer"
                        onClick={() => router.push(`/transactions/${transaction.id}`)}
                      >
                        <div className="flex items-center">
                          <div className="mr-4 rounded-full bg-[#333333] p-2">
                            {transaction.type === "conversion" ? (
                              <RefreshCw className="h-5 w-5 text-[#E50914]" />
                            ) : (
                              <ArrowUpRight className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-white">{transaction.description}</p>
                            <div className="flex items-center text-xs text-gray-400">
                              <Clock className="mr-1 h-3 w-3" />
                              {new Date(transaction.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-white">
                            <CompactCurrencyDisplay amount={transaction.amount} currency="USD" />
                          </p>
                          <p className="text-xs text-green-500">Completed</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </AnimatedNetflixCard>
            </section>
          </>
        )}
      </main>

      {/* Update the component usage at the bottom of the return statement */}
      <EnhancedBottomNavigation />
    </div>
  )
}

