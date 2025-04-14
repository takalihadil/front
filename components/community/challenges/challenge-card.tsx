"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Calendar, Trophy, Target, Info } from "lucide-react"
import { Challenge } from "@/lib/types/community"
import { format, differenceInDays } from "date-fns"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ChallengeCardProps {
  challenge: Challenge
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const progress = (challenge.participants / challenge.target) * 100
  const endDate = new Date(challenge.endDate)
  const daysLeft = differenceInDays(endDate, new Date())

  const categoryColors = {
    daily: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
    weekly: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
    monthly: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
  }

  const typeColors = {
    revenue: "border-l-4 border-green-500",
    productivity: "border-l-4 border-blue-500",
    growth: "border-l-4 border-purple-500",
    savings: "border-l-4 border-amber-500",
    fitness: "border-l-4 border-red-500",
    habits: "border-l-4 border-indigo-500",
    spiritual: "border-l-4 border-pink-500"
  }

  return (
    <Card className={`hover:shadow-md transition-shadow ${typeColors[challenge.type]}`}>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={categoryColors[challenge.category]}>
                  {challenge.category}
                </Badge>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="secondary" className="gap-1 cursor-help">
                        <Trophy className="h-3 w-3" />
                        {challenge.reward.value}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Complete this challenge to earn the badge</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <h3 className="font-semibold">{challenge.title}</h3>
              <p className="text-sm text-muted-foreground">{challenge.description}</p>
            </div>
          </div>

          <div className="space-y-3 bg-muted/50 p-3 rounded-lg">
            <div className="flex items-center justify-between text-sm font-medium">
              <span>Milestones</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Complete these milestones to progress</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {challenge.milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span>{milestone.description}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Participants</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{challenge.participants}/{challenge.target}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{daysLeft} days left</span>
              </div>
            </div>
          </div>

          <Button className="w-full">Join Challenge</Button>
        </div>
      </CardContent>
    </Card>
  )
}