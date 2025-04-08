"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  const faqs = [
    {
      question: "How do I add funds using a prepaid card?",
      answer:
        "Enter your carrier, input the voucher code from your prepaid card, and click 'Add Credit'. The funds will be added to your account immediately if you're online, or queued for processing when you're back online if you're in offline mode.",
    },
    {
      question: "What currencies are supported?",
      answer:
        "We support multiple currencies including Guyanese Dollar (GYD), US Dollar (USD), Canadian Dollar (CAD), British Pound (GBP), Euro (EUR), and more. The available currencies depend on the carrier you select.",
    },
    {
      question: "Are there any fees for adding funds?",
      answer:
        "There are no fees for adding funds from Guyanese carriers. International carriers may have a small conversion fee depending on the currency. You can view the current rates in the 'View Rates' section.",
    },
    {
      question: "Can I add funds while offline?",
      answer:
        "Yes! Our app supports offline mode. Your transaction will be queued and processed automatically when you're back online.",
    },
    {
      question: "How long does it take for funds to appear in my account?",
      answer:
        "Funds from Guyanese carriers are typically added instantly. International carriers may take up to 10 minutes depending on network conditions.",
    },
  ]

  return (
    <div className="mt-8 mb-6">
      <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
      <Accordion type="single" collapsible className="bg-white rounded-lg border">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="px-4 hover:no-underline hover:bg-gray-50">
              <span className="text-left text-black">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 text-black">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

