"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { ValidationRule } from "@/lib/form-validation"

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  error?: string
  touched?: boolean
  icon?: React.ReactNode
  helperText?: string
  validation?: ValidationRule
  onValidate?: (name: string, value: string, isValid: boolean) => void
}

export function FormField({
  label,
  name,
  error,
  touched,
  icon,
  helperText,
  className,
  validation,
  onValidate,
  ...props
}: FormFieldProps) {
  const [isFocused, setIsFocused] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    props.onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    props.onBlur?.(e)

    if (validation && onValidate) {
      const value = e.target.value
      let isValid = true

      // Basic validation
      if (validation.required && !value.trim()) {
        isValid = false
      }

      if (validation.minLength && value.length < validation.minLength) {
        isValid = false
      }

      if (validation.maxLength && value.length > validation.maxLength) {
        isValid = false
      }

      if (validation.pattern && !validation.pattern.test(value)) {
        isValid = false
      }

      if (validation.custom) {
        const result = validation.custom(value)
        if (typeof result === "boolean") {
          isValid = result
        } else {
          isValid = result.valid
        }
      }

      onValidate(name, value, isValid)
    }
  }

  const showError = error && touched

  return (
    <div className="space-y-2">
      <Label
        htmlFor={name}
        className={cn(
          "form-label font-medium", // Added font-medium for better visibility
          showError ? "text-red-600" : "", // Darker red for better contrast
          isFocused ? "text-primary font-semibold" : "", // Semibold when focused
        )}
      >
        {label}
      </Label>

      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700">{icon}</div>}

        <Input
          id={name}
          name={name}
          ref={inputRef}
          className={cn(
            icon ? "pl-10" : "",
            showError
              ? "border-red-600 focus:border-red-600 focus:ring-red-600" // Darker red for better contrast
              : isFocused
                ? "border-primary focus:border-primary focus:ring-primary"
                : "",
            className,
          )}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-invalid={showError ? "true" : "false"}
          aria-describedby={showError ? `${name}-error` : helperText ? `${name}-helper` : undefined}
          {...props}
        />
      </div>

      {showError ? (
        <p id={`${name}-error`} className="text-xs font-medium text-red-600">
          {" "}
          {/* Added font-medium and darker red */}
          {error}
        </p>
      ) : helperText ? (
        <p id={`${name}-helper`} className="text-xs form-helper-text">
          {" "}
          {/* Using the helper text class */}
          {helperText}
        </p>
      ) : null}
    </div>
  )
}

