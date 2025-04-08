"use client"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  color?: "primary" | "secondary" | "accent" | "white"
  text?: string
}

export function LoadingSpinner({ size = "md", color = "primary", text }: LoadingSpinnerProps) {
  // Size mapping
  const sizeMap = {
    sm: 24,
    md: 40,
    lg: 64,
  }

  // Color mapping
  const colorMap = {
    primary: "border-primary",
    secondary: "border-secondary",
    accent: "border-accent",
    white: "border-white",
  }

  const spinnerSize = sizeMap[size]
  const spinnerColor = colorMap[color]

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{
          width: spinnerSize,
          height: spinnerSize,
        }}
        className={`rounded-full border-4 border-t-transparent ${spinnerColor}`}
      />

      {text && <p className="mt-3 text-sm text-gray-600">{text}</p>}
    </div>
  )
}

