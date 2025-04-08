"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Phone, RefreshCw, Clock, ChevronRight, Check, History, Globe, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { BottomNavigation } from "@/components/bottom-navigation"
import { AnimatedNetflixCard } from "@/components/ui/animated-netflix-card"
import { InteractiveButton } from "@/components/ui/interactive-button"
import { ExchangeRateDisplay } from "@/components/exchange-rate-display"
import { ProviderLogo } from "@/components/provider-logo"
import { Badge } from "@/components/ui/badge"
import { CompactCurrencyDisplay } from "@/components/ui/currency-display"

// Mock data for phone credit providers
const providers = [
  // Guyanese Providers
  {
    id: "gtt",
    name: "GTT",
    country: "Guyana",
    logo: "/providers/gtt.png",
    exchangeRate: 0.0048, // GYD to USD
    minAmount: 1000, // GYD
    maxAmount: 50000, // GYD
    processingFee: 0.02,
    processingTime: "30 minutes",
    isLocal: true,
  },
  {
    id: "digicel",
    name: "Digicel",
    country: "Guyana",
    logo: "/providers/digicel.png",
    exchangeRate: 0.0047, // GYD to USD
    minAmount: 1000, // GYD
    maxAmount: 40000, // GYD
    processingFee: 0.025,
    processingTime: "1 hour",
    isLocal: true,
  },
  {
    id: "enetworks",
    name: "E-Networks",
    country: "Guyana",
    logo: "/providers/enetworks.png",
    exchangeRate: 0.0046, // GYD to USD
    minAmount: 2000, // GYD
    maxAmount: 30000, // GYD
    processingFee: 0.03,
    processingTime: "1-2 hours",
    isLocal: true,
  },
  {
    id: "greenict",
    name: "Green ICT",
    country: "Guyana",
    logo: "/providers/greenict.png",
    exchangeRate: 0.0045, // GYD to USD
    minAmount: 1500, // GYD
    maxAmount: 25000, // GYD
    processingFee: 0.035,
    processingTime: "2 hours",
    isLocal: true,
  },
  // International Providers
  {
    id: "rogers",
    name: "Rogers",
    country: "Canada",
    logo: "/providers/rogers.png",
    exchangeRate: 0.85, // CAD to USD
    minAmount: 10, // CAD
    maxAmount: 500, // CAD
    processingFee: 0.02,
    processingTime: "1-2 hours",
    isLocal: false,
  },
  {
    id: "bell",
    name: "Bell",
    country: "Canada",
    logo: "/providers/bell.png",
    exchangeRate: 0.83, // CAD to USD
    minAmount: 15, // CAD
    maxAmount: 450, // CAD
    processingFee: 0.025,
    processingTime: "1-3 hours",
    isLocal: false,
  },
  {
    id: "att",
    name: "AT&T",
    country: "USA",
    logo: "/providers/att.png",
    exchangeRate: 0.9, // USD to USD
    minAmount: 5, // USD
    maxAmount: 1000, // USD
    processingFee: 0.015,
    processingTime: "30 minutes",
    isLocal: false,
  },
  {
    id: "verizon",
    name: "Verizon",
    country: "USA",
    logo: "/providers/verizon.png",
    exchangeRate: 0.88, // USD to USD
    minAmount: 10, // USD
    maxAmount: 750, // USD
    processingFee: 0.02,
    processingTime: "1 hour",
    isLocal: false,
  },
  {
    id: "tmobile",
    name: "T-Mobile",
    country: "USA",
    logo: "/providers/tmobile.png",
    exchangeRate: 0.87, // USD to USD
    minAmount: 5, // USD
    maxAmount: 500, // USD
    processingFee: 0.025,
    processingTime: "1-2 hours",
    isLocal: false,
  },
  {
    id: "vodafone",
    name: "Vodafone",
    country: "International",
    logo: "/providers/vodafone.png",
    exchangeRate: 0.8, // EUR to USD
    minAmount: 5, // EUR
    maxAmount: 300, // EUR
    processingFee: 0.03,
    processingTime: "2-4 hours",
    isLocal: false,
  },
  {
    id: "orange",
    name: "Orange",
    country: "International",
    logo: "/providers/orange.png",
    exchangeRate: 0.78, // EUR to USD
    minAmount: 10, // EUR
    maxAmount: 250, // EUR
    processingFee: 0.035,
    processingTime: "3-5 hours",
    isLocal: false,
  },
]

// Mock data for recent conversions
const recentConversions = [
  {
    id: 1,
    provider: "GTT",
    providerId: "gtt",
    amount: 10000,
    currency: "GYD",
    convertedAmount: 46.5,
    date: "2025-03-28T14:30:00",
    status: "completed",
  },
  {
    id: 2,
    provider: "Digicel",
    providerId: "digicel",
    amount: 5000,
    currency: "GYD",
    convertedAmount: 22.75,
    date: "2025-03-25T10:15:00",
    status: "completed",
  },
  {
    id: 3,
    provider: "Rogers",
    providerId: "rogers",
    amount: 75,
    currency: "CAD",
    convertedAmount: 62.25,
    date: "2025-03-20T16:45:00",
    status: "completed",
  },
]

export default function PhoneCreditPage() {
  const router = useRouter()
  const [selectedProvider, setSelectedProvider] = useState<string>("")
  const [amount, setAmount] = useState<string>("5000")
  const [convertedAmount, setConvertedAmount] = useState<number>(0)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [saveProvider, setSaveProvider] = useState<boolean>(true)
  const [showRateDetails, setShowRateDetails] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>("convert")
  const [filteredProviders, setFilteredProviders] = useState(providers)
  const [countryFilter, setCountryFilter] = useState<string>("guyana")
  const [currencySymbol, setCurrencySymbol] = useState<string>("GYD")

  // Calculate converted amount when provider or amount changes
  useEffect(() => {
    if (selectedProvider && amount) {
      const provider = providers.find((p) => p.id === selectedProvider)
      if (provider) {
        const amountValue = Number.parseFloat(amount)
        const converted = amountValue * provider.exchangeRate
        const fee = amountValue * provider.processingFee * provider.exchangeRate
        setConvertedAmount(converted - fee)

        // Set currency symbol based on provider country
        if (provider.country === "Guyana") {
          setCurrencySymbol("GYD")
        } else if (provider.country === "Canada") {
          setCurrencySymbol("CAD")
        } else if (provider.country === "USA") {
          setCurrencySymbol("USD")
        } else {
          setCurrencySymbol("EUR")
        }
      }
    } else {
      setConvertedAmount(0)
      setCurrencySymbol("GYD") // Default to GYD
    }
  }, [selectedProvider, amount])

  // Filter providers by country
  useEffect(() => {
    if (countryFilter === "all") {
      setFilteredProviders(providers)
    } else if (countryFilter === "guyana") {
      setFilteredProviders(providers.filter((p) => p.country === "Guyana"))
    } else if (countryFilter === "international") {
      setFilteredProviders(providers.filter((p) => p.country !== "Guyana"))
    } else {
      setFilteredProviders(providers.filter((p) => p.country === countryFilter))
    }
  }, [countryFilter])

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
        description: `Minimum amount for ${provider.name} is ${currencySymbol} ${provider.minAmount}`,
        variant: "destructive",
      })
      return
    }

    if (Number.parseFloat(amount) > provider.maxAmount) {
      toast({
        title: "Amount Too High",
        description: `Maximum amount for ${provider.name} is ${currencySymbol} ${provider.maxAmount}`,
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
        description: `${currencySymbol} ${Number.parseFloat(amount).toFixed(2)} from ${provider.name} has been converted to $${convertedAmount.toFixed(2)} USD`,
        variant: "default",
      })

      // Navigate to success page or reset form
      router.push(
        `/phone-credit/success?amount=${convertedAmount.toFixed(2)}&provider=${provider.name}&originalAmount=${amount}&currency=${currencySymbol}`,
      )
    }, 2000)
  }

  const getMaxSliderValue = () => {
    if (!selectedProvider) return 10000
    const provider = providers.find((p) => p.id === selectedProvider)
    return provider ? provider.maxAmount : 10000
  }

  const getMinSliderValue = () => {
    if (!selectedProvider) return 0
    const provider = providers.find((p) => p.id === selectedProvider)
    return provider ? provider.minAmount : 0
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#000000]">
      <header className="sticky top-0 z-10 bg-[#141414] p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2 text-white hover:bg-[#333333]">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-white">Phone Credit Conversion</h1>
            <p className="text-xs text-gray-400">Convert phone credit to digital funds</p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Tabs defaultValue="convert" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="convert" className="text-white data-[state=active]:bg-[#E50914]">
              <Phone className="mr-2 h-4 w-4" />
              Convert Credit
            </TabsTrigger>
            <TabsTrigger value="history" className="text-white data-[state=active]:bg-[#E50914]">
              <History className="mr-2 h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="convert" className="space-y-4">
            <AnimatedNetflixCard>
              <CardHeader>
                <CardTitle className="text-white">Select Provider</CardTitle>
                <CardDescription className="text-gray-400">Choose your phone credit provider</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Select value={countryFilter} onValueChange={setCountryFilter}>
                    <SelectTrigger className="bg-[#333333] border-[#444444] text-white">
                      <SelectValue placeholder="Filter by country" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1F1F1F] border-[#444444] text-white">
                      <SelectItem value="all">All Countries</SelectItem>
                      <SelectItem value="guyana">Guyana</SelectItem>
                      <SelectItem value="international">International</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                      <SelectItem value="USA">USA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {countryFilter === "guyana" && (
                  <div className="mb-4 p-3 bg-[#1F1F1F] rounded-lg border border-[#333333]">
                    <div className="flex items-center mb-2">
                      <Flag className="h-4 w-4 mr-2 text-[#E50914]" />
                      <p className="text-sm font-medium text-white">Guyanese Providers</p>
                    </div>
                    <p className="text-xs text-gray-400">
                      Convert your Guyanese phone credit to USD at competitive rates. Minimum conversion amount is GYD
                      1,000.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {filteredProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className={`relative cursor-pointer rounded-lg border p-3 transition-all ${
                        selectedProvider === provider.id
                          ? "border-[#E50914] bg-[#E50914]/10"
                          : "border-[#333333] bg-[#1F1F1F] hover:border-gray-400"
                      }`}
                      onClick={() => setSelectedProvider(provider.id)}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <div className="mb-2 h-16 w-16 overflow-hidden rounded-full bg-white p-2 shadow-md flex items-center justify-center">
                          <ProviderLogo provider={provider.id} size={56} />
                        </div>
                        <span className="text-center text-sm font-medium text-white">{provider.name}</span>
                        <div className="flex items-center mt-1">
                          <Globe className="h-3 w-3 mr-1 text-gray-400" />
                          <span className="text-center text-xs text-gray-400">{provider.country}</span>
                        </div>
                        {provider.isLocal && (
                          <Badge
                            variant="outline"
                            className="mt-1 text-[10px] h-4 bg-[#E50914]/20 text-[#E50914] border-[#E50914]/50"
                          >
                            Local
                          </Badge>
                        )}
                      </div>
                      {selectedProvider === provider.id && (
                        <div className="absolute right-2 top-2 rounded-full bg-[#E50914] p-1">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </AnimatedNetflixCard>

            {selectedProvider && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <AnimatedNetflixCard>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <div className="mr-3 h-10 w-10 overflow-hidden rounded-full bg-white p-1 shadow-md">
                        <ProviderLogo provider={selectedProvider} size={32} />
                      </div>
                      <div>
                        <CardTitle className="text-white">
                          {providers.find((p) => p.id === selectedProvider)?.name} Credit
                        </CardTitle>
                        <CardDescription className="text-gray-400">Enter amount to convert</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount" className="text-white">
                        Amount ({currencySymbol})
                      </Label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{currencySymbol}</div>
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

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-white">Adjust Amount</Label>
                        <span className="text-xs text-gray-400">
                          Min: {currencySymbol}{" "}
                          {providers.find((p) => p.id === selectedProvider)?.minAmount.toLocaleString()} | Max:{" "}
                          {currencySymbol}{" "}
                          {providers.find((p) => p.id === selectedProvider)?.maxAmount.toLocaleString()}
                        </span>
                      </div>
                      <Slider
                        defaultValue={[5000]}
                        min={getMinSliderValue()}
                        max={getMaxSliderValue()}
                        step={providers.find((p) => p.id === selectedProvider)?.country === "Guyana" ? 500 : 5}
                        value={[Number.parseFloat(amount) || 0]}
                        onValueChange={handleSliderChange}
                        className="py-4"
                      />
                    </div>

                    <ExchangeRateDisplay
                      provider={providers.find((p) => p.id === selectedProvider)}
                      amount={Number.parseFloat(amount) || 0}
                      showDetails={showRateDetails}
                      onToggleDetails={() => setShowRateDetails(!showRateDetails)}
                      currencySymbol={currencySymbol}
                    />

                    <div className="rounded-lg bg-[#1F1F1F] p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">You'll receive:</span>
                        <span className="text-xl font-bold text-white">
                          <CompactCurrencyDisplay amount={convertedAmount} currency="USD" />
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Estimated processing time: {providers.find((p) => p.id === selectedProvider)?.processingTime}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="save-provider" checked={saveProvider} onCheckedChange={setSaveProvider} />
                      <Label htmlFor="save-provider" className="text-white">
                        Save this provider for future conversions
                      </Label>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <InteractiveButton
                      variant="netflix"
                      className="w-full"
                      onClick={handleConvert}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>Convert Now</>
                      )}
                    </InteractiveButton>
                  </CardFooter>
                </AnimatedNetflixCard>
              </motion.div>
            )}

            <AnimatedNetflixCard>
              <CardHeader>
                <CardTitle className="text-white">How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#E50914]">
                      <span className="text-sm font-bold text-white">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Select Your Provider</h3>
                      <p className="text-sm text-gray-400">
                        Choose from our list of supported phone credit providers, with priority for Guyanese options
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#E50914]">
                      <span className="text-sm font-bold text-white">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Enter Credit Amount</h3>
                      <p className="text-sm text-gray-400">
                        Specify how much phone credit you want to convert in the local currency
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#E50914]">
                      <span className="text-sm font-bold text-white">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Receive Digital Funds</h3>
                      <p className="text-sm text-gray-400">
                        Your converted funds will be added to your Cards2Cash balance in USD
                      </p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </AnimatedNetflixCard>
          </TabsContent>

          <TabsContent value="history">
            <AnimatedNetflixCard>
              <CardHeader>
                <CardTitle className="text-white">Conversion History</CardTitle>
                <CardDescription className="text-gray-400">Your recent phone credit conversions</CardDescription>
              </CardHeader>
              <CardContent>
                {recentConversions.length > 0 ? (
                  <div className="space-y-3">
                    {recentConversions.map((conversion) => (
                      <div
                        key={conversion.id}
                        className="flex items-center justify-between rounded-lg border border-[#333333] bg-[#1F1F1F] p-4 hover:border-gray-400 transition-all"
                      >
                        <div className="flex items-center">
                          <div className="mr-4 h-10 w-10 overflow-hidden rounded-full bg-white p-1 shadow-md">
                            <ProviderLogo provider={conversion.providerId} size={32} />
                          </div>
                          <div>
                            <p className="font-medium text-white">{conversion.provider}</p>
                            <div className="flex items-center text-xs text-gray-400">
                              <Clock className="mr-1 h-3 w-3" />
                              {new Date(conversion.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-white">
                            <CompactCurrencyDisplay amount={conversion.convertedAmount} currency="USD" />
                          </p>
                          <p className="text-xs text-gray-400">
                            <CompactCurrencyDisplay
                              amount={conversion.amount}
                              currency={conversion.currency}
                              options={{ style: "code" }}
                            />
                          </p>
                          <p className="text-xs text-green-500">Completed</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="mb-4 rounded-full bg-[#333333] p-4">
                      <History className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white">No conversions yet</h3>
                    <p className="mt-1 text-sm text-gray-400">Your phone credit conversion history will appear here</p>
                    <Button
                      variant="outline"
                      className="mt-4 border-[#333333] text-white hover:bg-[#333333]"
                      onClick={() => setActiveTab("convert")}
                    >
                      Start a Conversion
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-[#333333] text-white hover:bg-[#333333]" asChild>
                  <Link href="/phone-credit/history">
                    View Full History
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </AnimatedNetflixCard>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </div>
  )
}

