"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Brain, Heart, Briefcase, Book, Palette, Zap } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Productivity",
    icon: Zap,
    progress: 75,
    color: "text-yellow-500",
    link: "/habits/productivity",
    description: "Boost your daily efficiency and output",
    tasks: 8,
    completed: 6,
  },
  {
    name: "Wellness",
    icon: Heart,
    progress: 60,
    color: "text-red-500",
    link: "/habits/wellness",
    description: "Maintain physical and mental health",
    tasks: 5,
    completed: 3,
  },
  {
    name: "Business",
    icon: Briefcase,
    progress: 85,
    color: "text-blue-500",
    link: "/habits/business",
    description: "Grow your professional success",
    tasks: 6,
    completed: 5,
  },
  {
    name: "Learning",
    icon: Book,
    progress: 45,
    color: "text-green-500",
    link: "/habits/learning",
    description: "Expand your knowledge daily",
    tasks: 4,
    completed: 2,
  },
  {
    name: "Creativity",
    icon: Palette,
    progress: 30,
    color: "text-purple-500",
    link: "/habits/creativity",
    description: "Nurture your creative spirit",
    tasks: 3,
    completed: 1,
  },
  {
    name: "Mindfulness",
    icon: Brain,
    progress: 90,
    color: "text-indigo-500",
    link: "/habits/mindfulness",
    description: "Practice mental awareness",
    tasks: 7,
    completed: 6,
  },
];

export function HabitCategories() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Habit Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={category.link}>
                <div className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <category.icon className={`h-5 w-5 ${category.color}`} />
                      <h3 className="font-semibold">{category.name}</h3>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {category.completed}/{category.tasks} tasks
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.description}
                  </p>
                  <Progress value={category.progress} className="h-2" />
                  <div className="mt-2 text-right text-sm font-medium">
                    {category.progress}%
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}