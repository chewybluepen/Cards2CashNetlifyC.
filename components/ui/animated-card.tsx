"use client"

import { motion } from "framer-motion"
import { Card, type CardProps } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { cardHoverEffect } from "@/lib/animation-utils"
import { forwardRef, type ReactNode } from "react"

interface AnimatedCardProps extends CardProps {
  children: ReactNode
  interactive?: boolean
  delay?: number
  index?: number
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, className, interactive = true, delay = 0, index = 0, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: delay * index,
            duration: 0.4,
            ease: "easeOut",
          },
        }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={interactive ? cardHoverEffect.hover : undefined}
        whileTap={interactive ? { scale: 0.98 } : undefined}
        className="w-full"
      >
        <Card ref={ref} className={cn(className)} {...props}>
          {children}
        </Card>
      </motion.div>
    )
  },
)

AnimatedCard.displayName = "AnimatedCard"

