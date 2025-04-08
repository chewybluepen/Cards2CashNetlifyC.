"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { socialMediaPlatforms } from "@/lib/social-media-data"

interface SocialMediaIconsProps {
  className?: string
  showLabels?: boolean
  iconSize?: number
  maxIcons?: number
  spacing?: number
}

export function SocialMediaIcons({
  className = "",
  showLabels = false,
  iconSize = 32,
  maxIcons = 10,
  spacing = 4,
}: SocialMediaIconsProps) {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)

  // Only show up to maxIcons
  const visiblePlatforms = socialMediaPlatforms.slice(0, maxIcons)

  return (
    <div className={`flex flex-wrap gap-${spacing} ${className}`}>
      {visiblePlatforms.map((platform) => (
        <motion.div
          key={platform.id}
          className="relative flex flex-col items-center"
          whileHover={{ scale: 1.1 }}
          onHoverStart={() => setHoveredIcon(platform.id)}
          onHoverEnd={() => setHoveredIcon(null)}
        >
          <Link
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-full overflow-hidden"
            aria-label={`Visit our ${platform.name} page`}
          >
            <div
              className="relative"
              style={{
                width: iconSize,
                height: iconSize,
                boxShadow: hoveredIcon === platform.id ? `0 0 8px ${platform.color}` : "none",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <img
                src={platform.iconUrl || "/placeholder.svg"}
                alt={platform.name}
                width={iconSize}
                height={iconSize}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>

          {showLabels && (
            <motion.span
              className="mt-1 text-xs font-medium"
              initial={{ opacity: 0 }}
              animate={{
                opacity: hoveredIcon === platform.id ? 1 : 0.7,
                color: hoveredIcon === platform.id ? platform.color : "#B3B3B3",
              }}
              transition={{ duration: 0.2 }}
            >
              {platform.name}
            </motion.span>
          )}
        </motion.div>
      ))}
    </div>
  )
}

