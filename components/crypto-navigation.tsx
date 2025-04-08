"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Coins, LineChart, ShoppingCart, TrendingDown, Wallet } from "lucide-react"

interface CryptoNavItem {
  href: string
  label: string
  icon: React.ElementType
}

export function CryptoNavigation() {
  const pathname = usePathname()

  const navItems: CryptoNavItem[] = [
    { href: "/crypto", label: "Markets", icon: Coins },
    { href: "/crypto/portfolio", label: "Portfolio", icon: Wallet },
    { href: "/crypto/buy", label: "Buy", icon: ShoppingCart },
    { href: "/crypto/sell", label: "Sell", icon: TrendingDown },
    { href: "/crypto/transactions", label: "History", icon: LineChart },
  ]

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex space-x-2 min-w-max">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-full transition-colors",
                isActive ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80 text-muted-foreground",
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

