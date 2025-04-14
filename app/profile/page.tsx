"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Link2, MapPin, Twitter, Github, Linkedin } from "lucide-react"
import { toast } from "sonner"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Sarah Chen",
    bio: "Indie maker building in public. Passionate about productivity and mindfulness.",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1579547621869-0ddb5f237392?w=1200&h=400&fit=crop",
    links: {
      website: "https://example.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    }
  })

  const handleSave = () => {
    setIsEditing(false)
    toast.success("Profile updated successfully")
  }

  return (
    <div className="space-y-8">
      <div className="relative h-[300px] rounded-xl overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
        >
          <img
            src={profile.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          {isEditing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Button variant="outline" className="gap-2">
                <Camera className="h-4 w-4" />
                Change Cover Photo
              </Button>
            </div>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-16 left-8"
        >
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>{profile.name[0]}</AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      <div className="pt-16 px-8">
        <div className="flex justify-between items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            {isEditing ? (
              <Input
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="text-2xl font-bold"
              />
            ) : (
              <h1 className="text-2xl font-bold">{profile.name}</h1>
            )}
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {isEditing ? (
                <Input
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                />
              ) : (
                <span>{profile.location}</span>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {isEditing ? (
              <div className="space-x-2">
                <Button onClick={handleSave}>Save Changes</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid gap-8 md:grid-cols-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="min-h-[100px]"
                />
              ) : (
                <p className="text-muted-foreground">{profile.bio}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4" />
                {isEditing ? (
                  <Input
                    value={profile.links.website}
                    onChange={(e) => setProfile({
                      ...profile,
                      links: { ...profile.links, website: e.target.value }
                    })}
                  />
                ) : (
                  <a href={profile.links.website} className="text-primary hover:underline">
                    {profile.links.website}
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Twitter className="h-4 w-4" />
                {isEditing ? (
                  <Input
                    value={profile.links.twitter}
                    onChange={(e) => setProfile({
                      ...profile,
                      links: { ...profile.links, twitter: e.target.value }
                    })}
                  />
                ) : (
                  <a href={profile.links.twitter} className="text-primary hover:underline">
                    {profile.links.twitter}
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                {isEditing ? (
                  <Input
                    value={profile.links.github}
                    onChange={(e) => setProfile({
                      ...profile,
                      links: { ...profile.links, github: e.target.value }
                    })}
                  />
                ) : (
                  <a href={profile.links.github} className="text-primary hover:underline">
                    {profile.links.github}
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                {isEditing ? (
                  <Input
                    value={profile.links.linkedin}
                    onChange={(e) => setProfile({
                      ...profile,
                      links: { ...profile.links, linkedin: e.target.value }
                    })}
                  />
                ) : (
                  <a href={profile.links.linkedin} className="text-primary hover:underline">
                    {profile.links.linkedin}
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}