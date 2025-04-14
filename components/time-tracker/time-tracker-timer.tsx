"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, StopCircle, Plus } from "lucide-react"
import { mockProjects, mockTasks } from "@/lib/mock-data/time-tracker"
import { formatDuration } from "@/lib/utils/time"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Task } from "@/lib/types/time-tracker"

export function TimeTrackerTimer() {
  const [isRunning, setIsRunning] = useState(false)
  const [duration, setDuration] = useState(0)
  const [selectedProject, setSelectedProject] = useState<string>("")
  const [selectedTask, setSelectedTask] = useState<string>("")
  const [description, setDescription] = useState("")
  const [taskSearch, setTaskSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [tasks, setTasks] = useState<Task[]>(mockTasks)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning) {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning])

  const handleStart = () => {
    if (!selectedProject || !selectedTask) return
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleStop = () => {
    setIsRunning(false)
    setDuration(0)
    setDescription("")
  }

  // Reset task selection when project changes
  useEffect(() => {
    setSelectedTask("")
    setTaskSearch("")
  }, [selectedProject])

  const availableTasks = selectedProject 
    ? tasks.filter(task => task.projectId === selectedProject)
    : []

  const filteredTasks = taskSearch === ""
    ? availableTasks
    : availableTasks.filter(task =>
        task.name.toLowerCase().includes(taskSearch.toLowerCase())
      )

  const handleCreateTask = () => {
    if (!selectedProject || !taskSearch.trim()) return

    const newTask: Task = {
      id: crypto.randomUUID(),
      projectId: selectedProject,
      name: taskSearch,
      status: "not_started",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setTasks(prev => [...prev, newTask])
    setSelectedTask(newTask.id)
    setOpen(false)
    setTaskSearch("")
  }

  const selectedTaskName = selectedTask 
    ? tasks.find(t => t.id === selectedTask)?.name 
    : "Select task..."

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid gap-4 md:grid-cols-[2fr,2fr,3fr,auto]">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger>
              <SelectValue placeholder="Select Project" />
            </SelectTrigger>
            <SelectContent>
              {mockProjects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                disabled={!selectedProject}
                className="justify-between"
              >
                {selectedTaskName}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="bottom" align="start">
              <Command>
                <CommandInput
                  placeholder="Search or create task..."
                  value={taskSearch}
                  onValueChange={setTaskSearch}
                />
                {filteredTasks.length === 0 && taskSearch && (
                  <CommandEmpty className="py-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={handleCreateTask}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create "{taskSearch}"
                    </Button>
                  </CommandEmpty>
                )}
                <CommandGroup>
                  {filteredTasks.map((task) => (
                    <CommandItem
                      key={task.id}
                      value={task.id}
                      onSelect={() => {
                        setSelectedTask(task.id)
                        setOpen(false)
                      }}
                    >
                      {task.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <Input
            placeholder="What are you working on?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <div className="w-24 text-xl font-mono">{formatDuration(duration)}</div>
            
            {!isRunning ? (
              <Button 
                onClick={handleStart}
                disabled={!selectedProject || !selectedTask}
                size="icon"
              >
                <Play className="h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button onClick={handlePause} size="icon" variant="outline">
                  <Pause className="h-4 w-4" />
                </Button>
                <Button onClick={handleStop} size="icon" variant="destructive">
                  <StopCircle className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}