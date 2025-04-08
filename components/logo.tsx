"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "default" | "white"
}

export function Logo({ className = "", size = "md", variant = "default" }: LogoProps) {
  const sizes = {
    sm: 24,
    md: 32,
    lg: 48,
  }

  const dimension = sizes[size]

  return (
    <motion.div className={`flex items-center ${className}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cards2Cash%20Finished%20Logo-SAvaIOrwpKN79yIXXUlSW6CyrRxqXv.webp"
        alt="Cards2Cash Logo"
        width={dimension}
        height={dimension}
        className={variant === "white" ? "brightness-0 invert" : ""}
      />
      <span
        className={`ml-2 font-bold ${variant === "white" ? "text-white" : "text-primary"} ${
          size === "sm" ? "text-sm" : size === "md" ? "text-lg" : "text-2xl"
        }`}
      >
        Cards2Cash
      </span>
    </motion.div>
  )
}

