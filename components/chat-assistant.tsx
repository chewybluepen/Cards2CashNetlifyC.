"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Mic, Image, Paperclip, Bot, User, RefreshCw } from "lucide-react"
import { useTypingAnimation } from "@/lib/animation-utils"

// Sample responses for the chatbot
const sampleResponses = [
  "Welcome to Cards2Cash! How can I assist you today?",
  "You can add funds to your account by going to the Add Funds section and entering your prepaid voucher code.",
  "To generate a virtual card, go to the Cards section and tap on 'Generate New Card'. You can choose between Visa, Mastercard, or Amex.",
  "Your current balance is GYD 25,000. You have 2 active virtual cards.",
  "The current exchange rate for USD is 1 USD = 208.5 GYD.",
  "I can help you with adding funds, generating virtual cards, checking your balance, and more!",
  "For security reasons, we recommend enabling two-factor authentication in your account settings.",
  "You can refer friends using your unique referral code found in the Referral section. Both you and your friend will receive GYD 1,000 when they sign up!",
  "If you're experiencing any issues, please contact our support team at support@cards2cash.com or call +592-123-4567.",
  "The Future of Your Finances, For a Borderless World - that's our commitment to you!",
]

interface Message {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

export function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Cards2Cash assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentResponse, setCurrentResponse] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { displayedText, isComplete } = useTypingAnimation(currentResponse, 20)

  useEffect(() => {
    scrollToBottom()
  }, [messages, displayedText])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate assistant typing
    setTimeout(() => {
      // Get random response
      const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)]
      setCurrentResponse(randomResponse)

      // When typing animation is complete, add message to chat
      if (isComplete) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: randomResponse,
          sender: "assistant",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
        setIsTyping(false)
      }
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className={`h-8 w-8 ${message.sender === "user" ? "ml-2" : "mr-2"}`}>
                  {message.sender === "assistant" ? (
                    <>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                      <AvatarFallback>
                        <Bot className="h-4 w-4 text-primary" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/placeholder.svg?height=32&width=32&text=U" alt="User" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>

                <Card className={`${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  <CardContent className="p-3">
                    <p className="text-sm">{message.content}</p>
                    <p className="mt-1 text-right text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex justify-start"
              >
                <div className="flex flex-row">
                  <Avatar className="mr-2 h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                    <AvatarFallback>
                      <Bot className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>

                  <Card className="bg-muted">
                    <CardContent className="p-3">
                      <p className="text-sm text-primary">{displayedText}</p>
                      {!isComplete && (
                        <div className="mt-1 flex space-x-1">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                          <div
                            className="h-2 w-2 animate-bounce rounded-full bg-primary"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="h-2 w-2 animate-bounce rounded-full bg-primary"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t bg-background p-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="shrink-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="shrink-0">
            <Image className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="shrink-0">
            <Mic className="h-4 w-4" />
          </Button>

          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />

          <Button
            size="icon"
            className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleSendMessage}
            disabled={inputValue.trim() === "" || isTyping}
          >
            {isTyping ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          The Future of Your Finances, For a Borderless World
        </p>
      </div>
    </div>
  )
}

