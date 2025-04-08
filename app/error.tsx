"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from "lucide-react"
import { AppRoutes } from "@/lib/navigation"
import { InteractiveButton } from "@/components/ui/interactive-button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [isResetting, setIsResetting] = useState(false)
  const [errorDetails, setErrorDetails] = useState<{
    title: string
    description: string
    showDetails: boolean
  }>({
    title: "Something Went Wrong",
    description: "We're sorry, but there was an error processing your request.",
    showDetails: false,
  })

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)

    // Determine error type for better messaging
    if (error.message.includes("network") || error.message.includes("fetch")) {
      setErrorDetails({
        title: "Network Error",
        description: "Please check your internet connection and try again.",
        showDetails: true,
      })
    } else if (error.message.includes("timeout")) {
      setErrorDetails({
        title: "Request Timeout",
        description: "The server took too long to respond. Please try again later.",
        showDetails: true,
      })
    } else if (error.message.includes("permission") || error.message.includes("access")) {
      setErrorDetails({
        title: "Access Denied",
        description: "You don't have permission to access this resource.",
        showDetails: true,
      })
    }
  }, [error])

  const handleReset = () => {
    setIsResetting(true)

    // Add a small delay to show loading state
    setTimeout(() => {
      reset()
      setIsResetting(false)
    }, 800)
  }

  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <AlertTriangle className="h-24 w-24 text-red-500 opacity-80" />
        </div>

        <h1 className="mb-2 text-4xl font-bold text-gray-800">{errorDetails.title}</h1>
        <p className="mb-8 text-lg text-gray-600">{errorDetails.description}</p>

        {errorDetails.showDetails && (
          <div className="mb-6 rounded-md bg-red-50 p-4 text-left text-sm text-red-800">
            <p className="font-medium">Error details:</p>
            <p className="mt-1 break-words">{error.message}</p>
            {error.digest && <p className="mt-1">Reference: {error.digest}</p>}
          </div>
        )}

        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
          <InteractiveButton
            onClick={handleReset}
            className="bg-primary text-white hover:bg-primary-600"
            loading={isResetting}
            loadingText="Retrying..."
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </InteractiveButton>

          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>

          <Button variant="outline" asChild>
            <Link href={AppRoutes.DASHBOARD}>
              <Home className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

