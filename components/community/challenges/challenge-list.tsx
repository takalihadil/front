"use client"

import { ChallengeCard } from "./challenge-card"
import { Challenge } from "@/lib/types/community"

interface ChallengeListProps {
  challenges: Challenge[]
}

export function ChallengeList({ challenges }: ChallengeListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
    </div>
  )
}