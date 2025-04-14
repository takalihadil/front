export type HabitCategory =
  | "business"
  | "learning"
  | "creativity"
  | "wellness"
  | "mindfulness"
  | "networking"
  | "productivity";

export type HabitType = "good" | "bad";
export type HabitLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface HabitGoal {
  type: "daily" | "weekly" | "monthly";
  target: number;
  unit: string;
  current: number;
}

export interface HabitReward {
  type: "badge" | "points" | "achievement";
  value: string;
  icon?: string;
  unlockedAt?: string;
}

export interface Habit {
  id: string;
  name: string;
  type: HabitType;
  category: HabitCategory;
  description?: string;
  goal: HabitGoal;
  level: HabitLevel;
  icon?: string;
  imageUrl?: string; // Added
  benefits: string[];
  streakGoal?: number;
  points: number;
  rewards: HabitReward[];
  resources?: {
    title: string;
    url: string;
    type: "article" | "video" | "course" | "book";
  }[];
  notifications?: {
    enabled: boolean;
    frequency: "daily" | "weekly";
    time?: string;
    customMessage?: string;
  };
  createdAt: string;
  updatedAt: string;
  lastCompleted?: string;
}

export interface HabitEntry {
  id: string;
  habitId: string;
  date: string;
  isPositive: boolean;
  value?: number;
  notes?: string;
  duration?: number;
  mood?: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
}

export interface WeeklyProgress {
  habitId: string;
  positive: number;
  negative: number;
  total: number;
  targetProgress: number;
  streak: number;
  longestStreak: number;
  mood: number;
  level: HabitLevel;
  points: number;
}

export interface HabitsReport {
  weeklyProgress: Record<string, WeeklyProgress>;
  categoryProgress: Record<HabitCategory, number>;
  totalHabits: number;
  activeStreak: number;
  longestStreak: number;
  completionRate: number;
  streaks: Record<string, number>;
  totalPoints: number;
  levelDistribution: Record<HabitLevel, number>;
}