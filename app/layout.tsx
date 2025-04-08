import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { EnhancedPageTransition } from "@/components/animations/enhanced-page-transition"
import { PageConnector } from "@/components/page-connector"
import { ErrorBoundary } from "@/components/error-boundary"
import { AvatarProvider } from "@/contexts/avatar-context"
import { SearchProvider } from "@/contexts/search-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cards2Cash",
  description: "Convert prepaid credit into digital funds",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#000000] text-white`}>
        <ErrorBoundary>
          <PageConnector />
          <AvatarProvider>
            <SearchProvider>
              <EnhancedPageTransition>{children}</EnhancedPageTransition>
            </SearchProvider>
          </AvatarProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}



import './globals.css'