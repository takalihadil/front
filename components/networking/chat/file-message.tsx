"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { FileIcon, Download, Trash2, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FileMessageProps {
  id: string
  fileName: string
  fileSize: string
  fileUrl: string
  timestamp: Date
  isFromMe: boolean
  sender?: {
    id: string
    name: string
    avatar: string
  }
  onReply?: (messageId: string, senderName: string) => void
}

export function FileMessage({
  id,
  fileName,
  fileSize,
  fileUrl,
  timestamp,
  isFromMe,
  sender,
  onReply,
}: FileMessageProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const { toast } = useToast()

  // Télécharger le fichier
  const handleDownload = () => {
    // Créer un lien temporaire pour télécharger le fichier
    const link = document.createElement("a")
    link.href = fileUrl.startsWith("http") ? fileUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL}${fileUrl}`
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Gérer la suppression du message
  const handleDelete = async (forEveryone: boolean) => {
    try {
      setIsDeleting(true)
      const token = localStorage.getItem("access_token")
      if (!token) {
        throw new Error("No token found. Please login first.")
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/${id}?forEveryone=${forEveryone}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to delete message: ${response.status}`)
      }

      if (forEveryone) {
        setIsDeleted(true)
      } else {
        // Si supprimé uniquement pour moi, on peut masquer le message dans l'UI
        setIsDeleted(true)
      }

      toast({
        title: "Message deleted",
        description: forEveryone ? "Message deleted for everyone" : "Message deleted for you",
      })
    } catch (error) {
      console.error("Error deleting message:", error)
      toast({
        title: "Error",
        description: `Failed to delete message: ${(error as Error).message}`,
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  // Marquer le message comme lu
  const markAsRead = async () => {
    if (isFromMe) return

    try {
      const token = localStorage.getItem("access_token")
      if (!token) return

      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/read/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.error("Error marking message as read:", error)
    }
  }

  // Marquer le message comme lu lors de l'affichage
  useState(() => {
    markAsRead()
  })

  if (isDeleted) {
    return (
      <div className={cn("flex gap-3", isFromMe ? "flex-row-reverse" : "")}>
        {!isFromMe && sender && (
          <Avatar className="h-8 w-8 mt-1">
            <AvatarImage src={sender.avatar || "/placeholder.svg"} alt={sender.name} />
            <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        <div className={cn("max-w-[70%]", isFromMe ? "items-end" : "items-start")}>
          <div className="flex flex-col">
            <div
              className={cn("rounded-lg p-3", isFromMe ? "bg-primary/30 text-primary-foreground/70" : "bg-muted/50")}
            >
              <p className="italic text-muted-foreground">This file was deleted</p>
            </div>
            <span className={cn("text-xs text-muted-foreground mt-1", isFromMe ? "text-right" : "text-left")}>
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex gap-3", isFromMe ? "flex-row-reverse" : "")}>
      {!isFromMe && sender && (
        <Avatar className="h-8 w-8 mt-1">
          <AvatarImage src={sender.avatar || "/placeholder.svg"} alt={sender.name} />
          <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <div className={cn("max-w-[70%]", isFromMe ? "items-end" : "items-start")}>
        <div className="flex flex-col">
          <div
            className={cn(
              "rounded-lg p-3 group relative",
              isFromMe ? "bg-primary text-primary-foreground" : "bg-muted",
            )}
          >
            {!isFromMe && sender && <div className="font-medium text-sm mb-1">{sender.name}</div>}
            <div className="flex items-center gap-3">
              <div className="bg-background dark:bg-muted rounded-md p-2 flex items-center justify-center">
                <FileIcon className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{fileName}</p>
                <p className="text-xs opacity-70">{fileSize}</p>
              </div>
              <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
            </div>

            {/* Actions de message (supprimer) */}
            {isFromMe && (
              <div className="absolute right-0 top-0 -mt-2 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="h-6 w-6 rounded-full">
                      <MoreVertical className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDelete(false)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete for me
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(true)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete for everyone
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* Bouton de réponse */}
            {onReply && (
              <div className="absolute left-0 top-0 -mt-2 -ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={() => onReply(id, sender?.name || "User")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 17 4 12 9 7"></polyline>
                    <path d="M20 18v-2a4 4 0 0 0-4-4H4"></path>
                  </svg>
                </Button>
              </div>
            )}
          </div>
          <span className={cn("text-xs text-muted-foreground mt-1", isFromMe ? "text-right" : "text-left")}>
            {formatDistanceToNow(timestamp, { addSuffix: true })}
          </span>
        </div>
      </div>
    </div>
  )
}
