import { toast } from "@/hooks/use-toast"

export type FeedbackType = "success" | "error" | "warning" | "info"

interface FeedbackOptions {
  title?: string
  description: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export const showFeedback = (type: FeedbackType, options: FeedbackOptions) => {
  const { title, description, duration = 5000, action } = options

  const variant = type === "error" ? "destructive" : type

  toast({
    title: title || type.charAt(0).toUpperCase() + type.slice(1),
    description,
    variant,
    duration,
    action: action
      ? {
          label: action.label,
          onClick: action.onClick,
        }
      : undefined,
  })
}

export const validateInput = (
  value: string,
  validationRules: {
    required?: boolean
    minLength?: number
    maxLength?: number
    pattern?: RegExp
    custom?: (value: string) => boolean
  },
): { valid: boolean; message?: string } => {
  const { required, minLength, maxLength, pattern, custom } = validationRules

  if (required && !value.trim()) {
    return { valid: false, message: "This field is required" }
  }

  if (minLength && value.length < minLength) {
    return { valid: false, message: `Must be at least ${minLength} characters` }
  }

  if (maxLength && value.length > maxLength) {
    return { valid: false, message: `Must be no more than ${maxLength} characters` }
  }

  if (pattern && !pattern.test(value)) {
    return { valid: false, message: "Invalid format" }
  }

  if (custom && !custom(value)) {
    return { valid: false, message: "Invalid input" }
  }

  return { valid: true }
}

