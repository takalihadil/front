"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TaskForm } from "./task-form"
import { Task } from "@/lib/types/time-tracker"

interface EditTaskDialogProps {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
}

export function EditTaskDialog({
  task,
  open,
  onOpenChange,
  onSubmit,
}: EditTaskDialogProps) {
  if (!task) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <TaskForm
          defaultValues={task}
          onSubmit={(data) => {
            onSubmit({
              ...data,
              updatedAt: new Date().toISOString(),
            })
            onOpenChange(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}