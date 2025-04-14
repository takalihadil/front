"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ChatContainer } from "@/components/networking/chat/chat-container"
import { ChatList } from "@/components/networking/chat/chat-list"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus, Search } from "lucide-react"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { useMobile } from "@/hooks/use-mobile"
import { Input } from "@/components/ui/input"

export default function ChatPage() {
  const router = useRouter()
  const { chatId } = useParams() as { chatId: string }
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const isMobile = useMobile()
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const verifyChatExists = async () => {
      try {
        // Vérifier si le chat est déjà en cache
        const cachedChatString = localStorage.getItem("selectedChat")
        const cachedChatsString = localStorage.getItem("cachedChats")

        // Si nous avons un chat spécifique en cache
        if (cachedChatString) {
          const cachedChat = JSON.parse(cachedChatString)

          // Vérifier si c'est le bon chat
          if (cachedChat.id === chatId) {
            console.log("Using cached chat data for verification")
            setIsLoading(false)
            return
          }
        }
        // Si nous avons une liste de chats en cache
        else if (cachedChatsString) {
          const cachedChats = JSON.parse(cachedChatsString)
          const cachedChat = cachedChats.find((chat: any) => chat.id === chatId)

          if (cachedChat) {
            console.log("Using cached chat from list for verification")
            setIsLoading(false)
            return
          }
        }

        // Si aucune donnée en cache n'est disponible ou valide, faire la requête API
        const token = localStorage.getItem("access_token")
        if (!token) {
          setError("No token found. Please login first.")
          setIsLoading(false)
          return
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chats/${chatId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          if (response.status === 404) {
            setError("Chat not found.")
          } else if (response.status === 401) {
            setError("You are not authorized to view this chat.")
          } else {
            setError(`Error: ${response.status}`)
          }
        }
      } catch (err) {
        console.error("Error verifying chat:", err)
        setError("Failed to load chat.")
      } finally {
        setIsLoading(false)
      }
    }

    verifyChatExists()
  }, [chatId])

  // Modifions la fonction toggleSidebar pour qu'elle gère correctement la navigation
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  // Ajoutons une fonction pour gérer la sélection d'un chat depuis la sidebar
  const handleChatSelect = (chatId: string) => {
    // Naviguer vers le nouveau chat
    router.push(`/habits/networking/messages/${chatId}`)

    // Fermer la sidebar sur mobile
    if (isMobile) {
      setShowSidebar(false)
    }
  }

  return (
    <motion.div
      className="h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-background to-background/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex h-full relative">
        {/* Sidebar pour la liste des chats (visible sur desktop, togglable sur mobile) */}
        <motion.div
          className={`${
            showSidebar || !isMobile ? "flex" : "hidden"
          } flex-col w-full md:w-1/3 lg:w-1/4 border-r bg-background/80 backdrop-blur-sm absolute md:relative z-10 h-full`}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between p-3 border-b">
            <h2 className="font-semibold text-lg">Messages</h2>
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Ajout de la barre de recherche et du bouton de création */}
          <div className="p-3 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9 rounded-full bg-muted/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              onClick={() => router.push("/habits/networking/messages/new")}
              size="icon"
              className="rounded-full bg-primary hover:bg-primary/90"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-hidden">
            <ChatList activeChatId={chatId} onChatSelect={handleChatSelect} searchQuery={searchQuery} />
          </div>
        </motion.div>

        {/* Conteneur de chat */}
        <motion.div
          className="flex-1 flex flex-col h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {isLoading ? (
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-4 p-4 border-b">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Skeleton className="h-6 w-32" />
              </div>
              <div className="flex-1 p-4 space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`flex gap-3 ${i % 2 === 0 ? "" : "justify-end"}`}>
                    {i % 2 === 0 && <Skeleton className="h-8 w-8 rounded-full" />}
                    <Skeleton className={`h-16 ${i % 2 === 0 ? "w-2/3" : "w-1/2"} rounded-lg`} />
                  </div>
                ))}
              </div>
              <Skeleton className="h-16 mx-4 mb-4 rounded-lg" />
            </div>
          ) : (
            <ChatContainer chatId={chatId} onBack={toggleSidebar} error={error} showBackButton={true} />
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
