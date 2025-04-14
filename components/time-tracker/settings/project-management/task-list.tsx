"use client"

import { useState } from "react"
import { Task } from "@/lib/types/time-tracker"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AddTaskDialog } from "./add-task-dialog"
import { EditTaskDialog } from "./edit-task-dialog"
import { DeleteTaskDialog } from "./delete-task-dialog"
import { TaskActions } from "./task-actions"

interface TaskListProps {
  projectId: string
  tasks: Task[]
}

export function TaskList({ projectId, tasks }: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const getStatusColor = (status: Task['status']) => {
    const colors = {
      not_started: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
      in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    }
    return colors[status]
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Project Tasks</h3>
        <Button size="sm" onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No tasks found for this project
          </p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 rounded-lg bg-background"
            >
              <div className="space-y-1">
                <div className="font-medium">{task.name}</div>
                {task.description && (
                  <div className="text-sm text-muted-foreground">{task.description}</div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Badge className={getStatusColor(task.status)} variant="secondary">
                    {task.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  {task.estimatedHours && (
                    <span className="text-muted-foreground">
                      {task.estimatedHours} hours estimated
                    </span>
                  )}
                </div>
              </div>
              <TaskActions
                task={task}
                onEdit={() => {
                  setSelectedTask(task)
                  setShowEditDialog(true)
                }}
                onDelete={() => {
                  setSelectedTask(task)
                  setShowDeleteDialog(true)
                }}
              />
            </div>
          ))
        )}
      </div>

      <AddTaskDialog
        projectId={projectId}
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />

      <EditTaskDialog
        task={selectedTask}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />

      <DeleteTaskDialog
        task={selectedTask}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
      />
    </div>
  )
}