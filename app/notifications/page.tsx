"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Bell, CheckCircle, CreditCard, DollarSign, Trash2 } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { toast } from "@/components/ui/use-toast"

// Mock notifications data with updated dates (after March 27, 2025)
const initialNotifications = [
  {
    id: 1,
    type: "alert",
    title: "Spending Alert",
    message: "You're approaching your daily spending limit.",
    timestamp: "2025-04-10T10:30:00",
    isRead: false,
  },
  {
    id: 2,
    type: "transaction",
    title: "Virtual Card Generated",
    message: "Your virtual card has been successfully generated.",
    timestamp: "2025-04-09T15:45:00",
    isRead: true,
  },
  {
    id: 3,
    type: "promo",
    title: "New Partner Offer",
    message: "10% off at TechStore! Valid until May 31, 2025.",
    timestamp: "2025-04-08T09:20:00",
    isRead: false,
  },
  {
    id: 4,
    type: "transaction",
    title: "Funds Added",
    message: "GYD 5,000 has been added to your account.",
    timestamp: "2025-04-07T14:15:00",
    isRead: true,
  },
  {
    id: 5,
    type: "alert",
    title: "Security Alert",
    message: "New login detected from Georgetown, Guyana.",
    timestamp: "2025-04-06T08:30:00",
    isRead: false,
  },
]

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [activeTab, setActiveTab] = useState("all")

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.isRead
    return notification.type === activeTab
  })

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, isRead: true })))
    toast({
      title: "All Notifications Marked as Read",
      description: "All your notifications have been marked as read.",
      variant: "default",
    })
  }

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const clearAll = () => {
    setNotifications([])
    toast({
      title: "Notifications Cleared",
      description: "All your notifications have been cleared.",
      variant: "default",
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <Bell className="h-5 w-5 text-amber-500" />
      case "transaction":
        return <DollarSign className="h-5 w-5 text-green-500" />
      case "promo":
        return <CreditCard className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Notifications</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <CheckCircle className="mr-1 h-4 w-4" />
              Mark all read
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAll}>
              <Trash2 className="mr-1 h-4 w-4" />
              Clear all
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="alert">Alerts</TabsTrigger>
            <TabsTrigger value="transaction">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            {filteredNotifications.length > 0 ? (
              <div className="space-y-2">
                {filteredNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`transition-colors ${!notification.isRead ? "border-l-4 border-l-blue-600" : ""}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CardContent className="flex items-start gap-3 p-4">
                      <div className="mt-0.5 rounded-full bg-gray-100 p-2">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-medium ${!notification.isRead ? "text-blue-600" : ""}`}>
                            {notification.title}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {new Date(notification.timestamp).toLocaleString([], {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg bg-white p-8 text-center shadow-sm">
                <Bell className="mb-2 h-12 w-12 text-gray-300" />
                <h3 className="text-lg font-medium">No notifications</h3>
                <p className="text-sm text-gray-500">You're all caught up! Check back later for updates.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </div>
  )
}

