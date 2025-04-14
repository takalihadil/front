"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect } from "react"
import { formatDistanceToNow } from "date-fns"
import { Plus, Loader2, AlertCircle, MoreVertical, Trash2, Pin, PinOff, Archive, Bell, BellOff } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { motion } from "framer-motion"

interface ChatListProps {
  activeChatId?: string
  onChatSelect?: (chatId: string) => void
  searchQuery?: string
}

interface ChatUser {
  id: string
  id_users?: string
  fullname: string
  profile_photo?: string | null
}

interface ChatMessage {
  id: string
  content: string
  createdAt: string
  userId: string
}

interface Chat {
  id: string
  name: string | null
  isGroup: boolean
  adminId: string | null
  createdAt: string
  updatedAt: string
  users: {
    userId: string
    user: ChatUser
  }[]
  messages: ChatMessage[]
  isPinned?: boolean
  isMuted?: boolean
}

export function ChatList({ activeChatId, onChatSelect, searchQuery = "" }: ChatListProps) {
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [chatToDelete, setChatToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Fetch chats from the backend
  useEffect(() => {
    fetchChats()
  }, [])

  const fetchChats = async () => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem("access_token")
      if (!token) {
        throw new Error("No token found. Please login first.")
      }

      const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats`
      console.log(`Fetching chats from: ${apiUrl}`)

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log(`Response status: ${response.status}`)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`API Error: ${response.status} - ${errorText}`)
        throw new Error(`Failed to fetch chats: ${response.status}`)
      }

      const data = await response.json()
      console.log("Chat data:", data)

      if (Array.isArray(data)) {
        // Ajouter des propriétés supplémentaires pour la démo
        const enhancedChats = data.map((chat, index) => ({
          ...chat,
          isPinned: index === 0, // Épingler le premier chat pour la démo
          isMuted: index === 2, // Mettre en sourdine le troisième chat pour la démo
        }))

        // Trier les chats: épinglés d'abord, puis par date
        const sortedChats = enhancedChats.sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1
          if (!a.isPinned && b.isPinned) return 1

          const dateA = new Date(a.updatedAt || a.createdAt)
          const dateB = new Date(b.updatedAt || b.createdAt)
          return dateB.getTime() - dateA.getTime()
        })

        setChats(sortedChats)
        localStorage.setItem("cachedChats", JSON.stringify(sortedChats))
      } else {
        console.error("Expected array of chats but received:", data)
        setChats([])
      }
    } catch (error) {
      console.error("Error fetching chats:", error)
      setError(`Failed to load chats: ${(error as Error).message}`)
      toast({
        title: "Error",
        description: `Failed to load chats: ${(error as Error).message}`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Create a new chat
  const handleCreateChat = () => {
    router.push("/habits/networking/messages/new")
  }

  // Handle chat selection
  const handleChatClick = (chatId: string) => {
    // Trouver le chat complet dans les données
    const selectedChat = chats.find((chat) => chat.id === chatId)

    // Stocker le chat sélectionné dans le localStorage pour y accéder depuis la page de chat
    if (selectedChat) {
      localStorage.setItem("selectedChat", JSON.stringify(selectedChat))
    }

    if (onChatSelect) {
      // Si un gestionnaire de sélection est fourni, l'appeler avec l'ID du chat
      onChatSelect(chatId)
    } else {
      // Naviguer directement vers la page du chat
      router.push(`/habits/networking/messages/${chatId}`)
    }
  }

  // Helper function to get current user ID
  const getCurrentUserId = (): string => {
    return localStorage.getItem("user_id") || "current-user-id"
  }

  // Helper function to get chat name
  const getChatName = (chat: Chat): string => {
    if (chat.isGroup) {
      return chat.name || "Group Chat"
    } else {
      // For direct chats, show the other user's name
      const otherUser = chat.users?.find((u) => u.userId !== getCurrentUserId())
      return otherUser?.user?.fullname || "Unknown User"
    }
  }

  // Helper function to get chat avatar
  const getChatAvatar = (chat: Chat): string => {
    if (chat.isGroup) {
      return "/placeholder.svg?height=40&width=40" // Group avatar placeholder
    } else {
      // For direct chats, show the other user's avatar
      const otherUser = chat.users?.find((u) => u.userId !== getCurrentUserId())
      return otherUser?.user?.profile_photo || "/placeholder.svg?height=40&width=40"
    }
  }

  // Helper function to get last message
  const getLastMessage = (chat: Chat) => {
    if (chat.messages?.length > 0) {
      const lastMessage = chat.messages[0] // Assuming messages are sorted by createdAt desc
      return {
        content: lastMessage.content,
        timestamp: new Date(lastMessage.createdAt),
        isFromMe: lastMessage.userId === getCurrentUserId(),
      }
    }
    return {
      content: "No messages yet",
      timestamp: new Date(chat.createdAt),
      isFromMe: false,
    }
  }

  // Handle delete chat
  const handleDeleteChat = async () => {
    if (!chatToDelete) return

    try {
      setIsDeleting(true)
      const token = localStorage.getItem("access_token")
      if (!token) {
        throw new Error("No token found. Please login first.")
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chats/${chatToDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to delete chat")
      }

      // Remove chat from state
      setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatToDelete))

      // Update localStorage
      const cachedChats = JSON.parse(localStorage.getItem("cachedChats") || "[]")
      const updatedCachedChats = cachedChats.filter((chat: Chat) => chat.id !== chatToDelete)
      localStorage.setItem("cachedChats", JSON.stringify(updatedCachedChats))

      // Show success message
      toast({
        title: "Chat deleted",
        description: "The chat has been deleted successfully",
      })

      // If the active chat is the one being deleted, redirect to messages page
      if (activeChatId === chatToDelete) {
        router.push("/habits/networking/messages")
      }
    } catch (error) {
      console.error("Error deleting chat:", error)
      toast({
        title: "Error",
        description: `Failed to delete chat: ${(error as Error).message}`,
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setShowDeleteDialog(false)
      setChatToDelete(null)
    }
  }

  // Toggle pin chat
  const togglePinChat = (chatId: string) => {
    setChats((prevChats) =>
      prevChats
        .map((chat) => (chat.id === chatId ? { ...chat, isPinned: !chat.isPinned } : chat))
        .sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1
          if (!a.isPinned && b.isPinned) return 1

          const dateA = new Date(a.updatedAt || a.createdAt)
          const dateB = new Date(b.updatedAt || b.createdAt)
          return dateB.getTime() - dateA.getTime()
        }),
    )

    toast({
      title: "Chat updated",
      description: "Chat pin status updated successfully",
    })
  }

  // Toggle mute chat
  const toggleMuteChat = (chatId: string) => {
    setChats((prevChats) => prevChats.map((chat) => (chat.id === chatId ? { ...chat, isMuted: !chat.isMuted } : chat)))

    toast({
      title: "Chat updated",
      description: "Chat notification status updated successfully",
    })
  }

  // Filter chats based on search query
  const filteredChats = chats.filter((chat) => {
    const chatName = getChatName(chat)
    const lastMessage = getLastMessage(chat)

    return (
      chatName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lastMessage.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Animation variants for list items
  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  }

  return (
    <div className="flex flex-col h-full">
      {loading ? (
        <div className="p-3 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="p-4">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Loading Chats</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>

          <div className="flex justify-center mt-4">
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Retry
            </Button>
          </div>
        </div>
      ) : filteredChats.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full p-4">
          <p className="text-muted-foreground mb-4">
            {searchQuery ? "No conversations found" : "No conversations yet"}
          </p>
          <Button onClick={handleCreateChat} className="rounded-full">
            <Plus className="mr-2 h-4 w-4" />
            Start a new conversation
          </Button>
        </div>
      ) : (
        <div className="space-y-1 p-2">
          {filteredChats.map((chat, index) => {
            const chatName = getChatName(chat)
            const chatAvatar = getChatAvatar(chat)
            const lastMessage = getLastMessage(chat)
            const isCurrentUserAdmin = chat.isGroup && chat.adminId === getCurrentUserId()
            const isActive = chat.id === activeChatId

            return (
              <motion.div
                key={chat.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={listItemVariants}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer",
                  isActive ? "bg-primary/10 hover:bg-primary/15" : "hover:bg-muted/80",
                  chat.isPinned && "border-l-4 border-primary pl-2",
                )}
              >
                <div className="flex-1 flex items-center gap-3" onClick={() => handleChatClick(chat.id)}>
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-background">
                      <AvatarImage src={chatAvatar} alt={chatName} />
                      <AvatarFallback className="text-lg">{chatName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {!chat.isGroup && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                    )}
                    {chat.isGroup && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-blue-500 border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium truncate flex items-center gap-1">
                        {chatName}
                        {isCurrentUserAdmin && <span className="text-xs text-muted-foreground">(Admin)</span>}
                        {chat.isMuted && <BellOff className="h-3 w-3 text-muted-foreground ml-1" />}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(lastMessage.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground truncate">
                        {lastMessage.isFromMe && <span className="font-medium">You: </span>}
                        {lastMessage.content}
                      </p>

                      {/* Indicateur de messages non lus (simulé) */}
                      {index % 3 === 1 && !isActive && (
                        <Badge className="rounded-full h-5 w-5 flex items-center justify-center p-0 text-xs">
                          {Math.floor(Math.random() * 5) + 1}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Menu déroulant pour chaque chat */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0 rounded-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        togglePinChat(chat.id)
                      }}
                    >
                      {chat.isPinned ? (
                        <>
                          <PinOff className="h-4 w-4 mr-2" />
                          Unpin Chat
                        </>
                      ) : (
                        <>
                          <Pin className="h-4 w-4 mr-2" />
                          Pin Chat
                        </>
                      )}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleMuteChat(chat.id)
                      }}
                    >
                      {chat.isMuted ? (
                        <>
                          <Bell className="h-4 w-4 mr-2" />
                          Unmute Chat
                        </>
                      ) : (
                        <>
                          <BellOff className="h-4 w-4 mr-2" />
                          Mute Chat
                        </>
                      )}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        // Simuler l'archivage du chat
                        toast({
                          title: "Chat archived",
                          description: "This feature is not fully implemented yet",
                        })
                      }}
                    >
                      <Archive className="h-4 w-4 mr-2" />
                      Archive Chat
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        setChatToDelete(chat.id)
                        setShowDeleteDialog(true)
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Chat
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Boîte de dialogue de confirmation de suppression */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chat</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this chat? This action cannot be undone and all messages will be
              permanently lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteChat}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
