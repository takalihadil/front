"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowBigUp, MessageSquare, Share2 } from "lucide-react"
import { Thought } from "@/lib/types/community"
import { useState } from "react"

interface ThoughtCardProps {
  thought: Thought
}

export function ThoughtCard({ thought }: ThoughtCardProps) {
  const [upvotes, setUpvotes] = useState(thought.upvotes)
  const [hasUpvoted, setHasUpvoted] = useState(false)

  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvotes(prev => prev - 1)
    } else {
      setUpvotes(prev => prev + 1)
    }
    setHasUpvoted(!hasUpvoted)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={thought.author.avatar} />
            <AvatarFallback>{thought.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{thought.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(thought.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-sm">{thought.content}</p>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleUpvote}
                className={hasUpvoted ? "text-primary" : ""}
              >
                <ArrowBigUp className="mr-1 h-4 w-4" />
                {upvotes}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="mr-1 h-4 w-4" />
                {thought.comments}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="mr-1 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}