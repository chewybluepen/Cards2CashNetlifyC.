"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Fingerprint,
  Lock,
  Wallet,
  Bitcoin,
  Landmark,
  CreditCard,
  BanknoteIcon as Bank,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  ShoppingCart,
  Shield,
  Gift,
  RefreshCw,
} from "lucide-react"
import { Logo } from "@/components/logo"
import { FinancialPattern } from "@/components/financial-pattern"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggeredFade } from "@/components/animations/staggered-fade"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function AuthPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone")
  const [email, setEmail] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/verify-otp")
    }, 1500)
  }

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true)
    // Simulate social login
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    alert(`Thank you for subscribing with ${email}!`)
    setEmail("")
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:w-1/2">
                <div className="flex items-center mb-6">
                  <Logo size="lg" />
                  <h1 className="text-3xl font-bold ml-3">Cards2Cash</h1>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  The Future of Your Finances, For a Borderless World
                </h2>
                <div className="flex flex-wrap gap-3 mb-8">
                  {[
                    { icon: <Wallet className="h-5 w-5" />, text: "Digital Wallet" },
                    { icon: <Bitcoin className="h-5 w-5" />, text: "Crypto Ready" },
                    { icon: <Landmark className="h-5 w-5" />, text: "Bank Transfer" },
                    { icon: <CreditCard className="h-5 w-5" />, text: "Virtual Cards" },
                    { icon: <Bank className="h-5 w-5" />, text: "Bank Connect" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center bg-white/10 rounded-full px-4 py-2">
                      {item.icon}
                      <span className="ml-2 text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <AnimatedButton
                    className="bg-white text-primary hover:bg-gray-100 font-medium"
                    onClick={() => {
                      const signupTab = document.querySelector('[value="signup"]') as HTMLElement
                      if (signupTab) signupTab.click()
                      const authSection = document.getElementById("auth-section")
                      if (authSection) authSection.scrollIntoView({ behavior: "smooth" })
                    }}
                  >
                    Get Started
                  </AnimatedButton>
                  <AnimatedButton
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 font-medium"
                    onClick={() => router.push("/about")}
                  >
                    Learn More
                  </AnimatedButton>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl blur opacity-50"></div>
                  <div className="relative bg-white rounded-2xl p-6 shadow-xl">
                    <div className="flex justify-between mb-6">
                      <div>
                        <p className="text-gray-500 text-sm">Balance</p>
                        <p className="text-2xl font-bold text-gray-900">$1,234.56</p>
                      </div>
                      <CreditCard className="h-10 w-10 text-primary" />
                    </div>
                    <div className="space-y-4">
                      <div className="h-10 bg-gray-100 rounded-md animate-pulse"></div>
                      <div className="h-10 bg-gray-100 rounded-md animate-pulse"></div>
                      <div className="flex justify-between">
                        <div className="h-10 w-24 bg-gray-100 rounded-md animate-pulse"></div>
                        <div className="h-10 w-24 bg-gray-100 rounded-md animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Convert Phone Credit to Digital Funds
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Cards2Cash empowers you to transform your prepaid phone credit into digital funds, enabling secure
                online shopping and international transactions without the need for a traditional bank account. Our
                platform bridges the gap between telecom services and digital finance, making e-commerce accessible to
                everyone.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Feature List Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Key Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <CreditCard className="h-10 w-10 text-primary" />,
                  title: "Instant Virtual Cards",
                  description: "Generate virtual cards instantly for secure online shopping anywhere in the world.",
                },
                {
                  icon: <RefreshCw className="h-10 w-10 text-primary" />,
                  title: "Real-time Currency Conversion",
                  description: "Convert between currencies in real-time with competitive exchange rates.",
                },
                {
                  icon: <Shield className="h-10 w-10 text-primary" />,
                  title: "Secure Bank Transfers",
                  description: "Transfer funds securely to bank accounts locally and internationally.",
                },
                {
                  icon: <Gift className="h-10 w-10 text-primary" />,
                  title: "Rewards Program",
                  description: "Earn points on every transaction and redeem them for exclusive offers and discounts.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="bg-primary-50 p-3 rounded-full w-fit mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Call-to-Action Buttons */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Ready to Get Started?</h2>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already enjoying the benefits of Cards2Cash. Convert your phone credit
                to digital funds and start shopping online today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton
                  className="bg-primary hover:bg-primary-600 text-white font-medium"
                  onClick={() => {
                    const signupTab = document.querySelector('[value="signup"]') as HTMLElement
                    if (signupTab) signupTab.click()
                    const authSection = document.getElementById("auth-section")
                    if (authSection) authSection.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Get Started
                </AnimatedButton>
                <AnimatedButton
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary-50 font-medium"
                  onClick={() => router.push("/about")}
                >
                  Learn More
                </AnimatedButton>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  number: 1,
                  icon: <Phone className="h-10 w-10 text-primary" />,
                  title: "Load Phone Credit",
                  description:
                    "Convert prepaid credit from carriers like Digicel or GTT into your Cards2Cash account balance.",
                },
                {
                  number: 2,
                  icon: <CreditCard className="h-10 w-10 text-primary" />,
                  title: "Generate Virtual Cards",
                  description:
                    "Create virtual cards instantly for secure online transactions with major payment networks.",
                },
                {
                  number: 3,
                  icon: <ShoppingCart className="h-10 w-10 text-primary" />,
                  title: "Shop Online Securely",
                  description:
                    "Use your virtual cards with real-time currency conversion for secure purchases anywhere.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow h-full">
                    <div className="absolute -top-5 left-6 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                      {step.number}
                    </div>
                    <div className="pt-6">
                      <div className="bg-primary-50 p-3 rounded-full w-fit mb-4">{step.icon}</div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-8 w-8 text-primary" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Authentication Section */}
      <section id="auth-section" className="py-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
          <FinancialPattern />

          <div className="w-full max-w-md space-y-8">
            <FadeIn>
              <div className="flex flex-col items-center space-y-4 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <Logo size="lg" />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-sm italic font-medium text-primary-700" // Darker for better contrast
                >
                  The Future of Your Finances, For a Borderless World
                </motion.p>

                <StaggeredFade className="grid grid-cols-5 gap-4">
                  {[
                    { icon: <Wallet className="h-8 w-8 text-primary" />, text: "Digital Wallet" },
                    { icon: <Bitcoin className="h-8 w-8 text-accent" />, text: "Crypto Ready" },
                    { icon: <Landmark className="h-8 w-8 text-secondary" />, text: "Bank Transfer" },
                    { icon: <CreditCard className="h-8 w-8 text-primary" />, text: "Virtual Cards" },
                    { icon: <Bank className="h-8 w-8 text-secondary" />, text: "Bank Connect" },
                  ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      {item.icon}
                      <p className="mt-1 text-xs font-medium text-gray-700">{item.text}</p>{" "}
                      {/* Darker gray for better contrast */}
                    </div>
                  ))}
                </StaggeredFade>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login" className="font-medium">
                    Login
                  </TabsTrigger>{" "}
                  {/* Added font-medium */}
                  <TabsTrigger value="signup" className="font-medium">
                    Sign Up
                  </TabsTrigger>{" "}
                  {/* Added font-medium */}
                </TabsList>

                <AnimatePresence mode="wait">
                  <TabsContent value="login">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="border-none shadow-lg">
                        <CardHeader className="bg-primary text-white rounded-t-lg">
                          <CardTitle>Welcome back</CardTitle>
                          <CardDescription className="text-white opacity-90">
                            {" "}
                            {/* Changed from text-primary-100 for better contrast */}
                            Enter your credentials to access your account
                          </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleLogin}>
                          <CardContent className="space-y-4 p-6">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="font-medium">Login with</Label> {/* Added font-medium */}
                                <div className="flex overflow-hidden rounded-lg border border-primary-200">
                                  <AnimatedButton
                                    type="button"
                                    className={cn(
                                      "relative px-4 py-1.5 text-sm font-medium transition-all duration-200", // Added font-medium
                                      loginMethod === "phone"
                                        ? "bg-primary text-white"
                                        : "bg-white text-black hover:bg-primary-50", // Changed to black for better contrast
                                    )}
                                    onClick={() => setLoginMethod("phone")}
                                  >
                                    <span
                                      style={{
                                        textShadow:
                                          "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Phone
                                    </span>
                                    {loginMethod === "phone" && (
                                      <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-primary"
                                        style={{ zIndex: -1 }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                      />
                                    )}
                                  </AnimatedButton>
                                  <AnimatedButton
                                    type="button"
                                    className={cn(
                                      "relative px-4 py-1.5 text-sm font-medium transition-all duration-200", // Added font-medium
                                      loginMethod === "email"
                                        ? "bg-primary text-white"
                                        : "bg-white text-black hover:bg-primary-50", // Changed to black for better contrast
                                    )}
                                    onClick={() => setLoginMethod("email")}
                                  >
                                    <span
                                      style={{
                                        textShadow:
                                          "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      Email
                                    </span>
                                    {loginMethod === "email" && (
                                      <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-primary"
                                        style={{ zIndex: -1 }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                      />
                                    )}
                                  </AnimatedButton>
                                </div>
                              </div>
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={loginMethod}
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 10 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {loginMethod === "phone" ? (
                                    <Input
                                      type="tel"
                                      placeholder="+592 XXX XXXX"
                                      required
                                      className="border-primary-200 focus:border-primary focus:ring-primary"
                                    />
                                  ) : (
                                    <Input
                                      type="email"
                                      placeholder="name@example.com"
                                      required
                                      className="border-primary-200 focus:border-primary focus:ring-primary"
                                    />
                                  )}
                                </motion.div>
                              </AnimatePresence>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center">
                                <Label htmlFor="password" className="font-medium">
                                  Password
                                </Label>
                              </div>
                              <Input
                                id="password"
                                type="password"
                                required
                                className="border-primary-200 focus:border-primary focus:ring-primary"
                              />
                              <div className="flex justify-end">
                                <AnimatedButton
                                  variant="link"
                                  className="h-auto p-0 text-xs font-medium text-primary hover:text-primary-600"
                                  onClick={() => router.push("/forgot-password")}
                                >
                                  Forgot password?
                                </AnimatedButton>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox id="remember" />
                              <label
                                htmlFor="remember"
                                className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                Remember me
                              </label>
                            </div>
                          </CardContent>
                          <CardFooter className="flex flex-col space-y-2 p-6 pt-0">
                            <AnimatedButton
                              type="submit"
                              className="w-full bg-primary hover:bg-primary-600 font-medium" // Added font-medium
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <div className="flex items-center justify-center">
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                    className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                                  />
                                  Logging in...
                                </div>
                              ) : (
                                "Login"
                              )}
                            </AnimatedButton>
                            <AnimatedButton
                              type="button"
                              className="w-full bg-primary text-white hover:bg-primary-600 font-medium" // Added font-medium
                              onClick={() => router.push("/biometric-auth")}
                            >
                              <Fingerprint className="mr-2 h-4 w-4" />
                              Login with Biometrics
                            </AnimatedButton>

                            <div className="relative my-2">
                              <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                              </div>
                              <div className="relative flex justify-center text-xs uppercase font-medium">
                                {" "}
                                {/* Added font-medium */}
                                <span className="bg-white px-2 text-gray-700">Or continue with</span>{" "}
                                {/* Darker gray */}
                              </div>
                            </div>

                            <div className="flex justify-between space-x-2">
                              <AnimatedButton
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => handleSocialLogin("google")}
                              >
                                <img
                                  src="https://img.icons8.com/color/96/000000/gmail.png"
                                  alt="Google"
                                  width={20}
                                  height={20}
                                />
                              </AnimatedButton>
                              <AnimatedButton
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => handleSocialLogin("facebook")}
                              >
                                <img
                                  src="https://img.icons8.com/color/96/000000/facebook-new.png"
                                  alt="Facebook"
                                  width={20}
                                  height={20}
                                />
                              </AnimatedButton>
                              <AnimatedButton
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => handleSocialLogin("whatsapp")}
                              >
                                <img
                                  src="https://img.icons8.com/color/96/000000/whatsapp.png"
                                  alt="WhatsApp"
                                  width={20}
                                  height={20}
                                />
                              </AnimatedButton>
                            </div>
                          </CardFooter>
                        </form>
                      </Card>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="signup">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="border-none shadow-lg">
                        <CardHeader className="bg-primary text-white rounded-t-lg">
                          <CardTitle>Create an account</CardTitle>
                          <CardDescription className="text-white opacity-90">
                            {" "}
                            {/* Changed from text-primary-100 for better contrast */}
                            Enter your details to create your account
                          </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleSignUp}>
                          <CardContent className="space-y-4 p-6">
                            <div className="space-y-2">
                              <Label htmlFor="name" className="font-medium">
                                Full Name
                              </Label>{" "}
                              {/* Added font-medium */}
                              <Input
                                id="name"
                                placeholder="John Doe"
                                required
                                className="border-primary-200 focus:border-primary focus:ring-primary"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email" className="font-medium">
                                Email
                              </Label>{" "}
                              {/* Added font-medium */}
                              <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                required
                                className="border-primary-200 focus:border-primary focus:ring-primary"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone" className="font-medium">
                                Phone Number (Optional)
                              </Label>{" "}
                              {/* Added font-medium */}
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+592 XXX XXXX"
                                className="border-primary-200 focus:border-primary focus:ring-primary"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="signup-password" className="font-medium">
                                Password
                              </Label>{" "}
                              {/* Added font-medium */}
                              <Input
                                id="signup-password"
                                type="password"
                                required
                                className="border-primary-200 focus:border-primary focus:ring-primary"
                              />
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox id="terms" required />
                              <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none text-gray-900 peer-disabled:cursor-not-allowed peer-disabled:opacity-70" // Darker text
                              >
                                I agree to the{" "}
                                <a href="#" className="text-primary-700 hover:underline font-semibold">
                                  {" "}
                                  {/* Darker primary and font-semibold */}
                                  Terms of Service
                                </a>{" "}
                                {/* Darker primary and font-semibold */}
                                and{" "}
                                <a href="#" className="text-primary-700 hover:underline font-semibold">
                                  {" "}
                                  {/* Darker primary and font-semibold */}
                                  Privacy Policy
                                </a>
                              </label>
                            </div>
                          </CardContent>
                          <CardFooter className="flex flex-col space-y-2 p-6 pt-0">
                            <AnimatedButton
                              type="submit"
                              className="w-full bg-primary hover:bg-primary-600 font-medium" // Added font-medium
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <div className="flex items-center justify-center">
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                    className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                                  />
                                  Creating account...
                                </div>
                              ) : (
                                "Sign Up"
                              )}
                            </AnimatedButton>

                            <div className="relative my-2">
                              <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                              </div>
                              <div className="relative flex justify-center text-xs uppercase font-medium">
                                {" "}
                                {/* Added font-medium */}
                                <span className="bg-white px-2 text-gray-700">Or sign up with</span> {/* Darker gray */}
                              </div>
                            </div>

                            <div className="flex justify-between space-x-2">
                              <AnimatedButton
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => handleSocialLogin("google")}
                              >
                                <img
                                  src="https://img.icons8.com/color/96/000000/gmail.png"
                                  alt="Google"
                                  width={20}
                                  height={20}
                                />
                              </AnimatedButton>
                              <AnimatedButton
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => handleSocialLogin("facebook")}
                              >
                                <img
                                  src="https://img.icons8.com/color/96/000000/facebook-new.png"
                                  alt="Facebook"
                                  width={20}
                                  height={20}
                                />
                              </AnimatedButton>
                              <AnimatedButton
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => handleSocialLogin("whatsapp")}
                              >
                                <img
                                  src="https://img.icons8.com/color/96/000000/whatsapp.png"
                                  alt="WhatsApp"
                                  width={20}
                                  height={20}
                                />
                              </AnimatedButton>
                            </div>
                          </CardFooter>
                        </form>
                      </Card>
                    </motion.div>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <Lock className="h-4 w-4 text-gray-700" /> {/* Darker gray for better contrast */}
                <span className="text-gray-700 font-medium">Secure authentication</span>{" "}
                {/* Darker gray and font-medium */}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <Logo size="md" />
                <h3 className="text-xl font-bold ml-2">Cards2Cash</h3>
              </div>
              <p className="text-gray-400">Converting phone credit to digital funds since 2023</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Subscribe to Our Newsletter</h4>
              <p className="text-gray-400 mb-4">Stay updated with our latest news and offers</p>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <AnimatedButton type="submit" className="w-full bg-primary hover:bg-primary-600">
                  Subscribe
                </AnimatedButton>
              </form>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Cards2Cash. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

