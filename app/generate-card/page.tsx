"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Plus, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BottomNavigation } from "@/components/bottom-navigation"
import { AnimatedNetflixCard } from "@/components/ui/animated-netflix-card"
import { InteractiveButton } from "@/components/ui/interactive-button"
import { toast } from "@/components/ui/use-toast"

// Card type icons/logos
const cardTypes = [
  { id: "visa", name: "Visa", logo: "/card-logos/visa.svg" },
  { id: "mastercard", name: "Mastercard", logo: "/card-logos/mastercard.svg" },
  { id: "amex", name: "American Express", logo: "/card-logos/amex.svg" },
  { id: "discover", name: "Discover", logo: "/card-logos/discover.svg" },
  { id: "jcb", name: "JCB", logo: "/card-logos/jcb.svg" },
  { id: "unionpay", name: "UnionPay", logo: "/card-logos/unionpay.svg" },
  { id: "rupay", name: "RuPay", logo: "/card-logos/rupay.svg" },
]

// Mock card data
const mockCards = [
  {
    id: 1,
    name: "Amazon Gift Card",
    balance: 150,
    expiryDate: "12/27",
    lastFour: "4582",
    type: "visa",
    color: "#2563eb",
  },
  {
    id: 2,
    name: "Netflix Gift Card",
    balance: 75,
    expiryDate: "09/26",
    lastFour: "9371",
    type: "mastercard",
    color: "#d97706",
  },
  {
    id: 3,
    name: "Steam Wallet",
    balance: 200,
    expiryDate: "03/28",
    lastFour: "6294",
    type: "visa",
    color: "#059669",
  },
  {
    id: 4,
    name: "Apple Gift Card",
    balance: 100,
    expiryDate: "05/27",
    lastFour: "8123",
    type: "discover",
    color: "#7c3aed",
  },
  {
    id: 5,
    name: "PlayStation Store",
    balance: 50,
    expiryDate: "11/26",
    lastFour: "7456",
    type: "jcb",
    color: "#db2777",
  },
  {
    id: 6,
    name: "Walmart Gift Card",
    balance: 125,
    expiryDate: "08/27",
    lastFour: "3901",
    type: "unionpay",
    color: "#0284c7",
  },
  {
    id: 7,
    name: "Target Gift Card",
    balance: 80,
    expiryDate: "04/28",
    lastFour: "5274",
    type: "rupay",
    color: "#b91c1c",
  },
]

export default function GenerateCardPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  // Filter cards based on search query and active tab
  const filteredCards = mockCards.filter((card) => {
    const matchesSearch =
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.lastFour.includes(searchQuery) ||
      card.type.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && card.type === activeTab
  })

  const handleAddCard = () => {
    router.push("/generate-card/new")
  }

  const handleCardClick = (id: number) => {
    router.push(`/generate-card/${id}`)
  }

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive)
    if (isSearchActive) {
      setSearchQuery("")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#000000]">
      <header className="sticky top-0 z-10 bg-[#141414] p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2 text-white hover:bg-[#333333]">
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold text-white">Gift Cards</h1>
          </div>

          <div className="flex items-center space-x-2">
            {isSearchActive ? (
              <Button variant="ghost" size="sm" className="text-white hover:bg-[#333333]" onClick={handleSearchToggle}>
                Cancel
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-[#333333]"
                onClick={handleSearchToggle}
                aria-label="Search cards"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-[#333333]"
              onClick={handleAddCard}
              aria-label="Add new card"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {isSearchActive && (
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search cards by name, number, or type..."
              className="pl-9 pr-9 bg-[#333333] border-[#444444] text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-white"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}

        <Tabs defaultValue="all" className="mt-4" value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="bg-[#333333] p-1 inline-flex w-auto min-w-full">
              <TabsTrigger value="all" className="text-sm">
                All
              </TabsTrigger>
              {cardTypes.map((type) => (
                <TabsTrigger key={type.id} value={type.id} className="text-sm flex items-center">
                  <img
                    src={type.logo || "/placeholder.svg"}
                    alt={type.name}
                    className="h-4 w-auto mr-1.5"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=16&width=24"
                    }}
                  />
                  {type.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-4">
            <CardGrid cards={filteredCards} onCardClick={handleCardClick} />
          </TabsContent>

          {cardTypes.map((type) => (
            <TabsContent key={type.id} value={type.id} className="mt-4">
              <CardGrid
                cards={filteredCards}
                onCardClick={handleCardClick}
                emptyMessage={`No ${type.name} cards found`}
              />
            </TabsContent>
          ))}
        </Tabs>
      </header>

      <main className="flex-1 p-4 pb-20">
        {/* Add Card Button */}
        <AnimatedNetflixCard className="mb-6">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-[#333333] p-4">
              <CreditCard className="h-8 w-8 text-[#E50914]" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Add a New Gift Card</h2>
            <p className="text-gray-400 mb-4">Convert your gift cards to cash or crypto instantly</p>
            <InteractiveButton variant="netflix" onClick={handleAddCard} className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add New Card
            </InteractiveButton>
          </CardContent>
        </AnimatedNetflixCard>

        {/* Card Type Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Supported Card Types</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {cardTypes.map((type) => (
              <Card
                key={type.id}
                className="bg-[#1f1f1f] border-[#333333] hover:border-[#E50914] transition-colors cursor-pointer"
                onClick={() => {
                  setActiveTab(type.id)
                  toast({
                    title: `${type.name} Cards`,
                    description: `Showing all your ${type.name} cards`,
                  })
                }}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <img
                    src={type.logo || "/placeholder.svg"}
                    alt={type.name}
                    className="h-10 w-auto mb-3"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=40&width=60"
                    }}
                  />
                  <p className="text-sm font-medium text-white">{type.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

interface CardGridProps {
  cards: typeof mockCards
  onCardClick: (id: number) => void
  emptyMessage?: string
}

function CardGrid({ cards, onCardClick, emptyMessage = "No cards found" }: CardGridProps) {
  if (cards.length === 0) {
    return (
      <AnimatedNetflixCard>
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <CreditCard className="h-12 w-12 text-gray-600 mb-3" />
          <h3 className="text-xl font-medium text-white">{emptyMessage}</h3>
          <p className="text-gray-400 mt-2">Try adding a new card or changing your search</p>
        </CardContent>
      </AnimatedNetflixCard>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <AnimatedNetflixCard
          key={card.id}
          className="cursor-pointer"
          onClick={() => onCardClick(card.id)}
          hoverScale={1.03}
          hoverY={-5}
        >
          <CardContent className="p-0">
            <div className="p-4 rounded-t-lg flex items-center justify-between" style={{ backgroundColor: card.color }}>
              <span className="text-white font-medium">{card.name}</span>
              <img
                src={`/card-logos/${card.type}.svg`}
                alt={card.type}
                className="h-8 w-auto"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=32&width=48"
                }}
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400 text-sm">Balance</span>
                <span className="text-gray-400 text-sm">Expires</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white text-xl font-bold">${card.balance}</span>
                <span className="text-white">{card.expiryDate}</span>
              </div>
              <div className="mt-4 pt-4 border-t border-[#333333] flex justify-between items-center">
                <span className="text-gray-400 text-sm">Card Number</span>
                <span className="text-white">•••• {card.lastFour}</span>
              </div>
            </div>
          </CardContent>
        </AnimatedNetflixCard>
      ))}
    </div>
  )
}

