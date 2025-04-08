"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Search, HelpCircle } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

// FAQ data
const faqCategories = [
  {
    id: "account",
    title: "Account & Security",
    faqs: [
      {
        question: "How do I change my password?",
        answer:
          "To change your password, go to Settings > Security > Change Password. You'll need to enter your current password and then create a new one.",
      },
      {
        question: "How do I enable two-factor authentication?",
        answer:
          "Go to Settings > Security > Two-Factor Authentication and follow the on-screen instructions to set up 2FA using your preferred method.",
      },
      {
        question: "What should I do if I forget my password?",
        answer:
          "On the login screen, tap 'Forgot Password' and follow the instructions to reset your password using your registered email address.",
      },
      {
        question: "How secure is my data with Cards2Cash?",
        answer:
          "We use industry-standard encryption and security protocols to protect your data. Your financial information is never stored on your device and all transactions are secured with end-to-end encryption.",
      },
    ],
  },
  {
    id: "funds",
    title: "Adding & Managing Funds",
    faqs: [
      {
        question: "How do I add funds to my account?",
        answer:
          "You can add funds to your account using prepaid vouchers from Digicel or GTT. Go to the Add Funds section, select your carrier, enter the voucher code, and submit.",
      },
      {
        question: "What are the fees for adding funds?",
        answer:
          "The fees vary based on the amount and carrier. Generally, larger amounts have lower percentage fees. You can view the current rates in the Add Funds > Rates section.",
      },
      {
        question: "How long does it take for funds to appear in my account?",
        answer:
          "Funds are typically added instantly once the voucher code is verified. If there's a delay, it usually resolves within 15 minutes.",
      },
      {
        question: "Is there a minimum or maximum amount I can add?",
        answer:
          "The minimum amount is GYD 500. The maximum depends on your account tier: Bronze (GYD 50,000/month), Silver (GYD 100,000/month), and Gold (GYD 200,000/month).",
      },
    ],
  },
  {
    id: "cards",
    title: "Virtual Cards",
    faqs: [
      {
        question: "How do I generate a virtual card?",
        answer:
          "Go to the Cards section, tap 'Generate New Card', select the card type (Visa or Mastercard), enter the amount you want to load, and confirm.",
      },
      {
        question: "Can I use my virtual card for international purchases?",
        answer:
          "Yes, our virtual cards can be used for international online purchases wherever Visa or Mastercard is accepted.",
      },
      {
        question: "What are the fees for using virtual cards?",
        answer:
          "There's a 2% fee for generating a virtual card. There are no additional fees for using the card for purchases.",
      },
      {
        question: "How long are virtual cards valid for?",
        answer:
          "Virtual cards are valid for 3 years from the date of generation. The expiry date is displayed with your card details.",
      },
    ],
  },
  {
    id: "conversion",
    title: "Currency Conversion",
    faqs: [
      {
        question: "What currencies can I convert between?",
        answer:
          "You can convert between GYD and several major currencies including USD, EUR, GBP, and CAD. We're constantly adding more options.",
      },
      {
        question: "What are the fees for currency conversion?",
        answer:
          "We charge a 1.5% fee on all currency conversions. This is lower than most traditional banks and money transfer services.",
      },
      {
        question: "How are exchange rates determined?",
        answer:
          "Our exchange rates are based on real-time market rates with a small margin. We update our rates frequently to ensure you get competitive rates.",
      },
      {
        question: "Is there a limit to how much I can convert?",
        answer:
          "Conversion limits depend on your account tier. Bronze users can convert up to GYD 100,000 per month, Silver up to GYD 250,000, and Gold up to GYD 500,000.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>("account")

  // Filter FAQs based on search term
  const filteredFAQs = searchTerm
    ? faqCategories.flatMap((category) =>
        category.faqs
          .filter(
            (faq) =>
              faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((faq) => ({ ...faq, category: category.id, categoryTitle: category.title })),
      )
    : []

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/help">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Frequently Asked Questions</h1>
        </div>
        <p className="mt-1 text-center text-xs italic text-gray-500">
          The Future of Your Finances, For a Borderless World
        </p>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4">
          <CardHeader className="pb-2">
            <CardTitle>How can we help you?</CardTitle>
            <CardDescription>Search our FAQ or browse by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search for answers..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {searchTerm ? (
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Search Results</h2>
            {filteredFAQs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`search-${index}`}>
                    <AccordionTrigger className="text-left">
                      <div>
                        <span className="text-sm font-medium">{faq.question}</span>
                        <p className="text-xs text-gray-500">{faq.categoryTitle}</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <HelpCircle className="mb-2 h-8 w-8 text-gray-400" />
                  <h3 className="text-lg font-medium">No results found</h3>
                  <p className="text-sm text-gray-500">Try different keywords or browse the categories below.</p>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {faqCategories.map((category) => (
              <Card key={category.id} className="overflow-hidden">
                <CardHeader
                  className={`cursor-pointer p-4 ${expandedCategory === category.id ? "bg-blue-50" : ""}`}
                  onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                >
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                {expandedCategory === category.id && (
                  <CardContent className="p-4 pt-0">
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`${category.id}-${index}`}>
                          <AccordionTrigger className="text-left text-sm font-medium">{faq.question}</AccordionTrigger>
                          <AccordionContent className="text-sm">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Can't find what you're looking for?</p>
          <Button variant="link" asChild>
            <Link href="/chat">Chat with our support assistant</Link>
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

