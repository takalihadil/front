"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CountUp from "react-countup";
import { Target, Zap, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Daily Streak",
    value: 12,
    icon: Zap,
    color: "text-yellow-500",
    progress: 80,
    pathColor: "#EAB308" // Yellow-500
  },
  {
    title: "Completion Rate",
    value: 87,
    icon: Target,
    color: "text-blue-500",
    progress: 87,
    pathColor: "#3B82F6" // Blue-500
  },
  {
    title: "Habits Mastered",
    value: 5,
    icon: Award,
    color: "text-green-500",
    progress: 62,
    pathColor: "#22C55E" // Green-500
  },
  {
    title: "Monthly Growth",
    value: 23,
    icon: TrendingUp,
    color: "text-purple-500",
    progress: 23,
    pathColor: "#A855F7" // Purple-500
  },
];

export function HabitsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={stat.progress}
                    text={`${stat.progress}%`}
                    styles={buildStyles({
                      textSize: '24px',
                      pathColor: stat.pathColor,
                      textColor: 'currentColor',
                      trailColor: '#d1d5db',
                    })}
                  />
                </div>
                <div className="text-2xl font-bold">
                  <CountUp end={stat.value} duration={2} />
                  {stat.title === "Monthly Growth" && "%"}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}