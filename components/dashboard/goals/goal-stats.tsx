"use client"

import { motion } from "framer-motion"
import { formatCurrency } from "@/lib/utils"

interface GoalStatsProps {
  current: number
  target: number
  isHovered: boolean
}

export function GoalStats({ current, target, isHovered }: GoalStatsProps) {
  return (
    <motion.div 
      className="mt-4 text-center"
      animate={{ y: isHovered ? -2 : 0 }}
    >
      <h3 className="text-base font-semibold text-foreground md:text-lg lg:text-xl">
        {formatCurrency(current)}
      </h3>
      <p className="text-xs text-muted-foreground md:text-sm">
        Target: {formatCurrency(target)}
      </p>
    </motion.div>
  )
}