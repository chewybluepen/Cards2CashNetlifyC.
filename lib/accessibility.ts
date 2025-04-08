// Utility functions for accessibility and UI enhancements

// Generate a consistent color based on initials
export function generateAvatarColor(initials: string): string {
  // Simple hash function to generate a number from a string
  const hash = initials.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)

  // Use the hash to select from a set of predefined colors
  const colors = [
    "#1E40AF", // Blue
    "#047857", // Green
    "#B91C1C", // Red
    "#7E22CE", // Purple
    "#C2410C", // Orange
    "#0E7490", // Cyan
    "#4338CA", // Indigo
    "#A16207", // Amber
    "#0F766E", // Teal
    "#9D174D", // Pink
  ]

  const index = Math.abs(hash) % colors.length
  return colors[index]
}

// Setup keyboard navigation for better accessibility
export function setupKeyboardNavigation(containerId: string): void {
  if (typeof window === "undefined") return

  // This function would be implemented to enhance keyboard navigation
  // For example, adding focus trapping, arrow key navigation, etc.

  // For now, we'll just log that it's been set up
  console.log(`Keyboard navigation set up for ${containerId}`)
}

// Convert hex color to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

// Calculate relative luminance for WCAG contrast ratio
export function getLuminance(color: string): number {
  const rgb = hexToRgb(color)
  if (!rgb) return 0

  const { r, g, b } = rgb
  const [R, G, B] = [r, g, b].map((c) => {
    const val = c / 255
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

// Check contrast ratio for accessibility
export function checkContrastRatio(foreground: string, background: string): number {
  const lumA = getLuminance(foreground)
  const lumB = getLuminance(background)

  const lighter = Math.max(lumA, lumB)
  const darker = Math.min(lumA, lumB)

  return (lighter + 0.05) / (darker + 0.05)
}

// Get a color with sufficient contrast
export function getAccessibleColor(baseColor: string, targetColor: string, minContrast = 4.5): string {
  // If contrast is already sufficient, return the target color
  const initialContrast = checkContrastRatio(baseColor, targetColor)
  if (initialContrast >= minContrast) return targetColor

  // Otherwise, adjust the target color to meet contrast requirements
  const baseLum = getLuminance(baseColor)
  const rgb = hexToRgb(targetColor)
  if (!rgb) return targetColor

  // Determine if we need to lighten or darken
  const needsLightening = baseLum < 0.5

  let adjustedColor = targetColor
  let steps = 0
  let currentContrast = initialContrast

  // Adjust color until sufficient contrast is achieved
  while (currentContrast < minContrast && steps < 20) {
    const currentRgb = hexToRgb(adjustedColor)
    if (!currentRgb) break

    if (needsLightening) {
      // Lighten
      currentRgb.r = Math.min(255, currentRgb.r + 10)
      currentRgb.g = Math.min(255, currentRgb.g + 10)
      currentRgb.b = Math.min(255, currentRgb.b + 10)
    } else {
      // Darken
      currentRgb.r = Math.max(0, currentRgb.r - 10)
      currentRgb.g = Math.max(0, currentRgb.g - 10)
      currentRgb.b = Math.max(0, currentRgb.b - 10)
    }

    adjustedColor = `#${currentRgb.r.toString(16).padStart(2, "0")}${currentRgb.g.toString(16).padStart(2, "0")}${currentRgb.b.toString(16).padStart(2, "0")}`
    currentContrast = checkContrastRatio(baseColor, adjustedColor)
    steps++
  }

  return adjustedColor
}

// Format currency with proper localization
export function formatCurrency(amount: number, currency = "GYD"): string {
  return new Intl.NumberFormat("en-GY", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

// Handle screen reader announcements
export function announceToScreenReader(message: string): void {
  if (typeof window === "undefined") return

  // Create or use an existing live region
  let announcer = document.getElementById("screen-reader-announcer")

  if (!announcer) {
    announcer = document.createElement("div")
    announcer.id = "screen-reader-announcer"
    announcer.setAttribute("aria-live", "polite")
    announcer.setAttribute("aria-atomic", "true")
    announcer.className = "sr-only"
    document.body.appendChild(announcer)
  }

  // Set the message
  announcer.textContent = message

  // Clear after a delay
  setTimeout(() => {
    announcer.textContent = ""
  }, 3000)
}

