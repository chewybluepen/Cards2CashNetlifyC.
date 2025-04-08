"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowLeft, Share2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BottomNavigation } from "@/components/bottom-navigation"
import { AnimatedNetflixCard } from "@/components/ui/animated-netflix-card"
import { InteractiveButton } from "@/components/ui/interactive-button"
import { toast } from "@/components/ui/use-toast"

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [copied, setCopied] = useState(false)

  const amount = searchParams.get("amount") || "0"
  const provider = searchParams.get("provider") || "Unknown"
  const originalAmount = searchParams.get("originalAmount") || "0"
  const currency = searchParams.get("currency") || "GYD"

  const transactionId =
    "TX" +
    Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")
  const date = new Date().toLocaleString()

  useEffect(() => {
    // Confetti effect
    const confetti = async () => {
      const { default: confetti } = await import("canvas-confetti")
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }

    confetti()
  }, [])

  const handleCopyReceipt = () => {
    const receiptText = `
Transaction Receipt
------------------
Transaction ID: ${transactionId}
Date: ${date}
Provider: ${provider}
Original Amount: ${currency} ${Number.parseFloat(originalAmount).toLocaleString()}
Converted Amount: $${amount} USD
Status: Completed
    `

    navigator.clipboard.writeText(receiptText.trim())
    setCopied(true)

    toast({
      title: "Receipt Copied",
      description: "Transaction details copied to clipboard",
      variant: "default",
    })

    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Phone Credit Conversion",
          text: `I just converted ${currency} ${Number.parseFloat(originalAmount).toLocaleString()} from ${provider} to $${amount} USD with Cards2Cash!`,
          url: window.location.href,
        })
        .catch((error) => console.error("Error sharing:", error))
    } else {
      toast({
        title: "Sharing Not Available",
        description: "Your browser doesn't support the Web Share API",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#000000]">
      <header className="sticky top-0 z-10 bg-[#141414] p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2 text-white hover:bg-[#333333]">
            <Link href="/phone-credit">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-xl font-bold text-white">Conversion Successful</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-col items-center justify-center text-center"
        >
          <div className="mb-4 rounded-full bg-[#E50914]/20 p-6">
            <CheckCircle2 className="h-16 w-16 text-[#E50914]" />
          </div>
          <h2 className="text-2xl font-bold text-white">Conversion Complete!</h2>
          <p className="mt-2 text-gray-400">Your phone credit has been successfully converted to digital funds</p>
        </motion.div>

        <AnimatedNetflixCard>
          <CardHeader>
            <CardTitle className="text-white">Transaction Details</CardTitle>
            <CardDescription className="text-gray-400">Receipt for your phone credit conversion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-[#1F1F1F] p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-gray-400">Transaction ID:</span>
                <span className="font-medium text-white">{transactionId}</span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-gray-400">Date:</span>
                <span className="font-medium text-white">{date}</span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-gray-400">Provider:</span>
                <span className="font-medium text-white">{provider}</span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-gray-400">Original Amount:</span>
                <span className="font-medium text-white">
                  {currency} {Number.parseFloat(originalAmount).toLocaleString()}
                </span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-gray-400">Converted Amount:</span>
                <span className="font-bold text-[#E50914]">${amount} USD</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="font-medium text-green-500">Completed</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button
              variant="outline"
              className="w-full border-[#333333] text-white hover:bg-[#333333]"
              onClick={handleCopyReceipt}
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Receipt
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full border-[#333333] text-white hover:bg-[#333333]"
              onClick={handleShare}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </CardFooter>
        </AnimatedNetflixCard>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <InteractiveButton variant="netflix" className="w-full" asChild>
            <Link href="/phone-credit">Convert More</Link>
          </InteractiveButton>
          <InteractiveButton
            variant="outline"
            className="w-full border-[#333333] text-white hover:bg-[#333333]"
            asChild
          >
            <Link href="/dashboard">Go to Dashboard</Link>
          </InteractiveButton>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

