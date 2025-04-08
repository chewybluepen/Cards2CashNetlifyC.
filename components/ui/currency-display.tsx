import { formatCurrency, type FormatCurrencyOptions } from "@/lib/currency-utils"

interface CurrencyDisplayProps {
  amount: number
  currency?: string
  options?: FormatCurrencyOptions
  className?: string
}

export function CurrencyDisplay({ amount, currency = "USD", options = {}, className = "" }: CurrencyDisplayProps) {
  const formattedCurrency = formatCurrency(amount, currency, options)

  return <span className={`tabular-nums ${className}`}>{formattedCurrency}</span>
}

// Specialized variants for common use cases
export function CompactCurrencyDisplay({
  amount,
  currency = "USD",
  className = "",
}: Omit<CurrencyDisplayProps, "options">) {
  return (
    <CurrencyDisplay amount={amount} currency={currency} options={{ style: "symbol-code" }} className={className} />
  )
}

export function SymbolOnlyCurrencyDisplay({
  amount,
  currency = "USD",
  className = "",
}: Omit<CurrencyDisplayProps, "options">) {
  return <CurrencyDisplay amount={amount} currency={currency} options={{ style: "symbol" }} className={className} />
}

export function FullCurrencyDisplay({
  amount,
  currency = "USD",
  className = "",
}: Omit<CurrencyDisplayProps, "options">) {
  return <CurrencyDisplay amount={amount} currency={currency} options={{ style: "name" }} className={className} />
}

