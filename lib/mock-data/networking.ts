export const mockPosts = [
  {
    id: "1",
    content: "Just completed my 30-day meditation challenge! The mindfulness habits really helped improve my focus at work. Here's my progress over the month 📈 #MindfulnessJourney",
    author: {
      id: "1",
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    createdAt: "2024-03-20T10:00:00Z",
    likes: 24,
    images: [
      "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=800&h=600&fit=crop"
    ],
    habitTags: ["meditation", "mindfulness", "productivity"],
    type: "achievement",
    comments: [
      {
        id: "1",
        content: "That's amazing! Would love to hear more about your experience.",
        author: {
          id: "2",
          name: "Emma Watson",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
        },
        createdAt: "2024-03-20T10:30:00Z",
        likes: 5
      }
    ]
  },
  {
    id: "2",
    content: "Started implementing the Pomodoro technique in my daily routine. Already seeing improvements in productivity! Here's my workspace setup 🎯 #ProductivityHacks",
    author: {
      id: "2",
      name: "Emma Watson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    createdAt: "2024-03-20T09:00:00Z",
    likes: 18,
    images: [
      "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=800&h=600&fit=crop"
    ],
    habitTags: ["productivity", "timemanagement", "pomodoro"],
    type: "habit",
    comments: []
  },
  {
    id: "3",
    content: "Week 2 of my morning workout routine! Feeling more energized than ever. Swipe to see my progress photos 💪 #FitnessJourney",
    author: {
      id: "3",
      name: "David Park",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    },
    createdAt: "2024-03-20T08:00:00Z",
    likes: 42,
    images: [
      "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=800&h=600&fit=crop"
    ],
    habitTags: ["fitness", "morningroutine", "progress"],
    type: "progress",
    comments: []
  }
]

export const mockMessages = [
  {
    id: "1",
    content: "Hey! How's your productivity journey going?",
    sender: {
      id: "2",
      name: "Emma Watson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    receiver: {
      id: "1",
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    createdAt: "2024-03-20T10:00:00Z",
    read: true
  }
]

export const mockEvents = [
  {
    id: "1",
    title: "Productivity Masterclass",
    description: "Learn advanced productivity techniques from successful entrepreneurs",
    type: "webinar",
    startDate: "2024-04-01T15:00:00Z",
    endDate: "2024-04-01T17:00:00Z",
    host: {
      id: "1",
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    participants: 45,
    maxParticipants: 100,
    tags: ["productivity", "timemanagement", "entrepreneurship"],
    status: "upcoming"
  }
]

export const mockOpportunities = [
  {
    id: "1",
    title: "Looking for a Productivity Coach",
    description: "Seeking an experienced productivity coach to help optimize our team's workflow",
    type: "collaboration",
    author: {
      id: "2",
      name: "Emma Watson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    createdAt: "2024-03-19T10:00:00Z",
    deadline: "2024-04-19T10:00:00Z",
    requirements: [
      "3+ years of coaching experience",
      "Knowledge of various productivity methodologies",
      "Strong communication skills"
    ],
    tags: ["coaching", "productivity", "remote"],
    status: "open"
  }
]