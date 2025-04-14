"use client"

import { motion } from "framer-motion"
import { Target, Wallet, PiggyBank, TrendingDown } from "lucide-react"
import { GoalType, GoalTheme } from "./types"

interface GoalIconProps {
  type: GoalType
  isAhead: boolean
  isHovered: boolean
  theme: GoalTheme
}

const goalIcons = {
  netIncome: Target,
  revenue: Wallet,
  savings: PiggyBank,
  expenses: TrendingDown,
}

export function GoalIcon({ type, isAhead, isHovered, theme }: GoalIconProps) {
  const Icon = goalIcons[type]

  return (
    <motion.div 
      animate={{ 
        scale: isHovered ? 1.1 : 1,
      }}
      className="relative"
    >
      <div className={`
        rounded-full w-8 h-8 flex items-center justify-center
        ${isAhead ? theme.bg : 'bg-gray-200 dark:bg-gray-700'}
        transition-all duration-300 shadow-sm
      `}>
        <Icon className="h-4 w-4 text-white" />
      </div>
    </motion.div>
  )
}