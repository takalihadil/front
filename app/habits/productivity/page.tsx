"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HabitsHeader } from "@/components/habits/habits-header";
import { HabitsOverview } from "@/components/habits/habits-overview";
import { HabitCategories } from "@/components/habits/habit-categories";
import { HabitStats } from "@/components/habits/habit-stats";
import { HabitTimeline } from "@/components/habits/habit-timeline";
import { HabitRecommendations } from "@/components/habits/habit-recommendations";

export default function HabitsPage() {
  const pageRef = useRef(null);
  const isInView = useInView(pageRef, { once: true });

  return (
    <div 
      ref={pageRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <HabitsHeader />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <HabitsOverview />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <HabitCategories />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <HabitStats />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <HabitTimeline />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <HabitRecommendations />
        </motion.div>
      </div>
    </div>
  );
}