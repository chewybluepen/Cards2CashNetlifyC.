"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnimatedNetflixCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  hoverScale?: number
  hoverY?: number
  delay?: number
  duration?: number
}

export const AnimatedNetflixCard = React.forwardRef<HTMLDivElement, AnimatedNetflixCardProps>(
  ({ children, className, hoverScale = 1.05, hoverY = -10, delay = 0, duration = 0.3, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration, delay }}
        whileHover={{
          scale: hoverScale,
          y: hoverY,
          transition: { duration: 0.2 },
        }}
        className={cn("", className)}
        {...props}
      >
        <Card className="border-[#333333] bg-[#141414] text-white shadow-lg">{children}</Card>
      </motion.div>
    )
  },
)

AnimatedNetflixCard.displayName = "AnimatedNetflixCard"

