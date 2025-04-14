"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CategoryForm } from "./category-form"

interface AddCategoryDialogProps {
  onAdd: (category: string) => void
}

export function AddCategoryDialog({ onAdd }: AddCategoryDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <CategoryForm
          onSubmit={(category) => {
            onAdd(category)
            setOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}