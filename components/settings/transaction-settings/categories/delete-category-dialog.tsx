"use client"

import { useEffect, useRef } from "react"
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

interface DeleteCategoryDialogProps {
  category: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (category: string) => void
}

export function DeleteCategoryDialog({
  category,
  open,
  onOpenChange,
  onConfirm,
}: DeleteCategoryDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => cancelRef.current?.focus(), 100)
    }
  }, [open])

  if (!category) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Category</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the category "{category}"?
            This will not delete any transactions, but they will no longer be associated with this category.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel ref={cancelRef}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onConfirm(category)}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete {category}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}