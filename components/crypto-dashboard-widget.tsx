"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, TrendingUp, TrendingDown, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AnimatedCard } from "@/components/ui/animated-card"
import { cn } from "@/lib/utils"

interface CryptoAsset {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  amount: number
  value: number
  icon: string
}

const mockPortfolio: CryptoAsset[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 51243.67,
    change24h: 2.34,
    amount: 0.0245,
    value: 1255.47,
    icon: "₿",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 2843.21,
    change24h: -1.23,
    amount: 0.5,
    value: 1421.61,
    icon: "Ξ",
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: 0.54,
    change24h: 5.67,
    amount: 1000,
    value: 540.0,
    icon: "₳",
  },
]

export function CryptoDashboardWidget() {
  const [portfolio] = useState<CryptoAsset[]>(mockPortfolio)

  const totalValue = portfolio.reduce((sum, asset) => sum + asset.value, 0)

  return (
    <AnimatedCard className="w-full">
      <Card className="border-none shadow-md bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex justify-between items-center">
            <span>Crypto Portfolio</span>
            <span className="text-lg font-medium">${totalValue.toFixed(2)}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {portfolio.slice(0, 2).map((asset) => (
              <Link href={`/crypto/${asset.id}`} key={asset.id} className="block">
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      {asset.icon}
                    </div>
                    <div>
                      <p className="font-medium">{asset.name}</p>
                      <p className="text-xs text-slate-300">
                        {asset.amount} {asset.symbol}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${asset.value.toFixed(2)}</p>
                    <p
                      className={cn(
                        "text-xs flex items-center",
                        asset.change24h >= 0 ? "text-green-400" : "text-red-400",
                      )}
                    >
                      {asset.change24h >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {asset.change24h >= 0 ? "+" : ""}
                      {asset.change24h}%
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <Button asChild variant="outline" className="bg-slate-700 hover:bg-slate-600 border-slate-600 text-white">
                <Link href="/crypto/buy">
                  <span className="flex items-center justify-center gap-1">Buy</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-slate-700 hover:bg-slate-600 border-slate-600 text-white">
                <Link href="/crypto/sell">
                  <span className="flex items-center justify-center gap-1">Sell</span>
                </Link>
              </Button>
            </div>
            <Button
              asChild
              variant="ghost"
              className="w-full text-primary-foreground hover:bg-slate-700/50 justify-between"
            >
              <Link href="/crypto/portfolio">
                <span className="flex items-center justify-between w-full">
                  <span className="flex items-center">
                    <Wallet className="mr-2 h-4 w-4" />
                    View Portfolio
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </AnimatedCard>
  )
}

