import { Author } from './author'

export interface Thought {
  id: string
  content: string
  author: Author
  upvotes: number
  comments: number
  createdAt: string
}