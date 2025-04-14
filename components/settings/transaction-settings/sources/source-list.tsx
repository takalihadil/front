"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SourceActions } from "./source-actions"
import { DeleteSourceDialog } from "./delete-source-dialog"
import { EditSourceDialog } from "./edit-source-dialog"

interface SourceListProps {
  sources: string[]
  onDelete: (source: string) => void
  onUpdate: (oldSource: string, newSource: string) => void
}

export function SourceList({ sources, onDelete, onUpdate }: SourceListProps) {
  const [selectedSource, setSelectedSource] = useState<string | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <>
      <div 
        className="relative overflow-x-auto"
        role="region" 
        aria-label="Transaction Sources"
        tabIndex={0}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Source Name</TableHead>
              <TableHead scope="col" className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sources.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={2} 
                  className="text-center text-muted-foreground"
                  role="status"
                  aria-live="polite"
                >
                  No sources found
                </TableCell>
              </TableRow>
            ) : (
              sources.map((source) => (
                <TableRow key={source}>
                  <TableCell>{source}</TableCell>
                  <TableCell>
                    <SourceActions
                      source={source}
                      onEdit={() => {
                        setSelectedSource(source)
                        setIsEditDialogOpen(true)
                      }}
                      onDelete={() => {
                        setSelectedSource(source)
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

      <EditSourceDialog
        source={selectedSource}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={(newSource) => {
          if (selectedSource) {
            onUpdate(selectedSource, newSource)
          }
        }}
      />

      <DeleteSourceDialog
        source={selectedSource}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={(source) => {
          onDelete(source)
          setIsDeleteDialogOpen(false)
        }}
      />
    </>
  )
}