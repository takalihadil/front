"use client"

import { format, parse, eachMonthOfInterval, startOfMonth, differenceInDays } from "date-fns"

interface MonthLabelsProps {
  firstDay: string
  lastDay: string
  cellSize: number
  cellGap: number
  offsetX: number
}

export function MonthLabels({ firstDay, lastDay, cellSize, cellGap, offsetX }: MonthLabelsProps) {
  const startDate = parse(firstDay, 'yyyy-MM-dd', new Date())
  const endDate = parse(lastDay, 'yyyy-MM-dd', new Date())
  const months = eachMonthOfInterval({ start: startDate, end: endDate })

  return (
    <div 
      className="relative h-6 flex items-end" 
      style={{ marginLeft: `${offsetX}px` }}
      role="row"
      aria-label="Month labels"
    >
      {months.map((month) => {
        const monthStart = startOfMonth(month)
        const daysSinceStart = differenceInDays(monthStart, startDate)
        const weeksSinceStart = Math.floor(daysSinceStart / 7)
        const position = weeksSinceStart * (cellSize + cellGap)

        return (
          <div
            key={month.toISOString()}
            className="absolute text-xs text-muted-foreground"
            style={{ 
              left: `${position}px`,
              transform: 'translateX(-50%)'
            }}
            role="columnheader"
          >
            {format(month, 'MMM')}
          </div>
        )
      })}
    </div>
  )
}