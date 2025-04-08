"use client"
import type { ReactNode } from "react"

interface EnhancedPageTransitionProps {
  children: ReactNode
}

// Completely simplified version - no animations for now to fix the error
export function EnhancedPageTransition({ children }: EnhancedPageTransitionProps) {
  return <div className="flex-1">{children}</div>
}

