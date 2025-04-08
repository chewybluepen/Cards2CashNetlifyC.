"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, AlertCircle } from "lucide-react"

export interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: boolean
  icon?: React.ReactNode
}

const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ className, label, error, success, icon, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10">{icon}</div>}
          <motion.div initial={false} animate={error ? { x: [0, -5, 5, -5, 5, 0] } : {}} transition={{ duration: 0.4 }}>
            <Input
              ref={ref}
              className={cn(
                icon && "pl-10",
                error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                success && "border-secondary focus:border-secondary focus:ring-secondary",
                className,
              )}
              {...props}
            />
          </motion.div>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 z-10"
            >
              <AlertCircle className="h-5 w-5" />
            </motion.div>
          )}
          {success && !error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary z-10"
            >
              <CheckCircle className="h-5 w-5" />
            </motion.div>
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-red-500 mt-1"
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  },
)
EnhancedInput.displayName = "EnhancedInput"

export { EnhancedInput }

