"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { Carrier } from "@/lib/carrier-data"

interface CarrierCardProps {
  carrier: Carrier
  selected: boolean
  onSelect: (carrier: Carrier) => void
}

export function CarrierCard({ carrier, selected, onSelect }: CarrierCardProps) {
  const [imageError, setImageError] = useState(false)

  // Fallback for image error
  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-colors ${
              selected ? "bg-primary/10 border-2 border-primary" : "bg-white border border-gray-200 hover:bg-gray-50"
            }`}
            onClick={() => onSelect(carrier)}
          >
            <div className="relative w-12 h-12 mb-2">
              {!imageError ? (
                <Image
                  src={carrier.logo || "/placeholder.svg"}
                  alt={carrier.name}
                  width={48}
                  height={48}
                  className="object-contain"
                  onError={handleImageError}
                />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
                  <span className="text-lg font-bold text-gray-600">
                    {carrier.shortName || carrier.name.substring(0, 2)}
                  </span>
                </div>
              )}

              {carrier.isGuyanese && (
                <div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                  aria-label="Guyanese carrier"
                />
              )}
            </div>

            <span className="text-xs font-medium text-center line-clamp-1">{carrier.shortName || carrier.name}</span>

            <span className="text-[10px] text-gray-500 mt-1">{carrier.country}</span>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm">
            <p className="font-bold">{carrier.name}</p>
            <p className="text-xs">{carrier.country}</p>
            <p className="text-xs mt-1">Currencies: {carrier.currencies.join(", ")}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

