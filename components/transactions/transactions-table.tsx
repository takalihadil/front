"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Transaction } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { TransactionStatusBadge } from "./transaction-status"
import { TransactionActions } from "./transaction-actions"

interface TransactionsTableProps {
  transactions: Transaction[]
  onEdit: (transaction: Transaction) => void
  onDelete: (transaction: Transaction) => void
}

export function TransactionsTable({ transactions, onEdit, onDelete }: TransactionsTableProps) {
  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Business</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Deductions</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center text-muted-foreground">
                No transactions found
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.business}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.source}</TableCell>
                <TableCell>
                  <TransactionStatusBadge status={transaction.status} />
                </TableCell>
                <TableCell className={`text-right ${
                  transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {transaction.deductions 
                    ? formatCurrency(
                        (transaction.deductions.taxes || 0) + 
                        (transaction.deductions.fees || 0)
                      )
                    : '-'}
                </TableCell>
                <TableCell>
                  <TransactionActions
                    transaction={transaction}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}