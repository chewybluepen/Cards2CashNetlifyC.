"\"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { generateAvatarColor } from "@/lib/accessibility"
import { motion } from "framer-motion"

interface EnhancedAvatarProps {
  src?: string
  alt?: string
  initials?: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  interactive?: boolean
}

export function EnhancedAvatar({
  src = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Display%20Picture-lTJxvWvl6No7YQMsgUyVESc1acHx51.png",
  alt = "User avatar",
  initials = "JD",
  size = "md",
  className = "",
  interactive = true,
}: EnhancedAvatarProps) {
  const [imgError, setImgError] = useState(false)
  const [bgColor, setBgColor] = useState<string>("")

  // Generate consistent background color based on initials
  useEffect(() => {
    setBgColor(generateAvatarColor(initials))
  }, [initials])

  // Size mapping
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
    xl: "h-24 w-24",
  }

  const avatarComponent = (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage src={imgError ? "" : src} alt={alt} onError={() => setImgError(true)} />
      <AvatarFallback style={{ backgroundColor: bgColor }} className="text-white font-medium">
        {initials}
      </AvatarFallback>
    </Avatar>
  )

  // If interactive, wrap in motion div for hover effect
  if (interactive) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} className="rounded-full">
        {avatarComponent}
      </motion.div>
    )
  }

  return avatarComponent
}

