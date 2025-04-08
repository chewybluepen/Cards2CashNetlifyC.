"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { SearchIcon, X, ArrowRight, Clock, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearch } from "@/contexts/search-context"
import { useOnClickOutside } from "@/hooks/use-click-outside"

export function GlobalSearch() {
  const {
    isSearchOpen,
    searchQuery,
    recentSearches,
    openSearch,
    closeSearch,
    setSearchQuery,
    performSearch,
    clearSearch,
    clearRecentSearches,
  } = useSearch()

  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isSearchOpen])

  // Close search when clicking outside
  useOnClickOutside(searchRef, closeSearch)

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performSearch(searchQuery)
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  // Handle recent search click
  const handleRecentSearchClick = (query: string) => {
    setSearchQuery(query)
    performSearch(query)
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <>
      {/* Search trigger button */}
      <Button
        variant="ghost"
        size="icon"
        className="text-[#B3B3B3] hover:text-white transition-colors"
        onClick={openSearch}
        aria-label="Search"
      >
        <SearchIcon className="h-5 w-5" />
      </Button>

      {/* Search overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            aria-hidden="true"
          >
            <div className="container mx-auto px-4 pt-16 sm:pt-24">
              <motion.div
                ref={searchRef}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-[#141414] border border-[#333333] rounded-lg shadow-xl max-w-2xl mx-auto overflow-hidden"
              >
                <div className="p-4">
                  <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <SearchIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <Input
                      ref={inputRef}
                      type="search"
                      placeholder="Search for anything..."
                      className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-gray-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-white"
                        onClick={() => clearSearch()}
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </form>
                </div>

                {/* Recent searches */}
                {recentSearches.length > 0 && !searchQuery && (
                  <div className="border-t border-[#333333] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-300">Recent Searches</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-gray-400 hover:text-white"
                        onClick={clearRecentSearches}
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Clear
                      </Button>
                    </div>
                    <ul className="space-y-1">
                      {recentSearches.map((query, index) => (
                        <li key={index}>
                          <button
                            type="button"
                            className="w-full text-left px-2 py-1.5 rounded-md flex items-center text-gray-300 hover:bg-[#333333] transition-colors"
                            onClick={() => handleRecentSearchClick(query)}
                          >
                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm truncate">{query}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Quick links */}
                {!searchQuery && (
                  <div className="border-t border-[#333333] p-4">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">Quick Links</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <QuickLink title="Transactions" href="/transactions" />
                      <QuickLink title="Crypto Portfolio" href="/crypto/portfolio" />
                      <QuickLink title="Add Funds" href="/add-funds" />
                      <QuickLink title="Virtual Cards" href="/generate-card" />
                    </div>
                  </div>
                )}

                {/* Search in progress hint */}
                {searchQuery && (
                  <div className="border-t border-[#333333] p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">Press Enter to search for "{searchQuery}"</p>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-gray-300 hover:text-white"
                        onClick={handleSubmit}
                      >
                        Search
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function QuickLink({ title, href }: { title: string; href: string }) {
  const router = useRouter()
  const { closeSearch } = useSearch()

  const handleClick = () => {
    closeSearch()
    router.push(href)
  }

  return (
    <button
      type="button"
      className="flex items-center justify-between p-2 rounded-md bg-[#1E1E1E] hover:bg-[#333333] transition-colors"
      onClick={handleClick}
    >
      <span className="text-sm text-gray-300">{title}</span>
      <ArrowRight className="h-3 w-3 text-gray-400" />
    </button>
  )
}

