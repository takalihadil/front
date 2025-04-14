"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CategoryManagement } from "@/components/settings/categories/category-management"
import { SourceManagement } from "@/components/settings/sources/source-management"

export default function CategoriesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Transaction Settings</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="categories">
            <TabsList className="mb-4">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="sources">Sources</TabsTrigger>
            </TabsList>
            <TabsContent value="categories">
              <CategoryManagement />
            </TabsContent>
            <TabsContent value="sources">
              <SourceManagement />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}