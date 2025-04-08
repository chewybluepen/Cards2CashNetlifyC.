"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { AppRoutes, navHistory } from "@/lib/navigation"

// This component ensures all pages are properly connected
// It should be included in the layout
export function PageConnector() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Track navigation
    navHistory.push(pathname)

    // Check for dead-end pages and provide fallbacks
    const isDeadEnd = (path: string) => {
      // List of pages that should have a way to navigate back
      const deadEndPaths = ["/404", "/error"]

      return deadEndPaths.includes(path)
    }

    if (isDeadEnd(pathname)) {
      console.warn(`Dead-end page detected: ${pathname}`)
      // We could automatically add a back button or redirect
    }

    // Validate that the current page exists in our routes
    const routeValues = Object.values(AppRoutes)
    const staticRoutes = routeValues.filter((route) => typeof route === "string") as string[]

    const isDynamicRoute = pathname.includes("[") || pathname.includes("/")
    const basePathExists = staticRoutes.some((route) => {
      if (isDynamicRoute) {
        // For dynamic routes, check if the base path exists
        const basePath = pathname.split("/").slice(0, -1).join("/")
        return route.startsWith(basePath)
      }
      return route === pathname
    })

    if (!isDynamicRoute && !basePathExists) {
      console.warn(`Page not defined in routes: ${pathname}`)
    }
  }, [pathname, router])

  // This is a utility component that doesn't render anything
  return null
}

