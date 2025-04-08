"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Phone, ChevronRight, Flag } from "lucide-react"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatedNetflixCard } from "@/components/ui/animated-netflix-card"
import { InteractiveButton } from "@/components/ui/interactive-button"
import { ProviderLogo } from "@/components/provider-logo"
import { AppRoutes } from "@/lib/navigation"

// Guyanese providers for quick access
const guyaneseProviders = [
  { id: "gtt", name: "GTT", exchangeRate: 0.0048 },
  { id: "digicel", name: "Digicel", exchangeRate: 0.0047 },
  { id: "enetworks", name: "E-Networks", exchangeRate: 0.0046 },
  { id: "greenict", name: "Green ICT", exchangeRate: 0.0045 },
]

export function PhoneCreditWidget() {
  const router = useRouter()
  const [selectedProvider, setSelectedProvider] = useState<string>("")
  const [amount, setAmount] = useState<string>("5000")
  const [convertedAmount, setConvertedAmount] = useState<number>(0)

  const handleProviderChange = (value: string) => {
    setSelectedProvider(value)
    calculateConversion(value, amount)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value)
      calculateConversion(selectedProvider, value)
    }
  }

  const calculateConversion = (providerId: string, amountStr: string) => {
    if (!providerId || !amountStr) {
      setConvertedAmount(0)
      return
    }

    const provider = guyaneseProviders.find((p) => p.id === providerId)
    if (!provider) {
      setConvertedAmount(0)
      return
    }

    const amountValue = Number.parseFloat(amountStr)
    if (isNaN(amountValue)) {
      setConvertedAmount(0)
      return
    }

    const converted = amountValue * provider.exchangeRate
    const fee = amountValue * 0.02 * provider.exchangeRate // Assuming 2% fee
    setConvertedAmount(converted - fee)
  }

  const handleQuickConvert = () => {
    if (!selectedProvider || !amount) {
      router.push(AppRoutes.PHONE_CREDIT)
      return
    }

    router.push(`/phone-credit?provider=${selectedProvider}&amount=${amount}`)
  }

  return (
    <AnimatedNetflixCard>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-2 rounded-full bg-[#E50914]/20 p-1">
              <Phone className="h-5 w-5 text-[#E50914]" />
            </div>
            <CardTitle className="text-white">Guyanese Phone Credit</CardTitle>
          </div>
          <Link href={AppRoutes.PHONE_CREDIT} className="text-xs text-[#E50914] hover:underline flex items-center">
            View All
            <ChevronRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
        <CardDescription className="text-gray-400 flex items-center mt-1">
          <Flag className="h-3 w-3 mr-1 text-[#E50914]" />
          Convert your Guyanese phone credit to USD
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="provider" className="text-white text-xs">
            Select Provider
          </Label>
          <Select value={selectedProvider} onValueChange={handleProviderChange}>
            <SelectTrigger id="provider" className="bg-[#333333] border-[#444444] text-white">
              <SelectValue placeholder="Choose provider" />
            </SelectTrigger>
            <SelectContent className="bg-[#1F1F1F] border-[#444444] text-white">
              {guyaneseProviders.map((provider) => (
                <SelectItem key={provider.id} value={provider.id}>
                  <div className="flex items-center">
                    <div className="mr-2 h-5 w-5 overflow-hidden rounded-full bg-white">
                      <ProviderLogo provider={provider.id} size={20} />
                    </div>
                    {provider.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedProvider && (
          <div className="flex items-center mb-2">
            <div className="mr-2 h-8 w-8 overflow-hidden rounded-full bg-white p-1 shadow-sm">
              <ProviderLogo provider={selectedProvider} size={24} />
            </div>
            <span className="text-sm font-medium text-white">
              {guyaneseProviders.find((p) => p.id === selectedProvider)?.name} Credit
            </span>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="amount" className="text-white text-xs">
            Amount (GYD)
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">GYD</div>
            <Input
              id="amount"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="pl-12 bg-[#333333] border-[#444444] text-white"
              placeholder="Enter amount"
            />
          </div>
        </div>

        {selectedProvider && (
          <div className="rounded-lg bg-[#1F1F1F] p-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">You'll receive:</span>
              <span className="text-lg font-bold text-white">${convertedAmount.toFixed(2)} USD</span>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              Rate: 1 GYD = $
              {guyaneseProviders.find((p) => p.id === selectedProvider)?.exchangeRate.toFixed(4) || "0.0000"} USD
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <InteractiveButton variant="netflix" size="sm" className="w-full" onClick={handleQuickConvert}>
          {selectedProvider ? "Quick Convert" : "Start Converting"}
        </InteractiveButton>
      </CardFooter>
    </AnimatedNetflixCard>
  )
}

