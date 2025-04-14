"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChatList } from "@/components/networking/chat/chat-list"
import { ChatContainer } from "@/components/networking/chat/chat-container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, MessageSquare, Users, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function MessagesPage() {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileList, setShowMobileList] = useState(true)
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    // Récupérer les informations de l'utilisateur actuel
    const userId = localStorage.getItem("user_id")
    const userName = localStorage.getItem("user_name") || "User"
    const userAvatar = localStorage.getItem("user_avatar") || "/placeholder.svg"

    setCurrentUser({
      id: userId,
      name: userName,
      avatar: userAvatar,
    })

    // Vérifier si un chat est sélectionné dans l'URL
    const path = window.location.pathname
    const chatIdMatch = path.match(/\/habits\/networking\/messages\/(.+)/)
    if (chatIdMatch && chatIdMatch[1]) {
      setSelectedChatId(chatIdMatch[1])
      setShowMobileList(false)
    }
  }, [])

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId)
    setShowMobileList(false)

    // Naviguer vers la page du chat individuel
    router.push(`/habits/networking/messages/${chatId}`)
  }

  const handleCreateChat = () => {
    router.push("/habits/networking/messages/new")
  }

  const toggleMobileView = () => {
    setShowMobileList(!showMobileList)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-background to-background/80">
      {/* En-tête de la page de messages */}
      <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileView}>
            {showMobileList ? <MessageSquare className="h-5 w-5" /> : <Users className="h-5 w-5" />}
          </Button>
          <h1 className="text-2xl font-bold">Messages</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {currentUser && (
            <Avatar className="h-8 w-8 border-2 border-primary">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex flex-1 overflow-hidden">
        {/* Liste des chats (masquée sur mobile si un chat est sélectionné) */}
        <motion.div
          className={`${showMobileList ? "flex" : "hidden"} md:flex flex-col w-full md:w-1/3 lg:w-1/4 border-r bg-background/80 backdrop-blur-sm`}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
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
            <Button onClick={handleCreateChat} size="icon" className="rounded-full bg-primary hover:bg-primary/90">
              <Plus className="h-5 w-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <ChatList
              activeChatId={selectedChatId || undefined}
              onChatSelect={handleChatSelect}
              searchQuery={searchQuery}
            />
          </ScrollArea>
        </motion.div>

        {/* Conteneur de chat */}
        <motion.div
          className={`${!showMobileList ? "flex" : "hidden"} md:flex flex-col flex-1 bg-background`}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {selectedChatId ? (
            <ChatContainer chatId={selectedChatId} onBack={() => setShowMobileList(true)} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Select a conversation or start a new one to begin messaging
              </p>
              <Button onClick={handleCreateChat} className="rounded-full">
                <Plus className="h-4 w-4 mr-2" />
                New Conversation
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
