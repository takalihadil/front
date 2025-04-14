"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Send,
  Paperclip,
  AlertCircle,
  Mic,
  MicOff,
  Smile,
  MoreVertical,
  UserPlus,
  Users,
  Info,
  Crown,
  Search,
  Loader2,
  Phone,
  Video,
  PhoneOff,
  VideoOff,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ImageIcon,
  FileIcon,
  Link,
  GiftIcon as Gif,
  Sticker,
  Camera,
  MessageSquare,
  ChevronLeft,
  Menu,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EmojiPickerInline } from "@/components/networking/widgets/emoji-picker-inline"
import { ImageMessage } from "./image-message"
import { FileMessage } from "./file-message"
import { VoiceMessage } from "./voice-message"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

interface User {
  id: string
  id_users?: string
  fullname: string
  profile_photo?: string | null
}

interface Message {
  id: string
  content: string
  createdAt: string
  type?: "text" | "image" | "file" | "voice"
  fileUrl?: string
  fileName?: string
  fileSize?: string
  duration?: string
  user: User
}

interface ChatParticipant {
  userId: string
  chatId: string
  joinedAt: string
  user: User
}

interface Chat {
  id: string
  name: string | null
  isGroup: boolean
  adminId: string | null
  createdAt: string
  updatedAt: string
  users: ChatParticipant[]
  messages: Message[]
}

interface ChatContainerProps {
  chatId?: string
  onBack?: () => void
  error?: string | null
  showBackButton?: boolean
}

export function ChatContainer({ chatId, onBack, error: propError, showBackButton = false }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(propError || null)
  const [notFound, setNotFound] = useState(false)
  const [chatName, setChatName] = useState("Chat")
  const [isGroup, setIsGroup] = useState(false)
  const [adminId, setAdminId] = useState<string | null>(null)
  const [participants, setParticipants] = useState<ChatParticipant[]>([])
  const [showParticipants, setShowParticipants] = useState(false)
  const [showAddParticipants, setShowAddParticipants] = useState(false)
  const [availableUsers, setAvailableUsers] = useState<User[]>([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isAddingParticipants, setIsAddingParticipants] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null)
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [chatData, setChatData] = useState<Chat | null>(null)
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false)
  const isMobile = useMobile()

  // États pour les appels
  const [isInCall, setIsInCall] = useState(false)
  const [isVideoCall, setIsVideoCall] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [callDurationInterval, setCallDurationInterval] = useState<NodeJS.Timeout | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [callPartner, setCallPartner] = useState<User | null>(null)
  const [isIncomingCall, setIsIncomingCall] = useState(false)
  const [incomingCallType, setIncomingCallType] = useState<"audio" | "video">("audio")
  const [incomingCaller, setIncomingCaller] = useState<User | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        setNotFound(false)

        // Vérifier si le chat est déjà en cache
        const cachedChatString = localStorage.getItem("selectedChat")
        const cachedChatsString = localStorage.getItem("cachedChats")

        // Si nous avons un chat spécifique en cache
        if (cachedChatString) {
          const cachedChat = JSON.parse(cachedChatString)

          // Vérifier si c'est le bon chat
          if (cachedChat.id === chatId) {
            console.log("Using cached chat data")

            // Utiliser les données en cache
            updateChatData(cachedChat)
            setLoading(false)
            return
          }
        }
        // Si nous avons une liste de chats en cache
        else if (cachedChatsString) {
          const cachedChats = JSON.parse(cachedChatsString)
          const cachedChat = cachedChats.find((chat: any) => chat.id === chatId)

          if (cachedChat) {
            console.log("Using cached chat from list")

            // Utiliser les données en cache
            updateChatData(cachedChat)
            setLoading(false)
            return
          }
        }

        // Si aucune donnée en cache n'est disponible ou valide, faire la requête API
        const token = localStorage.getItem("access_token")
        if (!token) {
          throw new Error("No token found. Please login first.")
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chats/${chatId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        console.log(`Chat API response status: ${response.status}`)

        if (response.status === 404) {
          setNotFound(true)
          setLoading(false)
          return
        }

        if (!response.ok) {
          throw new Error(`Failed to load chat: ${response.status}`)
        }

        const data = await response.json()

        // Mettre à jour le cache avec les nouvelles données
        localStorage.setItem("selectedChat", JSON.stringify(data))

        // Mettre à jour l'interface utilisateur
        updateChatData(data)
      } catch (error) {
        console.error("Error fetching chat:", error)
        setError(`Failed to load chat: ${(error as Error).message}`)
        toast({
          title: "Error",
          description: `Failed to load chat: ${(error as Error).message}`,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()

    // Simuler un appel entrant après 5 secondes (pour la démo)
    const incomingCallTimer = setTimeout(() => {
      if (Math.random() > 0.7 && !isInCall) {
        // 30% de chance d'avoir un appel entrant
        simulateIncomingCall()
      }
    }, 5000)

    return () => clearTimeout(incomingCallTimer)
  }, [chatId, toast])

  // Fonction pour mettre à jour les données du chat
  const updateChatData = (data: Chat) => {
    setChatData(data)

    if (data.isGroup) {
      setChatName(data.name || "Group Chat")
      setIsGroup(true)
      setAdminId(data.adminId)
    } else {
      const currentUserId = localStorage.getItem("user_id") || ""
      const otherUser = data.users?.find((u) => u.userId !== currentUserId)
      setChatName(otherUser?.user.fullname || "Chat")
      setIsGroup(false)

      // Définir le partenaire d'appel pour les chats individuels
      if (otherUser) {
        setCallPartner(otherUser.user)
      }
    }

    // Définir les participants
    setParticipants(data.users || [])

    // Définir les messages
    const formattedMessages = Array.isArray(data.messages)
      ? data.messages.map((msg) => ({
          ...msg,
          type: determineMessageType(msg),
        }))
      : []

    setMessages(formattedMessages)
  }

  // Simuler un appel entrant
  const simulateIncomingCall = () => {
    if (!callPartner) return

    setIncomingCaller(callPartner)
    setIncomingCallType(Math.random() > 0.5 ? "video" : "audio")
    setIsIncomingCall(true)

    // Jouer un son de sonnerie (dans une application réelle)
    // playRingtone()
  }

  // Déterminer le type de message
  const determineMessageType = (message: any): "text" | "image" | "file" | "voice" => {
    if (message.fileUrl) {
      if (message.fileUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i)) return "image"
      if (message.fileUrl.match(/\.(mp3|wav|ogg)$/i)) return "voice"
      return "file"
    }
    return "text"
  }

  // Gérer l'envoi de message
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (
      (!newMessage.trim() && !fileInputRef.current?.files?.length && !imageInputRef.current?.files?.length) ||
      !chatId ||
      isSending
    )
      return

    try {
      setIsSending(true)
      const token = localStorage.getItem("access_token")
      if (!token) {
        throw new Error("No token found. Please login first.")
      }

      const currentUserId = localStorage.getItem("user_id") || "current-user-id"
      const currentUser = participants.find((p) => p.userId === currentUserId)?.user || {
        id: currentUserId,
        fullname: "You",
        profile_photo: null,
      }

      const tempId = `temp-${Date.now()}`

      // Créer un FormData si un fichier est sélectionné
      const formData = new FormData()

      if (newMessage.trim()) {
        formData.append("content", newMessage)
      }

      // Vérifier si un fichier est sélectionné
      const hasFile = fileInputRef.current?.files?.length || imageInputRef.current?.files?.length

      if (fileInputRef.current?.files?.length) {
        formData.append("file", fileInputRef.current.files[0])
      } else if (imageInputRef.current?.files?.length) {
        formData.append("file", imageInputRef.current.files[0])
      }

      // Ajouter un message temporaire à l'interface
      const tempMessage: Message = {
        id: tempId,
        content: newMessage,
        createdAt: new Date().toISOString(),
        user: currentUser,
        type: "text",
      }

      if (fileInputRef.current?.files?.length) {
        const file = fileInputRef.current.files[0]
        if (file.type.startsWith("audio/")) {
          tempMessage.type = "voice"
          tempMessage.fileUrl = URL.createObjectURL(file)
          tempMessage.duration = "00:00" // Placeholder
        } else {
          tempMessage.type = "file"
          tempMessage.fileUrl = URL.createObjectURL(file)
          tempMessage.fileName = file.name
          tempMessage.fileSize = formatFileSize(file.size)
        }
      } else if (imageInputRef.current?.files?.length) {
        const file = imageInputRef.current.files[0]
        tempMessage.type = "image"
        tempMessage.fileUrl = URL.createObjectURL(file)
      }

      setMessages((prev) => [...prev, tempMessage])
      setNewMessage("")

      // Réinitialiser les inputs de fichier
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
      if (imageInputRef.current) {
        imageInputRef.current.value = ""
      }

      // Fermer le menu d'attachement
      setShowAttachmentOptions(false)

      // Scroll to bottom
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)

      // Envoyer le message au serveur
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chats/${chatId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.status}`)
      }

      // Récupérer le message créé
      const data = await response.json()

      // Remplacer le message temporaire par le message réel
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId
            ? {
                ...data,
                type: determineMessageType(data),
              }
            : msg,
        ),
      )
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: `Failed to send message: ${(error as Error).message}`,
        variant: "destructive",
      })

      // Supprimer le message temporaire en cas d'erreur
      setMessages((prev) => prev.filter((msg) => !msg.id.startsWith("temp-")))
    } finally {
      setIsSending(false)
    }
  }

  // Gérer l'ajout d'emoji
  const handleAddEmoji = (emoji: string) => {
    setNewMessage((prev) => prev + emoji)
    setIsEmojiPickerOpen(false)
  }

  // Gérer l'enregistrement vocal
  const handleVoiceRecording = () => {
    if (isRecording) {
      // Arrêter l'enregistrement
      if (recordingInterval) {
        clearInterval(recordingInterval)
        setRecordingInterval(null)
      }
      setIsRecording(false)

      // Simuler l'envoi d'un message vocal
      const duration = formatRecordingTime(recordingTime)

      toast({
        title: "Voice message recorded",
        description: `Duration: ${duration}`,
      })

      // Réinitialiser le temps d'enregistrement
      setRecordingTime(0)

      // TODO: Implémenter l'envoi réel du message vocal
    } else {
      // Démarrer l'enregistrement
      setIsRecording(true)
      setRecordingTime(0)

      // Simuler l'enregistrement avec un intervalle
      const interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)

      setRecordingInterval(interval)

      toast({
        title: "Recording voice message",
        description: "Click the microphone button again to stop recording",
      })
    }
  }

  // Formater le temps d'enregistrement
  const formatRecordingTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Formater la taille du fichier
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  // Charger les utilisateurs disponibles pour l'ajout
  const loadAvailableUsers = async () => {
    try {
      const token = localStorage.getItem("access_token")
      if (!token) {
        throw new Error("No token found. Please login first.")
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`)
      }

      const data = await response.json()

      // Filtrer les utilisateurs qui ne sont pas déjà dans le chat
      const participantIds = participants.map((p) => p.userId)
      const filteredUsers = data.filter((user: User) => !participantIds.includes(user.id))

      setAvailableUsers(filteredUsers)
    } catch (error) {
      console.error("Error loading users:", error)
      toast({
        title: "Error",
        description: `Failed to load users: ${(error as Error).message}`,
        variant: "destructive",
      })
    }
  }

  // Ajouter des participants au groupe
  const handleAddParticipants = async () => {
    if (selectedUsers.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one user to add",
        variant: "destructive",
      })
      return
    }

    try {
      setIsAddingParticipants(true)

      const token = localStorage.getItem("access_token")
      if (!token) {
        throw new Error("No token found. Please login first.")
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/chats/${chatId}/participants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userIds: selectedUsers }),
      })

      if (!response.ok) {
        throw new Error(`Failed to add participants: ${response.status}`)
      }

      const updatedChat = await response.json()

      // Mettre à jour les données du chat
      updateChatData(updatedChat)

      toast({
        title: "Success",
        description: `Added ${selectedUsers.length} participant(s) to the chat`,
      })

      // Fermer la boîte de dialogue et réinitialiser la sélection
      setShowAddParticipants(false)
      setSelectedUsers([])
    } catch (error) {
      console.error("Error adding participants:", error)
      toast({
        title: "Error",
        description: `Failed to add participants: ${(error as Error).message}`,
        variant: "destructive",
      })
    } finally {
      setIsAddingParticipants(false)
    }
  }

  // Fonctions pour les appels
  const startCall = (isVideo: boolean) => {
    if (isGroup) {
      toast({
        title: "Group calls not supported",
        description: "Group calls are not supported in this version.",
        variant: "destructive",
      })
      return
    }

    setIsInCall(true)
    setIsVideoCall(isVideo)
    setCallDuration(0)

    // Démarrer le chronomètre d'appel
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1)
    }, 1000)

    setCallDurationInterval(interval)

    toast({
      title: `${isVideo ? "Video" : "Voice"} call started`,
      description: `Call with ${chatName} started`,
    })

    // Simuler une connexion à la caméra pour les appels vidéo
    if (isVideo && videoRef.current) {
      // Dans une application réelle, vous utiliseriez navigator.mediaDevices.getUserMedia
      // Pour cette démo, nous utilisons une vidéo statique
      videoRef.current.src = "/placeholder.svg?height=480&width=640"
      videoRef.current.loop = true
      videoRef.current.play().catch((e) => console.error("Error playing video:", e))
    }
  }

  const endCall = () => {
    setIsInCall(false)
    setIsVideoCall(false)

    // Arrêter le chronomètre d'appel
    if (callDurationInterval) {
      clearInterval(callDurationInterval)
      setCallDurationInterval(null)
    }

    // Réinitialiser les états d'appel
    setIsMuted(false)
    setIsVideoEnabled(true)
    setIsFullscreen(false)

    toast({
      title: "Call ended",
      description: `Call duration: ${formatCallDuration(callDuration)}`,
    })

    // Arrêter la vidéo
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.src = ""
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    toast({
      title: isMuted ? "Microphone enabled" : "Microphone muted",
      description: isMuted ? "Others can now hear you" : "Others cannot hear you",
    })
  }

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled)
    toast({
      title: isVideoEnabled ? "Camera disabled" : "Camera enabled",
      description: isVideoEnabled ? "Others cannot see you" : "Others can now see you",
    })
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)

    // Dans une application réelle, vous utiliseriez l'API Fullscreen
    // Pour cette démo, nous simulons simplement l'état
  }

  const formatCallDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Gérer les appels entrants
  const acceptCall = () => {
    setIsIncomingCall(false)
    startCall(incomingCallType === "video")
  }

  const rejectCall = () => {
    setIsIncomingCall(false)
    toast({
      title: "Call rejected",
      description: `You rejected a call from ${incomingCaller?.fullname || "Unknown"}`,
    })
  }

  // Filtrer les utilisateurs disponibles
  const filteredAvailableUsers = availableUsers.filter((user) =>
    user.fullname.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Vérifier si l'utilisateur actuel est l'administrateur
  const currentUserId = localStorage.getItem("user_id") || ""
  const isAdmin = adminId === currentUserId

  if (!chatId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h3 className="text-lg font-medium">Select a conversation</h3>
          <p className="text-muted-foreground">Choose a conversation to start messaging</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16 mt-1" />
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`flex gap-3 ${i % 2 === 0 ? "" : "justify-end"}`}>
              {i % 2 === 0 && <Skeleton className="h-8 w-8 rounded-full" />}
              <Skeleton className={`h-16 ${i % 2 === 0 ? "w-2/3" : "w-1/2"} rounded-lg`} />
            </div>
          ))}
        </div>
        <div className="p-3 border-t">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <button className="mb-4">
          
          <b>Start a conversation ..</b>
          
        </button>
        
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Chat</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    )
  }

  // Si un appel est en cours, afficher l'interface d'appel
  if (isInCall) {
    return (
      <div className={`flex flex-col h-full ${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}`}>
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={callPartner?.profile_photo || "/placeholder.svg"} alt={chatName} />
              <AvatarFallback>{chatName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{chatName}</h3>
              <p className="text-xs text-muted-foreground">
                {isVideoCall ? "Video call" : "Voice call"} • {formatCallDuration(callDuration)}
              </p>
            </div>
          </div>
          <Button variant="destructive" size="icon" onClick={endCall} className="rounded-full">
            <PhoneOff className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 flex items-center justify-center bg-muted/30 relative">
          {isVideoCall ? (
            <>
              {isVideoEnabled ? (
                <video
                  ref={videoRef}
                  className="max-h-full max-w-full rounded-lg shadow-lg"
                  muted={isMuted}
                  autoPlay
                  playsInline
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={callPartner?.profile_photo || "/placeholder.svg"} alt={chatName} />
                    <AvatarFallback className="text-4xl">{chatName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-xl font-medium">{chatName}</p>
                  <p className="text-muted-foreground">Camera is turned off</p>
                </div>
              )}

              {/* Petite fenêtre pour l'utilisateur actuel (picture-in-picture) */}
              <div className="absolute bottom-4 right-4 w-32 h-24 bg-background rounded-lg shadow-lg overflow-hidden border-2 border-primary">
                <div className="flex items-center justify-center h-full">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg" alt="You" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={callPartner?.profile_photo || "/placeholder.svg"} alt={chatName} />
                <AvatarFallback className="text-4xl">{chatName.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="text-xl font-medium">{chatName}</p>
              <p className="text-muted-foreground">{formatCallDuration(callDuration)}</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t flex items-center justify-center gap-4">
          <Button
            variant={isMuted ? "destructive" : "outline"}
            size="icon"
            className="rounded-full h-12 w-12"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>

          {isVideoCall && (
            <Button
              variant={isVideoEnabled ? "outline" : "destructive"}
              size="icon"
              className="rounded-full h-12 w-12"
              onClick={toggleVideo}
            >
              {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </Button>
          )}

          <Button variant="destructive" size="icon" className="rounded-full h-14 w-14" onClick={endCall}>
            <PhoneOff className="h-6 w-6" />
          </Button>

          <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* En-tête du chat */}
      <div className="flex items-center justify-between p-3 border-b bg-background/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {(onBack || showBackButton) && (
            <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full bg-muted/50 hover:bg-muted">
              {isMobile ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
          )}
          <Avatar className="h-10 w-10 border-2 border-background">
            <AvatarImage src="/placeholder.svg" alt={chatName} />
            <AvatarFallback>{chatName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{chatName}</h3>
            <p className="text-xs text-muted-foreground">{isGroup ? `${participants.length} members` : "Online"}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Boutons d'appel (uniquement pour les chats individuels) */}
          {!isGroup && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => startCall(false)}
                title="Voice call"
                className="rounded-full"
              >
                <Phone className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => startCall(true)}
                title="Video call"
                className="rounded-full"
              >
                <Video className="h-5 w-5" />
              </Button>
            </>
          )}

          {isGroup && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowParticipants(true)
                }}
                title="View participants"
                className="rounded-full"
              >
                <Users className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  loadAvailableUsers()
                  setShowAddParticipants(true)
                }}
                title="Add participants"
                className="rounded-full"
              >
                <UserPlus className="h-5 w-5" />
              </Button>
            </>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowParticipants(true)}>
                <Info className="h-4 w-4 mr-2" />
                Chat Info
              </DropdownMenuItem>
              {isGroup && isAdmin && (
                <DropdownMenuItem
                  onClick={() => {
                    loadAvailableUsers()
                    setShowAddParticipants(true)
                  }}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Participants
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Zone des messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message, index) => {
              const isSender = message.user.id === currentUserId
              const showAvatar = !isSender && (index === 0 || messages[index - 1].user.id !== message.user.id)

              // Animation variants for messages
              const messageVariants = {
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 500, damping: 30 },
                },
              }

              if (message.type === "image") {
                return (
                  <motion.div key={message.id} initial="hidden" animate="visible" variants={messageVariants}>
                    <ImageMessage
                      imageUrl={message.fileUrl || ""}
                      timestamp={new Date(message.createdAt)}
                      isFromMe={isSender}
                      sender={
                        showAvatar
                          ? {
                              name: message.user.fullname,
                              avatar: message.user.profile_photo || "/placeholder.svg",
                            }
                          : undefined
                      }
                    />
                  </motion.div>
                )
              } else if (message.type === "file") {
                return (
                  <motion.div key={message.id} initial="hidden" animate="visible" variants={messageVariants}>
                    <FileMessage
                      fileName={message.fileName || "File"}
                      fileSize={message.fileSize || "Unknown size"}
                      timestamp={new Date(message.createdAt)}
                      isFromMe={isSender}
                      sender={
                        showAvatar
                          ? {
                              name: message.user.fullname,
                              avatar: message.user.profile_photo || "/placeholder.svg",
                            }
                          : undefined
                      }
                    />
                  </motion.div>
                )
              } else if (message.type === "voice") {
                return (
                  <motion.div key={message.id} initial="hidden" animate="visible" variants={messageVariants}>
                    <VoiceMessage
                      audioUrl={message.fileUrl || ""}
                      duration={message.duration || "00:00"}
                      timestamp={new Date(message.createdAt)}
                      isFromMe={isSender}
                      sender={
                        showAvatar
                          ? {
                              name: message.user.fullname,
                              avatar: message.user.profile_photo || "/placeholder.svg",
                            }
                          : undefined
                      }
                    />
                  </motion.div>
                )
              } else {
                return (
                  <motion.div
                    key={message.id}
                    initial="hidden"
                    animate="visible"
                    variants={messageVariants}
                    className={`flex gap-3 ${isSender ? "justify-end" : ""}`}
                  >
                    {showAvatar && !isSender && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.user.profile_photo || "/placeholder.svg"} />
                        <AvatarFallback>{message.user.fullname.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    {!showAvatar && !isSender && <div className="w-8" />}
                    <div
                      className={`max-w-[70%] ${
                        isSender
                          ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm"
                          : "bg-muted rounded-2xl rounded-bl-sm"
                      } p-3`}
                    >
                      {showAvatar && !isSender && (
                        <div className="font-medium text-sm mb-1">{message.user.fullname}</div>
                      )}
                      <p className="break-words">{message.content}</p>
                      <div
                        className={`text-xs ${isSender ? "text-primary-foreground/80" : "text-muted-foreground"} mt-1`}
                      >
                        {new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                  </motion.div>
                )
              }
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Zone de saisie de message */}
      <div className="p-3 border-t bg-background/95 backdrop-blur-sm">
        <form onSubmit={handleSendMessage} className="flex items-end gap-2">
          <div className="flex gap-2">
            <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
              <PopoverTrigger asChild>
                <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Smile className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <EmojiPickerInline onEmojiSelect={(emoji) => setNewMessage((prev) => prev + emoji)} />
              </PopoverContent>
            </Popover>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}
            />

            <input
              type="file"
              ref={imageInputRef}
              className="hidden"
              accept="image/*"
              onChange={() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })}
            />

            <Popover open={showAttachmentOptions} onOpenChange={setShowAttachmentOptions}>
              <PopoverTrigger asChild>
                <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <Paperclip className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="start">
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-16 p-2"
                    onClick={() => {
                      imageInputRef.current?.click()
                      setShowAttachmentOptions(false)
                    }}
                  >
                    <ImageIcon className="h-6 w-6 mb-1" />
                    <span className="text-xs">Image</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-16 p-2"
                    onClick={() => {
                      fileInputRef.current?.click()
                      setShowAttachmentOptions(false)
                    }}
                  >
                    <FileIcon className="h-6 w-6 mb-1" />
                    <span className="text-xs">File</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-16 p-2"
                    onClick={() => {
                      toast({
                        title: "Feature not available",
                        description: "This feature is not implemented yet",
                      })
                      setShowAttachmentOptions(false)
                    }}
                  >
                    <Camera className="h-6 w-6 mb-1" />
                    <span className="text-xs">Camera</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-16 p-2"
                    onClick={() => {
                      toast({
                        title: "Feature not available",
                        description: "This feature is not implemented yet",
                      })
                      setShowAttachmentOptions(false)
                    }}
                  >
                    <Link className="h-6 w-6 mb-1" />
                    <span className="text-xs">Link</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-16 p-2"
                    onClick={() => {
                      toast({
                        title: "Feature not available",
                        description: "This feature is not implemented yet",
                      })
                      setShowAttachmentOptions(false)
                    }}
                  >
                    <Gif className="h-6 w-6 mb-1" />
                    <span className="text-xs">GIF</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-16 p-2"
                    onClick={() => {
                      toast({
                        title: "Feature not available",
                        description: "This feature is not implemented yet",
                      })
                      setShowAttachmentOptions(false)
                    }}
                  >
                    <Sticker className="h-6 w-6 mb-1" />
                    <span className="text-xs">Sticker</span>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className={`h-9 w-9 rounded-full ${isRecording ? "text-red-500" : ""}`}
              onClick={handleVoiceRecording}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          </div>

          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={isRecording ? `Recording... ${formatRecordingTime(recordingTime)}` : "Type a message..."}
              className="min-h-[40px] pr-10 rounded-full bg-muted/50"
              disabled={isRecording}
            />
            {fileInputRef.current?.files?.length || imageInputRef.current?.files?.length ? (
              <Badge className="absolute right-2 top-2 bg-primary text-primary-foreground">File attached</Badge>
            ) : null}
          </div>

          <Button
            type="submit"
            size="icon"
            className="h-9 w-9 rounded-full bg-primary hover:bg-primary/90"
            disabled={
              isRecording ||
              (!newMessage.trim() && !fileInputRef.current?.files?.length && !imageInputRef.current?.files?.length) ||
              isSending
            }
          >
            {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </form>
      </div>

      {/* Dialog pour afficher les participants */}
      <Dialog open={showParticipants} onOpenChange={setShowParticipants}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chat Participants</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-2 p-2">
              {participants.map((participant) => (
                <div
                  key={participant.userId}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={participant.user.profile_photo || "/placeholder.svg"}
                        alt={participant.user.fullname}
                      />
                      <AvatarFallback>{participant.user.fullname.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{participant.user.fullname}</span>
                        {participant.userId === adminId && (
                          <Badge variant="outline" className="flex items-center gap-1 text-amber-500 border-amber-500">
                            <Crown className="h-3 w-3" />
                            <span>Admin</span>
                          </Badge>
                        )}
                        {participant.userId === currentUserId && (
                          <Badge variant="secondary" className="ml-1">
                            You
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Joined {new Date(participant.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Dialog pour ajouter des participants */}
      <Dialog open={showAddParticipants} onOpenChange={setShowAddParticipants}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Participants</DialogTitle>
            <DialogDescription>Select users to add to this group chat.</DialogDescription>
          </DialogHeader>

          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <ScrollArea className="max-h-[40vh]">
            <div className="space-y-2">
              {filteredAvailableUsers.length === 0 ? (
                <p className="text-center text-muted-foreground p-4">
                  {searchQuery ? "No users found matching your search" : "No users available to add"}
                </p>
              ) : (
                filteredAvailableUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.profile_photo || "/placeholder.svg"} alt={user.fullname} />
                        <AvatarFallback>{user.fullname.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{user.fullname}</div>
                    </div>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedUsers([...selectedUsers, user.id])
                        } else {
                          setSelectedUsers(selectedUsers.filter((id) => id !== user.id))
                        }
                      }}
                    />
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddParticipants(false)
                setSelectedUsers([])
                setSearchQuery("")
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddParticipants} disabled={selectedUsers.length === 0 || isAddingParticipants}>
              {isAddingParticipants ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                `Add ${selectedUsers.length} Participant${selectedUsers.length !== 1 ? "s" : ""}`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog pour les appels entrants */}
      <Dialog open={isIncomingCall} onOpenChange={(open) => !open && rejectCall()}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-6">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage
                src={incomingCaller?.profile_photo || "/placeholder.svg"}
                alt={incomingCaller?.fullname || "Caller"}
              />
              <AvatarFallback>{incomingCaller?.fullname?.charAt(0) || "?"}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold mb-1">{incomingCaller?.fullname || "Unknown"}</h2>
            <p className="text-muted-foreground mb-6">
              Incoming {incomingCallType === "video" ? "video" : "voice"} call...
            </p>

            <div className="flex gap-4">
              <Button variant="destructive" size="icon" className="h-14 w-14 rounded-full" onClick={rejectCall}>
                <PhoneOff className="h-6 w-6" />
              </Button>
              <Button
                variant="default"
                size="icon"
                className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600"
                onClick={acceptCall}
              >
                {incomingCallType === "video" ? <Video className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
