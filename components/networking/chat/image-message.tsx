"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Trash2, MoreVertical, Download, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ImageMessageProps {
  id: string
  imageUrl: string
  timestamp: Date
  isFromMe: boolean
  sender?: {
    id: string
    name: string
    avatar: string
  }
  onReply?: (messageId: string, senderName: string) => void
}

export function ImageMessage({ id, imageUrl, timestamp, isFromMe, sender, onReply }: ImageMessageProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)
  const { toast } = useToast()

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = imageUrl.startsWith("http") ? imageUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`
    link.download = `image-${new Date().getTime()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

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
              <p className="italic text-muted-foreground">This image was deleted</p>
            </div>
            <span className={cn("text-xs text-muted-foreground mt-1", isFromMe ? "text-right" : "text-left")}>
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </span>
          </div>
        </div>
      </div>
    )
  }

  const fullImageUrl = imageUrl.startsWith("http") ? imageUrl : `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`

  return (
    <>
      <div className={cn("flex gap-3", isFromMe ? "flex-row-reverse" : "")}>
        {!isFromMe && sender && (
          <Avatar className="h-8 w-8 mt-1">
            <AvatarImage src={sender.avatar || "/placeholder.svg"} alt={sender.name} />
            <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        <div className={cn("max-w-[70%]", isFromMe ? "items-end" : "items-start")}>
          <div className="flex flex-col">
            <div className={cn(
              "rounded-lg overflow-hidden group relative", 
              isFromMe ? "bg-primary text-primary-foreground" : "bg-muted"
            )}>
              {!isFromMe && sender && (
                <div className="font-medium text-sm p-2">{sender.name}</div>
              )}
              <img
                src={fullImageUrl || "/placeholder.svg"}
                alt="Image message"
                className="max-h-[300px] w-auto object-contain cursor-pointer"
                onClick={() => setShowFullImage(true)}
              />
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button 
                  variant="secondary" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={() => setShowFullImage(true)}
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
              
              {isFromMe && (
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-6 w-6 rounded-full">
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={handleDownload}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
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
              
              {onReply && (
                <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="h-6 w-6 rounded-full"
                    onClick={() => onReply(id, sender?.name || "User")}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

      <Dialog open={showFullImage} onOpenChange={setShowFullImage}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
          <div className="relative">
            <img
              src={fullImageUrl || "/placeholder.svg"}
              alt="Full size image"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}