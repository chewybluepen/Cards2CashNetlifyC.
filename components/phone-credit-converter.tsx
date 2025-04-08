"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Phone, RefreshCw, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"
import { ProviderLogo } from "@/components/provider-logo"
import { ExchangeRateDisplay } from "@/components/exchange-rate-display"

// Mock data for phone credit providers
const providers = [
  {
    id: "rogers",
    name: "Rogers",
    country: "Canada",
    logo: "/providers/rogers.png",
    exchangeRate: 0.85,
    minAmount: 10,
    maxAmount: 500,
    processingFee: 0.02,
    processingTime: "1-2 hours",
  },
  {
    id: "bell",
    name: "Bell",
    country: "Canada",
    logo: "/providers/bell.png",
    exchangeRate: 0.83,
    minAmount: 15,
    maxAmount: 450,
    processingFee: 0.025,
    processingTime: "1-3 hours",
  },
  {
    id: "att",
    name: "AT&T",
    country: "USA",
    logo: "/providers/att.png",
    exchangeRate: 0.9,
    minAmount: 5,
    maxAmount: 1000,
    processingFee: 0.015,
    processingTime: "30 minutes",
  },
  {
    id: "verizon",
    name: "Verizon",
    country: "USA",
    logo: "/providers/verizon.png",
    exchangeRate: 0.88,
    minAmount: 10,
    maxAmount: 750,
    processingFee: 0.02,
    processingTime: "1 hour",
  },
]

interface PhoneCreditConverterProps {
  onSuccess?: (amount: number) => void
  compact?: boolean
}

export function PhoneCreditConverter({ onSuccess, compact = false }: PhoneCreditConverterProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>("")
  const [amount, setAmount] = useState<string>("50")
  const [convertedAmount, setConvertedAmount] = useState<number>(0)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [showRateDetails, setShowRateDetails] = useState<boolean>(false)

  // Calculate converted amount when provider or amount changes
  useEffect(() => {
    if (selectedProvider && amount) {
      const provider = providers.find((p) => p.id === selectedProvider)
      if (provider) {
        const amountValue = Number.parseFloat(amount)
        const converted = amountValue * provider.exchangeRate
        const fee = amountValue * provider.processingFee
        setConvertedAmount(converted - fee)
      }
    } else {
      setConvertedAmount(0)
    }
  }, [selectedProvider, amount])

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  const handleSliderChange = (value: number[]) => {
    setAmount(value[0].toString())
  }

  const handleConvert = () => {
    if (!selectedProvider) {
      toast({
        title: "Provider Required",
        description: "Please select a phone credit provider",
        variant: "destructive",
      })
      return
    }

    if (!amount || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to convert",
        variant: "destructive",
      })
      return
    }

    const provider = providers.find((p) => p.id === selectedProvider)
    if (!provider) return

    if (Number.parseFloat(amount) < provider.minAmount) {
      toast({
        title: "Amount Too Low",
        description: `Minimum amount for ${provider.name} is $${provider.minAmount}`,
        variant: "destructive",
      })
      return
    }

    if (Number.parseFloat(amount) > provider.maxAmount) {
      toast({
        title: "Amount Too High",
        description: `Maximum amount for ${provider.name} is $${provider.maxAmount}`,
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Conversion Successful",
        description: `$${Number.parseFloat(amount).toFixed(2)} from ${provider.name} has been converted to $${convertedAmount.toFixed(2)}`,
        variant: "default",
      })

      if (onSuccess) {
        onSuccess(convertedAmount)
      }
    }, 2000)
  }

  const getMaxSliderValue = () => {
    if (!selectedProvider) return 500
    const provider = providers.find((p) => p.id === selectedProvider)
    return provider ? provider.maxAmount : 500
  }

  return (
    <Card className={compact ? "bg-[#141414] border-[#333333]" : ""}>
      {!compact && (
        <CardHeader>
          <CardTitle className="text-white">Convert Phone Credit</CardTitle>
          <CardDescription className="text-gray-400">Convert your phone credit to digital funds</CardDescription>
        </CardHeader>
      )}
      <CardContent className={compact ? "p-3" : ""}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="provider" className="text-white">
              Select Provider
            </Label>
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger id="provider" className="bg-[#333333] border-[#444444] text-white">
                <SelectValue placeholder="Choose provider" />
              </SelectTrigger>
              <SelectContent className="bg-[#1F1F1F] border-[#444444] text-white">
                {providers.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    <div className="flex items-center">
                      <div className="mr-2 h-5 w-5 overflow-hidden rounded-full bg-white">
                        <ProviderLogo provider={provider.id} />
                      </div>
                      <span>{provider.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProvider && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-white">
                  Amount ($)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="amount"
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                    className="pl-9 bg-[#333333] border-[#444444] text-white"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-white">Adjust Amount</Label>
                  <span className="text-xs text-gray-400">
                    Min: ${providers.find((p) => p.id === selectedProvider)?.minAmount} | Max: $
                    {providers.find((p) => p.id === selectedProvider)?.maxAmount}
                  </span>
                </div>
                <Slider
                  defaultValue={[50]}
                  max={getMaxSliderValue()}
                  step={5}
                  value={[Number.parseFloat(amount) || 0]}
                  onValueChange={handleSliderChange}
                  className="py-4"
                />
              </div>

              {!compact && (
                <ExchangeRateDisplay
                  provider={providers.find((p) => p.id === selectedProvider)}
                  amount={Number.parseFloat(amount) || 0}
                  showDetails={showRateDetails}
                  onToggleDetails={() => setShowRateDetails(!showRateDetails)}
                />
              )}

              <div className="rounded-lg bg-[#1F1F1F] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">You'll receive:</span>
                  <span className="text-xl font-bold text-white">${convertedAmount.toFixed(2)}</span>
                </div>
                {!compact && (
                  <div className="mt-2 text-xs text-gray-500">
                    Estimated processing time: {providers.find((p) => p.id === selectedProvider)?.processingTime}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </CardContent>
      <CardFooter className={compact ? "p-3 pt-0" : ""}>
        <Button
          className="w-full bg-[#E50914] hover:bg-[#B81D24] text-white"
          onClick={handleConvert}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Phone className="mr-2 h-4 w-4" />
              Convert Now
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

