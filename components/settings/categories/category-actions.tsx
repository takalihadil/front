"use client"

import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface CategoryActionsProps {
  category: string
  onEdit: () => void
  onDelete: () => void
}

export function CategoryActions({ category, onEdit, onDelete }: CategoryActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          aria-label={`Actions for ${category}`}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={onEdit}
          onSelect={(event) => {
            event.preventDefault()
            onEdit()
          }}
        >
          <Pencil className="mr-2 h-4 w-4" />
          <span>Edit {category}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          onSelect={(event) => {
            event.preventDefault()
            onDelete()
          }}
          className="text-red-600 dark:text-red-400"
        >
          <Trash className="mr-2 h-4 w-4" />
          <span>Delete {category}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}