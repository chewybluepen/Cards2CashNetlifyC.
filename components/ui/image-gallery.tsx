"use client"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export interface GalleryImage {
  id: string
  src: string
  alt: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  selectedImageId: string | null
  onSelect: (image: GalleryImage) => void
  className?: string
}

export function ImageGallery({ images, selectedImageId, onSelect, className }: ImageGalleryProps) {
  return (
    <div className={cn("grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5", className)}>
      {images.map((image) => (
        <Card
          key={image.id}
          className={cn(
            "relative cursor-pointer overflow-hidden p-1 transition-all hover:ring-2 hover:ring-primary hover:ring-offset-2",
            selectedImageId === image.id && "ring-2 ring-primary ring-offset-2",
          )}
          onClick={() => onSelect(image)}
        >
          <div className="relative aspect-square overflow-hidden rounded-sm">
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 20vw"
            />
          </div>
          {selectedImageId === image.id && (
            <div className="absolute right-1 top-1 rounded-full bg-primary p-0.5 text-white">
              <CheckCircle className="h-4 w-4" />
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

