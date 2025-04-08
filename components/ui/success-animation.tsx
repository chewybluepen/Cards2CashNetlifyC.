"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface SuccessAnimationProps {
  onComplete?: () => void
  autoPlay?: boolean
  size?: "sm" | "md" | "lg"
  duration?: number
}

export function SuccessAnimation({ onComplete, autoPlay = true, size = "md", duration = 2000 }: SuccessAnimationProps) {
  // Size mapping
  const sizeMap = {
    sm: { circle: 40, icon: 20 },
    md: { circle: 64, icon: 32 },
    lg: { circle: 96, icon: 48 },
  }

  const dimensions = sizeMap[size]

  // Handle completion callback
  useEffect(() => {
    if (autoPlay && onComplete) {
      const timer = setTimeout(() => {
        onComplete()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [autoPlay, onComplete, duration])

  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative"
      >
        {/* Outer circle */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          className="absolute inset-0 rounded-full bg-green-500"
          style={{
            width: dimensions.circle,
            height: dimensions.circle,
          }}
        />

        {/* Inner circle */}
        <motion.div
          className="relative flex items-center justify-center rounded-full bg-green-500"
          style={{
            width: dimensions.circle,
            height: dimensions.circle,
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
          >
            <CheckCircle className="text-white" size={dimensions.icon} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

