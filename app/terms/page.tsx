"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, FileText, Shield } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function TermsPrivacy() {
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
          <h1 className="text-lg font-semibold">Terms & Privacy</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Tabs defaultValue="terms" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
          </TabsList>

          <TabsContent value="terms" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-blue-600" />
                  <div>
                    <CardTitle>Terms of Service</CardTitle>
                    <CardDescription>Last updated: March 1, 2025</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="max-h-[60vh] overflow-y-auto">
                <div className="prose prose-sm">
                  <h3>1. Acceptance of Terms</h3>
                  <p>
                    By accessing or using the Cards2Cash service, you agree to be bound by these Terms of Service. If
                    you do not agree to these terms, please do not use our service.
                  </p>

                  <h3>2. Description of Service</h3>
                  <p>
                    Cards2Cash provides a platform for converting prepaid phone credit into digital funds, generating
                    virtual cards, and conducting international transactions.
                  </p>

                  <h3>3. User Accounts</h3>
                  <p>
                    You must create an account to use our services. You are responsible for maintaining the
                    confidentiality of your account information and for all activities that occur under your account.
                  </p>

                  <h3>4. Fees and Charges</h3>
                  <p>
                    Cards2Cash charges fees for certain services, including currency conversion (1.5% of transaction
                    amount) and virtual card generation. All fees are clearly displayed before you confirm any
                    transaction.
                  </p>

                  <h3>5. Virtual Cards</h3>
                  <p>
                    Virtual cards generated through our service are subject to the terms and conditions of the card
                    issuer. Cards2Cash is not responsible for any issues related to the use of virtual cards with
                    third-party merchants.
                  </p>

                  <h3>6. Prohibited Activities</h3>
                  <p>
                    You agree not to use our service for any illegal or unauthorized purpose, including money
                    laundering, fraud, or any other activity that violates applicable laws or regulations.
                  </p>

                  <h3>7. Termination</h3>
                  <p>
                    We reserve the right to terminate or suspend your account at any time for any reason, including
                    violation of these Terms of Service.
                  </p>

                  <h3>8. Changes to Terms</h3>
                  <p>
                    We may modify these Terms of Service at any time. Your continued use of our service after any
                    changes indicates your acceptance of the modified terms.
                  </p>

                  <h3>9. Disclaimer of Warranties</h3>
                  <p>
                    Our service is provided "as is" without any warranties, express or implied. We do not guarantee that
                    our service will be uninterrupted, timely, secure, or error-free.
                  </p>

                  <h3>10. Limitation of Liability</h3>
                  <p>
                    Cards2Cash shall not be liable for any indirect, incidental, special, consequential, or punitive
                    damages arising out of or relating to your use of our service.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-blue-600" />
                  <div>
                    <CardTitle>Privacy Policy</CardTitle>
                    <CardDescription>Last updated: March 1, 2025</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="max-h-[60vh] overflow-y-auto">
                <div className="prose prose-sm">
                  <h3>1. Information We Collect</h3>
                  <p>
                    We collect personal information such as your name, email address, phone number, and payment
                    information when you create an account or use our services.
                  </p>

                  <h3>2. How We Use Your Information</h3>
                  <p>
                    We use your information to provide and improve our services, process transactions, communicate with
                    you, and comply with legal obligations.
                  </p>

                  <h3>3. Information Sharing</h3>
                  <p>
                    We may share your information with third-party service providers who help us operate our business,
                    such as payment processors and card issuers. We do not sell your personal information to third
                    parties.
                  </p>

                  <h3>4. Data Security</h3>
                  <p>
                    We implement appropriate security measures to protect your personal information from unauthorized
                    access, alteration, disclosure, or destruction.
                  </p>

                  <h3>5. Cookies and Tracking Technologies</h3>
                  <p>
                    We use cookies and similar technologies to enhance your experience, analyze usage patterns, and
                    deliver personalized content.
                  </p>

                  <h3>6. Your Rights</h3>
                  <p>
                    You have the right to access, correct, update, or delete your personal information. You can manage
                    your information through your account settings or by contacting our support team.
                  </p>

                  <h3>7. Children's Privacy</h3>
                  <p>
                    Our services are not intended for children under the age of 18. We do not knowingly collect personal
                    information from children.
                  </p>

                  <h3>8. Changes to Privacy Policy</h3>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any significant changes
                    by posting the new policy on our website or through other communication channels.
                  </p>

                  <h3>9. Contact Us</h3>
                  <p>
                    If you have any questions or concerns about our Privacy Policy, please contact us at
                    privacy@cards2cash.com.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </div>
  )
}

