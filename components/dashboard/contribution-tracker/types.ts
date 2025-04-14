"use client"

export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4 // 0 = no activity, 4 = highest activity
  goals: {
    completed: number
    total: number
  }
}

export interface ContributionWeek {
  days: ContributionDay[]
}

export interface ContributionData {
  weeks: ContributionWeek[]
  totalContributions: number
  longestStreak: number
  currentStreak: number
}