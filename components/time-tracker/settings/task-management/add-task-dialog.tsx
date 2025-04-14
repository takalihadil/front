"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TaskForm } from "./task-form"

interface AddTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
}

export function AddTaskDialog({ open, onOpenChange, onSubmit }: AddTaskDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <TaskForm
          onSubmit={(data) => {
            onSubmit({
              ...data,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            })
            onOpenChange(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}