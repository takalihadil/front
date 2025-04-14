"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MonthlyStats } from "@/lib/types"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, LineChart } from "recharts"

interface DashboardChartsProps {
  stats: MonthlyStats[]
}

export function DashboardCharts({ stats }: DashboardChartsProps) {
  const chartData = stats.map(stat => ({
    month: new Date(stat.month).toLocaleDateString('en-US', { month: 'short' }),
    income: stat.totalIncome,
    expenses: stat.totalExpenses,
    deductions: stat.deductions.taxes + stat.deductions.fees + stat.deductions.other,
    net: stat.netIncome,
    netGoal: stat.goals.find(g => g.type === 'netIncome')?.target || 0
  }))

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Revenue & Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" name="Income" fill="hsl(var(--chart-1))" />
              <Bar dataKey="expenses" name="Expenses" fill="hsl(var(--chart-2))" />
              <Bar dataKey="deductions" name="Deductions" fill="hsl(var(--chart-3))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Net Income vs Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="net" 
                name="Net Income" 
                stroke="hsl(var(--chart-4))" 
                strokeWidth={2} 
              />
              <Line 
                type="monotone" 
                dataKey="netGoal" 
                name="Goal" 
                stroke="hsl(var(--chart-5))" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}