"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ProjectForm } from "./project-form"

interface AddProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
}

export function AddProjectDialog({ open, onOpenChange, onSubmit }: AddProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>
        <ProjectForm
          onSubmit={(data) => {
            onSubmit(data)
            onOpenChange(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}