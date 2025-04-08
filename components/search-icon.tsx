"use client"

import { Search } from "lucide-react"
import { useSearch } from "@/contexts/search-context"

export function SearchIcon() {
  const { openSearch } = useSearch()

  return (
    <button
      onClick={openSearch}
      className="flex flex-col items-center justify-center px-2 space-y-1 text-gray-500 hover:text-gray-300"
      aria-label="Search"
    >
      <div className="flex items-center justify-center">
        <Search className="h-5 w-5" />
      </div>
      <span className="block w-full text-center text-xs font-medium">Search</span>
    </button>
  )
}

