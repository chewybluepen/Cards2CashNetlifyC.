export type ValidationRule = {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string, formValues?: Record<string, any>) => boolean | { valid: boolean; message: string }
  message?: string
}

export type ValidationRules = Record<string, ValidationRule>

export type ValidationErrors = Record<string, string>

export const validateForm = (values: Record<string, any>, rules: ValidationRules): ValidationErrors => {
  const errors: ValidationErrors = {}

  Object.entries(rules).forEach(([fieldName, rule]) => {
    const value = values[fieldName]?.toString() || ""

    // Required check
    if (rule.required && !value.trim()) {
      errors[fieldName] = rule.message || "This field is required"
      return
    }

    // Skip other validations if field is empty and not required
    if (!value.trim() && !rule.required) {
      return
    }

    // Min length check
    if (rule.minLength !== undefined && value.length < rule.minLength) {
      errors[fieldName] = rule.message || `Must be at least ${rule.minLength} characters`
      return
    }

    // Max length check
    if (rule.maxLength !== undefined && value.length > rule.maxLength) {
      errors[fieldName] = rule.message || `Must be no more than ${rule.maxLength} characters`
      return
    }

    // Pattern check
    if (rule.pattern && !rule.pattern.test(value)) {
      errors[fieldName] = rule.message || "Invalid format"
      return
    }

    // Custom validation
    if (rule.custom) {
      const result = rule.custom(value, values)

      if (typeof result === "boolean") {
        if (!result) {
          errors[fieldName] = rule.message || "Invalid value"
        }
      } else {
        if (!result.valid) {
          errors[fieldName] = result.message
        }
      }
    }
  })

  return errors
}

export const isFormValid = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length === 0
}

// Common validation patterns
export const ValidationPatterns = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^\+?[0-9]{10,15}$/,
  CARD_NUMBER: /^[0-9]{16}$/,
  CVV: /^[0-9]{3,4}$/,
  EXPIRY_DATE: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  NUMERIC: /^[0-9]+$/,
  ALPHA: /^[a-zA-Z]+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
}

// Common validation rules
export const CommonValidationRules = {
  email: {
    required: true,
    pattern: ValidationPatterns.EMAIL,
    message: "Please enter a valid email address",
  },
  phone: {
    required: true,
    pattern: ValidationPatterns.PHONE,
    message: "Please enter a valid phone number",
  },
  password: {
    required: true,
    minLength: 8,
    pattern: ValidationPatterns.PASSWORD,
    message: "Password must be at least 8 characters and include uppercase, lowercase, number and special character",
  },
  confirmPassword: (passwordField: string) => ({
    required: true,
    custom: (value: string, formValues?: Record<string, any>) => value === formValues?.[passwordField],
    message: "Passwords do not match",
  }),
}

