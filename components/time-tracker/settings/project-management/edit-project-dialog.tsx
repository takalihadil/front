"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProjectForm } from "./project-form"
import { Project } from "@/lib/types/time-tracker"

interface EditProjectDialogProps {
  project: Project | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
}

export function EditProjectDialog({
  project,
  open,
  onOpenChange,
  onSubmit,
}: EditProjectDialogProps) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <ProjectForm
          defaultValues={project}
          onSubmit={(data) => {
            onSubmit(data)
            onOpenChange(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}