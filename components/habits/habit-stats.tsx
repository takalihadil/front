"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const weeklyData = [
  { day: "Mon", completed: 5, total: 7 },
  { day: "Tue", completed: 6, total: 7 },
  { day: "Wed", completed: 4, total: 7 },
  { day: "Thu", completed: 7, total: 7 },
  { day: "Fri", completed: 5, total: 7 },
  { day: "Sat", completed: 3, total: 7 },
  { day: "Sun", completed: 4, total: 7 },
];

export function HabitStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background p-2 rounded-lg shadow-lg border">
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-muted-foreground">
                          Completed: {payload[0].value}/{payload[1].value}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="completed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="total" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
}