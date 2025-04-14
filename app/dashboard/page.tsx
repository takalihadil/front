"use client"

import { DashboardCharts } from "@/components/dashboard/charts"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { GoalsGrid } from "@/components/dashboard/goals/goals-grid"
import { ContributionTracker } from "@/components/dashboard/contribution-tracker"
import { mockMonthlyStats, mockTransactions } from "@/lib/mock-data"

export default function Home() {
  const currentMonthStats = mockMonthlyStats?.[0] ?? {
    month: new Date().toISOString().slice(0, 7),
    totalIncome: 0,
    totalExpenses: 0,
    netIncome: 0,
    goals: [],
    deductions: {
      taxes: 0,
      fees: 0,
      other: 0
    },
    sources: {}
  }
  
  const recentTransactions = mockTransactions.slice(0, 5)

  return (
    <div className="space-y-8">
      <GoalsGrid goals={currentMonthStats.goals} />
      <ContributionTracker />
      <DashboardCharts stats={mockMonthlyStats ?? []} />
      <RecentTransactions transactions={recentTransactions} />
    </div>
  )
}