"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: string
  fullname: string
  profile_photo?: string
}

interface UserSelectorProps {
  onUsersSelected: (users: User[]) => void
  maxUsers?: number
  isGroup?: boolean
}

export function UserSelector({ onUsersSelected, maxUsers = 10, isGroup = false }: UserSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [users, setUsers] = useState<User[]>([])
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("access_token")
        if (!token) {
          throw new Error("No token found. Please login first.")
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch users")
        }

        const data = await response.json()

        // Filter out current user
        const currentUserId = localStorage.getItem("user_id") || "current-user-id"
        const filteredUsers = Array.isArray(data) ? data.filter((user: User) => user.id !== currentUserId) : []

        setUsers(filteredUsers)
      } catch (error) {
        console.error("Error fetching users:", error)
        toast({
          title: "Error",
          description: "Failed to load users. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [toast])

  const handleSelectUser = (user: User) => {
    if (selectedUsers.length >= maxUsers && !selectedUsers.some((u) => u.id === user.id)) {
      toast({
        title: "Maximum users reached",
        description: `You can only select up to ${maxUsers} users.`,
        variant: "destructive",
      })
      return
    }

    // Toggle selection
    if (selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id))
    } else {
      setSelectedUsers([...selectedUsers, user])
    }
  }

  const removeUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== userId))
  }

  // Update parent component when selection changes
  useEffect(() => {
    onUsersSelected(selectedUsers)
  }, [selectedUsers, onUsersSelected])

  // Filter users based on search query
  const filteredUsers = users.filter((user) => user.fullname.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex flex-col h-full">
      {/* Selected users */}
      {selectedUsers.length > 0 && (
        <div className="p-3 border-b">
          <div className="flex flex-wrap gap-2">
            {selectedUsers.map((user) => (
              <Badge key={user.id} variant="secondary" className="flex items-center gap-1 pl-1 pr-2 py-1">
                <Avatar className="h-5 w-5 mr-1">
                  <AvatarImage src={user.profile_photo || "/placeholder.svg"} alt={user.fullname} />
                  <AvatarFallback>{user.fullname.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{user.fullname}</span>
                <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1" onClick={() => removeUser(user.id)}>
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove</span>
                </Button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Search input */}
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* User list */}
      <ScrollArea className="flex-1">
        <div className="p-1">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">Loading users...</div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              {searchQuery ? "No users found matching your search" : "No users available"}
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer ${
                  selectedUsers.some((u) => u.id === user.id) ? "bg-muted" : ""
                }`}
                onClick={() => handleSelectUser(user)}
              >
                <Avatar>
                  <AvatarImage src={user.profile_photo || "/placeholder.svg"} alt={user.fullname} />
                  <AvatarFallback>{user.fullname.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium">{user.fullname}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
