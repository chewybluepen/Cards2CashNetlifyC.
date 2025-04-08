"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell } from "lucide-react"
import { NetflixDropdown, NetflixDropdownItem } from "@/components/ui/netflix-dropdown"
import { EnhancedAvatar } from "@/components/ui/enhanced-avatar"
import { useAvatar } from "@/contexts/avatar-context"
import { GlobalSearch } from "@/components/global-search"

export function NetflixHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)
  const { avatarUrl, initials } = useAvatar()

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const mainNavItems = [
    { name: "Home", path: "/dashboard" },
    { name: "Cards", path: "/generate-card" },
    { name: "Add Funds", path: "/add-funds" },
    { name: "Convert", path: "/convert" },
    { name: "Crypto", path: "/crypto" },
    { name: "Transactions", path: "/transactions" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#141414]" : "bg-gradient-to-b from-black to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/dashboard" className="text-[#E50914] font-bold text-2xl">
            Cards2Cash
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm hover:text-white transition-colors ${
                  pathname === item.path ? "text-white font-medium" : "text-[#B3B3B3]"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <NetflixDropdown
              trigger={<span className="text-sm text-[#B3B3B3] hover:text-white transition-colors">More</span>}
              align="left"
              width="w-48"
            >
              <NetflixDropdownItem>
                <Link href="/rewards" className="block w-full">
                  Rewards
                </Link>
              </NetflixDropdownItem>
              <NetflixDropdownItem>
                <Link href="/offers" className="block w-full">
                  Offers
                </Link>
              </NetflixDropdownItem>
              <NetflixDropdownItem>
                <Link href="/savings" className="block w-full">
                  Savings
                </Link>
              </NetflixDropdownItem>
              <NetflixDropdownItem>
                <Link href="/help" className="block w-full">
                  Help Center
                </Link>
              </NetflixDropdownItem>
            </NetflixDropdown>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* Global Search Component */}
          <GlobalSearch />

          <Link href="/notifications" className="text-[#B3B3B3] hover:text-white transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-[#E50914] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </Link>

          <NetflixDropdown
            trigger={
              <div className="flex items-center">
                <EnhancedAvatar
                  src={avatarUrl || ""}
                  alt="User profile"
                  initials={initials}
                  size="sm"
                  className="border border-[#333333]"
                />
              </div>
            }
            align="right"
            width="w-56"
          >
            <NetflixDropdownItem>
              <Link href="/profile" className="block w-full">
                Profile
              </Link>
            </NetflixDropdownItem>
            <NetflixDropdownItem>
              <Link href="/settings" className="block w-full">
                Account Settings
              </Link>
            </NetflixDropdownItem>
            <NetflixDropdownItem>
              <Link href="/payment-methods" className="block w-full">
                Payment Methods
              </Link>
            </NetflixDropdownItem>
            <NetflixDropdownItem>
              <Link href="/spending-limits" className="block w-full">
                Spending Limits
              </Link>
            </NetflixDropdownItem>
            <NetflixDropdownItem>
              <Link href="/" className="block w-full">
                Sign Out
              </Link>
            </NetflixDropdownItem>
          </NetflixDropdown>
        </div>
      </div>
    </header>
  )
}

