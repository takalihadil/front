export interface Post {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
  }
  createdAt: string
  likes: number
  comments: Comment[]
  habitTags?: string[]
  images?: string[]
  type?: string[]
}

export interface Comment {
  id: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
  }
  createdAt: string
  likes: number
}

export interface Message {
  id: string
  content: string
  sender: {
    id: string
    name: string
    avatar: string
  }
  receiver: {
    id: string
    name: string
    avatar: string
  }
  createdAt: string
  read: boolean
}

export interface Event {
  id: string
  title: string
  description: string
  type: 'webinar' | 'challenge' | 'meetup'
  startDate: string
  endDate: string
  host: {
    id: string
    name: string
    avatar: string
  }
  participants: number
  maxParticipants?: number
  tags: string[]
  status: 'upcoming' | 'ongoing' | 'completed'
}

export interface Opportunity {
  id: string
  title: string
  description: string
  type: 'collaboration' | 'job' | 'mentorship'
  author: {
    id: string
    name: string
    avatar: string
  }
  createdAt: string
  deadline?: string
  requirements: string[]
  tags: string[]
  status: 'open' | 'closed'
}