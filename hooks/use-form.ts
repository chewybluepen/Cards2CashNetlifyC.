"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { validateForm, type ValidationRules, type ValidationErrors, isFormValid } from "@/lib/form-validation"

interface UseFormOptions<T> {
  initialValues: T
  validationRules?: ValidationRules
  onSubmit?: (values: T, isValid: boolean) => void
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Validate all fields when validation rules change
  useEffect(() => {
    if (Object.keys(validationRules).length > 0) {
      setErrors(validateForm(values, validationRules))
    }
  }, [validationRules])

  // Handle input change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target

      setValues((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }))

      // Validate field if it's been touched
      if (touched[name] && validationRules[name]) {
        const fieldErrors = validateForm({ [name]: value }, { [name]: validationRules[name] })
        setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || "" }))
      }
    },
    [touched, validationRules],
  )

  // Handle checkbox change
  const handleCheckboxChange = useCallback(
    (name: string, checked: boolean) => {
      setValues((prev) => ({
        ...prev,
        [name]: checked,
      }))

      // Validate field if it's been touched
      if (touched[name] && validationRules[name]) {
        const fieldErrors = validateForm({ [name]: checked }, { [name]: validationRules[name] })
        setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || "" }))
      }
    },
    [touched, validationRules],
  )

  // Handle blur event
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target

      setTouched((prev) => ({ ...prev, [name]: true }))

      if (validationRules[name]) {
        const fieldErrors = validateForm({ [name]: values[name] }, { [name]: validationRules[name] })
        setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || "" }))
      }
    },
    [values, validationRules],
  )

  // Handle form submission
  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault()
      }

      setIsSubmitting(true)
      setIsSubmitted(true)

      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce(
        (acc, key) => {
          acc[key] = true
          return acc
        },
        {} as Record<string, boolean>,
      )

      setTouched(allTouched)

      // Validate all fields
      const formErrors = validateForm(values, validationRules)
      setErrors(formErrors)

      const valid = isFormValid(formErrors)

      if (onSubmit) {
        onSubmit(values, valid)
      }

      setIsSubmitting(false)

      return valid
    },
    [values, validationRules, onSubmit],
  )

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitted(false)
  }, [initialValues])

  // Set a specific field value
  const setFieldValue = useCallback(
    (name: string, value: any) => {
      setValues((prev) => ({ ...prev, [name]: value }))

      // Validate field if it's been touched
      if (touched[name] && validationRules[name]) {
        const fieldErrors = validateForm({ [name]: value }, { [name]: validationRules[name] })
        setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || "" }))
      }
    },
    [touched, validationRules],
  )

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleCheckboxChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    isValid: isFormValid(errors),
  }
}

