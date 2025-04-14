"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChallengeList } from "./challenge-list"
import { mockChallenges } from "@/lib/mock-data/community/challenges"
import { Trophy, Gauge, TrendingUp, PiggyBank, Dumbbell, ListTodo, Heart } from "lucide-react"
import { ChallengeStats } from "./challenge-stats"
import { useState } from "react"
import { ChallengeType } from "@/lib/types/community"

const categories = {
  revenue: {
    Icon: TrendingUp,
    title: "Revenue",
    description: "Boost your business revenue through strategic initiatives",
    color: "text-green-500 dark:text-green-400"
  },
  productivity: {
    Icon: Gauge,
    title: "Productivity",
    description: "Optimize your workflow and increase efficiency",
    color: "text-blue-500 dark:text-blue-400"
  },
  growth: {
    Icon: Trophy,
    title: "Growth",
    description: "Scale your business operations and market presence",
    color: "text-purple-500 dark:text-purple-400"
  },
  savings: {
    Icon: PiggyBank,
    title: "Savings",
    description: "Optimize costs and build financial resilience",
    color: "text-amber-500 dark:text-amber-400"
  },
  fitness: {
    Icon: Dumbbell,
    title: "Fitness",
    description: "Improve physical health and wellness",
    color: "text-red-500 dark:text-red-400"
  },
  habits: {
    Icon: ListTodo,
    title: "Habits",
    description: "Build positive daily routines and break bad habits",
    color: "text-indigo-500 dark:text-indigo-400"
  },
  spiritual: {
    Icon: Heart,
    title: "Spiritual",
    description: "Develop mindfulness and inner growth",
    color: "text-pink-500 dark:text-pink-400"
  }
} as const

export function ChallengeGrid() {
  const [activeTab, setActiveTab] = useState<ChallengeType>("revenue")
  
  const filteredChallenges = mockChallenges.filter(c => c.type === activeTab)
  const category = categories[activeTab]

  return (
    <div className="space-y-6">
      <ChallengeStats challenges={mockChallenges} />
      
      <Card>
        <CardHeader>
          <CardTitle>Active Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as ChallengeType)} 
            className="space-y-6"
          >
            <div className="relative">
              <TabsList className="inline-flex w-auto p-1 gap-1 overflow-x-auto">
                {Object.entries(categories).map(([key, { Icon, title, color }]) => (
                  <TabsTrigger 
                    key={key} 
                    value={key} 
                    className="min-w-[120px] gap-2 px-4 py-2 data-[state=active]:bg-primary/10"
                  >
                    <Icon className={`h-4 w-4 ${color}`} />
                    <span>{title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <category.Icon className={`h-5 w-5 ${category.color}`} />
                  <h3 className="text-lg font-semibold">{category.title} Challenges</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
                
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries({
                    daily: "Daily Sprints",
                    weekly: "Weekly Goals",
                    monthly: "Monthly Targets"
                  }).map(([category, label]) => {
                    const count = filteredChallenges.filter(c => c.category === category).length
                    return (
                      <Card key={category}>
                        <CardContent className="pt-4">
                          <div className="text-2xl font-bold">{count}</div>
                          <p className="text-sm text-muted-foreground">{label}</p>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
              
              {filteredChallenges.length > 0 ? (
                <ChallengeList challenges={filteredChallenges} />
              ) : (
                <div className="text-center py-12 bg-muted/50 rounded-lg">
                  <p className="text-muted-foreground">
                    No {activeTab} challenges available at the moment
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}