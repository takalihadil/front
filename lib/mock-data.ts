// Add mock businesses
export const mockBusinesses = [
  'Main Business',
  'Side Project',
  'Consulting LLC',
  'Freelance Work'
] as const

// Extending mock data with more realistic transactions
export const mockCategories = [
  'Product Sales',
  'Services',
  'Infrastructure',
  'Tools',
  'Marketing',
  'Office Expenses',
  'Travel',
  'Consulting',
] as const

export const mockSources = [
  'App Store',
  'Google Play',
  'Stripe',
  'PayPal',
  'Direct Deposit',
  'AWS',
  'Digital Ocean',
  'Freelancing',
] as const

export const mockTransactions = [
  {
    id: '1',
    date: '2024-03-15',
    description: 'Mobile App Revenue',
    amount: 2500,
    type: 'income',
    category: 'Product Sales',
    source: 'App Store',
    business: 'Side Project',
    deductions: {
      taxes: 375,
      fees: 750,
    },
    status: 'completed'
  },
  {
    id: '2',
    date: '2024-03-10',
    description: 'Freelance Project',
    amount: 3000,
    type: 'income',
    category: 'Services',
    source: 'Freelancing',
    business: 'Freelance Work',
    deductions: {
      taxes: 600,
      fees: 150,
    },
    status: 'completed'
  },
  {
    id: '3',
    date: '2024-03-05',
    description: 'Server Costs',
    amount: 150,
    type: 'expense',
    category: 'Infrastructure',
    source: 'AWS',
    business: 'Main Business',
    status: 'pending'
  },
  {
    id: '4',
    date: '2024-03-01',
    description: 'Software Subscriptions',
    amount: 100,
    type: 'expense',
    category: 'Tools',
    source: 'Various',
    business: 'Main Business',
    status: 'completed'
  },
  {
    id: '5',
    date: '2024-02-28',
    description: 'Social Media Ads',
    amount: 500,
    type: 'expense',
    category: 'Marketing',
    source: 'Meta',
    business: 'Side Project',
    status: 'completed'
  }
]

export const mockMonthlyStats = [
  {
    month: '2024-03',
    totalIncome: 5500,
    totalExpenses: 750,
    netIncome: 3625,
    goals: [
      {
        id: '1',
        type: 'netIncome',
        target: 3000,
        current: 3625,
        period: 'monthly',
        priority: 1,
        description: 'Monthly Net Income Target'
      },
      {
        id: '2',
        type: 'revenue',
        target: 6000,
        current: 5500,
        period: 'monthly',
        priority: 2,
        description: 'Monthly Revenue Target'
      },
      {
        id: '3',
        type: 'expenses',
        target: 1000,
        current: 750,
        period: 'monthly',
        priority: 2,
        description: 'Keep Monthly Expenses Under'
      },
      {
        id: '4',
        type: 'savings',
        target: 1000,
        current: 800,
        period: 'monthly',
        priority: 3,
        description: 'Monthly Savings Goal'
      }
    ],
    deductions: {
      taxes: 975,
      fees: 900,
      other: 0
    },
    businessStats: {
      'Main Business': {
        income: 0,
        expenses: 250,
        netIncome: -250
      },
      'Side Project': {
        income: 2500,
        expenses: 500,
        netIncome: 1250
      },
      'Freelance Work': {
        income: 3000,
        expenses: 0,
        netIncome: 2250
      }
    },
    sources: {
      'App Store': 2500,
      'Freelancing': 3000
    }
  }
]