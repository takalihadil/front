// Type definitions for posts, comments and reactions

// Post Types*
export type ReactionType = "Like" | "Love" | "Haha" | "Wow" | "Sad" | "Angry"

export interface Post {
  id: string
  content: string
  media?: PostMedia[] // Corrected to array of PostMedia
  authorId: string
  user?: {
    id: string
    fullname: string
    profile_photo: string
  }
  author?: {
    id: string
    name: string
    username?: string
    avatar: string
  }
  likes?: number
  likeCount?: number
  comments?: number
  commentCount?: number
  shares?: number
  shareCount?: number
  createdAt: string
  updatedAt?: string
  userReaction?: string
}

export interface PostMedia {
  id: string
  type: string
  url: string
  fileName?: string
  fileSize?: number
  width?: number
  height?: number
  duration?: number
  postId: string
}

export interface CreatePostDTO {
  content: string
}

export interface UpdatePostDTO {
  content?: string
}

// Comment Types
export interface Comment {
  id: string
  content: string
  userId: string
  postId: string
  parentId?: string // Optional, used for replies
  createdAt: string
  updatedAt: string
  author: {
    // Rename `user` to `author`
    id: string
    fullname: string
    profile_photo: string | null
  }
  reactionCount: {
    like: number
    love: number
    haha: number
    wow: number
    sad: number
    angry: number
  }
  userReaction?: string // Optional, tracks the current user's reaction
  replyCount: number // Number of replies
  replies?: Comment[] // Nested replies (child comments)
}

export interface CreateCommentDTO {
  content: string
  parentId?: string
  // Remove the index signature and add specific properties
  userId: string
  postId: string
}

export interface UpdateCommentDTO {
  content: string
}

// Reaction Types
export interface CreateReactionDTO {
  userId: string
  type: ReactionType
}


export interface Reaction {
  id: string
  type: ReactionType
  userId: string
  postId?: string
  commentId?: string
  createdAt: string
}
