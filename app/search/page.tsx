"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  SearchIcon,
  ArrowLeft,
  CreditCard,
  RefreshCw,
  Wallet,
  User,
  HelpCircle,
  Plus,
  Phone,
  Award,
  FileText,
} from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useSearch, type SearchResult } from "@/contexts/search-context"
import { motion } from "framer-motion"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const { searchQuery, searchResults, searchCategory, isLoading, setSearchQuery, performSearch, setSearchCategory } =
    useSearch()

  const [localQuery, setLocalQuery] = useState("")

  // Initialize from URL params
  useEffect(() => {
    const query = searchParams.get("q") || ""
    setLocalQuery(query)

    if (query && query !== searchQuery) {
      setSearchQuery(query)
    }
  }, [searchParams, searchQuery, setSearchQuery])

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (localQuery.trim()) {
      setSearchQuery(localQuery)
      performSearch(localQuery, searchCategory)
    }
  }

  // Get category counts for tabs
  const getCategoryCounts = () => {
    const counts: Record<string, number> = { all: searchResults.length }

    searchResults.forEach((result) => {
      if (!counts[result.category]) {
        counts[result.category] = 0
      }
      counts[result.category]++
    })

    return counts
  }

  const categoryCounts = getCategoryCounts()

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cards":
        return <CreditCard className="h-5 w-5" />
      case "crypto":
        return <Wallet className="h-5 w-5" />
      case "convert":
        return <RefreshCw className="h-5 w-5" />
      case "profile":
        return <User className="h-5 w-5" />
      case "help":
        return <HelpCircle className="h-5 w-5" />
      case "funds":
        return <Plus className="h-5 w-5" />
      case "phone":
        return <Phone className="h-5 w-5" />
      case "rewards":
        return <Award className="h-5 w-5" />
      case "transactions":
        return <FileText className="h-5 w-5" />
      default:
        return <SearchIcon className="h-5 w-5" />
    }
  }

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
          <h1 className="text-lg font-semibold">Search Results</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search for anything..."
              className="pl-10"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Category tabs */}
        <div className="mb-4 overflow-x-auto pb-2">
          <Tabs value={searchCategory} onValueChange={setSearchCategory} className="w-full">
            <TabsList className="inline-flex w-auto">
              <TabsTrigger value="all" className="px-3 py-1.5">
                All ({categoryCounts.all || 0})
              </TabsTrigger>
              {Object.keys(categoryCounts)
                .filter((cat) => cat !== "all" && categoryCounts[cat] > 0)
                .sort()
                .map((category) => (
                  <TabsTrigger key={category} value={category} className="px-3 py-1.5 capitalize">
                    {category} ({categoryCounts[category]})
                  </TabsTrigger>
                ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Search results */}
        <div className="space-y-3">
          {isLoading ? (
            // Loading state
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4">
                      <div className="h-5 bg-gray-200 rounded w-2/3 mb-2 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            // Results found
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {searchResults.map((result, index) => (
                <SearchResultItem key={result.id} result={result} query={searchQuery} index={index} />
              ))}
            </motion.div>
          ) : searchQuery ? (
            // No results found
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center py-8"
            >
              <SearchIcon className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <h2 className="text-xl font-semibold mb-1">No results found</h2>
              <p className="text-gray-500 mb-4">We couldn't find anything matching "{searchQuery}"</p>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Suggestions:</p>
                <ul className="text-sm text-gray-500 list-disc list-inside">
                  <li>Check your spelling</li>
                  <li>Try more general keywords</li>
                  <li>Try different keywords</li>
                  <li>Browse categories using the tabs above</li>
                </ul>
              </div>
            </motion.div>
          ) : (
            // Initial state (no query entered)
            <div className="text-center py-8">
              <SearchIcon className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              <h2 className="text-lg font-medium mb-1">Search for something</h2>
              <p className="text-gray-500">Enter keywords to find what you're looking for</p>
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

// Component to display a search result with highlighted query terms
function SearchResultItem({
  result,
  query,
  index,
}: {
  result: SearchResult
  query: string
  index: number
}) {
  // Highlight matching text in a string
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 text-black px-0.5 rounded-sm">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  // Animation delay based on index
  const delay = 0.05 * index

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay }}>
      <Link href={result.url}>
        <Card className="overflow-hidden hover:bg-gray-50 transition-colors">
          <CardContent className="p-0">
            <div className="p-4 flex items-start gap-3">
              <div className="rounded-full bg-blue-100 p-2 flex-shrink-0">
                {result.icon || getCategoryIcon(result.category)}
              </div>
              <div>
                <h3 className="font-medium mb-1">{highlightText(result.title, query)}</h3>
                <p className="text-sm text-gray-500">{highlightText(result.description, query)}</p>
                <div className="mt-1 flex items-center">
                  <span className="text-xs text-gray-400 capitalize bg-gray-100 px-2 py-0.5 rounded-full">
                    {result.category}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}

function getCategoryIcon(category: string) {
  switch (category) {
    case "cards":
      return <CreditCard className="h-4 w-4 text-blue-600" />
    case "crypto":
      return <Wallet className="h-4 w-4 text-purple-600" />
    case "convert":
      return <RefreshCw className="h-4 w-4 text-green-600" />
    case "profile":
      return <User className="h-4 w-4 text-orange-600" />
    case "help":
      return <HelpCircle className="h-4 w-4 text-red-600" />
    case "funds":
      return <Plus className="h-4 w-4 text-emerald-600" />
    case "phone":
      return <Phone className="h-4 w-4 text-indigo-600" />
    case "rewards":
      return <Award className="h-4 w-4 text-amber-600" />
    case "transactions":
      return <FileText className="h-4 w-4 text-gray-600" />
    default:
      return <SearchIcon className="h-4 w-4 text-gray-600" />
  }
}

