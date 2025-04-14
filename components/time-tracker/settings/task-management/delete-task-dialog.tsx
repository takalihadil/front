"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Task } from "@/lib/types/time-tracker"

interface DeleteTaskDialogProps {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (task: Task) => void
}

export function DeleteTaskDialog({
  task,
  open,
  onOpenChange,
  onConfirm,
}: DeleteTaskDialogProps) {
  if (!task) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Task</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{task.name}"? This will also delete all time
            entries associated with this task. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onConfirm(task)}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete Task
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}