"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import { AppRoutes } from "@/lib/navigation"

interface Props {
  children?: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <AlertTriangle className="h-24 w-24 text-red-500 opacity-80" />
            </div>

            <h1 className="mb-2 text-4xl font-bold text-gray-800">Something Went Wrong</h1>
            <p className="mb-8 text-lg text-gray-600">
              We're sorry, but there was an error in this part of the application.
            </p>

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
              <Button
                onClick={() => this.setState({ hasError: false })}
                className="bg-primary text-white hover:bg-primary-600"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
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

    return this.props.children
  }
}

