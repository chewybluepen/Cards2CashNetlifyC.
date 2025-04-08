"use client"

import { useEffect, useState } from "react"
import confetti from "canvas-confetti"

interface ConfettiAnimationProps {
  duration?: number
  particleCount?: number
  spread?: number
  colors?: string[]
  trigger?: boolean
}

export function ConfettiAnimation({
  duration = 3000,
  particleCount = 100,
  spread = 70,
  colors = ["#1E40AF", "#3B82F6", "#60A5FA", "#93C5FD", "#DBEAFE"],
  trigger = false,
}: ConfettiAnimationProps) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (trigger && !isActive) {
      setIsActive(true)

      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: particleCount / 10,
          angle: 60,
          spread,
          origin: { x: 0, y: 0.8 },
          colors,
        })

        confetti({
          particleCount: particleCount / 10,
          angle: 120,
          spread,
          origin: { x: 1, y: 0.8 },
          colors,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        } else {
          setIsActive(false)
        }
      }

      frame()
    }
  }, [trigger, isActive, duration, particleCount, spread, colors])

  return null
}

