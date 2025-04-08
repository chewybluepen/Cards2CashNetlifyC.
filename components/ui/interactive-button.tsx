"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface InteractiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "netflix"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  ripple?: boolean
  hoverScale?: number
  tapScale?: number
  loading?: boolean
  loadingText?: string
  successText?: string
  showSuccess?: boolean
}

export const InteractiveButton = React.forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  (
    {
      children,
      variant = "default",
      size = "default",
      className,
      ripple = true,
      loading = false,
      loadingText,
      successText,
      showSuccess = false,
      ...props
    },
    ref,
  ) => {
    const [isRippling, setIsRippling] = React.useState(false)
    const [ripplePosition, setRipplePosition] = React.useState({ x: 0, y: 0 })

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple) {
        const rect = e.currentTarget.getBoundingClientRect()
        setRipplePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
        setIsRippling(true)
      }

      props.onMouseDown?.(e)
    }

    React.useEffect(() => {
      if (isRippling) {
        const timer = setTimeout(() => setIsRippling(false), 500)
        return () => clearTimeout(timer)
      }
    }, [isRippling])

    const netflixVariant =
      variant === "netflix"
        ? {
            className: "bg-[#E50914] text-white hover:bg-[#B20710]",
          }
        : {}

    return (
      <div className="relative inline-block">
        <Button
          ref={ref}
          variant={variant === "netflix" ? "default" : variant}
          size={size}
          className={cn(
            "relative overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95",
            netflixVariant.className,
            className,
          )}
          onMouseDown={handleMouseDown}
          disabled={loading || showSuccess || props.disabled}
          {...props}
        >
          {loading ? (
            <span className="flex items-center">
              <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
              {loadingText || "Loading..."}
            </span>
          ) : showSuccess ? (
            <span className="flex items-center">
              <svg className="mr-2 h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {successText || "Success!"}
            </span>
          ) : (
            children
          )}
          {isRippling && ripple && (
            <span
              className="absolute rounded-full bg-white opacity-25 transition-all duration-500"
              style={{
                left: ripplePosition.x,
                top: ripplePosition.y,
                width: 20,
                height: 20,
                transform: "translate(-50%, -50%) scale(4)",
                animation: "ripple 0.5s linear",
              }}
            />
          )}
        </Button>
      </div>
    )
  },
)

InteractiveButton.displayName = "InteractiveButton"

