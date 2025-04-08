"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface ButtonAnimationProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export function ButtonAnimation({ children, onClick, className }: ButtonAnimationProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onClick} className={className}>
      {children}
    </motion.div>
  )
}

