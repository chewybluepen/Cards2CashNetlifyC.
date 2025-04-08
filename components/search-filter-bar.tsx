"use client"

import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SearchFilterBarProps {
  onSearch: (query: string) => void
  onFilterCurrency: (currency: string) => void
}

export function SearchFilterBar({ onSearch, onFilterCurrency }: SearchFilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCurrency, setSelectedCurrency] = useState("")

  const currencies = [
    { code: "", name: "All Currencies" },
    { code: "GYD", name: "Guyanese Dollar (GYD)" },
    { code: "USD", name: "US Dollar (USD)" },
    { code: "CAD", name: "Canadian Dollar (CAD)" },
    { code: "GBP", name: "British Pound (GBP)" },
    { code: "EUR", name: "Euro (EUR)" },
    { code: "INR", name: "Indian Rupee (INR)" },
  ]

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchQuery)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchQuery, onSearch])

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(value)
    onFilterCurrency(value)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search carriers by name or country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={18} />
            <span className="hidden sm:inline">Filter</span>
            {selectedCurrency && (
              <span className="bg-primary/10 text-primary text-xs py-0.5 px-2 rounded-full">{selectedCurrency}</span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Filter by Currency</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={selectedCurrency} onValueChange={handleCurrencyChange}>
            {currencies.map((currency) => (
              <DropdownMenuRadioItem key={currency.code} value={currency.code}>
                {currency.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

