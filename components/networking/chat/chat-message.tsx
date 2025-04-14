"use client"

import { useState, useRef } from "react"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Check, CheckCheck, Clock, Edit, MoreVertical, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export enum MessageStatus {
  SENDING = "SENDING",
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  SEEN = "SEEN",
  FAILED = "FAILED",
  EDITED = "EDITED",
}

interface ChatMessageProps {
  id: string
  message: string
  timestamp: Date
  isFromMe: boolean
  status?: MessageStatus
  sender?: {
    id: string
    name: string
    avatar: string
  }
  onReply?: (messageId: string, senderName: string) => void
}

export function ChatMessage({
  id,
  message,
  timestamp,
  isFromMe,
  status = MessageStatus.SENT,
  sender,
  onReply,
}: ChatMessageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(message)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const editInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Gérer la modification du message
  const handleEdit = async () => {
    if (!editContent.trim() || editContent === message) {
      setIsEditing(false)
      setEditContent(message)
      return
    }

    try {
      const token = localStorage.getItem("access_token")
      if (!token) {
        throw new Error("No token found. Please login first.")
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/messages/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editContent }),
      })

      if (!response.ok) {
        throw new Error(`Failed to edit message: ${response.status}`)
      }

      toast({
        title: "Message updated",
        description: "Your message has been updated successfully",
      })

      setIsEditing(false)
    } catch (error) {
      console.error("Error editing message:", error)
      toast({
        title: "Error",
        description: `Failed to edit message: ${(error as Error).message}`,
        variant: "destructive",
      })
      setEditContent(message)
    }
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
    if (isFromMe || status === MessageStatus.SEEN) return

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

  // Rendu du statut du message
  const renderMessageStatus = () => {
    if (!isFromMe) return null

    switch (status) {
      case MessageStatus.SENDING:
        return <Clock className="h-3 w-3 text-muted-foreground" />
      case MessageStatus.SENT:
        return <Check className="h-3 w-3 text-muted-foreground" />
      case MessageStatus.DELIVERED:
        return <CheckCheck className="h-3 w-3 text-muted-foreground" />
      case MessageStatus.SEEN:
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      case MessageStatus.FAILED:
        return <X className="h-3 w-3 text-red-500" />
      default:
        return null
    }
  }

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
              <p className="italic text-muted-foreground">This message was deleted</p>
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
          {isEditing ? (
            <div className="flex flex-col gap-2 bg-muted p-2 rounded-lg">
              <Input
                ref={editInputRef}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="min-h-[40px]"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsEditing(false)
                    setEditContent(message)
                  }}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleEdit}
                  disabled={isDeleting || !editContent.trim() || editContent === message}
                >
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <div
              className={cn(
                "rounded-lg p-3 group relative",
                isFromMe ? "bg-primary text-primary-foreground" : "bg-muted",
              )}
            >
              {!isFromMe && sender && <div className="font-medium text-sm mb-1">{sender.name}</div>}
              <p className="whitespace-pre-wrap break-words">{message}</p>

              {/* Actions de message (éditer, supprimer) */}
              {isFromMe && (
                <div className="absolute right-0 top-0 -mt-2 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-6 w-6 rounded-full">
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setIsEditing(true)
                          setTimeout(() => editInputRef.current?.focus(), 100)
                        }}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
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

              <div className="flex items-center gap-1 text-xs mt-1 text-muted-foreground">
                {new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                {status === MessageStatus.EDITED && <span className="ml-1">(edited)</span>}
                {renderMessageStatus()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
