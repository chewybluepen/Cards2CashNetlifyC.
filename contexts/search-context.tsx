"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { debounce } from "@/lib/utils"

// Define the types for our search context
type SearchContextType = {
  isSearchOpen: boolean
  searchQuery: string
  searchResults: SearchResult[]
  searchCategory: string
  isLoading: boolean
  recentSearches: string[]
  openSearch: () => void
  closeSearch: () => void
  setSearchQuery: (query: string) => void
  performSearch: (query: string, category?: string) => void
  clearSearch: () => void
  setSearchCategory: (category: string) => void
  addToRecentSearches: (query: string) => void
  clearRecentSearches: () => void
}

// Define the search result type
export type SearchResult = {
  id: string
  title: string
  description: string
  category: string
  url: string
  icon?: React.ReactNode
  relevance?: number
}

// Create the context with default values
const SearchContext = createContext<SearchContextType>({
  isSearchOpen: false,
  searchQuery: "",
  searchResults: [],
  searchCategory: "all",
  isLoading: false,
  recentSearches: [],
  openSearch: () => {},
  closeSearch: () => {},
  setSearchQuery: () => {},
  performSearch: () => {},
  clearSearch: () => {},
  setSearchCategory: () => {},
  addToRecentSearches: () => {},
  clearRecentSearches: () => {},
})

// Maximum number of recent searches to store
const MAX_RECENT_SEARCHES = 5

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQueryState] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [searchCategory, setSearchCategoryState] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches")
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches))
    }
  }, [])

  // Save recent searches to localStorage when they change
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches))
  }, [recentSearches])

  // Close search when navigating to a new page
  useEffect(() => {
    setIsSearchOpen(false)
  }, [pathname])

  // Update search query from URL on mount and when URL changes
  useEffect(() => {
    const query = searchParams.get("q") || ""
    const category = searchParams.get("category") || "all"

    setSearchQueryState(query)
    setSearchCategoryState(category)

    if (query) {
      performSearch(query, category)
    }
  }, [searchParams])

  const openSearch = useCallback(() => {
    setIsSearchOpen(true)
  }, [])

  const closeSearch = useCallback(() => {
    setIsSearchOpen(false)
  }, [])

  const setSearchQuery = useCallback(
    (query: string) => {
      setSearchQueryState(query)
      debouncedSearch(query, searchCategory)
    },
    [searchCategory],
  )

  const setSearchCategory = useCallback(
    (category: string) => {
      setSearchCategoryState(category)
      if (searchQuery) {
        performSearch(searchQuery, category)
      }
    },
    [searchQuery],
  )

  const clearSearch = useCallback(() => {
    setSearchQueryState("")
    setSearchResults([])
    router.push(pathname)
  }, [pathname, router])

  const addToRecentSearches = useCallback((query: string) => {
    if (!query.trim()) return

    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== query.toLowerCase())
      return [query, ...filtered].slice(0, MAX_RECENT_SEARCHES)
    })
  }, [])

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([])
    localStorage.removeItem("recentSearches")
  }, [])

  // Mock search function - in a real app, this would call an API or search through indexed content
  const performSearch = useCallback(
    async (query: string, category = "all") => {
      if (!query.trim()) {
        setSearchResults([])
        return
      }

      setIsLoading(true)

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Add to recent searches
        addToRecentSearches(query)

        // Update URL with search params
        const params = new URLSearchParams(searchParams)
        params.set("q", query)
        params.set("category", category)
        router.push(`/search?${params.toString()}`)

        // Mock search results based on query and category
        const results = mockSearchResults(query, category)
        setSearchResults(results)
      } catch (error) {
        console.error("Search error:", error)
        setSearchResults([])
      } finally {
        setIsLoading(false)
      }
    },
    [addToRecentSearches, router, searchParams],
  )

  // Debounced search to avoid too many searches while typing
  const debouncedSearch = useCallback(
    debounce((query: string, category: string) => {
      if (query.trim()) {
        performSearch(query, category)
      } else {
        setSearchResults([])
      }
    }, 300),
    [],
  )

  const value = {
    isSearchOpen,
    searchQuery,
    searchResults,
    searchCategory,
    isLoading,
    recentSearches,
    openSearch,
    closeSearch,
    setSearchQuery,
    performSearch,
    clearSearch,
    setSearchCategory,
    addToRecentSearches,
    clearRecentSearches,
  }

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export const useSearch = () => useContext(SearchContext)

// Mock search results function
function mockSearchResults(query: string, category = "all"): SearchResult[] {
  const lowerQuery = query.toLowerCase()

  // Mock data sources
  const allResults: SearchResult[] = [
    // Transactions
    {
      id: "transaction-1",
      title: "Transaction History",
      description: "View all your past transactions and payment history",
      category: "transactions",
      url: "/transactions",
      relevance: 0,
    },
    {
      id: "transaction-2",
      title: "Recent Transactions",
      description: "View your most recent transactions",
      category: "transactions",
      url: "/transactions",
      relevance: 0,
    },

    // Crypto
    {
      id: "crypto-1",
      title: "Crypto Portfolio",
      description: "View and manage your cryptocurrency investments",
      category: "crypto",
      url: "/crypto/portfolio",
      relevance: 0,
    },
    {
      id: "crypto-2",
      title: "Buy Cryptocurrency",
      description: "Purchase Bitcoin, Ethereum, and other cryptocurrencies",
      category: "crypto",
      url: "/crypto/buy",
      relevance: 0,
    },
    {
      id: "crypto-3",
      title: "Sell Cryptocurrency",
      description: "Sell your cryptocurrency holdings",
      category: "crypto",
      url: "/crypto/sell",
      relevance: 0,
    },

    // Cards
    {
      id: "cards-1",
      title: "Virtual Cards",
      description: "Manage your virtual payment cards",
      category: "cards",
      url: "/generate-card",
      relevance: 0,
    },
    {
      id: "cards-2",
      title: "Generate New Card",
      description: "Create a new virtual payment card",
      category: "cards",
      url: "/generate-card",
      relevance: 0,
    },

    // Profile & Settings
    {
      id: "profile-1",
      title: "Profile Settings",
      description: "Update your personal information and preferences",
      category: "profile",
      url: "/profile",
      relevance: 0,
    },
    {
      id: "profile-2",
      title: "Security Settings",
      description: "Manage your account security and privacy",
      category: "profile",
      url: "/settings",
      relevance: 0,
    },
    {
      id: "profile-3",
      title: "Change Password",
      description: "Update your account password",
      category: "profile",
      url: "/change-password",
      relevance: 0,
    },

    // Help & Support
    {
      id: "help-1",
      title: "Help Center",
      description: "Find answers to common questions and get support",
      category: "help",
      url: "/help",
      relevance: 0,
    },
    {
      id: "help-2",
      title: "Frequently Asked Questions",
      description: "Browse our FAQ for quick answers",
      category: "help",
      url: "/help/faq",
      relevance: 0,
    },
    {
      id: "help-3",
      title: "Contact Support",
      description: "Get in touch with our customer service team",
      category: "help",
      url: "/help/contact",
      relevance: 0,
    },

    // Add Funds
    {
      id: "funds-1",
      title: "Add Funds",
      description: "Add money to your account using prepaid vouchers",
      category: "funds",
      url: "/add-funds",
      relevance: 0,
    },
    {
      id: "funds-2",
      title: "Add Funds History",
      description: "View your history of adding funds to your account",
      category: "funds",
      url: "/add-funds/history",
      relevance: 0,
    },

    // Convert
    {
      id: "convert-1",
      title: "Currency Conversion",
      description: "Convert between different currencies",
      category: "convert",
      url: "/convert",
      relevance: 0,
    },
    {
      id: "convert-2",
      title: "Conversion History",
      description: "View your past currency conversions",
      category: "convert",
      url: "/convert/history",
      relevance: 0,
    },

    // Phone Credit
    {
      id: "phone-1",
      title: "Phone Credit",
      description: "Convert phone credit to digital currency",
      category: "phone",
      url: "/phone-credit",
      relevance: 0,
    },
    {
      id: "phone-2",
      title: "Phone Credit History",
      description: "View your history of phone credit conversions",
      category: "phone",
      url: "/phone-credit/history",
      relevance: 0,
    },

    // Rewards & Referrals
    {
      id: "rewards-1",
      title: "Rewards Program",
      description: "View and redeem your rewards",
      category: "rewards",
      url: "/rewards",
      relevance: 0,
    },
    {
      id: "rewards-2",
      title: "Referral Program",
      description: "Refer friends and earn rewards",
      category: "rewards",
      url: "/referral",
      relevance: 0,
    },
  ]

  // Calculate relevance score for each result based on query match
  const scoredResults = allResults.map((result) => {
    let score = 0

    // Title match (highest weight)
    if (result.title.toLowerCase().includes(lowerQuery)) {
      score += 10
      // Exact title match or starts with query
      if (result.title.toLowerCase() === lowerQuery || result.title.toLowerCase().startsWith(lowerQuery + " ")) {
        score += 5
      }
    }

    // Description match (medium weight)
    if (result.description.toLowerCase().includes(lowerQuery)) {
      score += 5
    }

    // Category match (low weight)
    if (result.category.toLowerCase().includes(lowerQuery)) {
      score += 3
    }

    // URL match (low weight)
    if (result.url.toLowerCase().includes(lowerQuery)) {
      score += 2
    }

    return {
      ...result,
      relevance: score,
    }
  })

  // Filter by category if specified
  const filteredResults =
    category === "all" ? scoredResults : scoredResults.filter((result) => result.category === category)

  // Filter out zero-relevance results and sort by relevance
  return filteredResults.filter((result) => result.relevance > 0).sort((a, b) => b.relevance! - a.relevance!)
}

