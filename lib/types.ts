export type TransactionType = 'income' | 'expense'
export type TransactionStatus = 'pending' | 'completed' | 'failed'
export type GoalType = 'netIncome' | 'revenue' | 'expenses' | 'savings'

export interface BusinessStats {
  income: number
  expenses: number
  netIncome: number
}

export interface Goal {
  id: string
  type: GoalType
  target: number
  current: number
  period: 'monthly' | 'quarterly' | 'yearly'
  priority: 1 | 2 | 3
  description: string
}

export interface MonthlyStats {
  month: string
  totalIncome: number
  totalExpenses: number
  netIncome: number
  goals: Goal[]
  deductions: {
    taxes: number
    fees: number
    other: number
  }
  businessStats: Record<string, BusinessStats>
  sources: Record<string, number>
}

export interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  type: TransactionType
  category: string
  source: string
  status: TransactionStatus
  business: string
  deductions?: {
    taxes?: number
    fees?: number
    other?: number
  }
}

export interface TransactionFilters {
  type: string
  category: string
  source: string
  status: string
  business: string
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
}