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
import { Project } from "@/lib/types/time-tracker"

interface DeleteProjectDialogProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (project: Project) => void
}

export function DeleteProjectDialog({
  project,
  open,
  onOpenChange,
  onConfirm,
}: DeleteProjectDialogProps) {
  if (!project) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Project</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{project.name}"? This will also delete all tasks and time
            entries associated with this project. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onConfirm(project)}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete Project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}