"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, BanknoteIcon as Bank, CheckCircle, Info, Lock, Shield } from "lucide-react"
import { EnhancedBottomNavigation } from "@/components/enhanced-bottom-navigation"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggeredFade } from "@/components/animations/staggered-fade"

// Import the CelebrationAnimation component
import { CelebrationAnimation } from "@/components/ui/celebration-animation"

// Mock Guyanese banks data with actual logos
const banks = [
  {
    id: 1,
    name: "Republic Bank",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Republic%20Bank%20Icon-cSUpxbBJfZPMMZlQ5ys40Ftxf3wI3T.png",
    description: "Connect your Republic Bank account for direct deposits and transfers.",
  },
  {
    id: 2,
    name: "Demerara Bank",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Demerara%20Bank%20Icon-PnFd0Xh5u3VJ1QUE66LzTse3vN9PIq.png",
    description: "Link your Demerara Bank account for seamless transactions.",
  },
  {
    id: 3,
    name: "Guyana Bank for Trade and Industry (GBTI)",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Guyana%20Bank%20for%20Trade%20and%20Industry%20%28GBTI%29-WgW5OwMykCB8F7ICnQDJkHb7SjkFVi.png",
    description: "Connect your GBTI account for easy fund transfers.",
  },
  {
    id: 4,
    name: "Bank of Baroda",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bank%20of%20Baroda%20Icon-1jUpz45KzluzZidXZhL914W0Znc0z9.png",
    description: "Link your Bank of Baroda account for direct deposits.",
  },
  {
    id: 5,
    name: "Citizens Bank",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Citizens%20Bank%20Icon-vUfGeB8fm5m1MN2n02qaHb8lyzB4Np.png",
    description: "Connect your Citizens Bank account for seamless banking.",
  },
]

// Rest of the component remains the same, but update the bank logo rendering:
export default function BankConnection() {
  // ... existing state and handlers
  const [selectedBank, setSelectedBank] = useState<number | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "connecting" | "success" | "error">("idle")
  const [accountNumber, setAccountNumber] = useState("")
  const [accountName, setAccountName] = useState("")

  // Add state for celebration
  const [showCelebration, setShowCelebration] = useState(false)

  // Update the handleConnect function
  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault()
    setConnectionStatus("connecting")

    // Simulate connection process
    setTimeout(() => {
      if (accountNumber && accountName) {
        setConnectionStatus("success")
        setShowCelebration(true) // Show celebration on success
      } else {
        setConnectionStatus("error")
      }
    }, 2000)
  }

  const handleBankSelect = (bankId: number) => {
    setSelectedBank(bankId)
    setConnectionStatus("idle")
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-background">
      <CelebrationAnimation
        show={showCelebration}
        message="Bank Connected Successfully!"
        onComplete={() => setShowCelebration(false)}
      />
      {/* ... existing header */}
      <header className="sticky top-0 z-10 bg-primary p-4 text-white shadow-md">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2 text-white hover:bg-primary-600">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Connect Bank Account</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <FadeIn>
          <Card className="mb-6 border-none shadow-md">
            {/* ... existing card content */}
            <CardHeader className="bg-primary text-white">
              <div className="flex items-center">
                <Bank className="mr-2 h-5 w-5" />
                <CardTitle>Bank Integration</CardTitle>
              </div>
              <CardDescription className="text-primary-100">
                Connect your Guyanese bank account for direct deposits and transfers
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="rounded-md bg-blue-50 p-4 text-blue-800">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">
                      Your bank account information is securely encrypted. We use industry-standard security measures to
                      protect your data.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <div className="mb-6">
          <h2 className="mb-3 text-lg font-semibold text-neutral-text">Select Your Bank</h2>
          <StaggeredFade className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {banks.map((bank) => (
              <motion.div
                key={bank.id}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleBankSelect(bank.id)}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-md ${selectedBank === bank.id ? "border-2 border-primary" : ""}`}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-white p-2">
                      <Image src={bank.logo || "/placeholder.svg"} alt={bank.name} fill className="object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-neutral-text">{bank.name}</h3>
                      <p className="text-sm text-gray-500">{bank.description}</p>
                    </div>
                    {selectedBank === bank.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="rounded-full bg-primary p-1 text-white"
                      >
                        <CheckCircle className="h-5 w-5" />
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </StaggeredFade>
        </div>

        {/* ... rest of the component */}
        <AnimatePresence>
          {selectedBank && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Connect Your Account</CardTitle>
                  <CardDescription>
                    Enter your account details for {banks.find((b) => b.id === selectedBank)?.name}
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleConnect}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="account-number">Account Number</Label>
                      <Input
                        id="account-number"
                        placeholder="Enter your account number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="account-name">Account Name</Label>
                      <Input
                        id="account-name"
                        placeholder="Enter the name on the account"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <Lock className="h-5 w-5 text-amber-600" />
                        </div>
                        <div className="ml-3">
                          <p>
                            By connecting your bank account, you authorize Cards2Cash to initiate deposits and
                            withdrawals as per your instructions.
                          </p>
                        </div>
                      </div>
                    </div>

                    {connectionStatus === "success" && (
                      <Alert className="bg-green-50 text-green-800">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Connection Successful!</AlertTitle>
                        <AlertDescription>
                          Your bank account has been successfully connected to your Cards2Cash account.
                        </AlertDescription>
                      </Alert>
                    )}

                    {connectionStatus === "error" && (
                      <Alert variant="destructive">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Connection Failed</AlertTitle>
                        <AlertDescription>
                          There was a problem connecting your bank account. Please check your details and try again.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-600"
                      disabled={connectionStatus === "connecting"}
                    >
                      {connectionStatus === "connecting" ? (
                        <div className="flex items-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          Connecting...
                        </div>
                      ) : (
                        "Connect Account"
                      )}
                    </Button>
                    <Button type="button" variant="outline" className="w-full" onClick={() => setSelectedBank(null)}>
                      Cancel
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <EnhancedBottomNavigation />
    </div>
  )
}

