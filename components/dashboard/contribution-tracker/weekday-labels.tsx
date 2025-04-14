"use client"

import { WEEKDAYS } from "./grid-constants"

export function WeekdayLabels() {
  return (
    <div 
      className="grid grid-rows-7 gap-2 text-xs text-muted-foreground pt-2"
      role="rowheader"
      aria-label="Days of the week"
    >
      {WEEKDAYS.map((day, index) => (
        <span key={day} className="h-3 flex items-center">
          {index % 2 === 0 ? day : ''} {/* Show every other day */}
        </span>
      ))}
    </div>
  )
}