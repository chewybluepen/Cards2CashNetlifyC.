"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  ArrowLeft,
  ChevronRight,
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
  Search,
  Home,
  CreditCard,
  Plus,
  RefreshCw,
  Award,
  Settings,
} from "lucide-react"

// FAQ data
const faqs = [
  {
    question: "How do I add funds to my account?",
    answer:
      "You can add funds to your account by going to the 'Add Funds' section from your dashboard. Enter your prepaid voucher code from carriers like Digicel or GTT, and the funds will be converted to your digital balance instantly.",
  },
  {
    question: "How do I generate a virtual card?",
    answer:
      "To generate a virtual card, tap on 'Generate Card' from your dashboard. Choose between a single-use or recurring card, select your preferred card type (Visa, Mastercard, or Amex), and enter the amount. Your card details will be generated instantly.",
  },
  {
    question: "What are the fees for currency conversion?",
    answer:
      "For currency conversions, we charge a small fee of 1.5% of the transaction amount. We use real-time exchange rates from CurrencyAPI to ensure you get the best rates available.",
  },
  {
    question: "How do I refer a friend?",
    answer:
      "You can refer friends by sharing your unique referral code found in the 'Partner Offers' section. When your friend signs up using your code and makes their first transaction, you'll both receive GYD 1,000 in your accounts!",
  },
  {
    question: "Is my information secure?",
    answer:
      "Yes, we use industry-standard encryption and security measures to protect your personal and financial information. We also offer two-factor authentication for an additional layer of security.",
  },
  {
    question: "What should I do if I lose my phone?",
    answer:
      "If you lose your phone, you should immediately log in to your account from another device and change your password. If you have two-factor authentication enabled, you can use your recovery codes to access your account.",
  },
  {
    question: "How long does it take to process transactions?",
    answer:
      "Most transactions are processed instantly. However, some transactions may take up to 24 hours to complete, depending on the payment method and the recipient's bank.",
  },
]

export default function HelpSupport() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
          <h1 className="text-lg font-semibold">Help & Support</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search for help"
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <HelpCircle className="mb-2 h-12 w-12 text-gray-300" />
                  <h3 className="text-lg font-medium">No results found</h3>
                  <p className="text-sm text-gray-500">Try a different search term or contact our support team</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get in touch with our customer service team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="/chat">
                  <div className="flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-blue-600" />
                    <span>Chat with AI Assistant</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </Button>

              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="tel:+5921234567">
                  <div className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-green-600" />
                    <span>Call Customer Service</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </Button>

              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="mailto:support@cards2cash.com">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-red-600" />
                    <span>Email Support</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Simple inline navigation */}
      <nav className="fixed bottom-0 left-0 z-10 w-full border-t border-[#333333] bg-[#141414]">
        <div className="flex h-16 justify-between px-2">
          <Link
            href="/dashboard"
            className="flex flex-col items-center justify-center px-2 space-y-1 text-gray-500 hover:text-gray-300"
          >
            <div className="flex items-center justify-center">
              <Home className="h-5 w-5" />
            </div>
            <span className="block w-full text-center text-xs font-medium">Home</span>
          </Link>

          <Link
            href="/generate-card"
            className="flex flex-col items-center justify-center px-2 space-y-1 text-gray-500 hover:text-gray-300"
          >
            <div className="flex items-center justify-center">
              <CreditCard className="h-5 w-5" />
            </div>
            <span className="block w-full text-center text-xs font-medium">Cards</span>
          </Link>

          <Link
            href="/add-funds"
            className="flex flex-col items-center justify-center px-2 space-y-1 text-gray-500 hover:text-gray-300"
          >
            <div className="flex items-center justify-center">
              <Plus className="h-5 w-5" />
            </div>
            <span className="block w-full text-center text-xs font-medium">Add</span>
          </Link>

          <Link
            href="/convert"
            className="flex flex-col items-center justify-center px-2 space-y-1 text-gray-500 hover:text-gray-300"
          >
            <div className="flex items-center justify-center">
              <RefreshCw className="h-5 w-5" />
            </div>
            <span className="block w-full text-center text-xs font-medium">Convert</span>
          </Link>

          <Link
            href="/rewards"
            className="flex flex-col items-center justify-center px-2 space-y-1 text-gray-500 hover:text-gray-300"
          >
            <div className="flex items-center justify-center">
              <Award className="h-5 w-5" />
            </div>
            <span className="block w-full text-center text-xs font-medium">Rewards</span>
          </Link>

          <Link
            href="/settings"
            className="flex flex-col items-center justify-center px-2 space-y-1 text-gray-500 hover:text-gray-300"
          >
            <div className="flex items-center justify-center">
              <Settings className="h-5 w-5" />
            </div>
            <span className="block w-full text-center text-xs font-medium">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

