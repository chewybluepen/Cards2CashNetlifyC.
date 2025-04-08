import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface HighContrastTextProps {
  children: ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  color?: "default" | "muted" | "primary" | "white" | "black"
}

export function HighContrastText({
  children,
  className,
  as: Component = "span",
  color = "default",
}: HighContrastTextProps) {
  const colorClasses = {
    default: "text-foreground",
    muted: "text-[#BFBFBF]", // Higher contrast muted text
    primary: "text-primary font-medium",
    white: "text-white font-medium",
    black: "text-black font-medium",
  }

  return <Component className={cn("high-contrast-text", colorClasses[color], className)}>{children}</Component>
}

