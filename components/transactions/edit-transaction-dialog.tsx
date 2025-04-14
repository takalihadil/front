"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TransactionForm } from "./transaction-form"
import { Transaction } from "@/lib/types"

interface EditTransactionDialogProps {
  transaction: Transaction | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (transaction: Transaction) => void
}

export function EditTransactionDialog({
  transaction,
  open,
  onOpenChange,
  onSubmit,
}: EditTransactionDialogProps) {
  if (!transaction) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        <TransactionForm 
          transaction={transaction}
          onSubmit={(updatedTransaction) => {
            onSubmit({ ...updatedTransaction, id: transaction.id })
            onOpenChange(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}