"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { CheckCircle } from "lucide-react"

interface CelebrationAnimationProps {
  show: boolean
  message?: string
  onComplete?: () => void
  playSound?: boolean
  duration?: number
}

export function CelebrationAnimation({
  show,
  message = "Success!",
  onComplete,
  playSound = true,
  duration = 2000,
}: CelebrationAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setIsVisible(true)

      // Play success sound if enabled
      if (playSound && typeof window !== "undefined") {
        const audio = new Audio("/sounds/success-chime.mp3")
        audio.volume = 0.5
        audio.play().catch((err) => console.log("Audio playback prevented by browser"))
      }

      // Trigger confetti
      if (typeof window !== "undefined") {
        const end = Date.now() + duration

        // More festive confetti with multiple colors and shapes
        const colors = ["#1a73e8", "#34a853", "#fbbc04", "#ea4335", "#4285f4"]
        ;(function frame() {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
          })

          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
          })

          if (Date.now() < end) {
            requestAnimationFrame(frame)
          }
        })()
      }

      // Hide animation after duration
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onComplete) onComplete()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [show, onComplete, playSound, duration])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-white/90 rounded-full p-8 shadow-lg flex flex-col items-center success-animation"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 10,
                delay: 0.1,
              }}
            >
              <CheckCircle className="h-16 w-16 text-green-500 mb-2" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl font-medium text-gray-800"
            >
              {message}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

