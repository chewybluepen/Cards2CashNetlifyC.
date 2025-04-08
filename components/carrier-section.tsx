"use client"

import type { Carrier } from "@/lib/carrier-data"
import { CarrierCard } from "./carrier-card"

interface CarrierSectionProps {
  title: string
  carriers: Carrier[]
  selectedCarrier: string
  onSelectCarrier: (carrier: Carrier) => void
  className?: string
}

export function CarrierSection({
  title,
  carriers,
  selectedCarrier,
  onSelectCarrier,
  className = "",
}: CarrierSectionProps) {
  if (carriers.length === 0) {
    return null
  }

  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {carriers.map((carrier) => (
          <CarrierCard
            key={carrier.id}
            carrier={carrier}
            selected={selectedCarrier === carrier.id}
            onSelect={onSelectCarrier}
          />
        ))}
      </div>
    </div>
  )
}

