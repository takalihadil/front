"use client"

import { RefObject } from "react"
import { Phone, Video, PhoneOff, VideoOff, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface User {
  id: string
  fullname: string
  profile_photo?: string | null
}

interface CallInterfaceProps {
  partner: User | null
  chatName: string
  isVideoCall: boolean
  callDuration: number
  isMuted: boolean
  isVideoEnabled: boolean
  isFullscreen: boolean
  videoRef: RefObject<HTMLVideoElement>
  onEndCall: () => void
  onToggleMute: () => void
  onToggleVideo: () => void
  onToggleFullscreen: () => void
}

export function CallInterface({
  partner,
  chatName,
  isVideoCall,
  callDuration,
  isMuted,
  isVideoEnabled,
  isFullscreen,
  videoRef,
  onEndCall,
  onToggleMute,
  onToggleVideo,
  onToggleFullscreen
}: CallInterfaceProps) {
  const formatCallDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className={`flex flex-col h-full ${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={partner?.profile_photo || "/placeholder.svg"} alt={chatName} />
            <AvatarFallback>{chatName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{chatName}</h3>
            <p className="text-xs text-muted-foreground">
              {isVideoCall ? "Video call" : "Voice call"} • {formatCallDuration(callDuration)}
            </p>
          </div>
        </div>
        <Button variant="destructive" size="icon" onClick={onEndCall} className="rounded-full">
          <PhoneOff className="h-5 w-5" />
        </Button>
      </div>

      {/* Video Area */}
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
                  <AvatarImage src={partner?.profile_photo || "/placeholder.svg"} alt={chatName} />
                  <AvatarFallback className="text-4xl">{chatName.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="text-xl font-medium">{chatName}</p>
                <p className="text-muted-foreground">Camera is turned off</p>
              </div>
            )}

            {/* Picture-in-picture for local video */}
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
              <AvatarImage src={partner?.profile_photo || "/placeholder.svg"} alt={chatName} />
              <AvatarFallback className="text-4xl">{chatName.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-xl font-medium">{chatName}</p>
            <p className="text-muted-foreground">{formatCallDuration(callDuration)}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 border-t flex items-center justify-center gap-4">
        <Button
          variant={isMuted ? "destructive" : "outline"}
          size="icon"
          className="rounded-full h-12 w-12"
          onClick={onToggleMute}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>

        {isVideoCall && (
          <Button
            variant={isVideoEnabled ? "outline" : "destructive"}
            size="icon"
            className="rounded-full h-12 w-12"
            onClick={onToggleVideo}
          >
            {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>
        )}

        <Button variant="destructive" size="icon" className="rounded-full h-14 w-14" onClick={onEndCall}>
          <PhoneOff className="h-6 w-6" />
        </Button>

        <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={onToggleFullscreen}>
          {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  )
}