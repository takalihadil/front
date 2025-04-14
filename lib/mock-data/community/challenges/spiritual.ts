import { Challenge } from "@/lib/types/community"

export const spiritualChallenges: Challenge[] = [
  {
    id: "spiritual-1",
    title: "Mindful Leadership",
    description: "Develop mindful decision-making and team leadership practices",
    type: "spiritual",
    category: "daily",
    reward: {
      type: "badge",
      value: "Mindful Leader"
    },
    participants: 167,
    target: 250,
    startDate: "2024-03-01T00:00:00Z",
    endDate: "2024-03-31T23:59:59Z",
    milestones: [
      { target: 5, description: "Practice daily meditation" },
      { target: 10, description: "Implement mindful meetings" },
      { target: 15, description: "Journal leadership insights" }
    ]
  },
  {
    id: "spiritual-2",
    title: "Gratitude & Growth",
    description: "Build resilience through gratitude and reflection",
    type: "spiritual",
    category: "weekly",
    reward: {
      type: "badge",
      value: "Gratitude Guide"
    },
    participants: 189,
    target: 300,
    startDate: "2024-03-18T00:00:00Z",
    endDate: "2024-03-24T23:59:59Z",
    milestones: [
      { target: 5, description: "Document daily wins" },
      { target: 10, description: "Practice team appreciation" },
      { target: 15, description: "Reflect on growth opportunities" }
    ]
  },
  {
    id: "spiritual-3",
    title: "Purpose Alignment",
    description: "Align business goals with personal values and purpose",
    type: "spiritual",
    category: "monthly",
    reward: {
      type: "badge",
      value: "Purpose Pioneer"
    },
    participants: 145,
    target: 200,
    startDate: "2024-03-01T00:00:00Z",
    endDate: "2024-03-31T23:59:59Z",
    milestones: [
      { target: 5, description: "Define core values" },
      { target: 10, description: "Align decisions with values" },
      { target: 15, description: "Create impact metrics" }
    ]
  }
]