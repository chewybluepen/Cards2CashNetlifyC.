"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CreditCard, Wallet, Plus, Award, Gift, RefreshCw } from "lucide-react"
import { AppRoutes } from "@/lib/navigation"
import { EnhancedAvatar } from "@/components/ui/enhanced-avatar"
import { useAvatar } from "@/contexts/avatar-context"
import { SearchIcon } from "@/components/search-icon"

export function BottomNavigation() {
  const pathname = usePathname()
  const { avatarUrl, initials } = useAvatar()

  return (
    <div className="fixed bottom-0 left-0 z-10 w-full border-t border-[#333333] bg-[#141414]">
      <div className="flex h-16 justify-evenly px-2">
        <NavItem
          href={AppRoutes.DASHBOARD}
          icon={<Home className="h-5 w-5" />}
          label="Home"
          isActive={pathname === AppRoutes.DASHBOARD}
        />
        <NavItem
          href={AppRoutes.GENERATE_CARD}
          icon={<CreditCard className="h-5 w-5" />}
          label="Cards"
          isActive={pathname === AppRoutes.GENERATE_CARD || pathname.includes("/generate-card/")}
        />
        <NavItem
          href={AppRoutes.ADD_FUNDS}
          icon={<Plus className="h-5 w-5" />}
          label="Add"
          isActive={pathname.includes("/add-funds")}
        />
        <NavItem
          href={AppRoutes.CONVERT}
          icon={<RefreshCw className="h-5 w-5" />}
          label="Convert"
          isActive={pathname.includes("/convert")}
        />

        {/* Search Icon */}
        <SearchIcon />

        <NavItem
          href={AppRoutes.REWARDS}
          icon={<Award className="h-5 w-5" />}
          label="Rewards"
          isActive={pathname.includes("/rewards")}
        />
        <NavItem
          href={AppRoutes.REFERRAL}
          icon={<Gift className="h-5 w-5" />}
          label="Refer"
          isActive={pathname.includes("/referral")}
        />
        <NavItem
          href={AppRoutes.CRYPTO}
          icon={<Wallet className="h-5 w-5" />}
          label="Crypto"
          isActive={pathname.includes("/crypto")}
        />
        <NavItem
          href={AppRoutes.SETTINGS}
          icon={
            <EnhancedAvatar
              src={avatarUrl || ""}
              alt="User profile"
              initials={initials}
              size="sm"
              className="h-5 w-5 border border-[#333333]"
              interactive={false}
            />
          }
          label="Profile"
          isActive={pathname === AppRoutes.SETTINGS}
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

