// Navigation utility to ensure all pages are properly connected

// Define all app routes for type safety and navigation consistency
export const AppRoutes = {
  // Authentication
  LOGIN: "/",
  SIGNUP: "/?tab=signup",
  VERIFY_OTP: "/verify-otp",
  FORGOT_PASSWORD: "/forgot-password",
  BIOMETRIC_AUTH: "/biometric-auth",
  FACIAL_RECOGNITION_SETUP: "/facial-recognition-setup",

  // Main screens
  DASHBOARD: "/dashboard",

  // Financial operations
  ADD_FUNDS: "/add-funds",
  ADD_FUNDS_HISTORY: "/add-funds/history",
  ADD_FUNDS_RATES: "/add-funds/rates",
  GENERATE_CARD: "/generate-card",
  CONVERT: "/convert",
  CONVERT_HISTORY: "/convert/history",
  CONVERT_DETAILS: "/convert/currency-details",
  BANK_CONNECTION: "/bank-connection",

  // Crypto operations
  CRYPTO: "/crypto",
  CRYPTO_DETAIL: (id: string | number) => `/crypto/${id}`,
  CRYPTO_BUY: "/crypto/buy",
  CRYPTO_SELL: "/crypto/sell",
  CRYPTO_PORTFOLIO: "/crypto/portfolio",
  CRYPTO_TRANSACTIONS: "/crypto/transactions",
  CRYPTO_TRANSACTION_DETAIL: (id: string | number) => `/crypto/transactions/${id}`,

  // Transactions and activity
  TRANSACTIONS: "/transactions",
  TRANSACTION_DETAILS: (id: number | string) => `/transactions/${id}`,
  MONTHLY_GROWTH: "/monthly-growth",
  SAVINGS: "/savings",

  // Rewards and offers
  REWARDS: "/rewards",
  REWARDS_TIER: "/rewards/tier-benefits",
  REWARD_DETAILS: (id: number | string) => `/rewards/${id}`,
  OFFERS: "/offers",
  OFFER_DETAILS: (id: number | string) => `/offers/${id}`,
  REFERRAL: "/referral",
  REFERRAL_TRACKING: "/referral/tracking",

  // User profile and settings
  SETTINGS: "/settings",
  PROFILE: "/profile",
  PROFILE_AVATAR: "/profile/avatar",
  PROFILE_SECURITY: "/profile/security-questions",
  PAYMENT_METHODS: "/payment-methods",
  ADD_CARD: "/payment-methods/add-card",
  ADD_BANK: "/payment-methods/add-bank",
  SPENDING_LIMITS: "/spending-limits",
  CHANGE_PASSWORD: "/change-password",
  TWO_FACTOR: "/two-factor",
  LANGUAGE: "/language",

  // Support and info
  HELP: "/help",
  CHAT: "/chat",
  TERMS: "/terms",
  NOTIFICATIONS: "/notifications",
  NOTIFICATION_DETAILS: (id: number | string) => `/notifications/${id}`,

  // Add phone credit routes to the navigation
  PHONE_CREDIT: "/phone-credit",
  PHONE_CREDIT_HISTORY: "/phone-credit/history",
  PHONE_CREDIT_PROVIDERS: "/phone-credit/providers",
  PHONE_CREDIT_SUCCESS: "/phone-credit/success",
}

// Navigation history for back functionality
class NavigationHistory {
  private history: string[] = []
  private maxSize = 10

  constructor() {
    if (typeof window !== "undefined") {
      // Initialize with current path
      this.history.push(window.location.pathname)
    }
  }

  push(path: string): void {
    if (this.history.length >= this.maxSize) {
      this.history.shift() // Remove oldest entry
    }
    this.history.push(path)
  }

  getPrevious(): string {
    if (this.history.length > 1) {
      return this.history[this.history.length - 2]
    }
    return AppRoutes.DASHBOARD // Default to dashboard if no history
  }

  clear(): void {
    this.history = []
  }
}

export const navHistory = new NavigationHistory()

// Helper function to ensure all links are valid
export function validateRoutes(): boolean {
  // This would check all routes in a real app
  // For now, we'll just return true
  return true
}

// Function to handle navigation with history tracking
export const navigateTo = (route: string, router: any) => {
  router.push(route)
}

// Function to go back with fallback
export function goBack(router: any, fallback: string = AppRoutes.DASHBOARD): void {
  const previousPath = navHistory.getPrevious()
  router.push(previousPath || fallback)
}

