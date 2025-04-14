import { Challenge } from "@/lib/types/community"

export const fitnessChallenges: Challenge[] = [
  {
    id: "fitness-1",
    title: "Desk-to-Active Challenge",
    description: "Transform your workday with strategic movement breaks and exercises",
    type: "fitness",
    category: "daily",
    reward: {
      type: "badge",
      value: "Active Entrepreneur"
    },
    participants: 145,
    target: 200,
    startDate: "2024-03-01T00:00:00Z",
    endDate: "2024-03-31T23:59:59Z",
    milestones: [
      { target: 5, description: "Take 3 movement breaks during work hours" },
      { target: 10, description: "Complete desk stretches every 2 hours" },
      { target: 15, description: "Achieve 7,500 daily steps" }
    ]
  },
  {
    id: "fitness-2",
    title: "Energy Optimization",
    description: "Boost productivity through strategic exercise and recovery",
    type: "fitness",
    category: "weekly",
    reward: {
      type: "badge",
      value: "Energy Master"
    },
    participants: 178,
    target: 250,
    startDate: "2024-03-18T00:00:00Z",
    endDate: "2024-03-24T23:59:59Z",
    milestones: [
      { target: 5, description: "Complete 3 high-intensity workouts" },
      { target: 10, description: "Practice active recovery on rest days" },
      { target: 15, description: "Track energy levels post-exercise" }
    ]
  },
  {
    id: "fitness-3",
    title: "Founder's Fitness Month",
    description: "Balance business growth with physical wellbeing",
    type: "fitness",
    category: "monthly",
    reward: {
      type: "badge",
      value: "Fit Founder"
    },
    participants: 134,
    target: 300,
    startDate: "2024-03-01T00:00:00Z",
    endDate: "2024-03-31T23:59:59Z",
    milestones: [
      { target: 5, description: "Establish morning exercise routine" },
      { target: 10, description: "Hit weekly activity goals" },
      { target: 15, description: "Maintain work-exercise balance" }
    ]
  }
]