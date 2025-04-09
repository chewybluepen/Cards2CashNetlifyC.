"use client"

import React, { useState, useEffect, ChangeEvent } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowDown, ArrowLeft, ChevronDown, History, Search } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { currencies } from "@/lib/currency-data"
import { NetflixDropdown, NetflixDropdownItem } from "@/components/ui/netflix-dropdown"
import { SocialMediaIcons } from "@/components/social-media-icons"
import { CompactCurrencyDisplay } from "@/components/ui/currency-display"

// Define currency interface (adjust based on your actual currency-data)
interface Currency {
  code: string;
  name: string;
  flag: string;
}

const ConvertPage: React.FC = () => {
  const [amount, setAmount] = useState<string>("100")
  const [fromCurrency, setFromCurrency] = useState<string>("USD")
  const [toCurrency, setToCurrency] = useState<string>("EUR")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [dropdownOpen, setDropdownOpen] = useState<"from" | "to" | null>(null)
  const [convertedAmount, setConvertedAmount] = useState<string>("0")

  const filteredCurrencies = currencies.filter(
    (currency: Currency) =>
      currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const exchangeRates: Record<string, Record<string, number>> = {
    USD: {
      EUR: 0.85,
      GBP: 0.75,
      JPY: 110.2,
      AUD: 1.35,
      CAD: 1.25,
      CHF: 0.92,
      CNY: 6.45,
      INR: 74.5,
      BRL: 5.2,
      RUB: 73.5,
    },
    EUR: {
      USD: 1.18,
      GBP: 0.88,
      JPY: 130.0,
      AUD: 1.59,
      CAD: 1.47,
      CHF: 1.08,
      CNY: 7.6,
      INR: 87.8,
      BRL: 6.13,
      RUB: 86.7,
    },
  }

  useEffect(() => {
    const numAmount = Number.parseFloat(amount) || 0

    if (exchangeRates[fromCurrency]?.[toCurrency]) {
      const rate = exchangeRates[fromCurrency][toCurrency]
      setConvertedAmount((numAmount * rate).toFixed(2))
    } else if (fromCurrency !== "USD" && toCurrency !== "USD") {
      const toUSD = exchangeRates[fromCurrency]?.["USD"] || 1 / (exchangeRates["USD"]?.[fromCurrency] || 1)
      const fromUSD = exchangeRates["USD"]?.[toCurrency] || 1 / (exchangeRates[toCurrency]?.["USD"] || 1)
      setConvertedAmount((numAmount * toUSD * fromUSD).toFixed(2))
    } else {
      setConvertedAmount(numAmount.toFixed(2))
    }
  }, [amount, fromCurrency, toCurrency])

  const handleSwapCurrencies = (): void => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const getCurrencyByCode = (code: string): Currency => {
    return currencies.find((currency: Currency) => currency.code === code) || currencies[0]
  }

  const fromCurrencyData = getCurrencyByCode(fromCurrency)
  const toCurrencyData = getCurrencyByCode(toCurrency)

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.target.value)
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#000000] pt-16 pb-20">
      <main className="flex-1 p-4">
        <div className="mb-6">
          <Button variant="ghost" size="icon" asChild className="mb-4 text-[#B3B3B3] hover:text-white">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-white mb-2">Currency Converter</h1>
          <p className="text-[#B3B3B3]">Convert between any currencies in the world</p>
        </div>

        <Card className="bg-[#141414] border-[#333333] mb-6">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* From Currency */}
              <div>
                <Label htmlFor="amount" className="text-[#B3B3B3] mb-2 block">
                  Amount
                </Label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <div className="absolute left-0 top-0 z-10">
                      <NetflixDropdown
                        trigger={
                          <button
                            type="button"
                            className="h-10 px-3 flex items-center space-x-1 text-white bg-[#333333] rounded-l-md border-r border-[#444444]"
                          >
                            <span className="text-lg">{fromCurrencyData.flag}</span>
                            <span>{fromCurrencyData.code}</span>
                            <ChevronDown className="h-4 w-4 text-[#B3B3B3]" />
                          </button>
                        }
                        align="left"
                        width="w-72"
                      >
                        <div className="p-3">
                          <div className="relative mb-3">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#777777]" />
                            <Input
                              placeholder="Search currencies..."
                              value={searchQuery}
                              onChange={handleSearchChange}
                              className="pl-10 bg-[#333333] border-[#444444] text-white placeholder:text-[#777777]"
                            />
                          </div>
                          <div className="max-h-60 overflow-y-auto">
                            {filteredCurrencies.map((currency: Currency) => (
                              <NetflixDropdownItem
                                key={currency.code}
                                onClick={() => {
                                  setFromCurrency(currency.code)
                                  setSearchQuery("")
                                }}
                                className={fromCurrency === currency.code ? "bg-[#E50914] hover:bg-[#E50914]" : ""}
                              >
                                <div className="flex items-center">
                                  <span className="text-lg mr-3">{currency.flag}</span>
                                  <div>
                                    <div>{currency.code}</div>
                                    <div className="text-xs text-[#B3B3B3]">{currency.name}</div>
                                  </div>
                                </div>
                              </NetflixDropdownItem>
                            ))}
                          </div>
                        </div>
                      </NetflixDropdown>
                    </div>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={handleAmountChange}
                      className="pl-24 bg-[#333333] border-[#444444] text-white h-10"
                    />
                  </div>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSwapCurrencies}
                  className="rounded-full bg-[#333333] hover:bg-[#444444] text-white h-10 w-10"
                >
                  <ArrowDown className="h-5 w-5" />
                  <span className="sr-only">Swap currencies</span>
                </Button>
              </div>

              {/* To Currency */}
              <div>
                <Label htmlFor="convertedAmount" className="text-[#B3B3B3] mb-2 block">
                  Converted Amount
                </Label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <div className="absolute left-0 top-0 z-10">
                      <NetflixDropdown
                        trigger={
                          <button
                            type="button"
                            className="h-10 px-3 flex items-center space-x-1 text-white bg-[#333333] rounded-l-md border-r border-[#444444]"
                          >
                            <span className="text-lg">{toCurrencyData.flag}</span>
                            <span>{toCurrencyData.code}</span>
                            <ChevronDown className="h-4 w-4 text-[#B3B3B3]" />
                          </button>
                        }
                        align="left"
                        width="w-72"
                      >
                        <div className="p-3">
                          <div className="relative mb-3">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#777777]" />
                            <Input
                              placeholder="Search currencies..."
                              value={searchQuery}
                              onChange={handleSearchChange}
                              className="pl-10 bg-[#333333] border-[#444444] text-white placeholder:text-[#777777]"
                            />
                          </div>
                          <div className="max-h-60 overflow-y-auto">
                            {filteredCurrencies.map((currency: Currency) => (
                              <NetflixDropdownItem
                                key={currency.code}
                                onClick={() => {
                                  setToCurrency(currency.code)
                                  setSearchQuery("")
                                }}
                                className={toCurrency === currency.code ? "bg-[#E50914] hover:bg-[#E50914]" : ""}
                              >
                                <div className="flex items-center">
                                  <span className="text-lg mr-3">{currency.flag}</span>
                                  <div>
                                    <div>{currency.code}</div>
                                    <div className="text-xs text-[#B3B3B3]">{currency.name}</div>
                                  </div>
                                </div>
                              </NetflixDropdownItem>
                            ))}
                          </div>
                        </div>
                      </NetflixDropdown>
                    </div>
                    <Input
                      id="convertedAmount"
                      readOnly
                      value={convertedAmount}
                      className="pl-24 bg-[#333333] border-[#444444] text-white h-10"
                    />
                  </div>
                  <div className="text-white whitespace-nowrap">
                    <CompactCurrencyDisplay
                      amount={Number(convertedAmount)}
                      currency={toCurrency}
                      options={{ style: "code" }}
                    />
                  </div>
                </div>
              </div>

              {/* Exchange Rate Info */}
              <div className="text-center text-[#B3B3B3] text-sm mt-4 pt-2 border-t border-[#333333]">
                <p>
                  1 {fromCurrencyData.code} ={" "}
                  <CompactCurrencyDisplay
                    amount={
                      exchangeRates[fromCurrency]?.[toCurrency] ||
                      (fromCurrency !== "USD" && toCurrency !== "USD"
                        ? (exchangeRates[fromCurrency]?.["USD"] || 1 / (exchangeRates["USD"]?.[fromCurrency] || 1)) *
                          (exchangeRates["USD"]?.[toCurrency] || 1 / (exchangeRates[toCurrency]?.["USD"] || 1))
                        : 1.0)
                    }
                    currency={toCurrencyData.code}
                    options={{ style: "code", decimalPlaces: 4 }}
                  />
                </p>
                <p className="mt-2">Last updated: March 27, 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Button className="bg-[#E50914] hover:bg-[#B81D24] text-white h-12" asChild>
            <Link href="/convert/history">
              <History className="mr-3 h-5 w-5" />
              Conversion History
            </Link>
          </Button>

          <Button variant="outline" className="border-[#333333] text-white hover:bg-[#333333] h-12" asChild>
            <Link href="/convert/currency-details">View All Exchange Rates</Link>
          </Button>
        </div>

        <Card className="bg-[#141414] border-[#333333]">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Share with Friends</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <SocialMediaIcons showLabels className="justify-center" />
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  )
}

export default ConvertPage
