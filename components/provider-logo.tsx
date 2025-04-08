import Image from "next/image"

interface ProviderLogoProps {
  provider: string
  size?: number
  className?: string
}

export function ProviderLogo({ provider, size = 40, className = "" }: ProviderLogoProps) {
  // Provider brand colors for fallback backgrounds
  const providerColors: Record<string, string> = {
    // Guyanese providers
    gtt: "#00529B", // GTT blue
    digicel: "#CE0E2D", // Digicel red
    enetworks: "#00A651", // E-Networks green
    greenict: "#39B54A", // Green ICT green

    // International providers
    rogers: "#EA4335", // Rogers red
    bell: "#0061AD", // Bell blue
    att: "#00A8E0", // AT&T blue
    verizon: "#CD040B", // Verizon red
    tmobile: "#E20074", // T-Mobile magenta
    vodafone: "#E60000", // Vodafone red
    orange: "#FF7900", // Orange orange
  }

  // Provider initials for fallback text
  const providerInitials: Record<string, string> = {
    gtt: "GTT",
    digicel: "DG",
    enetworks: "EN",
    greenict: "GI",
    rogers: "RG",
    bell: "BL",
    att: "AT",
    verizon: "VZ",
    tmobile: "TM",
    vodafone: "VF",
    orange: "OR",
  }

  // Function to get the logo URL
  const getLogoUrl = (providerId: string): string => {
    return `/providers/${providerId.toLowerCase()}.png`
  }

  // Function to render fallback content
  const renderFallback = () => {
    const bgColor = providerColors[provider] || "#333333"
    const initial = providerInitials[provider] || provider.substring(0, 2).toUpperCase()

    return (
      <div
        className={`flex h-full w-full items-center justify-center rounded-full ${className}`}
        style={{ backgroundColor: bgColor }}
      >
        <span className="text-white font-bold text-sm">{initial}</span>
      </div>
    )
  }

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      <Image
        src={getLogoUrl(provider) || "/placeholder.svg"}
        alt={`${provider} logo`}
        width={size}
        height={size}
        className="h-full w-full object-contain"
        onError={(e) => {
          // Hide the image on error
          e.currentTarget.style.display = "none"

          // Find the parent div and add the fallback
          const parent = e.currentTarget.parentElement
          if (parent) {
            // Create a fallback element
            const fallback = document.createElement("div")
            fallback.className = "flex h-full w-full items-center justify-center rounded-full"
            fallback.style.backgroundColor = providerColors[provider] || "#333333"

            // Add the provider initial
            const initial = document.createElement("span")
            initial.className = "text-white font-bold text-sm"
            initial.textContent = providerInitials[provider] || provider.substring(0, 2).toUpperCase()

            fallback.appendChild(initial)
            parent.appendChild(fallback)
          }
        }}
      />
    </div>
  )
}

