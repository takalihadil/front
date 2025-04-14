"use client"

import { Card } from "@/components/ui/card"
import { ProjectManagement } from "@/components/time-tracker/settings/project-management"

export default function TimeTrackerSettingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Time Tracker Settings</h1>
      </div>

      <Card className="p-6">
        <ProjectManagement />
      </Card>
    </div>
  )
}