"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NotificationBellProps {
  count?: number
  className?: string
}

export function NotificationBell({ count = 0, className }: NotificationBellProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (count > 0) {
      setIsAnimating(true)

      const timeout = setTimeout(() => {
        setIsAnimating(false)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [count])

  return (
    <Link href="/notifications" className={cn("relative", className)}>
      <motion.div
        animate={
          isAnimating
            ? {
                rotate: [0, -10, 10, -10, 10, 0],
                transition: { duration: 0.5, ease: "easeInOut" },
              }
            : {}
        }
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bell className="h-6 w-6" />

        <AnimatePresence>
          {count > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
            >
              {count > 9 ? "9+" : count}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  )
}

