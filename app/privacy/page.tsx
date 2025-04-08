"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function PrivacyPolicy() {
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
          <h1 className="text-lg font-semibold">Privacy Policy</h1>
        </div>
        <p className="mt-1 text-center text-xs italic text-gray-500">
          The Future of Your Finances, For a Borderless World
        </p>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
            <p className="text-sm text-gray-500">Last Updated: April 1, 2025</p>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium">1. Introduction</h3>
              <p className="mt-1 text-gray-700">
                Cards2Cash ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you use our mobile application and
                related services (collectively, the "Service").
              </p>
              <p className="mt-1 text-gray-700">
                Please read this Privacy Policy carefully. By using the Service, you agree to the collection and use of
                information in accordance with this policy.
              </p>
            </div>

            <div>
              <h3 className="font-medium">2. Information We Collect</h3>
              <p className="mt-1 text-gray-700">We collect several types of information, including:</p>
              <ul className="ml-5 list-disc space-y-1 text-gray-700">
                <li>
                  <strong>Personal Information:</strong> Name, email address, phone number, and other information you
                  provide when creating an account.
                </li>
                <li>
                  <strong>Financial Information:</strong> Transaction history, account balances, and payment
                  information.
                </li>
                <li>
                  <strong>Device Information:</strong> Information about your mobile device, including device type,
                  operating system, and unique device identifiers.
                </li>
                <li>
                  <strong>Usage Information:</strong> How you use our Service, including features you use and time spent
                  on the app.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium">3. How We Use Your Information</h3>
              <p className="mt-1 text-gray-700">We use the information we collect to:</p>
              <ul className="ml-5 list-disc space-y-1 text-gray-700">
                <li>Provide, maintain, and improve our Service</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Personalize your experience and provide content and features that match your profile</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium">4. Sharing Your Information</h3>
              <p className="mt-1 text-gray-700">
                We may share your information with third parties in the following situations:
              </p>
              <ul className="ml-5 list-disc space-y-1 text-gray-700">
                <li>With service providers who perform services on our behalf</li>
                <li>To comply with legal obligations</li>
                <li>To protect and defend our rights and property</li>
                <li>With your consent or at your direction</li>
              </ul>
              <p className="mt-1 text-gray-700">We do not sell your personal information to third parties.</p>
            </div>

            <div>
              <h3 className="font-medium">5. Data Security</h3>
              <p className="mt-1 text-gray-700">
                We implement appropriate technical and organizational measures to protect the security of your personal
                information. However, please be aware that no method of transmission over the internet or electronic
                storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h3 className="font-medium">6. Your Rights</h3>
              <p className="mt-1 text-gray-700">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="ml-5 list-disc space-y-1 text-gray-700">
                <li>The right to access and receive a copy of your personal information</li>
                <li>The right to rectify or update your personal information</li>
                <li>The right to delete your personal information</li>
                <li>The right to restrict or object to our processing of your personal information</li>
                <li>The right to data portability</li>
              </ul>
              <p className="mt-1 text-gray-700">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section.
              </p>
            </div>

            <div>
              <h3 className="font-medium">7. Changes to This Privacy Policy</h3>
              <p className="mt-1 text-gray-700">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last Updated" date.
              </p>
              <p className="mt-1 text-gray-700">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                Policy are effective when they are posted on this page.
              </p>
            </div>

            <div>
              <h3 className="font-medium">8. Contact Us</h3>
              <p className="mt-1 text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-1 text-gray-700">
                Email: privacy@cards2cash.com
                <br />
                Address: 123 Main Street, Georgetown, Guyana
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 flex justify-center">
          <Button variant="outline" asChild>
            <Link href="/settings">Back to Settings</Link>
          </Button>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

