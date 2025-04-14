"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TimeReport } from "@/lib/types/time-tracker"
import { formatDuration } from "@/lib/utils/time"
import { BarChart, Calendar, Clock } from "lucide-react"

interface TimeTrackerStatsProps {
  report: TimeReport
}

export function TimeTrackerStats({ report }: TimeTrackerStatsProps) {
  const todayKey = new Date().toISOString().split('T')[0]
  const todayDuration = report.dailyBreakdown[todayKey] || 0
  const weekDuration = Object.values(report.dailyBreakdown).reduce((acc, curr) => acc + curr, 0)

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatDuration(todayDuration)}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Week</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatDuration(weekDuration)}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Projects Tracked</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Object.keys(report.projectBreakdown).length}</div>
        </CardContent>
      </Card>
    </div>
  )
}