"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ChatAssistant } from "@/components/chat-assistant"

export default function ChatPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">AI Assistant</h1>
        </div>
        <p className="mt-1 text-center text-xs italic text-gray-500">
          The Future of Your Finances, For a Borderless World
        </p>
      </header>

      <main className="flex-1 p-4 pb-20">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-bold text-gray-900">Welcome to Cards2Cash Assistant</h2>
            <p className="mt-2 text-gray-600">
              I'm here to help you with any questions about your account, transactions, or our services.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="font-medium text-gray-900">Popular Questions</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    How do I add funds to my account?
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    How do I generate a virtual card?
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    What are the fees for currency conversion?
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-blue-600">
                    How do I withdraw funds to my bank account?
                  </Button>
                </li>
              </ul>
            </div>

            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="font-medium text-gray-900">Need More Help?</h3>
              <p className="mt-2 text-sm text-gray-600">
                If you need additional assistance, you can contact our support team directly.
              </p>
              <div className="mt-3 flex space-x-2">
                <Button variant="outline" asChild className="flex-1">
                  <Link href="/help/faq">View FAQs</Link>
                </Button>
                <Button asChild className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Link href="/help/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ChatAssistant />
      <BottomNavigation />
    </div>
  )
}

