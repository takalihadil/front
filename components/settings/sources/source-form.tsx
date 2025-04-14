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
    .min(2, "Source name must be at least 2 characters")
    .max(50, "Source name must not exceed 50 characters")
    .regex(/^[a-zA-Z0-9\s]+$/, "Source name can only contain letters, numbers, and spaces"),
})

interface SourceFormProps {
  defaultValue?: string
  onSubmit: (source: string) => void
}

export function SourceForm({ defaultValue = "", onSubmit }: SourceFormProps) {
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
        aria-label={defaultValue ? "Edit Source Form" : "Add Source Form"}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter source name" 
                  {...field}
                  aria-describedby="source-name-description"
                />
              </FormControl>
              <FormMessage role="alert" />
              <p 
                id="source-name-description" 
                className="text-sm text-muted-foreground"
              >
                Use letters, numbers, and spaces only, 2-50 characters long.
              </p>
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full"
          aria-label={defaultValue ? `Update source ${defaultValue}` : "Add new source"}
        >
          {defaultValue ? "Update Source" : "Add Source"}
        </Button>
      </form>
    </Form>
  )
}