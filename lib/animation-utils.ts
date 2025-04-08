"use client"

import { useEffect, useState } from "react"

// Animation variants for staggered animations
export const staggeredFadeIn = (delay = 0.1) => ({
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * delay,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
})

// Animation variants for page transitions
export const pageTransition = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
}

// Animation variants for card hover effects
export const cardHoverEffect = {
  rest: { scale: 1, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" },
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
}

// Animation variants for button press effects
export const buttonPressEffect = {
  rest: { scale: 1 },
  pressed: { scale: 0.95, transition: { duration: 0.1 } },
}

// Hook for animated counter
export function useAnimatedCounter(targetValue: number, duration = 1000, startOnMount = true) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startOnMount) return

    let startTime: number
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * targetValue))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)

    return () => cancelAnimationFrame(animationFrame)
  }, [targetValue, duration, startOnMount])

  return count
}

// Hook for animated value (for percentages, etc.)
export function useAnimatedValue(targetValue: number, duration = 1000, decimals = 2) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const updateValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setValue(Number.parseFloat((progress * targetValue).toFixed(decimals)))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateValue)
      }
    }

    animationFrame = requestAnimationFrame(updateValue)

    return () => cancelAnimationFrame(animationFrame)
  }, [targetValue, duration, decimals])

  return value
}

// Hook for sequential reveal animations
export function useSequentialReveal(itemCount: number, delay = 100) {
  const [visibleItems, setVisibleItems] = useState<boolean[]>([])

  useEffect(() => {
    setVisibleItems(new Array(itemCount).fill(false))

    const timers: NodeJS.Timeout[] = []

    for (let i = 0; i < itemCount; i++) {
      const timer = setTimeout(() => {
        setVisibleItems((prev) => {
          const newState = [...prev]
          newState[i] = true
          return newState
        })
      }, i * delay)

      timers.push(timer)
    }

    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [itemCount, delay])

  return visibleItems
}

// Hook for pulse animation
export function usePulse(interval = 2000, initialState = false) {
  const [isPulsing, setIsPulsing] = useState(initialState)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsPulsing((prev) => !prev)
    }, interval)

    return () => clearInterval(timer)
  }, [interval])

  return isPulsing
}

// Hook for typing animation
export function useTypingAnimation(text: string, speed = 50) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDisplayedText("")
    setIsComplete(false)

    let currentIndex = 0
    const timers: NodeJS.Timeout[] = []

    const typeNextChar = () => {
      if (currentIndex < text.length) {
        const timer = setTimeout(() => {
          setDisplayedText((prev) => prev + text[currentIndex])
          currentIndex++
          typeNextChar()
        }, speed)

        timers.push(timer)
      } else {
        setIsComplete(true)
      }
    }

    typeNextChar()

    return () => timers.forEach((timer) => clearTimeout(timer))
  }, [text, speed])

  return { displayedText, isComplete }
}

