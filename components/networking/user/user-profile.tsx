"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin, Link2, Mail, MessageSquare, UserPlus, Users } from "lucide-react"

interface UserProfileProps {
  user: {
    id: string
    name: string
    username: string
    avatar: string
    bio?: string
    location?: string
    website?: string
    email?: string
    followers?: number
    following?: number
    isOnline?: boolean
  }
  isCurrentUser?: boolean
  isFollowing?: boolean
}

export function UserProfile({ user, isCurrentUser = false, isFollowing = false }: UserProfileProps) {
  const [following, setFollowing] = useState(isFollowing)
  const [activeTab, setActiveTab] = useState("posts")

  const handleFollow = () => {
    setFollowing(!following)
  }

  return (
    <div className="container max-w-4xl mx-auto py-6 px-4 sm:px-6">
      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {/* Online indicator */}
              {user.isOnline && (
                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-800" />
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-1">
                    {user.name}
                    {user.isOnline && <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500 ml-1" />}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">@{user.username}</CardDescription>
                </div>
                <div className="flex gap-2 mt-2 md:mt-0 justify-center md:justify-start">
                  {isCurrentUser ? (
                    <Button variant="outline">Edit Profile</Button>
                  ) : (
                    <>
                      <Button onClick={handleFollow} variant={following ? "outline" : "default"}>
                        {following ? "Following" : "Follow"}
                      </Button>
                      <Button variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {user.bio && <p>{user.bio}</p>}
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground justify-center md:justify-start">
                  {user.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {user.location}
                    </div>
                  )}
                  {user.website && (
                    <div className="flex items-center">
                      <Link2 className="h-4 w-4 mr-1" />
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {user.website.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                  {user.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      <a href={`mailto:${user.email}`} className="text-primary hover:underline">
                        {user.email}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined January 2023
                  </div>
                </div>

                <div className="flex gap-4 justify-center md:justify-start mt-2">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span className="font-semibold">{user.followers || 0}</span>
                    <span className="text-muted-foreground">Followers</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <UserPlus className="h-4 w-4" />
                    <span className="font-semibold">{user.following || 0}</span>
                    <span className="text-muted-foreground">Following</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="likes">Likes</TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="mt-4">
              <div className="text-center py-8 text-muted-foreground">No posts yet.</div>
            </TabsContent>
            <TabsContent value="media" className="mt-4">
              <div className="text-center py-8 text-muted-foreground">No media yet.</div>
            </TabsContent>
            <TabsContent value="likes" className="mt-4">
              <div className="text-center py-8 text-muted-foreground">No likes yet.</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

