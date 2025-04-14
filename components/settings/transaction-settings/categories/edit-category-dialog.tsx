"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CategoryForm } from "./category-form"

interface EditCategoryDialogProps {
  category: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (category: string) => void
}

export function EditCategoryDialog({
  category,
  open,
  onOpenChange,
  onSubmit,
}: EditCategoryDialogProps) {
  if (!category) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <CategoryForm
          defaultValue={category}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}