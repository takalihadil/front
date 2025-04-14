"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Paperclip, Send, Mic, Video, Phone } from "lucide-react"
import { EmojiPickerInline } from "@/components/networking/widgets/emoji-picker-inline"
import { FileHandler } from "@/components/networking/chat/file-handler"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ChatInputProps {
  chatId: string
  onSendMessage: (message: string, type: string, attachment?: File) => void
  onStartCall: (isVideo: boolean) => void
  replyToId?: string
  onCancelReply?: () => void
  replyToMessage?: {
    id: string
    content: string
    senderName: string
  }
}

export function ChatInput({
  chatId,
  onSendMessage,
  onStartCall,
  replyToId,
  onCancelReply,
  replyToMessage,
}: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showFileHandler, setShowFileHandler] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Focus textarea when component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  // Clean up recording timer on unmount
  useEffect(() => {
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  const handleSendMessage = () => {
    if (message.trim() || selectedFile) {
      onSendMessage(message, "TEXT", selectedFile || undefined)
      setMessage("")
      setSelectedFile(null)
      setShowFileHandler(false)
      if (onCancelReply) {
        onCancelReply()
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji)
  }

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
  }

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" })
        const audioFile = new File([audioBlob], "voice-message.mp3", { type: "audio/mp3" })
        onSendMessage("Voice message", "VOICE", audioFile)
        setIsRecording(false)
        setRecordingTime(0)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)

      // Start timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Error starting recording:", error)
    }
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop()
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
    }
  }

  const formatRecordingTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="border-t p-4">
      {replyToMessage && (
        <div className="mb-2 rounded bg-muted p-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-medium">Reply to {replyToMessage.senderName}</span>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onCancelReply}>
              ×
            </Button>
          </div>
          <p className="truncate text-muted-foreground">{replyToMessage.content}</p>
        </div>
      )}

      {showFileHandler && (
        <div className="mb-4">
          <FileHandler
            onFileSelect={handleFileSelect}
            onCancel={() => {
              setSelectedFile(null)
              setShowFileHandler(false)
            }}
            selectedFile={selectedFile}
          />
        </div>
      )}

      <div className="flex items-end gap-2">
        <div className="relative flex-1">
          {isRecording ? (
            <div className="flex h-10 items-center justify-between rounded-md border bg-background px-3">
              <div className="flex items-center gap-2">
                <span className="animate-pulse h-2 w-2 rounded-full bg-red-500"></span>
                <span>Recording... {formatRecordingTime(recordingTime)}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleStopRecording}>
                Stop
              </Button>
            </div>
          ) : (
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="min-h-10 resize-none pr-10"
              rows={1}
            />
          )}
          <div className="absolute bottom-1 right-1">
            <EmojiPickerInline onEmojiSelect={handleEmojiSelect} />
          </div>
        </div>

        <div className="flex gap-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Paperclip className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" align="end" className="w-auto p-2">
              <div className="flex gap-1">
                <Button variant="outline" size="sm" onClick={() => setShowFileHandler(true)}>
                  Attach File
                </Button>
                <Button variant="outline" size="icon" onClick={() => onStartCall(false)}>
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => onStartCall(true)}>
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {!isRecording && !message.trim() && !selectedFile ? (
            <Button variant="default" size="icon" className="shrink-0" onClick={handleStartRecording}>
              <Mic className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              variant="default"
              size="icon"
              className="shrink-0"
              onClick={handleSendMessage}
              disabled={!message.trim() && !selectedFile}
            >
              <Send className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
