"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { HabitsReport } from "@/lib/types/habits"
import { ArrowUp, ArrowDown, Trophy } from "lucide-react"

interface HabitsProgressProps {
  report: HabitsReport
}

export function HabitsProgress({ report }: HabitsProgressProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Good Habits Progress</CardTitle>
          <ArrowUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{report.goodHabitsAverage.toFixed(1)}%</div>
          <Progress value={report.goodHabitsAverage} className="bg-green-100 dark:bg-green-900">
            <div className="bg-green-500" style={{ width: `${report.goodHabitsAverage}%` }} />
          </Progress>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Bad Habits Progress</CardTitle>
          <ArrowDown className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-2">{report.badHabitsAverage.toFixed(1)}%</div>
          <Progress value={report.badHabitsAverage} className="bg-red-100 dark:bg-red-900">
            <div className="bg-red-500" style={{ width: `${report.badHabitsAverage}%` }} />
          </Progress>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Best Streak</CardTitle>
          <Trophy className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.max(...Object.values(report.streaks))} days
          </div>
        </CardContent>
      </Card>
    </div>
  )
}