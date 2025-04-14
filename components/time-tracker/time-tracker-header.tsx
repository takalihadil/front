"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Settings } from "lucide-react"
import Link from "next/link"

export function TimeTrackerHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Clock className="h-6 w-6" />
        <h1 className="text-3xl font-bold tracking-tight">Time Tracker</h1>
      </div>
      <Link href="/time-tracker/settings">
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </Link>
    </div>
  )
}