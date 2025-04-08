"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface PulseAnimationProps {
  children: ReactNode
  className?: string
}

export function PulseAnimation({ children, className }: PulseAnimationProps) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

