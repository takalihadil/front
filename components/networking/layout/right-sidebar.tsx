import type React from "react"
import { cn } from "@/lib/utils"
import { TrendingTopics } from "@/components/networking/widgets/trending-topics"
import { SuggestedUsers } from "@/components/networking/widgets/suggested-users"

interface RightSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function RightSidebar({ className }: RightSidebarProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="py-4">
        <TrendingTopics />
      </div>
      <div className="py-4">
        <SuggestedUsers />
      </div>
    </div>
  )
}

