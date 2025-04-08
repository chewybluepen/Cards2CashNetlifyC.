"use client"

import { useEffect, useRef } from "react"

interface FinancialPatternProps {
  variant?: "light" | "dark"
  opacity?: number
}

export function FinancialPattern({ variant = "light", opacity = 0.03 }: FinancialPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Draw pattern
    const symbols = ["$", "₹", "€", "£", "¥"]
    const color = variant === "light" ? "#000000" : "#FFFFFF"
    ctx.fillStyle = color
    ctx.globalAlpha = opacity

    // Create pattern
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const symbol = symbols[Math.floor(Math.random() * symbols.length)]
      ctx.font = `${Math.random() * 20 + 10}px Arial`
      ctx.fillText(symbol, x, y)
    }

    return () => {
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [variant, opacity])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />
}

