"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ContributionDay } from "./types"
import { format } from "date-fns"

interface ContributionCellProps {
  day: ContributionDay
}

export function ContributionCell({ day }: ContributionCellProps) {
  const levelColors = {
    0: "bg-muted hover:bg-muted/80",
    1: "bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/40",
    2: "bg-emerald-200 hover:bg-emerald-300 dark:bg-emerald-900/50 dark:hover:bg-emerald-900/60",
    3: "bg-emerald-300 hover:bg-emerald-400 dark:bg-emerald-900/70 dark:hover:bg-emerald-900/80",
    4: "bg-emerald-400 hover:bg-emerald-500 dark:bg-emerald-900/90 dark:hover:bg-emerald-900",
  }

  // If there's no date, render an empty cell
  if (!day.date) {
    return <div className="w-3 h-3" />
  }

  const formattedDate = format(new Date(day.date), 'PPP')
  const ariaLabel = `${day.goals.completed} goals completed on ${formattedDate}`

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={`w-3 h-3 rounded-sm ${levelColors[day.level]} transition-colors`}
            aria-label={ariaLabel}
          />
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-sm space-y-1">
            <p className="font-medium">{formattedDate}</p>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${levelColors[day.level]}`} />
              <p>{day.goals.completed} goals completed</p>
            </div>
            <p className="text-xs text-muted-foreground">
              {day.goals.completed}/{day.goals.total} daily goals
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}