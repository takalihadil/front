"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContributionGrid } from "./contribution-grid"
import { generateContributionData } from "./utils"

export function ContributionTracker() {
  const data = generateContributionData()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Goal Progress</span>
          <span className="text-sm font-normal text-muted-foreground">
            Last 12 months of activity
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto pb-6">
        <ContributionGrid data={data} />
      </CardContent>
    </Card>
  )
}