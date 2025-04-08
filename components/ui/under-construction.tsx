import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface UnderConstructionProps {
  title?: string
  description?: string
  className?: string
}

export function UnderConstruction({
  title = "Page Under Construction",
  description = "We're working on enhancing this page. Please check back soon for updates.",
  className = "",
}: UnderConstructionProps) {
  return (
    <Alert className={`under-construction ${className}`}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}

