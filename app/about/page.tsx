"use client"

import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Globe, Shield, Zap, Users, ExternalLink } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

// Mark the page as dynamic to avoid static prerendering issues if useSearchParams is in a child component
export const dynamic = "force-dynamic"

function AboutUsContent() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/settings">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">About Cards2Cash</h1>
        </div>
        <p className="mt-1 text-center text-xs italic text-gray-500">
          The Future of Your Finances, For a Borderless World
        </p>
      </header>

      <main className="flex-1 p-4 pb-20">
        <div className="mb-6 flex justify-center">
          <div className="relative h-20 w-20">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="Cards2Cash Logo"
              width={80}
              height={80}
              className="rounded-xl"
            />
          </div>
        </div>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>Empowering financial freedom across borders</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              At Cards2Cash, we're on a mission to revolutionize how people in Guyana and the Caribbean access global
              financial services. We believe everyone deserves the ability to participate in the digital economy,
              regardless of location or traditional banking access.
            </p>
            <p className="mt-2 text-sm text-gray-700">
              Our platform bridges the gap between local payment methods and global financial services, enabling users
              to convert prepaid credit into digital currency, generate virtual cards for online purchases, and manage
              their finances with ease.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Our Values</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                icon: <Globe className="h-5 w-5 text-blue-600" />,
                title: "Accessibility",
                desc: "Making global financial services accessible to everyone, regardless of location or banking status.",
              },
              {
                icon: <Shield className="h-5 w-5 text-blue-600" />,
                title: "Security",
                desc: "Protecting our users' data and funds with industry-leading security measures and transparent practices.",
              },
              {
                icon: <Zap className="h-5 w-5 text-blue-600" />,
                title: "Innovation",
                desc: "Continuously improving our platform to provide cutting-edge financial solutions that meet the evolving needs of our users.",
              },
              {
                icon: <Users className="h-5 w-5 text-blue-600" />,
                title: "Community",
                desc: "Building a supportive community that empowers users to achieve financial freedom and participate in the global economy.",
              },
            ].map((value, idx) => (
              <div className="flex items-start space-x-3" key={idx}>
                <div className="rounded-full bg-blue-100 p-2">{value.icon}</div>
                <div>
                  <h3 className="font-medium">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              Cards2Cash was founded in 2023 by a team of fintech entrepreneurs who recognized the challenges faced by
              people in Guyana and the Caribbean when trying to access global financial services.
            </p>
            <p className="mt-2 text-sm text-gray-700">
              Inspired by the widespread use of prepaid mobile credit and the growing need for digital payment
              solutions, we developed a platform that converts this familiar local currency into a tool for global
              financial access.
            </p>
            <p className="mt-2 text-sm text-gray-700">
              Today, we're proud to serve thousands of users across the region, helping them shop online, manage their
              finances, and participate in the digital economy with confidence.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/terms">
              Terms of Service
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/privacy">
              Privacy Policy
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="https://cards2cash.com" target="_blank" rel="noopener noreferrer">
              Visit Our Website
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">Cards2Cash App Version 1.0.0</p>
          <p className="text-xs text-gray-500">© 2025 Cards2Cash. All rights reserved.</p>
        </div>
      </main>

      {/* Wrap BottomNavigation in Suspense if it uses useSearchParams */}
      <Suspense fallback={<div>Loading navigation...</div>}>
        <BottomNavigation />
      </Suspense>
    </div>
  )
}

export default function AboutPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutUsContent />
    </Suspense>
  )
}
