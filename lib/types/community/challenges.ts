export type ChallengeType = 
  | 'revenue' 
  | 'productivity' 
  | 'growth' 
  | 'savings'
  | 'fitness'
  | 'habits'
  | 'spiritual'

export type ChallengeCategory = 'daily' | 'weekly' | 'monthly'

export type RewardType = 'badge' | 'achievement' | 'points'

export interface ChallengeMilestone {
  target: number
  description: string
}

export interface ChallengeReward {
  type: RewardType
  value: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  type: ChallengeType
  category: ChallengeCategory
  reward: ChallengeReward
  participants: number
  target: number
  startDate: string
  endDate: string
  milestones: ChallengeMilestone[]
}