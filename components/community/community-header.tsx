"use client"

import { Button } from "@/components/ui/button"
import { Users, TrendingUp } from "lucide-react"

export function CommunityHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Community</h1>
        <p className="text-muted-foreground">
          Connect, share, and grow with fellow indie entrepreneurs
        </p>
      </div>
      <Button>
        <Users className="mr-2 h-4 w-4" />
        Join Discussion
      </Button>
    </div>
  )
}