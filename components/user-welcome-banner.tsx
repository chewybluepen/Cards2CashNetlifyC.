"use client"

import { motion } from "framer-motion"
import { EnhancedAvatar } from "@/components/ui/enhanced-avatar"
import { useAvatar } from "@/contexts/avatar-context"

interface UserWelcomeBannerProps {
  userName?: string
  greeting?: string
  showAvatar?: boolean
}

export function UserWelcomeBanner({
  userName = "John",
  greeting = "Welcome back",
  showAvatar = true,
}: UserWelcomeBannerProps) {
  const { avatarUrl, initials } = useAvatar()

  const currentHour = new Date().getHours()
  const timeBasedGreeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening"

  const displayGreeting = greeting === "auto" ? timeBasedGreeting : greeting

  return (
    <motion.div
      className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {showAvatar && (
        <EnhancedAvatar
          src={avatarUrl || ""}
          alt={`${userName}'s profile`}
          initials={initials}
          size="lg"
          className="border-2 border-white shadow-lg"
        />
      )}
      <div>
        <motion.p
          className="text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {displayGreeting}
        </motion.p>
        <motion.h1
          className="text-2xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {userName}
        </motion.h1>
      </div>
    </motion.div>
  )
}

