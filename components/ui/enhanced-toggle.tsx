"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface EnhancedToggleProps {
  options: string[]
  defaultSelected?: number
  onChange?: (selectedIndex: number) => void
  className?: string
}

export function EnhancedToggle({ options, defaultSelected = 0, onChange, className = "" }: EnhancedToggleProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected)

  const handleSelect = (index: number) => {
    setSelectedIndex(index)
    if (onChange) onChange(index)
  }

  return (
    <div className={`flex rounded-lg bg-gray-100 p-1 ${className}`}>
      {options.map((option, index) => (
        <div key={index} className="relative flex-1">
          {selectedIndex === index && (
            <motion.div
              layoutId="toggleBackground"
              className="absolute inset-0 rounded-md bg-primary"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <button
            onClick={() => handleSelect(index)}
            className={`relative z-10 w-full py-2 px-4 text-sm font-medium transition-colors ${
              selectedIndex === index ? "toggle-active text-white" : "text-gray-900 hover:text-gray-900" // Improved contrast from gray-700
            }`}
            aria-pressed={selectedIndex === index}
          >
            {option}
          </button>
        </div>
      ))}
    </div>
  )
}

