"use client"

import { ContributionCell } from "./contribution-cell"
import { MonthLabels } from "./month-labels"
import { WeekdayLabels } from "./weekday-labels"
import { ContributionData } from "./types"
import { CELL_SIZE, CELL_GAP, WEEKDAY_LABEL_WIDTH } from "./grid-constants"

interface ContributionGridProps {
  data: ContributionData
}

export function ContributionGrid({ data }: ContributionGridProps) {
  const firstDay = data.weeks[0].days[0].date
  const lastDay = data.weeks[data.weeks.length - 1].days[6].date

  return (
    <div 
      className="inline-flex flex-col gap-4"
      role="grid"
      aria-label="Contribution activity grid"
    >
      <MonthLabels
        firstDay={firstDay}
        lastDay={lastDay}
        cellSize={CELL_SIZE}
        cellGap={CELL_GAP}
        offsetX={WEEKDAY_LABEL_WIDTH}
      />

      <div className="flex gap-2">
        <WeekdayLabels />

        <div 
          className="grid grid-cols-[repeat(53,_minmax(0,_1fr))] gap-2"
          style={{ 
            gridTemplateColumns: `repeat(${data.weeks.length}, ${CELL_SIZE}px)`,
            gap: `${CELL_GAP}px`
          }}
          role="grid"
        >
          {data.weeks.map((week, weekIndex) => (
            <div 
              key={weekIndex} 
              className="grid grid-rows-7 gap-2"
              style={{ gap: `${CELL_GAP}px` }}
              role="row"
            >
              {week.days.map((day, dayIndex) => (
                <ContributionCell 
                  key={day.date || `empty-${weekIndex}-${dayIndex}`} 
                  day={day}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend component remains the same */}
    </div>
  )
}