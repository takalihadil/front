"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, ArrowUp } from "lucide-react"
import { mockTrendingTopics } from "@/lib/mock-data/community"

export function TrendingTopics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockTrendingTopics.map((topic) => (
            <div key={topic.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">#{topic.name}</p>
                <p className="text-sm text-muted-foreground">{topic.posts} posts</p>
              </div>
              <div className="flex items-center text-green-500">
                <ArrowUp className="h-4 w-4" />
                {topic.growth}%
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}