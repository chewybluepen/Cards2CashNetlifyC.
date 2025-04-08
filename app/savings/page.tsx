"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  ArrowLeft,
  PiggyBank,
  Target,
  Plus,
  Wallet,
  TrendingUp,
  Calendar,
  DollarSign,
  CheckCircle,
  Info,
} from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

// Mock savings data
const savingsData = {
  totalSavings: 12000,
  monthlySavings: 1500,
  savingsGoal: 20000,
  savingsRate: 15, // percentage of income
  goals: [
    {
      id: 1,
      name: "Emergency Fund",
      target: 10000,
      current: 8000,
      deadline: "2025-06-30",
      icon: "wallet",
    },
    {
      id: 2,
      name: "Vacation",
      target: 5000,
      current: 2500,
      deadline: "2025-09-15",
      icon: "plane",
    },
    {
      id: 3,
      name: "New Laptop",
      target: 2000,
      current: 1500,
      deadline: "2025-05-01",
      icon: "laptop",
    },
  ],
  history: [
    { date: "2025-03-01", amount: 1500, type: "deposit" },
    { date: "2025-02-01", amount: 1500, type: "deposit" },
    { date: "2025-01-15", amount: 500, type: "withdrawal", reason: "Emergency expense" },
    { date: "2025-01-01", amount: 1500, type: "deposit" },
    { date: "2024-12-01", amount: 1500, type: "deposit" },
  ],
}

export default function Savings() {
  const [activeTab, setActiveTab] = useState("overview")
  const [newGoalAmount, setNewGoalAmount] = useState("")
  const [newGoalName, setNewGoalName] = useState("")
  const [newGoalDate, setNewGoalDate] = useState("")
  const [showAddGoalForm, setShowAddGoalForm] = useState(false)
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(null)

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate adding a goal
    setTimeout(() => {
      setFormStatus("success")
      // Reset form after success
      setTimeout(() => {
        setFormStatus(null)
        setShowAddGoalForm(false)
        setNewGoalAmount("")
        setNewGoalName("")
        setNewGoalDate("")
      }, 2000)
    }, 1000)
  }

  // Calculate progress percentage
  const savingsProgress = (savingsData.totalSavings / savingsData.savingsGoal) * 100

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
          <h1 className="text-lg font-semibold">Savings</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PiggyBank className="h-6 w-6" />
                <h2 className="text-lg font-semibold">Total Savings</h2>
              </div>
              <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30">
                <Plus className="mr-1 h-4 w-4" />
                Add Funds
              </Button>
            </div>
            <p className="mt-4 text-3xl font-bold">GYD {savingsData.totalSavings.toLocaleString()}</p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress to Goal</span>
                <span>GYD {savingsData.savingsGoal.toLocaleString()}</span>
              </div>
              <Progress value={savingsProgress} className="h-2 bg-white/20" indicatorClassName="bg-white" />
            </div>
          </div>
        </Card>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Savings Overview</CardTitle>
                <CardDescription>Your savings at a glance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border bg-white p-4">
                    <div className="flex items-center">
                      <Wallet className="mr-2 h-5 w-5 text-amber-600" />
                      <p className="text-sm text-gray-500">Monthly Savings</p>
                    </div>
                    <p className="text-xl font-bold text-amber-600">
                      GYD {savingsData.monthlySavings.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-lg border bg-white p-4">
                    <div className="flex items-center">
                      <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                      <p className="text-sm text-gray-500">Savings Rate</p>
                    </div>
                    <p className="text-xl font-bold text-green-600">{savingsData.savingsRate}% of Income</p>
                  </div>
                </div>

                <div className="rounded-lg border bg-white p-4">
                  <div className="mb-2 flex items-center">
                    <Target className="mr-2 h-5 w-5 text-blue-600" />
                    <p className="font-medium">Savings Goal</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Current</p>
                      <p className="text-lg font-medium">GYD {savingsData.totalSavings.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Progress</p>
                      <p className="text-lg font-medium">{savingsProgress.toFixed(0)}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Target</p>
                      <p className="text-lg font-medium">GYD {savingsData.savingsGoal.toLocaleString()}</p>
                    </div>
                  </div>
                  <Progress value={savingsProgress} className="mt-2 h-2" />
                </div>

                <div className="rounded-lg border bg-white p-4">
                  <div className="mb-2 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-purple-600" />
                    <p className="font-medium">Projected Savings</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-md bg-gray-50 p-2 text-center">
                      <p className="text-xs text-gray-500">3 Months</p>
                      <p className="font-medium">
                        GYD {(savingsData.totalSavings + savingsData.monthlySavings * 3).toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-md bg-gray-50 p-2 text-center">
                      <p className="text-xs text-gray-500">6 Months</p>
                      <p className="font-medium">
                        GYD {(savingsData.totalSavings + savingsData.monthlySavings * 6).toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-md bg-gray-50 p-2 text-center">
                      <p className="text-xs text-gray-500">1 Year</p>
                      <p className="font-medium">
                        GYD {(savingsData.totalSavings + savingsData.monthlySavings * 12).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="mt-4 space-y-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Savings Goals</h2>
              <Button size="sm" onClick={() => setShowAddGoalForm(true)}>
                <Plus className="mr-1 h-4 w-4" />
                Add Goal
              </Button>
            </div>

            {showAddGoalForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New Savings Goal</CardTitle>
                  <CardDescription>Set a target amount and deadline for your new goal</CardDescription>
                </CardHeader>
                <form onSubmit={handleAddGoal}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="goal-name">Goal Name</Label>
                      <Input
                        id="goal-name"
                        placeholder="e.g., New Car, Vacation"
                        value={newGoalName}
                        onChange={(e) => setNewGoalName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goal-amount">Target Amount (GYD)</Label>
                      <Input
                        id="goal-amount"
                        type="number"
                        placeholder="Enter amount"
                        value={newGoalAmount}
                        onChange={(e) => setNewGoalAmount(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goal-date">Target Date</Label>
                      <Input
                        id="goal-date"
                        type="date"
                        value={newGoalDate}
                        onChange={(e) => setNewGoalDate(e.target.value)}
                        required
                      />
                    </div>

                    {formStatus === "success" && (
                      <Alert className="bg-green-50 text-green-800">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>Success!</AlertTitle>
                        <AlertDescription>Your new savings goal has been added.</AlertDescription>
                      </Alert>
                    )}

                    {formStatus === "error" && (
                      <Alert variant="destructive">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>There was a problem adding your goal. Please try again.</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setShowAddGoalForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Goal</Button>
                  </CardFooter>
                </form>
              </Card>
            )}

            <div className="space-y-3">
              {savingsData.goals.map((goal) => (
                <Card key={goal.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3 rounded-full bg-amber-100 p-2">
                          <PiggyBank className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">{goal.name}</p>
                          <p className="text-xs text-gray-500">
                            Target: {new Date(goal.deadline).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {goal.current.toLocaleString()} / {goal.target.toLocaleString()} GYD
                        </p>
                        <p className="text-xs text-gray-500">
                          {((goal.current / goal.target) * 100).toFixed(0)}% Complete
                        </p>
                      </div>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="mt-2 h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Savings History</CardTitle>
                <CardDescription>Your recent savings transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {savingsData.history.map((item, index) => (
                    <div key={index} className="flex items-center justify-between rounded-md border p-3">
                      <div className="flex items-center">
                        <div
                          className={`mr-3 rounded-full p-2 ${item.type === "deposit" ? "bg-green-100" : "bg-red-100"}`}
                        >
                          {item.type === "deposit" ? (
                            <Plus
                              className={`h-4 w-4 ${item.type === "deposit" ? "text-green-600" : "text-red-600"}`}
                            />
                          ) : (
                            <DollarSign className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{item.type === "deposit" ? "Deposit" : "Withdrawal"}</p>
                          <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                          {item.reason && <p className="text-xs text-gray-500">Reason: {item.reason}</p>}
                        </div>
                      </div>
                      <p className={`font-medium ${item.type === "deposit" ? "text-green-600" : "text-red-600"}`}>
                        {item.type === "deposit" ? "+" : "-"}GYD {item.amount.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Transactions
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </div>
  )
}

