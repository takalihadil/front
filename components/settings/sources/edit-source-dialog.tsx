"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SourceForm } from "./source-form"

interface EditSourceDialogProps {
  source: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (source: string) => void
}

export function EditSourceDialog({
  source,
  open,
  onOpenChange,
  onSubmit,
}: EditSourceDialogProps) {
  if (!source) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Source</DialogTitle>
        </DialogHeader>
        <SourceForm
          defaultValue={source}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}