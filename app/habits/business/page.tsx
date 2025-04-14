"use client"

import { motion } from "framer-motion"
import { HabitsHeader } from "@/components/habits/habits-header"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Target, Users, DollarSign } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { HabitsList } from "@/components/habits/habits-list"
import { mockHabits, mockHabitsReport } from "@/lib/mock-data/habits"

const businessStats = [
  {
    title: "Revenue Growth",
    value: "+28%",
    icon: TrendingUp,
    progress: 75,
    color: "text-green-500"
  },
  {
    title: "Goals Achieved",
    value: "8/10",
    icon: Target,
    progress: 80,
    color: "text-blue-500"
  },
  {
    title: "Customer Growth",
    value: "+45",
    icon: Users,
    progress: 65,
    color: "text-purple-500"
  },
  {
    title: "Profit Margin",
    value: "32%",
    icon: DollarSign,
    progress: 85,
    color: "text-amber-500"
  }
]

export default function BusinessPage() {
  return (
    <div className="space-y-8">
      <HabitsHeader />
      
      <div className="container mx-auto px-4 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-4 md:grid-cols-4"
        >
          {businessStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    <span className="text-2xl font-bold">{stat.value}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">{stat.title}</div>
                    <Progress value={stat.progress} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <HabitsList 
            habits={mockHabits.filter(h => h.type === 'good')} 
            report={mockHabitsReport}
          />
        </motion.div>
      </div>
    </div>
  )
}