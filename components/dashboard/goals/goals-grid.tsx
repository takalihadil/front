"use client"

import { Goal } from "@/lib/types"
import { GoalCard } from "./goal-card"
import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"

interface GoalsGridProps {
  goals: Goal[]
}

export function GoalsGrid({ goals }: GoalsGridProps) {
  const sortedGoals = [...goals].sort((a, b) => a.priority - b.priority)
  const totalProgress = goals.reduce((acc, goal) => {
    const progress = goal.type === 'expenses' 
      ? (goal.current < goal.target ? 100 : (goal.target / goal.current) * 100)
      : (goal.current / goal.target) * 100
    return acc + progress
  }, 0) / goals.length

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="mb-12 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10"
        >
          <h2 className="text-2xl font-bold text-primary">Overall Progress</h2>
          <div className={`
            flex items-center gap-1 px-2 py-1 rounded-full text-sm
            ${totalProgress >= 75 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' 
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100'}
          `}>
            <ArrowUp className="w-3 h-3" />
            {Math.round(totalProgress)}%
          </div>
        </motion.div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {sortedGoals.map((goal, index) => (
          <GoalCard key={goal.id} goal={goal} index={index} />
        ))}
      </div>
    </motion.div>
  )
}