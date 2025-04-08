import type { useRouter } from "next/navigation"
import { showFeedback } from "./feedback-utils"

export const navigateWithTransition = (
  router: ReturnType<typeof useRouter>,
  path: string,
  options?: {
    delay?: number
    feedback?: {
      type: "success" | "info" | "warning" | "error"
      message: string
    }
    beforeNavigate?: () => void
    afterNavigate?: () => void
  },
) => {
  const { delay = 0, feedback, beforeNavigate, afterNavigate } = options || {}

  if (beforeNavigate) {
    beforeNavigate()
  }

  if (feedback) {
    showFeedback(feedback.type, {
      description: feedback.message,
    })
  }

  if (delay > 0) {
    setTimeout(() => {
      router.push(path)
      if (afterNavigate) {
        setTimeout(afterNavigate, 100)
      }
    }, delay)
  } else {
    router.push(path)
    if (afterNavigate) {
      setTimeout(afterNavigate, 100)
    }
  }
}

export const confirmNavigation = (
  router: ReturnType<typeof useRouter>,
  path: string,
  options?: {
    title?: string
    message: string
    confirmText?: string
    cancelText?: string
    onConfirm?: () => void
    onCancel?: () => void
  },
) => {
  const {
    title = "Confirm Navigation",
    message,
    confirmText = "Continue",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
  } = options || {}

  if (window.confirm(`${title}\n\n${message}`)) {
    if (onConfirm) onConfirm()
    router.push(path)
  } else {
    if (onCancel) onCancel()
  }
}

