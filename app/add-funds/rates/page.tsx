"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, DollarSign, Calculator, Info } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock conversion rates data
const conversionRates = {
  digicel: [
    { voucherAmount: 500, digitalAmount: 475, fee: 25, rate: 0.95 },
    { voucherAmount: 1000, digitalAmount: 960, fee: 40, rate: 0.96 },
    { voucherAmount: 2000, digitalAmount: 1940, fee: 60, rate: 0.97 },
    { voucherAmount: 5000, digitalAmount: 4900, fee: 100, rate: 0.98 },
    { voucherAmount: 10000, digitalAmount: 9850, fee: 150, rate: 0.985 },
  ],
  gtt: [
    { voucherAmount: 500, digitalAmount: 480, fee: 20, rate: 0.96 },
    { voucherAmount: 1000, digitalAmount: 970, fee: 30, rate: 0.97 },
    { voucherAmount: 2000, digitalAmount: 1950, fee: 50, rate: 0.975 },
    { voucherAmount: 5000, digitalAmount: 4925, fee: 75, rate: 0.985 },
    { voucherAmount: 10000, digitalAmount: 9900, fee: 100, rate: 0.99 },
  ],
}

export default function AddFundsRates() {
  const [activeTab, setActiveTab] = useState("digicel")
  const [calculatorAmount, setCalculatorAmount] = useState("")
  const [calculatedResult, setCalculatedResult] = useState<number | null>(null)

  const handleCalculate = () => {
    const amount = Number.parseFloat(calculatorAmount)
    if (isNaN(amount) || amount <= 0) {
      setCalculatedResult(null)
      return
    }

    // Find the appropriate rate based on amount
    const rates = activeTab === "digicel" ? conversionRates.digicel : conversionRates.gtt
    let rate = rates[0].rate // Default to lowest rate

    for (let i = rates.length - 1; i >= 0; i--) {
      if (amount >= rates[i].voucherAmount) {
        rate = rates[i].rate
        break
      }
    }

    setCalculatedResult(amount * rate)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/add-funds">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Conversion Rates</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Prepaid Credit Conversion Rates</CardTitle>
            <CardDescription>See how much digital currency you'll receive for your prepaid credit</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="digicel" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="digicel" className="flex items-center gap-2">
                  <div className="h-5 w-5 overflow-hidden rounded-full">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/digicel-logo-MoHV8q1LLOZPdSRJmIs4Bzevlt2Z2x.png"
                      alt="Digicel"
                      width={20}
                      height={20}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span>Digicel</span>
                </TabsTrigger>
                <TabsTrigger value="gtt" className="flex items-center gap-2">
                  <div className="h-5 w-5 overflow-hidden rounded-full">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/gtt-logo-IFcxR74KmUyVwRYub9XSe2FQcxy4MC.png"
                      alt="GTT"
                      width={20}
                      height={20}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span>GTT</span>
                </TabsTrigger>
              </TabsList>

              {["digicel", "gtt"].map((carrier) => (
                <TabsContent key={carrier} value={carrier} className="mt-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="p-2 text-left">Voucher Amount</th>
                          <th className="p-2 text-left">Digital Amount</th>
                          <th className="p-2 text-left">Fee</th>
                          <th className="p-2 text-left">Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {conversionRates[carrier as keyof typeof conversionRates].map((rate, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2">GYD {rate.voucherAmount.toLocaleString()}</td>
                            <td className="p-2">GYD {rate.digitalAmount.toLocaleString()}</td>
                            <td className="p-2">GYD {rate.fee.toLocaleString()}</td>
                            <td className="p-2">{(rate.rate * 100).toFixed(1)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Calculator</CardTitle>
            <CardDescription>Calculate how much digital currency you'll receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="calculator-amount">Voucher Amount (GYD)</Label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="calculator-amount"
                    type="number"
                    placeholder="Enter amount"
                    className="pl-9"
                    value={calculatorAmount}
                    onChange={(e) => setCalculatorAmount(e.target.value)}
                  />
                </div>
                <Button type="button" onClick={handleCalculate}>
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate
                </Button>
              </div>
            </div>

            {calculatedResult !== null && (
              <div className="rounded-md bg-blue-50 p-4 text-center">
                <p className="text-sm text-blue-800">You will receive:</p>
                <p className="text-2xl font-bold text-blue-800">
                  GYD {calculatedResult.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-blue-600">Based on {activeTab === "digicel" ? "Digicel" : "GTT"} rates</p>
              </div>
            )}

            <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-amber-600" />
                </div>
                <div className="ml-3">
                  <p>
                    Rates may vary based on promotions and special offers. Higher amounts typically receive better
                    conversion rates.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/add-funds">Add Funds Now</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  )
}

