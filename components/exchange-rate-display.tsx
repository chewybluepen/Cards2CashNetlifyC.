"use client"
import { ChevronDown, ChevronUp, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Provider {
  id: string
  name: string
  exchangeRate: number
  processingFee: number
  minAmount: number
  maxAmount: number
  processingTime: string
  country?: string
  isLocal?: boolean
}

interface ExchangeRateDisplayProps {
  provider?: Provider
  amount: number
  showDetails: boolean
  onToggleDetails: () => void
  currencySymbol?: string
}

export function ExchangeRateDisplay({
  provider,
  amount,
  showDetails,
  onToggleDetails,
  currencySymbol = "GYD",
}: ExchangeRateDisplayProps) {
  if (!provider) return null

  const baseConversion = amount * provider.exchangeRate
  const fee = amount * provider.processingFee * provider.exchangeRate
  const finalAmount = baseConversion - fee

  return (
    <div className="rounded-lg border border-[#333333] bg-[#1F1F1F] overflow-hidden">
      <div className="flex cursor-pointer items-center justify-between p-3" onClick={onToggleDetails}>
        <div className="flex items-center">
          <Info className="mr-2 h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-white">Exchange Rate Details</span>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400">
          {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {showDetails && (
        <div className="border-t border-[#333333] p-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Exchange Rate:</span>
              <span className="text-white">
                1 {currencySymbol} = ${provider.exchangeRate.toFixed(4)} USD
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Base Conversion:</span>
              <span className="text-white">${baseConversion.toFixed(2)} USD</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Processing Fee ({(provider.processingFee * 100).toFixed(1)}%):</span>
              <span className="text-white">-${fee.toFixed(2)} USD</span>
            </div>
            <div className="border-t border-[#333333] pt-2 flex items-center justify-between font-medium">
              <span className="text-gray-400">Final Amount:</span>
              <span className="text-white">${finalAmount.toFixed(2)} USD</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

