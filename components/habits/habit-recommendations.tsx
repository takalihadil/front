"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Plus, Star, Clock, TrendingUp } from "lucide-react";

const recommendations = [
  {
    title: "Deep Work Sessions",
    description: "Schedule focused work periods without distractions",
    category: "Productivity",
    difficulty: "Medium",
    timeCommitment: "2 hours daily",
    impact: "High",
  },
  {
    title: "Client Communication",
    description: "Regular updates and feedback sessions with clients",
    category: "Business",
    difficulty: "Easy",
    timeCommitment: "30 mins daily",
    impact: "High",
  },
  {
    title: "Skill Development",
    description: "Dedicated time for learning new technologies",
    category: "Learning",
    difficulty: "Hard",
    timeCommitment: "1 hour daily",
    impact: "Medium",
  },
];

export function HabitRecommendations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Habits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {recommendations.map((habit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 rounded-lg bg-muted/50"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold">{habit.title}</h3>
                <Badge>{habit.category}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {habit.description}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>Difficulty: {habit.difficulty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span>{habit.timeCommitment}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span>Impact: {habit.impact}</span>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Habit
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}