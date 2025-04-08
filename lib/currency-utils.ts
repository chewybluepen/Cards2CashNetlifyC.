export type CurrencyDisplayStyle = "symbol" | "code" | "name" | "symbol-code"

export interface FormatCurrencyOptions {
  style?: CurrencyDisplayStyle
  locale?: string
  showDecimals?: boolean
  decimalPlaces?: number
}

/**
 * Formats a currency amount with appropriate symbol, code, or name
 * @param amount - The amount to format
 * @param currency - The ISO currency code (e.g., 'USD', 'GYD', 'EUR')
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency = "USD", options: FormatCurrencyOptions = {}): string {
  const { style = "symbol-code", locale = "en-US", showDecimals = true, decimalPlaces = 2 } = options

  // Currency symbols mapping
  const currencySymbols: Record<string, string> = {
    USD: "$",
    GYD: "G$",
    EUR: "€",
    GBP: "£",
    CAD: "C$",
    AUD: "A$",
    JPY: "¥",
    CNY: "¥",
    INR: "₹",
    BRL: "R$",
    RUB: "₽",
    BTC: "₿",
    ETH: "Ξ",
  }

  // Currency names mapping
  const currencyNames: Record<string, string> = {
    USD: "United States Dollar",
    GYD: "Guyanese Dollar",
    EUR: "Euro",
    GBP: "British Pound",
    CAD: "Canadian Dollar",
    AUD: "Australian Dollar",
    JPY: "Japanese Yen",
    CNY: "Chinese Yuan",
    INR: "Indian Rupee",
    BRL: "Brazilian Real",
    RUB: "Russian Ruble",
    BTC: "Bitcoin",
    ETH: "Ethereum",
    SOL: "Solana",
  }

  // Format the number according to locale and decimal preferences
  const formattedNumber = showDecimals
    ? amount.toLocaleString(locale, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      })
    : amount.toLocaleString(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })

  // Get the symbol and name for the currency
  const symbol = currencySymbols[currency] || ""
  const name = currencyNames[currency] || currency

  // Format according to the requested style
  switch (style) {
    case "symbol":
      return `${symbol}${formattedNumber}`
    case "code":
      return `${formattedNumber} ${currency}`
    case "name":
      return `${formattedNumber} ${name}`
    case "symbol-code":
    default:
      return `${symbol}${formattedNumber} ${currency}`
  }
}

/**
 * Determines the appropriate currency symbol based on locale
 * @param locale - The user's locale
 * @returns The default currency for that locale
 */
export function getLocaleCurrency(locale = "en-US"): string {
  const localeMap: Record<string, string> = {
    "en-US": "USD",
    "en-GB": "GBP",
    "en-CA": "CAD",
    "en-AU": "AUD",
    "en-GY": "GYD",
    "fr-FR": "EUR",
    "de-DE": "EUR",
    "ja-JP": "JPY",
    "zh-CN": "CNY",
    "hi-IN": "INR",
    "pt-BR": "BRL",
    "ru-RU": "RUB",
  }

  return localeMap[locale] || "USD"
}

