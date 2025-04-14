"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { HabitCategory } from "@/lib/types/habits";
import { Book, Brain, Dumbbell, Heart, Lightbulb, Users, Zap } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.enum(["good", "bad"]),
  category: z.enum(["business", "learning", "creativity", "wellness", "mindfulness", "networking", "productivity"]),
  description: z.string().optional(),
  target: z.number().min(1, "Target must be at least 1"),
  unit: z.string().optional(),
  frequency: z.enum(["daily", "weekly", "monthly"]),
  reminder: z.boolean(),
  reminderTime: z.string().optional(),
  reminderDays: z.array(z.string()).optional(),
});

interface AddHabitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const categoryIcons = {
  business: Zap,
  learning: Book,
  creativity: Lightbulb,
  wellness: Heart,
  mindfulness: Brain,
  networking: Users,
  productivity: Dumbbell,
};

const categoryColors = {
  business: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  learning: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  creativity: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
  wellness: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  mindfulness: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
  networking: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",
  productivity: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
};

export function AddHabitDialog({ open, onOpenChange }: AddHabitDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState<HabitCategory>("business");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "good",
      category: "business",
      frequency: "daily",
      target: 1,
      reminder: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    onOpenChange(false);
    form.reset();
  };

  const CategoryIcon = categoryIcons[selectedCategory];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
            <CategoryIcon className={`h-6 w-6 ${categoryColors[selectedCategory].split(" ")[1]}`} />
            Add New Habit
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter habit name" className="p-2 rounded-md border-gray-300" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="rounded-md border-gray-300">
                        <SelectValue placeholder="Select habit type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="good">Good Habit</SelectItem>
                        <SelectItem value="bad">Bad Habit</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {Object.entries(categoryIcons).map(([category, Icon]) => (
                      <Button
                        key={category}
                        type="button"
                        variant={field.value === category ? "default" : "outline"}
                        className={`flex flex-col items-center p-2 rounded-md transition-all ${field.value === category ? "bg-blue-500 text-white" : "text-gray-600"}`}
                        onClick={() => {
                          field.onChange(category);
                          setSelectedCategory(category as HabitCategory);
                        }}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="capitalize text-xs mt-1">{category}</span>
                      </Button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter habit description" className="resize-none p-2 rounded-md border-gray-300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        className="p-2 rounded-md border-gray-300"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., minutes, pages" className="p-2 rounded-md border-gray-300" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="rounded-md border-gray-300">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reminderTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reminder Time (Optional)</FormLabel>
                    <FormControl>
                      <Input type="time" className="p-2 rounded-md border-gray-300" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="reminderDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reminder Days (Optional)</FormLabel>
                  <FormControl>
                    <div className="flex gap-1">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                        <Button
                          key={day}
                          type="button"
                          variant={field.value?.includes(day) ? "default" : "outline"}
                          onClick={() => {
                            const updatedDays = field.value?.includes(day)
                              ? field.value.filter((d) => d !== day)
                              : [...(field.value || []), day];
                            field.onChange(updatedDays);
                          }}
                          className="text-xs"
                        >
                          {day}
                        </Button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Add Habit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
