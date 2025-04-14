"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Habit, WeeklyProgress } from "@/lib/types/habits"
import { ThumbsUp, ThumbsDown, Flame } from "lucide-react"

interface HabitCardProps {
  habit: Habit
  progress: WeeklyProgress
  streak: number
}

export function HabitCard({ habit, progress, streak }: HabitCardProps) {
  const handlePositive = () => {
    // Handle positive entry
  }

  const handleNegative = () => {
    // Handle negative entry
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold">{habit.name}</h3>
            {habit.description && (
              <p className="text-sm text-muted-foreground">{habit.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="text-green-500 hover:text-green-600"
              onClick={handlePositive}
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-red-500 hover:text-red-600"
              onClick={handleNegative}
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Weekly Progress</span>
            <span>{progress.targetProgress.toFixed(1)}%</span>
          </div>
          <Progress
            value={progress.targetProgress}
            className={habit.type === 'good' ? 'bg-green-100' : 'bg-red-100'}
          >
            <div
              className={habit.type === 'good' ? 'bg-green-500' : 'bg-red-500'}
              style={{ width: `${progress.targetProgress}%` }}
            />
          </Progress>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {progress.positive} / {habit.target} {habit.type === 'good' ? 'completed' : 'times'}
            </span>
            <div className="flex items-center gap-1">
              <Flame className="h-4 w-4 text-orange-500" />
              <span>{streak} day streak</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}