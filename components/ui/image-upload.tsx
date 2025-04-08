"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  onImageSelect: (file: File, previewUrl: string) => void
  previewUrl?: string
  className?: string
}

export function ImageUpload({ onImageSelect, previewUrl, className }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string | undefined>(previewUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      handleFile(file)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match("image.*")) {
      alert("Please select an image file")
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should not exceed 5MB")
      return
    }

    const url = URL.createObjectURL(file)
    setLocalPreviewUrl(url)
    onImageSelect(file, url)
  }

  const clearPreview = () => {
    setLocalPreviewUrl(undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={className}>
      <Card
        className={cn(
          "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center border-2 border-dashed p-4 transition-colors",
          dragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50 hover:bg-gray-50",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {localPreviewUrl ? (
          <div className="relative aspect-square h-full w-full max-w-[200px]">
            <Image
              src={localPreviewUrl || "/placeholder.svg"}
              alt="Preview"
              fill
              className="rounded-md object-cover"
              sizes="(max-width: 768px) 100vw, 200px"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                clearPreview()
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove image</span>
            </Button>
          </div>
        ) : (
          <>
            <Upload className="mb-2 h-10 w-10 text-gray-400" />
            <p className="mb-1 text-sm font-medium">Drag and drop or click to upload</p>
            <p className="text-xs text-gray-500">PNG, JPG or GIF (max. 5MB)</p>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
          aria-label="Upload image"
        />
      </Card>
    </div>
  )
}

