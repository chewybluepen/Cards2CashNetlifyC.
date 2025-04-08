"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface EnhancedDropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "left" | "right" | "center"
  width?: string
  className?: string
  contentClassName?: string
  triggerClassName?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function EnhancedDropdown({
  trigger,
  children,
  align = "left",
  width = "w-56",
  className,
  contentClassName,
  triggerClassName,
  open: controlledOpen,
  onOpenChange,
}: EnhancedDropdownProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    const newState = !open
    if (!isControlled) {
      setUncontrolledOpen(newState)
    }
    onOpenChange?.(newState)
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (!isControlled) {
          setUncontrolledOpen(false)
        } else {
          onOpenChange?.(false)
        }
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, isControlled, onOpenChange])

  const alignClasses = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2",
  }

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div onClick={handleToggle} className={cn("flex cursor-pointer items-center", triggerClassName)}>
        {trigger}
        <ChevronDown
          className={cn("ml-2 h-4 w-4 transition-transform duration-200", open ? "rotate-180" : "rotate-0")}
        />
      </div>

      {open && (
        <div
          className={cn(
            "absolute z-50 mt-3 overflow-hidden rounded-md border border-[#333333] bg-[#141414] shadow-lg",
            alignClasses[align],
            width,
            contentClassName,
          )}
          style={{
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="py-2">{children}</div>
        </div>
      )}
    </div>
  )
}

interface DropdownItemProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  icon?: React.ReactNode
}

export function DropdownItem({ children, onClick, className, disabled = false, icon }: DropdownItemProps) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={cn(
        "flex w-full items-center px-4 py-3 text-left text-sm text-white hover:bg-[#333333] transition-colors",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      disabled={disabled}
    >
      {icon && <span className="mr-3 flex-shrink-0">{icon}</span>}
      <span className="flex-grow">{children}</span>
    </button>
  )
}

export function DropdownSeparator() {
  return <div className="my-1 h-px bg-[#333333] mx-2" />
}

