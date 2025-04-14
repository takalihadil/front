"use client"

import { useState } from "react"
import { CategoryList } from "./category-list"
import { AddCategoryDialog } from "./add-category-dialog"
import { mockCategories } from "@/lib/mock-data"
import { toast } from "sonner"

export function CategoryManagement() {
  const [categories, setCategories] = useState<string[]>(mockCategories)

  const handleAddCategory = (category: string) => {
    if (categories.includes(category)) {
      toast.error("Category already exists")
      return
    }
    setCategories((prev) => [...prev, category])
    toast.success("Category added successfully")
  }

  const handleDeleteCategory = (category: string) => {
    setCategories((prev) => prev.filter((c) => c !== category))
    toast.success("Category deleted successfully")
  }

  const handleUpdateCategory = (oldCategory: string, newCategory: string) => {
    if (categories.includes(newCategory)) {
      toast.error("Category already exists")
      return
    }
    setCategories((prev) => prev.map((c) => c === oldCategory ? newCategory : c))
    toast.success("Category updated successfully")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddCategoryDialog onAdd={handleAddCategory} />
      </div>
      <CategoryList
        categories={categories}
        onDelete={handleDeleteCategory}
        onUpdate={handleUpdateCategory}
      />
    </div>
  )
}