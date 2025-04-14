"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TaskForm } from "./task-form"

interface AddTaskDialogProps {
  projectId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddTaskDialog({ projectId, open, onOpenChange }: AddTaskDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <TaskForm
          onSubmit={(data) => {
            // TODO: Implement task creation
            console.log("Creating task:", { ...data, projectId })
            onOpenChange(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}