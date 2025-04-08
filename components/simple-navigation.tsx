"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CreditCard, Wallet, RefreshCw, Plus, Award, Settings } from "lucide-react"

export function SimpleNavigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.includes(path)
  }

  return (
    <div className="fixed bottom-0 left-0 z-10 w-full border-t border-[#333333] bg-[#141414]">
      <div className="flex h-16 justify-between px-2">
        <NavItem href="/dashboard" icon={<Home className="h-5 w-5" />} label="Home" isActive={isActive("/dashboard")} />
        <NavItem
          href="/generate-card"
          icon={<CreditCard className="h-5 w-5" />}
          label="Cards"
          isActive={isActive("/generate-card")}
        />
        <NavItem href="/add-funds" icon={<Plus className="h-5 w-5" />} label="Add" isActive={isActive("/add-funds")} />
        <NavItem
          href="/convert"
          icon={<RefreshCw className="h-5 w-5" />}
          label="Convert"
          isActive={isActive("/convert")}
        />
        <NavItem href="/rewards" icon={<Award className="h-5 w-5" />} label="Rewards" isActive={isActive("/rewards")} />
        <NavItem href="/crypto" icon={<Wallet className="h-5 w-5" />} label="Crypto" isActive={isActive("/crypto")} />
        <NavItem
          href="/settings"
          icon={<Settings className="h-5 w-5" />}
          label="Settings"
          isActive={isActive("/settings")}
        />
      </div>
    </div>
  )
}

function NavItem({
  href,
  icon,
  label,
  isActive,
}: {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center px-2 space-y-1 ${
        isActive ? "text-[#E50914]" : "text-gray-500 hover:text-gray-300"
      }`}
    >
      <div className="flex items-center justify-center">{icon}</div>
      <span className="block w-full text-center text-xs font-medium">{label}</span>
    </Link>
  )
}

