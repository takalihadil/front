"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TimeEntry } from "@/lib/types/time-tracker"
import { formatDuration } from "@/lib/utils/time"
import { mockProjects, mockTasks } from "@/lib/mock-data/time-tracker"

interface TimeTrackerEntriesProps {
  entries: TimeEntry[]
}

export function TimeTrackerEntries({ entries }: TimeTrackerEntriesProps) {
  const getProjectName = (projectId: string) => {
    return mockProjects.find(p => p.id === projectId)?.name || 'Unknown Project'
  }

  const getTaskName = (taskId: string) => {
    return mockTasks.find(t => t.id === taskId)?.name || 'Unknown Task'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Time Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
            >
              <div className="space-y-1">
                <div className="font-medium">{getProjectName(entry.projectId)}</div>
                <div className="text-sm text-muted-foreground">
                  {getTaskName(entry.taskId)}
                  {entry.notes && ` - ${entry.notes}`}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  {new Date(entry.startTime).toLocaleTimeString()} - {' '}
                  {entry.endTime ? new Date(entry.endTime).toLocaleTimeString() : 'Ongoing'}
                </div>
                <div className="font-mono">{formatDuration(entry.duration)}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}