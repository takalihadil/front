"use client"

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
import { Transaction } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"

interface DeleteTransactionDialogProps {
  transaction: Transaction | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (transaction: Transaction) => void
}

export function DeleteTransactionDialog({
  transaction,
  open,
  onOpenChange,
  onConfirm,
}: DeleteTransactionDialogProps) {
  if (!transaction) return null

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this transaction?
            <div className="mt-4 p-4 rounded-lg bg-muted">
              <div><strong>Description:</strong> {transaction.description}</div>
              <div><strong>Amount:</strong> {formatCurrency(transaction.amount)}</div>
              <div><strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}</div>
            </div>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onConfirm(transaction)}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}