"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Users, Target, Calendar } from "lucide-react"
import { Challenge } from "@/lib/types/community"

interface ChallengeStatsProps {
  challenges: Challenge[]
}

export function ChallengeStats({ challenges }: ChallengeStatsProps) {
  const totalParticipants = challenges.reduce((acc, curr) => acc + curr.participants, 0)
  const activeCount = challenges.length
  const completionRate = Math.round(
    (challenges.reduce((acc, curr) => 
      acc + (curr.participants / curr.target) * 100, 0) / challenges.length)
  )
  
  const stats = [
    {
      icon: Trophy,
      label: "Active Challenges",
      value: activeCount,
      color: "text-amber-500"
    },
    {
      icon: Users,
      label: "Total Participants",
      value: totalParticipants,
      color: "text-blue-500"
    },
    {
      icon: Target,
      label: "Avg. Completion",
      value: `${completionRate}%`,
      color: "text-green-500"
    },
    {
      icon: Calendar,
      label: "Upcoming",
      value: "3",
      color: "text-purple-500"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map(({ icon: Icon, label, value, color }) => (
        <Card key={label}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Icon className={`h-8 w-8 ${color}`} />
              <div>
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}