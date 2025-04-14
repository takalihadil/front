"use client"

import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import { Phone, Video, PhoneOff, VideoOff } from "lucide-react"

type CallType = "audio" | "video"
type CallStatus = "started" | "ended" | "missed" | "rejected"

interface CallMessageProps {
  callType: CallType
  callStatus: CallStatus
  duration?: number
  timestamp: Date
  isFromMe: boolean
  sender?: {
    name: string
    avatar: string
  }
}

export function CallMessage({ 
  callType, 
  callStatus, 
  duration = 0, 
  timestamp, 
  isFromMe, 
  sender 
}: CallMessageProps) {
  const formatCallDuration = (seconds: number): string => {
    if (seconds === 0) return ""

    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getCallIcon = () => {
    const iconProps = { className: "h-4 w-4" }
    
    if (callType === "audio") {
      return callStatus === "ended" || callStatus === "rejected" || callStatus === "missed" ? (
        <PhoneOff {...iconProps} />
      ) : (
        <Phone {...iconProps} />
      )
    } else {
      return callStatus === "ended" || callStatus === "rejected" || callStatus === "missed" ? (
        <VideoOff {...iconProps} />
      ) : (
        <Video {...iconProps} />
      )
    }
  }

  const getCallMessage = () => {
    const callTypeText = callType === "audio" ? "Audio call" : "Video call"

    switch (callStatus) {
      case "started":
        return isFromMe 
          ? `You started a ${callType} call` 
          : `${sender?.name || "User"} started a ${callType} call`
      case "ended":
        const durationText = duration > 0 ? ` • ${formatCallDuration(duration)}` : ""
        return `${callTypeText} ended${durationText}`
      case "missed":
        return isFromMe 
          ? `${sender?.name || "User"} missed your ${callType} call` 
          : `You missed a ${callType} call`
      case "rejected":
        return isFromMe 
          ? `${sender?.name || "User"} declined your ${callType} call` 
          : `You declined a ${callType} call`
      default:
        return callTypeText
    }
  }

  return (
    <div className="flex justify-center my-4">
      <div
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-sm",
          (callStatus === "missed" || callStatus === "rejected") && "text-red-500",
        )}
      >
        <div
          className={cn(
            "p-1.5 rounded-full",
            callStatus === "missed" || callStatus === "rejected" 
              ? "bg-red-100 dark:bg-red-900/20" 
              : "bg-muted",
          )}
        >
          {getCallIcon()}
        </div>
        <span>{getCallMessage()}</span>
        <span className="text-xs text-muted-foreground">
          {formatDistanceToNow(timestamp, { addSuffix: true })}
        </span>
      </div>
    </div>
  )
}