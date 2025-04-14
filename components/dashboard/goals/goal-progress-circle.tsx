"use client"

import { motion } from "framer-motion"
import { GoalTheme } from "./types"

interface GoalProgressCircleProps {
  progress: number
  theme: GoalTheme
  index: number
}

export function GoalProgressCircle({ progress, theme, index }: GoalProgressCircleProps) {
  const percentageText = `${Math.round(progress)}%`

  return (
    <div className="relative h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 mx-auto my-2 md:my-4">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-muted stroke-current"
          strokeWidth="8"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
        />
        <motion.circle
          className={`${theme.text} stroke-current`}
          strokeWidth="8"
          strokeLinecap="round"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress / 100 }}
          transition={{ duration: 1, delay: index * 0.2 }}
          style={{
            transformOrigin: "50% 50%",
            transform: "rotate(-90deg)",
          }}
        />
        <text
          x="50"
          y="50"
          className="fill-current text-foreground text-[14px] font-medium"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {percentageText}
        </text>
      </svg>
    </div>
  )
}