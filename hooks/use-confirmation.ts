"use client"

import { useState, useCallback } from "react"

interface UseConfirmationOptions {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
}

export function useConfirmation(defaultOptions?: UseConfirmationOptions) {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<UseConfirmationOptions>(defaultOptions || {})
  const [resolveRef, setResolveRef] = useState<((value: boolean) => void) | null>(null)

  const confirm = useCallback(
    (customOptions?: UseConfirmationOptions): Promise<boolean> => {
      setOptions({ ...defaultOptions, ...customOptions })
      setIsOpen(true)

      return new Promise<boolean>((resolve) => {
        setResolveRef(() => resolve)
      })
    },
    [defaultOptions],
  )

  const handleConfirm = useCallback(() => {
    if (resolveRef) {
      resolveRef(true)
      setResolveRef(null)
    }
    setIsOpen(false)
  }, [resolveRef])

  const handleCancel = useCallback(() => {
    if (resolveRef) {
      resolveRef(false)
      setResolveRef(null)
    }
    setIsOpen(false)
  }, [resolveRef])

  return {
    isOpen,
    setIsOpen,
    options,
    confirm,
    handleConfirm,
    handleCancel,
  }
}

