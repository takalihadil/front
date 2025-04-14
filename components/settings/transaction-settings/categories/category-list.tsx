"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CategoryActions } from "./category-actions"
import { DeleteCategoryDialog } from "./delete-category-dialog"
import { EditCategoryDialog } from "./edit-category-dialog"

interface CategoryListProps {
  categories: string[]
  onDelete: (category: string) => void
  onUpdate: (oldCategory: string, newCategory: string) => void
}

export function CategoryList({ categories, onDelete, onUpdate }: CategoryListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <>
      <div 
        className="relative overflow-x-auto"
        role="region" 
        aria-label="Transaction Categories"
        tabIndex={0}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Category Name</TableHead>
              <TableHead scope="col" className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={2} 
                  className="text-center text-muted-foreground"
                  role="status"
                  aria-live="polite"
                >
                  No categories found
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                <TableRow key={category}>
                  <TableCell>{category}</TableCell>
                  <TableCell>
                    <CategoryActions
                      category={category}
                      onEdit={() => {
                        setSelectedCategory(category)
                        setIsEditDialogOpen(true)
                      }}
                      onDelete={() => {
                        setSelectedCategory(category)
                        setIsDeleteDialogOpen(true)
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <EditCategoryDialog
        category={selectedCategory}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={(newCategory) => {
          if (selectedCategory) {
            onUpdate(selectedCategory, newCategory)
          }
        }}
      />

      <DeleteCategoryDialog
        category={selectedCategory}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={(category) => {
          onDelete(category)
          setIsDeleteDialogOpen(false)
        }}
      />
    </>
  )
}