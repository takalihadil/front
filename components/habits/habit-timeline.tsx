"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

const timelineData = [
  {
    time: "9:00 AM",
    habit: "Morning Meditation",
    status: "completed",
    category: "Mindfulness",
  },
  {
    time: "10:30 AM",
    habit: "Project Planning",
    status: "completed",
    category: "Productivity",
  },
  {
    time: "12:00 PM",
    habit: "Exercise",
    status: "missed",
    category: "Wellness",
  },
  {
    time: "2:00 PM",
    habit: "Learning Session",
    status: "upcoming",
    category: "Learning",
  },
  {
    time: "4:30 PM",
    habit: "Client Follow-ups",
    status: "upcoming",
    category: "Business",
  },
];

const statusIcons = {
  completed: CheckCircle2,
  missed: XCircle,
  upcoming: Clock,
};

const statusColors = {
  completed: "text-green-500",
  missed: "text-red-500",
  upcoming: "text-blue-500",
};

export function HabitTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-6">
            {timelineData.map((item, index) => {
              const Icon = statusIcons[item.status];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-16"
                >
                  <div className="absolute left-0 p-2 bg-background">
                    <Icon className={`h-5 w-5 ${statusColors[item.status]}`} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.habit}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{item.time}</span>
                        <Badge variant="secondary">{item.category}</Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}