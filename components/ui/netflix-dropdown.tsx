"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface NetflixDropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "left" | "right" | "center"
  width?: string
  className?: string
}

export function NetflixDropdown({
  trigger,
  children,
  align = "left",
  width = "w-56",
  className = "",
}: NetflixDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const getAlignmentClasses = () => {
    switch (align) {
      case "left":
        return "left-0"
      case "right":
        return "right-0"
      case "center":
        return "left-1/2 -translate-x-1/2"
      default:
        return "left-0"
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer inline-flex">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 mt-3 ${width} ${getAlignmentClasses()} bg-[#141414] border border-[#333333] rounded-md shadow-lg overflow-hidden`}
            style={{
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div className="py-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface NetflixDropdownItemProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  icon?: React.ReactNode
}

export function NetflixDropdownItem({ children, onClick, className = "", icon }: NetflixDropdownItemProps) {
  return (
    <button
      className={`w-full text-left px-4 py-3 text-sm text-white hover:bg-[#333333] transition-colors flex items-center ${className}`}
      onClick={onClick}
    >
      {icon && <span className="mr-3">{icon}</span>}
      {children}
    </button>
  )
}

export function NetflixDropdownSeparator() {
  return <div className="my-1 h-px bg-[#333333] mx-2" />
}

