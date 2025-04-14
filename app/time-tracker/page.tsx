"use client"

import { TimeTrackerHeader } from "@/components/time-tracker/time-tracker-header"
import { TimeTrackerStats } from "@/components/time-tracker/time-tracker-stats"
import { TimeTrackerTimer } from "@/components/time-tracker/time-tracker-timer"
import { TimeTrackerEntries } from "@/components/time-tracker/time-tracker-entries"
import { mockTimeReport } from "@/lib/mock-data/time-tracker"

export default function TimeTrackerPage() {
  return (
    <div className="space-y-8">
      <TimeTrackerHeader />
      <TimeTrackerStats report={mockTimeReport} />
      <TimeTrackerTimer />
      <TimeTrackerEntries entries={mockTimeReport.entries} />
    </div>
  )
}