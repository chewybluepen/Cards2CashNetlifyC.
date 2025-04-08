"use client"

export const dynamic = "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Gift,
  Star,
  Trophy,
  Crown,
  ShoppingBag,
  Plane,
  Utensils,
  Plus,
  ChevronRight,
  Info,
} from "lucide-react";
import { BottomNavigation } from "@/components/bottom-navigation";
import { FinancialPattern } from "@/components/financial-pattern";
import { toast } from "@/components/ui/use-toast";

// Mock rewards data with updated dates (after March 27, 2025)
const rewardsData = {
  points: 2500,
  nextTier: 5000,
  tier: "Silver",
  history: [
    {
      id: 1,
      type: "earned",
      points: 100,
      description: "Added GYD 5,000 funds",
      date: "2025-04-10T10:30:00",
    },
    {
      id: 2,
      type: "redeemed",
      points: 500,
      description: "10% off at TechStore",
      date: "2025-04-09T15:45:00",
    },
  ],
  available: [
    {
      id: 1,
      category: "shopping",
      title: "15% off at FashionHub",
      points: 1000,
      expires: "2025-06-15",
      icon: ShoppingBag,
    },
    {
      id: 2,
      category: "travel",
      title: "Airport Lounge Access",
      points: 2500,
      expires: "2025-08-30",
      icon: Plane,
    },
    {
      id: 3,
      category: "dining",
      title: "Buy 1 Get 1 Free at DineDelight",
      points: 750,
      expires: "2025-06-30",
      icon: Utensils,
    },
  ],
};

const tiers = [
  { name: "Bronze", points: 0, icon: Star },
  { name: "Silver", points: 2500, icon: Trophy },
  { name: "Gold", points: 5000, icon: Crown },
];

export default function Rewards() {
  const [activeTab, setActiveTab] = useState("available");

  const getCurrentTier = () => {
    return tiers.reduce((prev, curr) => {
      if (rewardsData.points >= curr.points) return curr;
      return prev;
    });
  };

  const handleViewReward = (id: number) => {
    toast({
      title: "Viewing Reward",
      description: "Loading reward details...",
      variant: "default",
    });
  };

  const currentTier = getCurrentTier();
  const nextTier = tiers.find((tier) => tier.points > rewardsData.points);
  const progress = nextTier
    ? ((rewardsData.points - currentTier.points) / (nextTier.points - currentTier.points)) * 100
    : 100;

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <FinancialPattern />

      <header className="sticky top-0 z-10 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/dashboard">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-lg font-semibold">Rewards</h1>
        </div>
      </header>

      <main className="flex-1 p-4 pb-20">
        <Card className="mb-4 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Your Rewards</h2>
              </div>
              <Link href="/rewards/tier-benefits">
                <Badge variant="outline" className="border-purple-300 text-purple-50 hover:bg-purple-500">
                  {currentTier.name} Tier
                </Badge>
              </Link>
            </div>
            <p className="mt-4 text-3xl font-bold">{rewardsData.points} Points</p>

            {nextTier && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress to {nextTier.name}</span>
                  <span>{nextTier.points - rewardsData.points} points to go</span>
                </div>
                <Progress value={progress} className="h-2 bg-white/20" indicatorClassName="bg-white" />
              </div>
            )}

            <div className="mt-4">
              <Button size="sm" variant="secondary" className="w-full bg-white/20 text-white hover:bg-white/30" asChild>
                <Link href="/rewards/tier-benefits">
                  <Info className="mr-2 h-4 w-4" />
                  View Tier Benefits
                </Link>
              </Button>
            </div>
          </div>
        </Card>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="available">Available Rewards</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="mt-4 space-y-4">
            {rewardsData.available.map((reward) => (
              <Card key={reward.id} className="overflow-hidden">
                <Link href={`/rewards/${reward.id}`} onClick={() => handleViewReward(reward.id)}>
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="rounded-full bg-purple-100 p-3">
                      <reward.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{reward.title}</h3>
                      <p className="text-sm text-gray-500">
                        Expires {new Date(reward.expires).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 font-medium text-purple-600">{reward.points} Points</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <Card>
              <CardContent className="divide-y p-0">
                {rewardsData.history.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className={`rounded-full p-2 ${item.type === "earned" ? "bg-green-100" : "bg-purple-100"}`}>
                        {item.type === "earned" ? (
                          <Plus
                            className={`h-4 w-4 ${item.type === "earned" ? "text-green-600" : "text-purple-600"}`}
                          />
                        ) : (
                          <Gift className="h-4 w-4 text-purple-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{item.description}</p>
                        <p className="text-xs text-gray-500">{new Date(item.date).toLocaleString()}</p>
                      </div>
                    </div>
                    <span className={`font-medium ${item.type === "earned" ? "text-green-600" : "text-purple-600"}`}>
                      {item.type === "earned" ? "+" : "-"}
                      {item.points} Points
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />
    </div>
  );
}
