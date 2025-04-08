"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Bitcoin, Coins, ChevronRight, CreditCard, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { AnimatedNetflixCard } from "@/components/ui/animated-netflix-card"
import { InteractiveButton } from "@/components/ui/interactive-button"
import { EnhancedBottomNavigation } from "@/components/enhanced-bottom-navigation"
import { Input } from "@/components/ui/input"
import { ProgressTracker } from "@/components/ui/progress-tracker"
import { AppRoutes, navigateTo, goBack } from "@/lib/navigation"
import { toast } from "@/components/ui/use-toast"
import { CryptoNavigation } from "@/components/crypto-navigation"

// Mock crypto data
const cryptoOptions = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 68432.51,
    change24h: 2.34,
    icon: Bitcoin,
    color: "#F7931A",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 3245.78,
    change24h: -1.25,
    icon: Coins,
    color: "#627EEA",
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 142.65,
    change24h: 5.67,
    icon: Coins,
    color: "#00FFA3",
  },
]

// Mock payment methods
const paymentMethods = [
  {
    id: "card1",
    type: "card",
    name: "Visa •••• 4582",
    balance: 1500,
    icon: CreditCard,
  },
  {
    id: "card2",
    type: "card",
    name: "Mastercard •••• 9371",
    balance: 2500,
    icon: CreditCard,
  },
  {
    id: "wallet",
    type: "wallet",
    name: "Cash Balance",
    balance: 425,
    icon: Wallet,
  },
]

export default function CryptoBuyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialCoinId = searchParams.get("coin")

  const [step, setStep] = useState(1)
  const [selectedCrypto, setSelectedCrypto] = useState<(typeof cryptoOptions)[0] | null>(null)
  const [amount, setAmount] = useState("")
  const [cryptoAmount, setCryptoAmount] = useState("")
  const [selectedPayment, setSelectedPayment] = useState<(typeof paymentMethods)[0] | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Set initial crypto if provided in URL
  useEffect(() => {
    if (initialCoinId) {
      const crypto = cryptoOptions.find((c) => c.id === initialCoinId)
      if (crypto) {
        setSelectedCrypto(crypto)
        setStep(2)
      }
    }
  }, [initialCoinId])

  // Calculate crypto amount when dollar amount changes
  useEffect(() => {
    if (selectedCrypto && amount) {
      const cryptoValue = Number.parseFloat(amount) / selectedCrypto.price
      setCryptoAmount(cryptoValue.toFixed(8))
    } else {
      setCryptoAmount("")
    }
  }, [amount, selectedCrypto])

  const handleSelectCrypto = (crypto: (typeof cryptoOptions)[0]) => {
    setSelectedCrypto(crypto)
    setStep(2)
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      // Only allow numbers and decimal point
      setAmount(value)
    }
  }

  const handleCryptoAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      // Only allow numbers and decimal point
      setCryptoAmount(value)
      if (selectedCrypto && value) {
        const dollarValue = Number.parseFloat(value) * selectedCrypto.price
        setAmount(dollarValue.toFixed(2))
      } else {
        setAmount("")
      }
    }
  }

  const handleSelectPayment = (payment: (typeof paymentMethods)[0]) => {
    setSelectedPayment(payment)
    setStep(4)
  }

  const handleConfirmPurchase = () => {
    if (!selectedCrypto || !amount || !selectedPayment) return

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)

      toast({
        title: "Purchase Successful",
        description: `You have successfully purchased ${cryptoAmount} ${selectedCrypto.symbol}`,
        variant: "default",
      })

      // Navigate to crypto detail page
      navigateTo(AppRoutes.CRYPTO_DETAIL(selectedCrypto.id), router)
    }, 2000)
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      goBack(router)
    }
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    }
  }

  const canProceedToPayment = selectedCrypto && amount && Number.parseFloat(amount) > 0
  const canConfirmPurchase = selectedCrypto && amount && Number.parseFloat(amount) > 0 && selectedPayment

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Select Cryptocurrency</h2>
            <div className="space-y-4">
              {cryptoOptions.map((crypto) => (
                <AnimatedNetflixCard
                  key={crypto.id}
                  className="cursor-pointer hover:border-[#E50914]"
                  onClick={() => handleSelectCrypto(crypto)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <div className="mr-3 rounded-full p-2" style={{ backgroundColor: `${crypto.color}20` }}>
                        <crypto.icon className="h-6 w-6" style={{ color: crypto.color }} />
                      </div>
                      <div>
                        <p className="font-medium text-white">{crypto.name}</p>
                        <p className="text-sm text-gray-400">{crypto.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">${crypto.price.toLocaleString()}</p>
                      <p className={`text-sm ${crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {crypto.change24h >= 0 ? "+" : ""}
                        {crypto.change24h}%
                      </p>
                    </div>
                  </CardContent>
                </AnimatedNetflixCard>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Enter Amount</h2>

            <AnimatedNetflixCard className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    {selectedCrypto && (
                      <>
                        <div className="mr-3 rounded-full p-2" style={{ backgroundColor: `${selectedCrypto.color}20` }}>
                          <selectedCrypto.icon className="h-6 w-6" style={{ color: selectedCrypto.color }} />
                        </div>
                        <div>
                          <p className="font-medium text-white">{selectedCrypto.name}</p>
                          <p className="text-sm text-gray-400">{selectedCrypto.symbol}</p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">${selectedCrypto?.price.toLocaleString()}</p>
                    <p
                      className={`text-sm ${selectedCrypto && selectedCrypto.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {selectedCrypto && (selectedCrypto.change24h >= 0 ? "+" : "")}
                      {selectedCrypto?.change24h}%
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-300">
                      Amount (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <Input
                        id="amount"
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        className="pl-8 bg-[#333333] border-[#444444] text-white"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cryptoAmount" className="block mb-2 text-sm font-medium text-gray-300">
                      Amount ({selectedCrypto?.symbol})
                    </label>
                    <div className="relative">
                      <Input
                        id="cryptoAmount"
                        type="text"
                        value={cryptoAmount}
                        onChange={handleCryptoAmountChange}
                        className="bg-[#333333] border-[#444444] text-white"
                        placeholder="0.00000000"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </AnimatedNetflixCard>

            <div className="flex justify-between">
              <Button variant="outline" className="border-[#333333] text-white hover:bg-[#333333]" onClick={handleBack}>
                Back
              </Button>
              <InteractiveButton variant="netflix" disabled={!canProceedToPayment} onClick={handleNext}>
                Continue
              </InteractiveButton>
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Select Payment Method</h2>

            <div className="space-y-4 mb-6">
              {paymentMethods.map((payment) => (
                <AnimatedNetflixCard
                  key={payment.id}
                  className="cursor-pointer hover:border-[#E50914]"
                  onClick={() => handleSelectPayment(payment)}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <div className="mr-3 rounded-full bg-[#333333] p-2">
                        <payment.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{payment.name}</p>
                        <p className="text-sm text-gray-400">${payment.balance.toLocaleString()}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </CardContent>
                </AnimatedNetflixCard>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" className="border-[#333333] text-white hover:bg-[#333333]" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="outline"
                className="border-[#333333] text-white hover:bg-[#333333]"
                onClick={() => navigateTo(AppRoutes.PAYMENT_METHODS, router)}
              >
                Add Payment Method
              </Button>
            </div>
          </div>
        )

      case 4:
        return (
          <div>
            <h2 className="mb-4 text-lg font-semibold text-white">Review Order</h2>

            <AnimatedNetflixCard className="mb-6">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Cryptocurrency</p>
                    <div className="flex items-center">
                      {selectedCrypto && (
                        <>
                          <selectedCrypto.icon className="mr-2 h-5 w-5" style={{ color: selectedCrypto.color }} />
                          <p className="font-medium text-white">
                            {selectedCrypto.name} ({selectedCrypto.symbol})
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Amount</p>
                    <p className="font-medium text-white">${Number.parseFloat(amount).toLocaleString()}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">You'll receive</p>
                    <p className="font-medium text-white">
                      {cryptoAmount} {selectedCrypto?.symbol}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Exchange Rate</p>
                    <p className="font-medium text-white">
                      1 {selectedCrypto?.symbol} = ${selectedCrypto?.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Fee</p>
                    <p className="font-medium text-white">$0.99</p>
                  </div>

                  <div className="border-t border-[#333333] pt-4">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-400">Payment Method</p>
                      <div className="flex items-center">
                        {selectedPayment && (
                          <>
                            <selectedPayment.icon className="mr-2 h-5 w-5 text-white" />
                            <p className="font-medium text-white">{selectedPayment.name}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#333333] pt-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-white">Total</p>
                      <p className="text-xl font-bold text-white">${(Number.parseFloat(amount) + 0.99).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </AnimatedNetflixCard>

            <div className="flex justify-between">
              <Button variant="outline" className="border-[#333333] text-white hover:bg-[#333333]" onClick={handleBack}>
                Back
              </Button>
              <InteractiveButton
                variant="netflix"
                disabled={!canConfirmPurchase || isProcessing}
                onClick={handleConfirmPurchase}
              >
                {isProcessing ? "Processing..." : "Confirm Purchase"}
              </InteractiveButton>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#000000] pb-16">
      <header className="sticky top-0 z-10 bg-[#141414] p-4 shadow-sm">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 text-white hover:bg-[#333333]"
            onClick={handleBack}
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-white">Buy Cryptocurrency</h1>
        </div>
      </header>

      <main className="p-4">
        <div className="container px-4 py-6 space-y-6">
          <CryptoNavigation />
          <ProgressTracker
            steps={[
              { label: "Select Crypto", completed: step > 1 },
              { label: "Amount", completed: step > 2 },
              { label: "Payment", completed: step > 3 },
              { label: "Review", completed: false },
            ]}
            currentStep={step}
            className="mb-6"
          />

          {renderStepContent()}
        </div>
      </main>

      <EnhancedBottomNavigation />
    </div>
  )
}

