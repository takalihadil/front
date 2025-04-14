"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Goal } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { GoalIcon } from "./goal-icon"
import { GoalStats } from "./goal-stats"
import { GoalProgressCircle } from "./goal-progress-circle"
import { GoalStatus } from "./goal-status"
import { goalThemes } from "./types"

interface GoalCardProps {
  goal: Goal
  index: number
}

export function GoalCard({ goal, index }: GoalCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const progress = (goal.current / goal.target) * 100
  const isAhead = goal.type === 'expenses' ? goal.current < goal.target : goal.current > goal.target
  const theme = goalThemes[goal.type]
  const difference = Math.abs(goal.current - goal.target)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={`
        relative h-full
        ${goal.priority === 1 ? `ring-2 ${theme.ring} shadow-lg` : ''}
        hover:shadow-md transition-all duration-300
      `}>
        <div className={`
          absolute inset-0 bg-gradient-to-b ${theme.gradient}
          opacity-${isHovered ? '100' : '0'}
          transition-opacity duration-300
        `} />
        
        <CardContent className="pt-2 pb-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-2">
              <GoalIcon 
                type={goal.type}
                isAhead={isAhead}
                isHovered={isHovered}
                theme={theme}
              />
              <h3 className="text-sm font-medium text-muted-foreground capitalize">
                {goal.type === 'netIncome' ? 'Net Income' : goal.type} Goal
              </h3>
            </div>

            <p className="text-xs text-center text-muted-foreground px-4">
              {goal.description}
            </p>

            <GoalStats 
              current={goal.current}
              target={goal.target}
              isHovered={isHovered}
            />

            <GoalProgressCircle 
              progress={progress}
              theme={theme}
              index={index}
            />

            <AnimatePresence>
              <GoalStatus 
                isAhead={isAhead}
                difference={difference}
              />
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}