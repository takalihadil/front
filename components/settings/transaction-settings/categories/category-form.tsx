"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect } from "react"

const formSchema = z.object({
  name: z.string()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must not exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Category name can only contain letters and spaces"),
})

interface CategoryFormProps {
  defaultValue?: string
  onSubmit: (category: string) => void
}

export function CategoryForm({ defaultValue = "", onSubmit }: CategoryFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValue,
    },
  })

  useEffect(() => {
    const timeout = setTimeout(() => {
      document.querySelector<HTMLInputElement>('input[name="name"]')?.focus()
    }, 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit((values) => onSubmit(values.name))} 
        className="space-y-6"
        aria-label={defaultValue ? "Edit Category Form" : "Add Category Form"}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter category name" 
                  {...field}
                  aria-describedby="category-name-description"
                />
              </FormControl>
              <FormMessage role="alert" />
              <p 
                id="category-name-description" 
                className="text-sm text-muted-foreground"
              >
                Use letters and spaces only, 2-50 characters long.
              </p>
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full"
          aria-label={defaultValue ? `Update category ${defaultValue}` : "Add new category"}
        >
          {defaultValue ? "Update Category" : "Add Category"}
        </Button>
      </form>
    </Form>
  )
}