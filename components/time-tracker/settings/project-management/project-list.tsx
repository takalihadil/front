"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Project } from "@/lib/types/time-tracker"
import { ProjectActions } from "./project-actions"
import { EditProjectDialog } from "./edit-project-dialog"
import { DeleteProjectDialog } from "./delete-project-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronRight } from "lucide-react"
import { TaskList } from "./task-list"
import { mockTasks } from "@/lib/mock-data/time-tracker"

interface ProjectListProps {
  projects: Project[]
  onDelete: (id: string) => void
  onUpdate: (id: string, data: Partial<Project>) => void
}

export function ProjectList({ projects, onDelete, onUpdate }: ProjectListProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  const projectTasks = mockTasks.filter(task => task.projectId === expandedProject)

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No projects found
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <>
                  <TableRow key={project.id}>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setExpandedProject(
                          expandedProject === project.id ? null : project.id
                        )}
                      >
                        {expandedProject === project.id ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: project.color }}
                        />
                        {project.name}
                      </div>
                    </TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>
                      <Badge variant={project.isArchived ? "secondary" : "default"}>
                        {project.isArchived ? "Archived" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ProjectActions
                        project={project}
                        onEdit={() => {
                          setSelectedProject(project)
                          setShowEditDialog(true)
                        }}
                        onDelete={() => {
                          setSelectedProject(project)
                          setShowDeleteDialog(true)
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  {expandedProject === project.id && (
                    <TableRow>
                      <TableCell colSpan={5} className="p-0">
                        <div className="p-4 bg-muted/50">
                          <TaskList 
                            projectId={project.id}
                            tasks={projectTasks}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <EditProjectDialog
        project={selectedProject}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        onSubmit={(data) => {
          if (selectedProject) {
            onUpdate(selectedProject.id, data)
          }
        }}
      />

      <DeleteProjectDialog
        project={selectedProject}
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={(project) => {
          onDelete(project.id)
          setShowDeleteDialog(false)
        }}
      />
    </>
  )
}