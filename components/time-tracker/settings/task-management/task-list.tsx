"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Task } from "@/lib/types/time-tracker"
import { TaskActions } from "./task-actions"
import { EditTaskDialog } from "./edit-task-dialog"
import { DeleteTaskDialog } from "./delete-task-dialog"
import { Badge } from "@/components/ui/badge"
import { mockProjects } from "@/lib/mock-data/time-tracker"

interface TaskListProps {
  tasks: Task[]
  onDelete: (id: string) => void
  onUpdate: (id: string, data: Partial<Task>) => void
}

export function TaskList({ tasks, onDelete, onUpdate }: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const getProjectName = (projectId: string) => {
    return mockProjects.find(p => p.id === projectId)?.name || 'Unknown Project'
  }

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
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Est. Hours</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No tasks found
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{task.name}</div>
                      {task.description && (
                        <div className="text-sm text-muted-foreground">{task.description}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getProjectName(task.projectId)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(task.status)} variant="secondary">
                      {task.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.estimatedHours || '-'}</TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <EditTaskDialog
        task={selectedTask}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSubmit={(data) => {
          if (selectedTask) {
            onUpdate(selectedTask.id, data)
          }
        }}
      />

      <DeleteTaskDialog
        task={selectedTask}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={(task) => {
          onDelete(task.id)
          setShowDeleteDialog(false)
        }}
      />
    </>
  )
}