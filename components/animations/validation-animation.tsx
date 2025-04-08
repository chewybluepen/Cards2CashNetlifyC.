"use client"

import { motion, AnimatePresence } from "framer-motion"
import type { ReactNode } from "react"

interface ValidationAnimationProps {
  children: ReactNode
  isVisible: boolean
  isSuccess?: boolean
}

export function ValidationAnimation({ children, isVisible, isSuccess = true }: ValidationAnimationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0, y: -10 }}
          animate={{ opacity: 1, height: "auto", y: 0 }}
          exit={{ opacity: 0, height: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={`overflow-hidden ${isSuccess ? "text-green-600" : "text-red-600"}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

