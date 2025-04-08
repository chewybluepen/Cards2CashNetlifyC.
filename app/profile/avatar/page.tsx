"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CheckCircle, Info, Trash2 } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { EnhancedAvatar } from "@/components/ui/enhanced-avatar"
import { ImageGallery, type GalleryImage } from "@/components/ui/image-gallery"
import { ImageUpload } from "@/components/ui/image-upload"
import { useAvatar } from "@/contexts/avatar-context"

// South Park character icons
const galleryImages: GalleryImage[] = [
  {
    id: "cartman",
    src: "https://icons.iconarchive.com/icons/xtudiando/south-park/128/Cartman-icon.png",
    alt: "Eric Cartman",
  },
  {
    id: "stan",
    src: "https://icons.iconarchive.com/icons/xtudiando/south-park/128/Stan-icon.png",
    alt: "Stan Marsh",
  },
  {
    id: "kyle",
    src: "https://icons.iconarchive.com/icons/xtudiando/south-park/128/Kyle-icon.png",
    alt: "Kyle Broflovski",
  },
  {
    id: "kenny",
    src: "https://icons.iconarchive.com/icons/xtudiando/south-park/128/Kenny-icon.png",
    alt: "Kenny McCormick",
  },
  {
    id: "butters",
    src: "https://icons.iconarchive.com/icons/xtudiando/south-park/128/Butters-icon.png",
    alt: "Butters Stotch",
  },
  {
    id: "craig",
    src: "https://www.stickpng.com/assets/images/58638d7c86d7c05872c04361.png",
    alt: "Craig Tucker",
  },
  {
    id: "clyde",
    src: "https://www.stickpng.com/assets/images/58638d7c86d7c05872c04364.png",
    alt: "Clyde Donovan",
  },
  {
    id: "damien",
    src: "https://www.stickpng.com/assets/images/58638d7c86d7c05872c04362.png",
    alt: "Damien Thorn",
  },
  {
    id: "tweek",
    src: "https://www.stickpng.com/assets/images/58638d7c86d7c05872c04363.png",
    alt: "Tweek Tweak",
  },
]

export default function ChangeAvatar() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<null | "success" | "error">(null)
  const [selectedTab, setSelectedTab] = useState("gallery")
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<GalleryImage | null>(null)
  const [uploadedImage, setUploadedImage] = useState<{ file: File; previewUrl: string } | null>(null)
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null)

  const { avatarUrl, setAvatarUrl, initials } = useAvatar()

  // Use avatar from context
  useEffect(() => {
    if (avatarUrl) {
      setCurrentAvatar(avatarUrl)
    }
  }, [avatarUrl])

  const handleGallerySelect = (image: GalleryImage) => {
    setSelectedGalleryImage(image)
    setUploadedImage(null)
  }

  const handleImageUpload = (file: File, previewUrl: string) => {
    setUploadedImage({ file, previewUrl })
    setSelectedGalleryImage(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedGalleryImage && !uploadedImage) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStatus("success")

      // Update avatar in context
      if (selectedGalleryImage) {
        setAvatarUrl(selectedGalleryImage.src)
        setCurrentAvatar(selectedGalleryImage.src)
      } else if (uploadedImage) {
        setAvatarUrl(uploadedImage.previewUrl)
        setCurrentAvatar(uploadedImage.previewUrl)
      }
    }, 1500)
  }

  const handleRemoveAvatar = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setStatus("success")
      setAvatarUrl(null)
      setCurrentAvatar(null)
      setSelectedGalleryImage(null)
      setUploadedImage(null)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/profile">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Change Avatar</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>Choose a new avatar or upload your own photo</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <EnhancedAvatar
                  src={currentAvatar || ""}
                  alt="Current Avatar"
                  initials={initials}
                  size="xl"
                  className="border-2 border-white shadow-md"
                />
              </div>

              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                </TabsList>
                <TabsContent value="gallery" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Choose from gallery</h3>
                    <ImageGallery
                      images={galleryImages}
                      selectedImageId={selectedGalleryImage?.id || null}
                      onSelect={handleGallerySelect}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="upload" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Upload your photo</h3>
                    <ImageUpload onImageSelect={handleImageUpload} previewUrl={uploadedImage?.previewUrl} />
                  </div>
                </TabsContent>
              </Tabs>

              {status === "success" && (
                <Alert className="bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>Your profile picture has been updated successfully.</AlertDescription>
                </Alert>
              )}

              {status === "error" && (
                <Alert variant="destructive">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    There was a problem updating your profile picture. Please try again.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary-600"
                disabled={isLoading || (!selectedGalleryImage && !uploadedImage)}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" className="w-full" asChild>
                <Link href="/profile">Cancel</Link>
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={handleRemoveAvatar}
            disabled={isLoading || !currentAvatar}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove Current Avatar
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

