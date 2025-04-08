"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CreditCard, Wallet, Plus, Award, Gift, RefreshCw, Menu, X, Search } from "lucide-react"
import { AppRoutes } from "@/lib/navigation"
import { EnhancedAvatar } from "@/components/ui/enhanced-avatar"
import { useAvatar } from "@/contexts/avatar-context"
import { useSearch } from "@/contexts/search-context"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function EnhancedBottomNavigation() {
  const pathname = usePathname()
  const { avatarUrl, initials } = useAvatar()
  const { openSearch } = useSearch()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Primary navigation items always visible
  const primaryNavItems = [
    {
      href: AppRoutes.DASHBOARD,
      icon: <Home className="h-5 w-5" />,
      label: "Home",
      isActive: pathname === AppRoutes.DASHBOARD,
    },
    {
      href: AppRoutes.GENERATE_CARD,
      icon: <CreditCard className="h-5 w-5" />,
      label: "Cards",
      isActive: pathname === AppRoutes.GENERATE_CARD || pathname.includes("/generate-card/"),
    },
    {
      href: AppRoutes.ADD_FUNDS,
      icon: <Plus className="h-5 w-5" />,
      label: "Add",
      isActive: pathname.includes("/add-funds"),
    },
    {
      href: AppRoutes.CONVERT,
      icon: <RefreshCw className="h-5 w-5" />,
      label: "Convert",
      isActive: pathname.includes("/convert"),
    },
  ]

  // Secondary navigation items (shown in expanded view or on larger screens)
  const secondaryNavItems = [
    {
      href: AppRoutes.REWARDS,
      icon: <Award className="h-5 w-5" />,
      label: "Rewards",
      isActive: pathname.includes("/rewards"),
    },
    {
      href: AppRoutes.REFERRAL,
      icon: <Gift className="h-5 w-5" />,
      label: "Refer",
      isActive: pathname.includes("/referral"),
    },
    {
      href: AppRoutes.CRYPTO,
      icon: <Wallet className="h-5 w-5" />,
      label: "Crypto",
      isActive: pathname.includes("/crypto"),
    },
    {
      href: AppRoutes.SETTINGS,
      icon: (
        <EnhancedAvatar
          src={avatarUrl || ""}
          alt="User profile"
          initials={initials}
          size="sm"
          className="h-5 w-5 border border-[#333333]"
          interactive={false}
        />
      ),
      label: "Profile",
      isActive: pathname === AppRoutes.SETTINGS,
    },
  ]

  return (
    <>
      <div className="fixed bottom-0 left-0 z-10 w-full border-t border-[#333333] bg-[#141414]">
        <div className="flex h-16 justify-evenly px-2">
          {/* Primary navigation items */}
          {primaryNavItems.map((item) => (
            <NavItem key={item.href} href={item.href} icon={item.icon} label={item.label} isActive={item.isActive} />
          ))}

          {/* Search button */}
          <button
            onClick={openSearch}
            className="flex flex-col items-center justify-center px-2 space-y-1 text-gray-500 hover:text-gray-300"
            aria-label="Search"
          >
            <div className="flex items-center justify-center">
              <Search className="h-5 w-5" />
            </div>
            <span className="block w-full text-center text-xs font-medium">Search</span>
          </button>

          {/* Secondary navigation items - visible on larger screens */}
          <div className="hidden md:flex justify-evenly">
            {secondaryNavItems.map((item) => (
              <NavItem key={item.href} href={item.href} icon={item.icon} label={item.label} isActive={item.isActive} />
            ))}
          </div>

          {/* Menu toggle button - only on mobile */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex flex-col items-center justify-center px-2 space-y-1 text-gray-500 hover:text-gray-300`}
              aria-label={isExpanded ? "Close menu" : "Open menu"}
            >
              <div className="flex items-center justify-center">
                {isExpanded ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </div>
              <span className="block w-full text-center text-xs font-medium">{isExpanded ? "Close" : "More"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Expandable menu for mobile */}
      {isExpanded && isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-16 left-0 z-10 w-full border-t border-[#333333] bg-[#141414] p-4"
        >
          <div className="grid grid-cols-4 gap-4 w-full">
            {secondaryNavItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                isActive={item.isActive}
                onClick={() => setIsExpanded(false)}
              />
            ))}
          </div>
        </motion.div>
      )}
    </>
  )
}

function NavItem({
  href,
  icon,
  label,
  isActive,
  onClick,
}: {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center px-2 space-y-1 ${
        isActive ? "text-[#E50914]" : "text-gray-500 hover:text-gray-300"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center">{icon}</div>
      <span className="block w-full text-center text-xs font-medium">{label}</span>
    </Link>
  )
}

