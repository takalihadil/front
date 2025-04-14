export type GoalType = 'netIncome' | 'revenue' | 'expenses' | 'savings'

export interface GoalTheme {
  bg: string
  ring: string
  text: string
  gradient: string
}

export const goalThemes: Record<GoalType, GoalTheme> = {
  netIncome: {
    bg: "bg-blue-500/90 hover:bg-blue-500",
    ring: "ring-blue-500/30",
    text: "text-blue-500",
    gradient: "from-blue-500/20 to-transparent"
  },
  revenue: {
    bg: "bg-emerald-500/90 hover:bg-emerald-500",
    ring: "ring-emerald-500/30",
    text: "text-emerald-500",
    gradient: "from-emerald-500/20 to-transparent"
  },
  savings: {
    bg: "bg-purple-500/90 hover:bg-purple-500",
    ring: "ring-purple-500/30",
    text: "text-purple-500",
    gradient: "from-purple-500/20 to-transparent"
  },
  expenses: {
    bg: "bg-amber-500/90 hover:bg-amber-500",
    ring: "ring-amber-500/30",
    text: "text-amber-500",
    gradient: "from-amber-500/20 to-transparent"
  }
}