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

interface DeleteSourceDialogProps {
  source: string | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (source: string) => void
}

export function DeleteSourceDialog({
  source,
  open,
  onOpenChange,
  onConfirm,
}: DeleteSourceDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => cancelRef.current?.focus(), 100)
    }
  }, [open])

  if (!source) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Source</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the source "{source}"?
            This will not delete any transactions, but they will no longer be associated with this source.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel ref={cancelRef}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onConfirm(source)}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete {source}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}