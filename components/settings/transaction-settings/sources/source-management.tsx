"use client"

import { useState } from "react"
import { SourceList } from "./source-list"
import { AddSourceDialog } from "./add-source-dialog"
import { mockSources } from "@/lib/mock-data"
import { toast } from "sonner"

export function SourceManagement() {
  const [sources, setSources] = useState<string[]>(mockSources)

  const handleAddSource = (source: string) => {
    if (sources.includes(source)) {
      toast.error("Source already exists")
      return
    }
    setSources((prev) => [...prev, source])
    toast.success("Source added successfully")
  }

  const handleDeleteSource = (source: string) => {
    setSources((prev) => prev.filter((s) => s !== source))
    toast.success("Source deleted successfully")
  }

  const handleUpdateSource = (oldSource: string, newSource: string) => {
    if (sources.includes(newSource)) {
      toast.error("Source already exists")
      return
    }
    setSources((prev) => prev.map((s) => s === oldSource ? newSource : s))
    toast.success("Source updated successfully")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddSourceDialog onAdd={handleAddSource} />
      </div>
      <SourceList
        sources={sources}
        onDelete={handleDeleteSource}
        onUpdate={handleUpdateSource}
      />
    </div>
  )
}