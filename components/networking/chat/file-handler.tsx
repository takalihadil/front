"use client"

import type React from "react"

import { useState } from "react"
import { X, Paperclip, ImageIcon, FileText, Mic, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FileHandlerProps {
  onFileSelect: (file: File) => void
  onCancel: () => void
  selectedFile: File | null
  className?: string
}

export function FileHandler({ onFileSelect, onCancel, selectedFile, className }: FileHandlerProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0])
    }
  }

  const getFileIcon = () => {
    if (!selectedFile) return <Paperclip className="h-5 w-5" />

    const type = selectedFile.type
    if (type.startsWith("image/")) return <ImageIcon className="h-5 w-5" />
    if (type.startsWith("video/")) return <Video className="h-5 w-5" />
    if (type.startsWith("audio/")) return <Mic className="h-5 w-5" />
    return <FileText className="h-5 w-5" />
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center rounded-md border-2 border-dashed border-muted-foreground/25 p-4 transition-all",
        dragActive && "border-primary bg-muted/30",
        selectedFile && "border-primary/50",
        className,
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {selectedFile ? (
        <div className="flex w-full flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            {getFileIcon()}
            <span className="text-sm font-medium truncate max-w-[200px]">{selectedFile.name}</span>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onCancel}>
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center gap-2">
            <Paperclip className="h-8 w-8 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm font-medium">Drag & drop file or click to upload</p>
              <p className="text-xs text-muted-foreground">Support for images, videos, audio and documents</p>
            </div>
          </div>
          <input
            type="file"
            id="file-upload"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  )
}
