"use client"

import { useState, useCallback } from "react"
import { showFeedback } from "@/lib/feedback-utils"

interface UseApiCallOptions<T> {
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
  successMessage?: string
  errorMessage?: string
  showSuccessFeedback?: boolean
  showErrorFeedback?: boolean
}

export function useApiCall<T = any>(options?: UseApiCallOptions<T>) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const execute = useCallback(
    async (apiCall: () => Promise<T>, callOptions?: UseApiCallOptions<T>) => {
      const mergedOptions = { ...options, ...callOptions }

      setIsLoading(true)
      setError(null)

      try {
        const result = await apiCall()
        setData(result)

        if (mergedOptions.onSuccess) {
          mergedOptions.onSuccess(result)
        }

        if (mergedOptions.showSuccessFeedback && mergedOptions.successMessage) {
          showFeedback("success", {
            description: mergedOptions.successMessage,
          })
        }

        setIsLoading(false)
        return { success: true, data: result }
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        setError(error)

        if (mergedOptions.onError) {
          mergedOptions.onError(error)
        }

        if (mergedOptions.showErrorFeedback) {
          showFeedback("error", {
            description: mergedOptions.errorMessage || error.message,
          })
        }

        setIsLoading(false)
        return { success: false, error }
      }
    },
    [options],
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setIsLoading(false)
  }, [])

  return {
    data,
    error,
    isLoading,
    execute,
    reset,
  }
}

