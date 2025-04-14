export interface Challenge {
  id: string
  title: string
  description: string
  type: 'revenue' | 'productivity' | 'growth' | 'savings'
  category: 'daily' | 'weekly' | 'monthly'
  reward: {
    type: 'badge' | 'achievement' | 'points'
    value: string
  }
  participants: number
  target: number
  startDate: string
  endDate: string
  milestones: {
    target: number
    description: string
  }[]
}

export interface Author {
  id: string
  name: string
  avatar: string
}

export interface Thought {
  id: string
  content: string
  author: Author
  upvotes: number
  comments: number
  createdAt: string
}

export interface TrendingTopic {
  id: string
  name: string
  posts: number
  growth: number
}