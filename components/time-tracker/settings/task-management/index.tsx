"use client"

import { useState } from "react"
import { TaskList } from "./task-list"
import { AddTaskDialog } from "./add-task-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { mockTasks } from "@/lib/mock-data/time-tracker"
import { toast } from "sonner"
import { Task } from "@/lib/types/time-tracker"

export function TaskManagement() {
  const [tasks, setTasks] = useState(mockTasks)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const handleAddTask = (task: Task) => {
    setTasks(prev => [...prev, { ...task, id: crypto.randomUUID() }])
    toast.success("Task added successfully")
  }

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
    toast.success("Task deleted successfully")
  }

  const handleUpdateTask = (id: string, data: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...data } : t))
    toast.success("Task updated successfully")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
      
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onUpdate={handleUpdateTask}
      />

      <AddTaskDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={handleAddTask}
      />
    </div>
  )
}