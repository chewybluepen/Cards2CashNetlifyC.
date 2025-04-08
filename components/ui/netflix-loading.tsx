"use client"

import { motion } from "framer-motion"

interface NetflixLoadingProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function NetflixLoading({ size = "md", className = "" }: NetflixLoadingProps) {
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "h-16 w-16"
      case "md":
        return "h-24 w-24"
      case "lg":
        return "h-32 w-32"
      default:
        return "h-24 w-24"
    }
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`relative ${getSizeClass()}`}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          className="absolute inset-0 rounded-md bg-[#E50914]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: 0.5,
          }}
          className="absolute inset-0 rounded-md bg-[#E50914] opacity-75"
        />
      </div>
    </div>
  )
}

