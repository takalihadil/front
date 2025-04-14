import { Badge } from "@/components/ui/badge"
import { TransactionStatus } from "@/lib/types"

interface TransactionStatusBadgeProps {
  status: TransactionStatus
}

export function TransactionStatusBadge({ status }: TransactionStatusBadgeProps) {
  const variants = {
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
    failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  }

  return (
    <Badge className={variants[status]} variant="outline">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}