"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface GoalStatusProps {
  isAhead: boolean
  difference: number
}

export function GoalStatus({ isAhead, difference }: GoalStatusProps) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
    >
      <div className={`
        inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs md:text-sm
        ${isAhead 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-100' 
          : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-100'}
      `}>
        {isAhead ? (
          <TrendingUp className="w-3 h-3" />
        ) : (
          <TrendingDown className="w-3 h-3" />
        )}
        <span className="whitespace-nowrap">
          {formatCurrency(difference)} {isAhead ? 'ahead' : 'behind'}
        </span>
      </div>
    </motion.div>
  )
}