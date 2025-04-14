"use client"

import { useState } from "react"
import { ProjectList } from "./project-list"
import { AddProjectDialog } from "./add-project-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { mockProjects } from "@/lib/mock-data/time-tracker"
import { toast } from "sonner"

export function ProjectManagement() {
  const [projects, setProjects] = useState(mockProjects)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const handleAddProject = (project: any) => {
    setProjects(prev => [...prev, { ...project, id: crypto.randomUUID() }])
    toast.success("Project added successfully")
  }

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id))
    toast.success("Project deleted successfully")
  }

  const handleUpdateProject = (id: string, data: any) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...data } : p))
    toast.success("Project updated successfully")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>
      
      <ProjectList
        projects={projects}
        onDelete={handleDeleteProject}
        onUpdate={handleUpdateProject}
      />

      <AddProjectDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={handleAddProject}
      />
    </div>
  )
}