"use client"

import { motion } from "framer-motion"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { forwardRef, type ReactNode } from "react"

interface AnimatedButtonProps extends ButtonProps {
  children: ReactNode
  delay?: number
  index?: number
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, delay = 0, index = 0, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: delay * index,
            duration: 0.3,
            ease: "easeOut",
          },
        }}
        whileTap={{ scale: 0.95 }}
        className="w-full"
      >
        <Button ref={ref} className={cn(className)} {...props}>
          {children}
        </Button>
      </motion.div>
    )
  },
)

AnimatedButton.displayName = "AnimatedButton"

