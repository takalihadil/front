"use client"

import { CommunityHeader } from "@/components/community/community-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChallengeGrid } from "@/components/community/challenges/challenge-grid"
import { TrendingTopics } from "@/components/community/trending/trending-topics"
import { DailyQuote } from "@/components/community/daily-quote"
import { CommunityThoughts } from "@/components/community/thoughts/community-thoughts"

export default function CommunityPage() {
  return (
    <div className="space-y-8">
      <CommunityHeader />
      <Tabs defaultValue="feed" className="space-y-8">
        <TabsList>
          <TabsTrigger value="feed">Community Feed</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feed" className="space-y-0">
          <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
            <div className="space-y-8">
              <CommunityThoughts />
            </div>
            <div className="space-y-8">
              <DailyQuote />
              <TrendingTopics />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="challenges">
          <ChallengeGrid />
        </TabsContent>
      </Tabs>
    </div>
  )
}