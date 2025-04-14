"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TransactionForm } from "./transaction-form"
import { Transaction } from "@/lib/types"

interface AddTransactionDialogProps {
  onTransactionAdd: (transaction: Transaction) => void
}

export function AddTransactionDialog({ onTransactionAdd }: AddTransactionDialogProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = (transaction: Transaction) => {
    onTransactionAdd(transaction)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <TransactionForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}