"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

export function DailyQuote() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Quote className="h-8 w-8 text-primary/20" />
          <blockquote className="space-y-2">
            <p className="text-lg font-medium">
              "The impediment to action advances action. What stands in the way becomes the way."
            </p>
            <footer className="text-sm text-muted-foreground">
              — Marcus Aurelius
            </footer>
          </blockquote>
        </div>
      </CardContent>
    </Card>
  )
}