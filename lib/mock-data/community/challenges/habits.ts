import { Challenge } from "@/lib/types/community"

export const habitsChallenges: Challenge[] = [
  {
    id: "habits-1",
    title: "Deep Work Mastery",
    description: "Build focused work habits for maximum productivity",
    type: "habits",
    category: "daily",
    reward: {
      type: "badge",
      value: "Focus Master"
    },
    participants: 234,
    target: 300,
    startDate: "2024-03-01T00:00:00Z",
    endDate: "2024-03-31T23:59:59Z",
    milestones: [
      { target: 5, description: "Complete 2-hour deep work blocks" },
      { target: 10, description: "Eliminate distractions during focus time" },
      { target: 15, description: "Document productivity insights" }
    ]
  },
  {
    id: "habits-2",
    title: "Digital Detox Challenge",
    description: "Develop healthier relationships with technology",
    type: "habits",
    category: "weekly",
    reward: {
      type: "badge",
      value: "Digital Balance"
    },
    participants: 156,
    target: 200,
    startDate: "2024-03-18T00:00:00Z",
    endDate: "2024-03-24T23:59:59Z",
    milestones: [
      { target: 5, description: "Implement phone-free mornings" },
      { target: 10, description: "Reduce social media usage by 50%" },
      { target: 15, description: "Create technology boundaries" }
    ]
  },
  {
    id: "habits-3",
    title: "Knowledge Builder",
    description: "Establish daily learning and growth habits",
    type: "habits",
    category: "monthly",
    reward: {
      type: "badge",
      value: "Lifelong Learner"
    },
    participants: 189,
    target: 250,
    startDate: "2024-03-01T00:00:00Z",
    endDate: "2024-03-31T23:59:59Z",
    milestones: [
      { target: 5, description: "Read 20 pages daily" },
      { target: 10, description: "Take structured notes" },
      { target: 15, description: "Apply learning to business" }
    ]
  }
]