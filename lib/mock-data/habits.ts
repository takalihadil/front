export type HabitType = 'good' | 'bad'

export interface Habit {
  id: string
  name: string
  type: HabitType
  description?: string
  target: number // Weekly target for good habits, limit for bad habits
  createdAt: string
  updatedAt: string
}

export interface HabitEntry {
  id: string
  habitId: string
  date: string
  isPositive: boolean
  createdAt: string
}

export interface WeeklyProgress {
  habitId: string
  positive: number
  negative: number
  total: number
  targetProgress: number // Percentage towards target/limit
}

export interface HabitsReport {
  weeklyProgress: Record<string, WeeklyProgress>
  goodHabitsAverage: number
  badHabitsAverage: number
  streaks: Record<string, number>
}