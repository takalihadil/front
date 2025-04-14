import { Challenge } from "@/lib/types/community"

export const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "30-Day Revenue Sprint",
    description: "Increase your monthly revenue by 20% through strategic pricing and upsells",
    type: "revenue",
    category: "monthly",
    reward: {
      type: "badge",
      value: "Revenue Master"
    },
    participants: 156,
    target: 200,
    startDate: "2024-03-01T00:00:00Z",
    endDate: "2024-03-31T23:59:59Z",
    milestones: [
      { target: 5, description: "Implement 3 new pricing tiers" },
      { target: 10, description: "Launch 2 upsell features" },
      { target: 15, description: "Achieve 10% revenue increase" },
      { target: 20, description: "Reach 20% revenue growth" }
    ]
  },
  {
    id: "2",
    title: "Productivity Power Week",
    description: "Optimize your daily workflow and increase productivity by 50%",
    type: "productivity",
    category: "weekly",
    reward: {
      type: "badge",
      value: "Productivity Pro"
    },
    participants: 89,
    target: 150,
    startDate: "2024-03-18T00:00:00Z",
    endDate: "2024-03-24T23:59:59Z",
    milestones: [
      { target: 5, description: "Set up automated workflows" },
      { target: 10, description: "Implement time-blocking" },
      { target: 15, description: "Reduce meeting time by 30%" }
    ]
  },
  {
    id: "3",
    title: "Daily Growth Tasks",
    description: "Complete key growth activities every day for a week",
    type: "growth",
    category: "daily",
    reward: {
      type: "badge",
      value: "Growth Hacker"
    },
    participants: 234,
    target: 300,
    startDate: "2024-03-19T00:00:00Z",
    endDate: "2024-03-25T23:59:59Z",
    milestones: [
      { target: 5, description: "Engage with 5 potential customers" },
      { target: 10, description: "Share valuable content" },
      { target: 15, description: "Analyze key metrics" }
    ]
  },
  {
    id: "4",
    title: "Smart Savings Challenge",
    description: "Reduce operational costs by 15% while maintaining quality",
    type: "savings",
    category: "monthly",
    reward: {
      type: "badge",
      value: "Cost Optimizer"
    },
    participants: 112,
    target: 250,
    startDate: "2024-03-01T00:00:00Z",
    endDate: "2024-03-31T23:59:59Z",
    milestones: [
      { target: 5, description: "Audit current expenses" },
      { target: 10, description: "Identify cost-saving opportunities" },
      { target: 15, description: "Implement 3 cost-saving measures" }
    ]
  }
]