"use client"

import { motion } from "framer-motion"
import { CheckCircle, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  title: string
  description?: string
}

interface ProgressTrackerProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function ProgressTracker({ steps, currentStep, className }: ProgressTrackerProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex justify-between">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 h-0.5 w-full -translate-y-1/2 bg-gray-200">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: 0 }}
            animate={{
              width: `${(100 * (currentStep - 1)) / (steps.length - 1)}%`,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div key={step.id} className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.3 }}
              className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white"
            >
              {index < currentStep ? (
                <CheckCircle className="h-8 w-8 text-blue-600" />
              ) : index === currentStep ? (
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    backgroundColor: ["rgb(219, 234, 254)", "rgb(147, 197, 253)", "rgb(219, 234, 254)"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="h-8 w-8 rounded-full border-2 border-blue-600 bg-blue-100"
                >
                  <span className="flex h-full w-full items-center justify-center text-sm font-medium text-blue-600">
                    {index + 1}
                  </span>
                </motion.div>
              ) : (
                <Circle className="h-8 w-8 text-gray-300" />
              )}
            </motion.div>

            <div className="mt-2 text-center">
              <p className={cn("text-sm font-medium", index <= currentStep ? "text-blue-600" : "text-gray-500")}>
                {step.title}
              </p>
              {step.description && <p className="mt-1 text-xs text-gray-500">{step.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

