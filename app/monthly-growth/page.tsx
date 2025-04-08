"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import {
  ArrowLeft,
  TrendingUp,
  LineChartIcon,
  BarChart3,
  PieChartIcon,
  Calendar,
  Download,
  Filter,
  Share2,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BottomNavigation } from "@/components/bottom-navigation"
import { EnhancedDropdown, DropdownItem } from "@/components/ui/enhanced-dropdown"
import { SocialMediaIcons } from "@/components/social-media-icons"
import { toast } from "@/components/ui/use-toast"

// Mock growth data with updated dates (after March 27, 2025)
const growthData = {
  monthly: {
    current: 15,
    previous: 12,
    history: [
      { month: "Jan", growth: 8, value: 1200 },
      { month: "Feb", growth: 10, value: 1350 },
      { month: "Mar", growth: 12, value: 1500 },
      { month: "Apr", growth: 9, value: 1400 },
      { month: "May", growth: 11, value: 1600 },
      { month: "Jun", growth: 15, value: 1800 },
    ],
  },
  quarterly: {
    current: 38,
    previous: 30,
    history: [
      { quarter: "Q1", growth: 25, value: 4050 },
      { quarter: "Q2", growth: 30, value: 5200 },
      { quarter: "Q3", growth: 38, value: 7100 },
      { quarter: "Q4", growth: 42, value: 9500 },
    ],
  },
  yearly: {
    current: 142,
    previous: 115,
    history: [
      { year: "2023", growth: 100, value: 15000 },
      { year: "2024", growth: 115, value: 32000 },
      { year: "2025", growth: 142, value: 78000 },
    ],
  },
}

// Chart colors in Netflix style
const NETFLIX_COLORS = {
  primary: "#E50914",
  secondary: "#B20710",
  tertiary: "#831010",
  accent: "#F5F5F1",
  background: "#141414",
  backgroundLight: "#333333",
  text: "#FFFFFF",
}

const CHART_COLORS = [NETFLIX_COLORS.primary, NETFLIX_COLORS.secondary, NETFLIX_COLORS.tertiary, NETFLIX_COLORS.accent]

export default function MonthlyGrowth() {
  const [activeTab, setActiveTab] = useState("monthly")
  const [chartView, setChartView] = useState("line")
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Animation for refreshing data
  const handleRefresh = () => {
    setIsRefreshing(true)

    toast({
      title: "Refreshing Data",
      description: "Updating your growth analytics...",
      variant: "default",
    })

    setTimeout(() => {
      setIsRefreshing(false)

      toast({
        title: "Data Refreshed",
        description: "Your growth analytics have been updated.",
        variant: "default",
      })
    }, 1500)
  }

  // Handle filter selection
  const handleFilterSelect = (filter: string) => {
    toast({
      title: "Filter Applied",
      description: `Showing ${filter} data.`,
      variant: "default",
    })
  }

  // Handle share
  const handleShare = () => {
    toast({
      title: "Share Analytics",
      description: "Sharing options opened.",
      variant: "default",
    })
  }

  // Handle export data
  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your growth analytics data is being downloaded.",
      variant: "default",
    })
  }

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case "monthly":
        return growthData.monthly.history
      case "quarterly":
        return growthData.quarterly.history
      case "yearly":
        return growthData.yearly.history
      default:
        return growthData.monthly.history
    }
  }

  // Get the appropriate key for the X axis based on active tab
  const getXAxisKey = () => {
    switch (activeTab) {
      case "monthly":
        return "month"
      case "quarterly":
        return "quarter"
      case "yearly":
        return "year"
      default:
        return "month"
    }
  }

  // Render the appropriate chart based on the selected view
  const renderChart = () => {
    const data = getCurrentData()
    const xAxisKey = getXAxisKey()

    switch (chartView) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={NETFLIX_COLORS.backgroundLight} />
              <XAxis dataKey={xAxisKey} stroke={NETFLIX_COLORS.text} tick={{ fill: NETFLIX_COLORS.text }} />
              <YAxis stroke={NETFLIX_COLORS.text} tick={{ fill: NETFLIX_COLORS.text }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: NETFLIX_COLORS.background,
                  borderColor: NETFLIX_COLORS.backgroundLight,
                  color: NETFLIX_COLORS.text,
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="growth"
                name="Growth %"
                stroke={NETFLIX_COLORS.primary}
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line type="monotone" dataKey="value" name="Value ($)" stroke={NETFLIX_COLORS.accent} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={NETFLIX_COLORS.backgroundLight} />
              <XAxis dataKey={xAxisKey} stroke={NETFLIX_COLORS.text} tick={{ fill: NETFLIX_COLORS.text }} />
              <YAxis stroke={NETFLIX_COLORS.text} tick={{ fill: NETFLIX_COLORS.text }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: NETFLIX_COLORS.background,
                  borderColor: NETFLIX_COLORS.backgroundLight,
                  color: NETFLIX_COLORS.text,
                }}
              />
              <Legend />
              <Bar dataKey="growth" name="Growth %" fill={NETFLIX_COLORS.primary} />
              <Bar dataKey="value" name="Value ($)" fill={NETFLIX_COLORS.accent} />
            </BarChart>
          </ResponsiveContainer>
        )
      case "area":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={NETFLIX_COLORS.backgroundLight} />
              <XAxis dataKey={xAxisKey} stroke={NETFLIX_COLORS.text} tick={{ fill: NETFLIX_COLORS.text }} />
              <YAxis stroke={NETFLIX_COLORS.text} tick={{ fill: NETFLIX_COLORS.text }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: NETFLIX_COLORS.background,
                  borderColor: NETFLIX_COLORS.backgroundLight,
                  color: NETFLIX_COLORS.text,
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="growth"
                name="Growth %"
                stroke={NETFLIX_COLORS.primary}
                fill={NETFLIX_COLORS.primary}
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="value"
                name="Value ($)"
                stroke={NETFLIX_COLORS.accent}
                fill={NETFLIX_COLORS.accent}
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        )
      case "pie":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="growth" nameKey={xAxisKey} cx="50%" cy="50%" outerRadius={80} label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: NETFLIX_COLORS.background,
                  borderColor: NETFLIX_COLORS.backgroundLight,
                  color: NETFLIX_COLORS.text,
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#000000]">
      <header className="sticky top-0 z-10 bg-[#141414] p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2 text-white hover:bg-[#333333]">
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-lg font-semibold text-white">Growth Analytics</h1>
          </div>

          <div className="flex items-center space-x-2">
            <EnhancedDropdown
              trigger={
                <Button variant="ghost" size="sm" className="text-white hover:bg-[#333333]">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              }
              align="right"
              width="w-48"
            >
              <DropdownItem onClick={() => handleFilterSelect("All Assets")}>All Assets</DropdownItem>
              <DropdownItem onClick={() => handleFilterSelect("Crypto Only")}>Crypto Only</DropdownItem>
              <DropdownItem onClick={() => handleFilterSelect("Fiat Only")}>Fiat Only</DropdownItem>
              <DropdownItem onClick={() => handleFilterSelect("Cards Only")}>Cards Only</DropdownItem>
            </EnhancedDropdown>

            <EnhancedDropdown
              trigger={
                <Button variant="ghost" size="sm" className="text-white hover:bg-[#333333]" onClick={handleShare}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              }
              align="right"
              width="w-48"
            >
              <div className="p-2">
                <SocialMediaIcons size={24} />
              </div>
            </EnhancedDropdown>

            <Button variant="ghost" size="sm" className="text-white hover:bg-[#333333]" onClick={handleRefresh}>
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <div className="opacity-100 transform-none">
          <Card className="mb-4 border-[#333333] bg-[#141414] text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Portfolio Growth</CardTitle>
                  <CardDescription className="text-gray-400">
                    Track your investment performance over time
                  </CardDescription>
                </div>
                <TrendingUp className="h-8 w-8 text-[#E50914]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Current Growth</p>
                  <p className="text-3xl font-bold text-[#E50914]">
                    +
                    {activeTab === "monthly"
                      ? growthData.monthly.current
                      : activeTab === "quarterly"
                        ? growthData.quarterly.current
                        : growthData.yearly.current}
                    %
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Previous Period</p>
                  <p className="text-xl font-medium text-gray-300">
                    +
                    {activeTab === "monthly"
                      ? growthData.monthly.previous
                      : activeTab === "quarterly"
                        ? growthData.quarterly.previous
                        : growthData.yearly.previous}
                    %
                  </p>
                </div>
              </div>

              <Tabs defaultValue="monthly" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-[#333333]">
                  <TabsTrigger
                    value="monthly"
                    className="data-[state=active]:bg-[#E50914] data-[state=active]:text-white"
                  >
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger
                    value="quarterly"
                    className="data-[state=active]:bg-[#E50914] data-[state=active]:text-white"
                  >
                    Quarterly
                  </TabsTrigger>
                  <TabsTrigger
                    value="yearly"
                    className="data-[state=active]:bg-[#E50914] data-[state=active]:text-white"
                  >
                    Yearly
                  </TabsTrigger>
                </TabsList>

                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant={chartView === "line" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartView("line")}
                    className={
                      chartView === "line"
                        ? "bg-[#E50914] hover:bg-[#B20710]"
                        : "text-white border-[#333333] hover:bg-[#333333]"
                    }
                  >
                    <LineChartIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={chartView === "bar" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartView("bar")}
                    className={
                      chartView === "bar"
                        ? "bg-[#E50914] hover:bg-[#B20710]"
                        : "text-white border-[#333333] hover:bg-[#333333]"
                    }
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={chartView === "area" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartView("area")}
                    className={
                      chartView === "area"
                        ? "bg-[#E50914] hover:bg-[#B20710]"
                        : "text-white border-[#333333] hover:bg-[#333333]"
                    }
                  >
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={chartView === "pie" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartView("pie")}
                    className={
                      chartView === "pie"
                        ? "bg-[#E50914] hover:bg-[#B20710]"
                        : "text-white border-[#333333] hover:bg-[#333333]"
                    }
                  >
                    <PieChartIcon className="h-4 w-4" />
                  </Button>
                </div>

                <TabsContent value={activeTab} className="mt-4">
                  <div className="h-64 w-full rounded-md border border-[#333333] bg-[#141414] p-4">{renderChart()}</div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                asChild
                className="border-[#333333] text-white hover:bg-[#333333] hover:text-white"
              >
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
              <Button
                variant="outline"
                className="border-[#333333] text-white hover:bg-[#333333] hover:text-white"
                onClick={handleExportData}
              >
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="opacity-100 transform-none">
          <Card className="border-[#333333] bg-[#141414] text-white">
            <CardHeader>
              <CardTitle className="text-white">Growth Insights</CardTitle>
              <CardDescription className="text-gray-400">Key metrics and performance indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Average Growth", value: "+10.8%", color: "text-blue-500" },
                  { label: "Best Month", value: "Jun (+15%)", color: "text-[#E50914]" },
                  { label: "YTD Growth", value: "+65%", color: "text-purple-500" },
                  { label: "Projected EOY", value: "+142%", color: "text-amber-500" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-[#333333] bg-[#1A1A1A] p-4 hover:scale-105 transition-transform"
                  >
                    <p className="text-sm text-gray-400">{item.label}</p>
                    <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-lg border border-[#333333] bg-[#1A1A1A] p-4">
                <div className="mb-2 flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                  <p className="font-medium text-white">Upcoming Growth Events</p>
                </div>
                <ul className="space-y-2">
                  {[
                    { event: "Quarterly Dividend", date: "Jul 15, 2025" },
                    { event: "Interest Payment", date: "Aug 1, 2025" },
                    { event: "Staking Rewards", date: "Aug 15, 2025" },
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between rounded-md bg-[#333333] p-2 text-sm hover:translate-x-1 transition-transform"
                    >
                      <span className="text-gray-200">{item.event}</span>
                      <span className="font-medium text-[#E50914]">{item.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

