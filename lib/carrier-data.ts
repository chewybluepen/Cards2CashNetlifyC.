export interface Carrier {
  id: string
  name: string
  shortName?: string
  country: string
  region: string
  logo: string
  currencies: string[]
  isGuyanese: boolean
  popularityRank?: number
}

// Carrier data with logos from icons8
export const carriers: Carrier[] = [
  // Guyanese Carriers
  {
    id: "digicel",
    name: "Digicel Guyana",
    shortName: "Digicel",
    country: "Guyana",
    region: "South America",
    logo: "https://img.icons8.com/color/96/digicel.png",
    currencies: ["GYD", "USD"],
    isGuyanese: true,
    popularityRank: 1,
  },
  {
    id: "gtt",
    name: "Guyana Telephone & Telegraph",
    shortName: "GTT",
    country: "Guyana",
    region: "South America",
    logo: "https://img.icons8.com/color/96/phone-office.png", // Placeholder
    currencies: ["GYD", "USD"],
    isGuyanese: true,
    popularityRank: 2,
  },
  {
    id: "enetworks",
    name: "E-Networks",
    country: "Guyana",
    region: "South America",
    logo: "https://img.icons8.com/color/96/wifi-router.png", // Placeholder
    currencies: ["GYD", "USD"],
    isGuyanese: true,
    popularityRank: 3,
  },
  {
    id: "greenict",
    name: "Green ICT",
    country: "Guyana",
    region: "South America",
    logo: "https://img.icons8.com/color/96/ecology.png", // Placeholder
    currencies: ["GYD"],
    isGuyanese: true,
    popularityRank: 4,
  },

  // North America
  {
    id: "att",
    name: "AT&T",
    country: "United States",
    region: "North America",
    logo: "https://img.icons8.com/color/96/att.png",
    currencies: ["USD"],
    isGuyanese: false,
    popularityRank: 5,
  },
  {
    id: "verizon",
    name: "Verizon",
    country: "United States",
    region: "North America",
    logo: "https://img.icons8.com/color/96/verizon.png",
    currencies: ["USD"],
    isGuyanese: false,
    popularityRank: 6,
  },
  {
    id: "tmobile",
    name: "T-Mobile",
    country: "United States",
    region: "North America",
    logo: "https://img.icons8.com/color/96/t-mobile.png",
    currencies: ["USD"],
    isGuyanese: false,
    popularityRank: 7,
  },
  {
    id: "rogers",
    name: "Rogers",
    country: "Canada",
    region: "North America",
    logo: "https://img.icons8.com/color/96/rogers.png",
    currencies: ["CAD"],
    isGuyanese: false,
    popularityRank: 8,
  },
  {
    id: "bell",
    name: "Bell",
    country: "Canada",
    region: "North America",
    logo: "https://img.icons8.com/color/96/bell.png",
    currencies: ["CAD"],
    isGuyanese: false,
    popularityRank: 9,
  },
  {
    id: "telcel",
    name: "Telcel",
    country: "Mexico",
    region: "North America",
    logo: "https://img.icons8.com/color/96/telcel.png",
    currencies: ["MXN"],
    isGuyanese: false,
    popularityRank: 10,
  },

  // Caribbean
  {
    id: "flow",
    name: "Flow",
    country: "Caribbean",
    region: "Caribbean",
    logo: "https://img.icons8.com/color/96/water-flow.png", // Placeholder
    currencies: ["BBD", "JMD", "TTD", "USD"],
    isGuyanese: false,
    popularityRank: 11,
  },
  {
    id: "digicel_jamaica",
    name: "Digicel Jamaica",
    country: "Jamaica",
    region: "Caribbean",
    logo: "https://img.icons8.com/color/96/digicel.png",
    currencies: ["JMD"],
    isGuyanese: false,
    popularityRank: 12,
  },
  {
    id: "bmobile",
    name: "bmobile",
    country: "Trinidad and Tobago",
    region: "Caribbean",
    logo: "https://img.icons8.com/color/96/mobile-phone.png", // Placeholder
    currencies: ["TTD"],
    isGuyanese: false,
    popularityRank: 13,
  },

  // Europe
  {
    id: "vodafone",
    name: "Vodafone",
    country: "United Kingdom",
    region: "Europe",
    logo: "https://img.icons8.com/color/96/vodafone.png",
    currencies: ["GBP", "EUR"],
    isGuyanese: false,
    popularityRank: 14,
  },
  {
    id: "o2",
    name: "O2",
    country: "United Kingdom",
    region: "Europe",
    logo: "https://img.icons8.com/color/96/o2.png",
    currencies: ["GBP"],
    isGuyanese: false,
    popularityRank: 15,
  },
  {
    id: "orange",
    name: "Orange",
    country: "France",
    region: "Europe",
    logo: "https://img.icons8.com/color/96/orange.png",
    currencies: ["EUR"],
    isGuyanese: false,
    popularityRank: 16,
  },
  {
    id: "deutsche_telekom",
    name: "Deutsche Telekom",
    country: "Germany",
    region: "Europe",
    logo: "https://img.icons8.com/color/96/deutsche-telekom.png",
    currencies: ["EUR"],
    isGuyanese: false,
    popularityRank: 17,
  },

  // Asia
  {
    id: "airtel",
    name: "Airtel",
    country: "India",
    region: "Asia",
    logo: "https://img.icons8.com/color/96/airtel.png",
    currencies: ["INR"],
    isGuyanese: false,
    popularityRank: 18,
  },
  {
    id: "jio",
    name: "Jio",
    country: "India",
    region: "Asia",
    logo: "https://img.icons8.com/color/96/jio.png",
    currencies: ["INR"],
    isGuyanese: false,
    popularityRank: 19,
  },
  {
    id: "china_mobile",
    name: "China Mobile",
    country: "China",
    region: "Asia",
    logo: "https://img.icons8.com/color/96/china-mobile.png",
    currencies: ["CNY"],
    isGuyanese: false,
    popularityRank: 20,
  },
  {
    id: "singtel",
    name: "Singtel",
    country: "Singapore",
    region: "Asia",
    logo: "https://img.icons8.com/color/96/singapore.png", // Placeholder
    currencies: ["SGD"],
    isGuyanese: false,
    popularityRank: 21,
  },
]

// Function to get carriers by region
export function getCarriersByRegion() {
  const guyaneseCarriers = carriers.filter((carrier) => carrier.isGuyanese)
  const internationalCarriers = carriers.filter((carrier) => !carrier.isGuyanese)

  // Group international carriers by region
  const carriersByRegion = internationalCarriers.reduce(
    (acc, carrier) => {
      if (!acc[carrier.region]) {
        acc[carrier.region] = []
      }
      acc[carrier.region].push(carrier)
      return acc
    },
    {} as Record<string, Carrier[]>,
  )

  return {
    guyaneseCarriers,
    carriersByRegion,
  }
}

// Function to get recently used carriers (would normally use localStorage or API)
export function getRecentlyUsedCarriers() {
  // This would normally fetch from localStorage or an API
  // For demo purposes, return the first 3 carriers
  return carriers.slice(0, 3)
}

// Function to search carriers
export function searchCarriers(query: string) {
  if (!query) return carriers

  const lowerQuery = query.toLowerCase()
  return carriers.filter(
    (carrier) =>
      carrier.name.toLowerCase().includes(lowerQuery) ||
      carrier.country.toLowerCase().includes(lowerQuery) ||
      carrier.region.toLowerCase().includes(lowerQuery),
  )
}

// Function to filter carriers by currency
export function filterCarriersByCurrency(currencyCode: string) {
  if (!currencyCode) return carriers

  return carriers.filter((carrier) => carrier.currencies.includes(currencyCode))
}

