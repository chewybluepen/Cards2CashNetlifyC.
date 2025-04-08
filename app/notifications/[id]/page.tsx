"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Bell, CreditCard, DollarSign, Info, Trash2 } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { toast } from "@/components/ui/use-toast"

// Mock notifications data with updated dates (after March 27, 2025)
const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Spending Alert",
    message: "You're approaching your daily spending limit.",
    timestamp: "2025-04-10T10:30:00",
    isRead: false,
    details:
      "You have spent GYD 4,500 out of your GYD 5,000 daily limit. Consider adjusting your spending or increasing your limit in the settings.",
    actions: [
      {
        label: "Adjust Spending Limits",
        link: "/spending-limits",
      },
    ],
  },
  {
    id: 2,
    type: "transaction",
    title: "Virtual Card Generated",
    message: "Your virtual card has been successfully generated.",
    timestamp: "2025-04-09T15:45:00",
    isRead: true,
    details:
      "You have successfully generated a Visa virtual card with a balance of GYD 2,500. The card is ready to use for online purchases.",
    actions: [
      {
        label: "View Card Details",
        link: "/generate-card",
      },
    ],
    transactionId: 2,
  },
  {
    id: 3,
    type: "promo",
    title: "New Partner Offer",
    message: "10% off at TechStore! Valid until May 31, 2025.",
    timestamp: "2025-04-08T09:20:00",
    isRead: false,
    details:
      "Enjoy 10% off on all electronics at TechStore. Use code TECH10 at checkout. Valid for both online and in-store purchases until May 31, 2025.",
    actions: [
      {
        label: "View Offer",
        link: "/offers/1",
      },
    ],
  },
  {
    id: 4,
    type: "transaction",
    title: "Funds Added",
    message: "GYD 5,000 has been added to your account.",
    timestamp: "2025-04-07T14:15:00",
    isRead: true,
    details:
      "GYD 5,000 has been successfully added to your account from a Digicel prepaid voucher. Your new balance is GYD 25,000.",
    actions: [
      {
        label: "View Transaction",
        link: "/transactions/1",
      },
    ],
    transactionId: 1,
  },
  {
    id: 5,
    type: "alert",
    title: "Security Alert",
    message: "New login detected from Georgetown, Guyana.",
    timestamp: "2025-04-06T08:30:00",
    isRead: false,
    details:
      "A new login to your account was detected from Georgetown, Guyana using Chrome on Windows. If this was you, you can ignore this alert. If not, please secure your account immediately.",
    actions: [
      {
        label: "Secure Account",
        link: "/settings",
      },
      {
        label: "It Was Me",
        link: "#",
        isDismiss: true,
      },
    ],
  },
]

export default function NotificationDetails() {
  const params = useParams()
  const router = useRouter()
  const [notification, setNotification] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call to fetch notification details
    setIsLoading(true)

    setTimeout(() => {
      const id = Number(params.id)
      const foundNotification = notifications.find((n) => n.id === id)

      if (foundNotification) {
        setNotification(foundNotification)
        setError(null)
      } else {
        setError("Notification not found")
      }

      setIsLoading(false)
    }, 1000)
  }, [params.id])

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

  const handleDismiss = () => {
    toast({
      title: "Notification Dismissed",
      description: "This notification has been dismissed.",
      variant: "default",
    })
    router.push("/notifications")
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/notifications">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Notification Details</h1>
          </div>
        </header>

        <main className="flex-1 p-4 pb-20">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
            <p className="mt-4 text-gray-500">Loading notification details...</p>
          </div>
        </main>

        <BottomNavigation />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/notifications">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Notification Details</h1>
          </div>
        </header>

        <main className="flex-1 p-4 pb-20">
          <Alert variant="destructive">
            <Info className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>

          <div className="mt-4 flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/notifications">Return to Notifications</Link>
            </Button>
          </div>
        </main>

        <BottomNavigation />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/notifications">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Notification Details</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={handleDismiss}>
            <Trash2 className="h-5 w-5 text-gray-500" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <div
                className={`mr-3 rounded-full p-2 ${
                  notification.type === "alert"
                    ? "bg-amber-100"
                    : notification.type === "transaction"
                      ? "bg-green-100"
                      : "bg-blue-100"
                }`}
              >
                {getNotificationIcon(notification.type)}
              </div>
              <div>
                <CardTitle>{notification.title}</CardTitle>
                <CardDescription>{new Date(notification.timestamp).toLocaleString()}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">{notification.details}</p>

            {notification.transactionId && (
              <div className="rounded-md bg-gray-50 p-4">
                <p className="text-sm font-medium">Transaction Reference:</p>
                <p className="font-mono text-sm">#{notification.transactionId}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            {notification.actions &&
              notification.actions.map((action: any, index: number) => (
                <Button
                  key={index}
                  variant={action.isDismiss ? "outline" : "default"}
                  className={action.isDismiss ? "" : "bg-blue-600 hover:bg-blue-700"}
                  asChild={!action.isDismiss}
                  onClick={action.isDismiss ? handleDismiss : undefined}
                  className="w-full"
                >
                  {action.isDismiss ? action.label : <Link href={action.link}>{action.label}</Link>}
                </Button>
              ))}
          </CardFooter>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  )
}

