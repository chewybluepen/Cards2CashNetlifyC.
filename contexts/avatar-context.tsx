"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react"

interface AvatarContextType {
  avatarUrl: string | null
  setAvatarUrl: (url: string | null) => void
  initials: string
  setInitials: (initials: string) => void
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined)

export function AvatarProvider({ children }: { children: ReactNode }) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [initials, setInitials] = useState("JD")

  // Load avatar from localStorage on mount
  useEffect(() => {
    const storedAvatar = localStorage.getItem("userAvatar")
    const storedInitials = localStorage.getItem("userInitials")

    if (storedAvatar) {
      setAvatarUrl(storedAvatar)
    } else {
      // Set default avatar if none exists
      setAvatarUrl(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Display%20Picture-lTJxvWvl6No7YQMsgUyVESc1acHx51.png",
      )
    }

    if (storedInitials) {
      setInitials(storedInitials)
    }
  }, [])

  // Enhanced setAvatarUrl function that ensures global updates
  const updateAvatarUrl = useCallback((url: string | null) => {
    setAvatarUrl(url)
    if (url) {
      localStorage.setItem("userAvatar", url)
      // Dispatch a custom event to notify all components of the avatar change
      window.dispatchEvent(new CustomEvent("avatar-updated", { detail: { url } }))
    } else {
      localStorage.removeItem("userAvatar")
    }
  }, [])

  // Enhanced setInitials function
  const updateInitials = useCallback((newInitials: string) => {
    setInitials(newInitials)
    localStorage.setItem("userInitials", newInitials)
    // Dispatch a custom event for initials update
    window.dispatchEvent(new CustomEvent("initials-updated", { detail: { initials: newInitials } }))
  }, [])

  return (
    <AvatarContext.Provider
      value={{
        avatarUrl,
        setAvatarUrl: updateAvatarUrl,
        initials,
        setInitials: updateInitials,
      }}
    >
      {children}
    </AvatarContext.Provider>
  )
}

export function useAvatar() {
  const context = useContext(AvatarContext)
  if (context === undefined) {
    throw new Error("useAvatar must be used within an AvatarProvider")
  }

  // Add a listener effect to ensure components re-render on avatar updates
  useEffect(() => {
    const handleAvatarUpdate = () => {
      // This will trigger a re-render in components using this hook
    }

    window.addEventListener("avatar-updated", handleAvatarUpdate)
    window.addEventListener("initials-updated", handleAvatarUpdate)

    return () => {
      window.removeEventListener("avatar-updated", handleAvatarUpdate)
      window.removeEventListener("initials-updated", handleAvatarUpdate)
    }
  }, [])

  return context
}

