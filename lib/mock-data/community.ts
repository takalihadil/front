import { Challenge, Thought, TrendingTopic } from "../types/community"

// ... existing mockChallenges ...

export const mockThoughts: Thought[] = [
  {
    id: "1",
    content: "Just hit $10k MRR with my SaaS! Key learning: focus on customer retention over acquisition.",
    author: {
      id: "1",
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    upvotes: 124,
    comments: 18,
    createdAt: "2024-03-19T08:30:00Z"
  },
  {
    id: "2",
    content: "Looking for recommendations on payment processors for a European market. Any experiences with Stripe vs Adyen?",
    author: {
      id: "2",
      name: "Marcus Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    upvotes: 45,
    comments: 32,
    createdAt: "2024-03-19T10:15:00Z"
  },
  {
    id: "3",
    content: "Automated my customer onboarding process - reduced support tickets by 60%! Happy to share my approach if anyone's interested.",
    author: {
      id: "3",
      name: "Emma Watson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    upvotes: 89,
    comments: 24,
    createdAt: "2024-03-19T12:45:00Z"
  }
]

export const mockTrendingTopics: TrendingTopic[] = [
  {
    id: "1",
    name: "bootstrapping",
    posts: 342,
    growth: 25
  },
  {
    id: "2",
    name: "ai-tools",
    posts: 256,
    growth: 45
  },
  {
    id: "3",
    name: "passive-income",
    posts: 189,
    growth: 15
  },
  {
    id: "4",
    name: "marketing-tips",
    posts: 167,
    growth: 20
  }
]