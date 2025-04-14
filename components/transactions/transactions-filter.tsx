"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TransactionsFilterProps {
  value: string
  onChange: (value: string) => void
}

export function TransactionsFilter({ value, onChange }: TransactionsFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Transactions</SelectItem>
        <SelectItem value="income">Income Only</SelectItem>
        <SelectItem value="expense">Expenses Only</SelectItem>
      </SelectContent>
    </Select>
  )
}