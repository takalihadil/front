"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SourceForm } from "./source-form"

interface AddSourceDialogProps {
  onAdd: (source: string) => void
}

export function AddSourceDialog({ onAdd }: AddSourceDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Source
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Source</DialogTitle>
        </DialogHeader>
        <SourceForm
          onSubmit={(source) => {
            onAdd(source)
            setOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}