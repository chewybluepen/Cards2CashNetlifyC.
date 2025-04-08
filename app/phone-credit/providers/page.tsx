"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Star, StarOff, Info, Globe, Search, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { BottomNavigation } from "@/components/bottom-navigation"
import { AnimatedNetflixCard } from "@/components/ui/animated-netflix-card"
import { ProviderLogo } from "@/components/provider-logo"

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
    favorite: true,
    enabled: true,
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
    favorite: true,
    enabled: true,
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
    favorite: false,
    enabled: true,
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
    favorite: false,
    enabled: true,
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
    favorite: false,
    enabled: true,
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
    favorite: false,
    enabled: true,
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
    favorite: false,
    enabled: true,
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
    favorite: false,
    enabled: true,
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
    favorite: false,
    enabled: true,
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
    favorite: false,
    enabled: true,
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
    favorite: false,
    enabled: false,
  },
]

export default function ProvidersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [providersList, setProvidersList] = useState(providers)
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("guyana")

  const toggleFavorite = (id: string) => {
    setProvidersList((prevList) =>
      prevList.map((provider) => (provider.id === id ? { ...provider, favorite: !provider.favorite } : provider)),
    )
  }

  const toggleEnabled = (id: string) => {
    setProvidersList((prevList) =>
      prevList.map((provider) => (provider.id === id ? { ...provider, enabled: !provider.enabled } : provider)),
    )
  }

  // Filter providers based on search term and active tab
  const getFilteredProviders = () => {
    let filtered = providersList

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (provider) =>
          provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          provider.country.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply tab filter
    if (activeTab === "guyana") {
      filtered = filtered.filter((provider) => provider.country === "Guyana")
    } else if (activeTab === "international") {
      filtered = filtered.filter((provider) => provider.country !== "Guyana")
    } else if (activeTab === "favorites") {
      filtered = filtered.filter((provider) => provider.favorite)
    }

    return filtered
  }

  const filteredProviders = getFilteredProviders()

  return (
    <div className="flex min-h-screen flex-col bg-[#000000]">
      <header className="sticky top-0 z-10 bg-[#141414] p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2 text-white hover:bg-[#333333]">
            <Link href="/phone-credit">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-white">Manage Providers</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4 bg-[#141414] border-[#333333]">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search providers"
                className="pl-9 bg-[#333333] border-[#444444] text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="guyana" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#141414] text-white mb-4">
            <TabsTrigger value="guyana" className="data-[state=active]:bg-[#E50914]">
              <Flag className="mr-2 h-4 w-4" />
              Guyana
            </TabsTrigger>
            <TabsTrigger value="international" className="data-[state=active]:bg-[#E50914]">
              <Globe className="mr-2 h-4 w-4" />
              International
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-[#E50914]">
              <Star className="mr-2 h-4 w-4" />
              Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guyana" className="space-y-4">
            {activeTab === "guyana" && (
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

            {filteredProviders.length > 0 ? (
              filteredProviders.map((provider) => (
                <AnimatedNetflixCard key={provider.id}>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <div className="mr-4 h-14 w-14 overflow-hidden rounded-full bg-white p-2 shadow-md flex items-center justify-center">
                        <ProviderLogo provider={provider.id} size={48} />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium text-white">{provider.name}</p>
                          {provider.isLocal && (
                            <Badge
                              variant="outline"
                              className="ml-2 text-[10px] h-4 bg-[#E50914]/20 text-[#E50914] border-[#E50914]/50"
                            >
                              Local
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-gray-400">
                          <Globe className="mr-1 h-3 w-3" />
                          {provider.country}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-[#333333]"
                        onClick={() => toggleFavorite(provider.id)}
                      >
                        {provider.favorite ? (
                          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ) : (
                          <StarOff className="h-5 w-5" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-[#333333]"
                        onClick={() => setSelectedProvider(provider.id === selectedProvider ? null : provider.id)}
                      >
                        <Info className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {selectedProvider === provider.id && (
                    <div className="border-t border-[#333333] bg-[#1F1F1F] p-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-400">Exchange Rate</p>
                          <p className="font-medium text-white">
                            {provider.country === "Guyana"
                              ? `1 GYD = $${provider.exchangeRate.toFixed(4)} USD`
                              : provider.exchangeRate.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Processing Fee</p>
                          <p className="font-medium text-white">{(provider.processingFee * 100).toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Min Amount</p>
                          <p className="font-medium text-white">
                            {provider.country === "Guyana"
                              ? "GYD"
                              : provider.country === "Canada"
                                ? "CAD"
                                : provider.country === "USA"
                                  ? "USD"
                                  : "EUR"}{" "}
                            {provider.minAmount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Max Amount</p>
                          <p className="font-medium text-white">
                            {provider.country === "Guyana"
                              ? "GYD"
                              : provider.country === "Canada"
                                ? "CAD"
                                : provider.country === "USA"
                                  ? "USD"
                                  : "EUR"}{" "}
                            {provider.maxAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`enable-${provider.id}`}
                            checked={provider.enabled}
                            onCheckedChange={() => toggleEnabled(provider.id)}
                          />
                          <Label htmlFor={`enable-${provider.id}`} className="text-white">
                            {provider.enabled ? "Enabled" : "Disabled"}
                          </Label>
                        </div>
                        <p className="text-xs text-gray-400">Processing Time: {provider.processingTime}</p>
                      </div>
                    </div>
                  )}
                </AnimatedNetflixCard>
              ))
            ) : (
              <Card className="bg-[#141414] border-[#333333]">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Search className="mb-2 h-8 w-8 text-gray-400" />
                  <h3 className="text-lg font-medium text-white">No providers found</h3>
                  <p className="text-sm text-gray-400">Try adjusting your search to find what you're looking for.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="international" className="space-y-4">
            {activeTab === "international" && (
              <div className="mb-4 p-3 bg-[#1F1F1F] rounded-lg border border-[#333333]">
                <div className="flex items-center mb-2">
                  <Globe className="h-4 w-4 mr-2 text-[#E50914]" />
                  <p className="text-sm font-medium text-white">International Providers</p>
                </div>
                <p className="text-xs text-gray-400">
                  Convert phone credit from international providers to USD. Rates and minimum amounts vary by country.
                </p>
              </div>
            )}

            {filteredProviders.length > 0 ? (
              filteredProviders.map((provider) => (
                <AnimatedNetflixCard key={provider.id}>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <div className="mr-4 h-14 w-14 overflow-hidden rounded-full bg-white p-2 shadow-md flex items-center justify-center">
                        <ProviderLogo provider={provider.id} size={48} />
                      </div>
                      <div>
                        <p className="font-medium text-white">{provider.name}</p>
                        <div className="flex items-center text-xs text-gray-400">
                          <Globe className="mr-1 h-3 w-3" />
                          {provider.country}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-[#333333]"
                        onClick={() => toggleFavorite(provider.id)}
                      >
                        {provider.favorite ? (
                          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ) : (
                          <StarOff className="h-5 w-5" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-[#333333]"
                        onClick={() => setSelectedProvider(provider.id === selectedProvider ? null : provider.id)}
                      >
                        <Info className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {selectedProvider === provider.id && (
                    <div className="border-t border-[#333333] bg-[#1F1F1F] p-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-400">Exchange Rate</p>
                          <p className="font-medium text-white">
                            {provider.country === "Guyana"
                              ? `1 GYD = $${provider.exchangeRate.toFixed(4)} USD`
                              : provider.exchangeRate.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Processing Fee</p>
                          <p className="font-medium text-white">{(provider.processingFee * 100).toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Min Amount</p>
                          <p className="font-medium text-white">
                            {provider.country === "Guyana"
                              ? "GYD"
                              : provider.country === "Canada"
                                ? "CAD"
                                : provider.country === "USA"
                                  ? "USD"
                                  : "EUR"}{" "}
                            {provider.minAmount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Max Amount</p>
                          <p className="font-medium text-white">
                            {provider.country === "Guyana"
                              ? "GYD"
                              : provider.country === "Canada"
                                ? "CAD"
                                : provider.country === "USA"
                                  ? "USD"
                                  : "EUR"}{" "}
                            {provider.maxAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`enable-${provider.id}`}
                            checked={provider.enabled}
                            onCheckedChange={() => toggleEnabled(provider.id)}
                          />
                          <Label htmlFor={`enable-${provider.id}`} className="text-white">
                            {provider.enabled ? "Enabled" : "Disabled"}
                          </Label>
                        </div>
                        <p className="text-xs text-gray-400">Processing Time: {provider.processingTime}</p>
                      </div>
                    </div>
                  )}
                </AnimatedNetflixCard>
              ))
            ) : (
              <Card className="bg-[#141414] border-[#333333]">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Search className="mb-2 h-8 w-8 text-gray-400" />
                  <h3 className="text-lg font-medium text-white">No providers found</h3>
                  <p className="text-sm text-gray-400">Try adjusting your search to find what you're looking for.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            {filteredProviders.length > 0 ? (
              filteredProviders.map((provider) => (
                <AnimatedNetflixCard key={provider.id}>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <div className="mr-4 h-14 w-14 overflow-hidden rounded-full bg-white p-2 shadow-md flex items-center justify-center">
                        <ProviderLogo provider={provider.id} size={48} />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium text-white">{provider.name}</p>
                          {provider.isLocal && (
                            <Badge
                              variant="outline"
                              className="ml-2 text-[10px] h-4 bg-[#E50914]/20 text-[#E50914] border-[#E50914]/50"
                            >
                              Local
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center text-xs text-gray-400">
                          <Globe className="mr-1 h-3 w-3" />
                          {provider.country}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-[#333333]"
                        onClick={() => toggleFavorite(provider.id)}
                      >
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-[#333333]"
                        onClick={() => setSelectedProvider(provider.id === selectedProvider ? null : provider.id)}
                      >
                        <Info className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {selectedProvider === provider.id && (
                    <div className="border-t border-[#333333] bg-[#1F1F1F] p-4">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-400">Exchange Rate</p>
                          <p className="font-medium text-white">
                            {provider.country === "Guyana"
                              ? `1 GYD = $${provider.exchangeRate.toFixed(4)} USD`
                              : provider.exchangeRate.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Processing Fee</p>
                          <p className="font-medium text-white">{(provider.processingFee * 100).toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Min Amount</p>
                          <p className="font-medium text-white">
                            {provider.country === "Guyana"
                              ? "GYD"
                              : provider.country === "Canada"
                                ? "CAD"
                                : provider.country === "USA"
                                  ? "USD"
                                  : "EUR"}{" "}
                            {provider.minAmount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Max Amount</p>
                          <p className="font-medium text-white">
                            {provider.country === "Guyana"
                              ? "GYD"
                              : provider.country === "Canada"
                                ? "CAD"
                                : provider.country === "USA"
                                  ? "USD"
                                  : "EUR"}{" "}
                            {provider.maxAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`enable-${provider.id}`}
                            checked={provider.enabled}
                            onCheckedChange={() => toggleEnabled(provider.id)}
                          />
                          <Label htmlFor={`enable-${provider.id}`} className="text-white">
                            {provider.enabled ? "Enabled" : "Disabled"}
                          </Label>
                        </div>
                        <p className="text-xs text-gray-400">Processing Time: {provider.processingTime}</p>
                      </div>
                    </div>
                  )}
                </AnimatedNetflixCard>
              ))
            ) : (
              <Card className="bg-[#141414] border-[#333333]">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <Star className="mb-2 h-8 w-8 text-gray-400" />
                  <h3 className="text-lg font-medium text-white">No favorite providers</h3>
                  <p className="text-sm text-gray-400">Add providers to your favorites for quick access.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button variant="outline" className="w-full border-[#333333] text-white hover:bg-[#333333]" asChild>
            <Link href="/phone-credit/providers/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Custom Provider
            </Link>
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

