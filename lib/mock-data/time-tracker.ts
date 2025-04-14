import { Project, Task, TimeEntry, TimeReport } from '../types/time-tracker'

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Company website redesign project',
    color: '#FF6B6B',
    isArchived: false,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native mobile app development',
    color: '#4ECDC4',
    isArchived: false,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
]

export const mockTasks: Task[] = [
  {
    id: '1',
    projectId: '1',
    name: 'Homepage Design',
    description: 'Design new homepage layout',
    status: 'in_progress',
    estimatedHours: 8,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: '2',
    projectId: '1',
    name: 'Contact Form Implementation',
    status: 'not_started',
    estimatedHours: 4,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z',
  },
]

export const mockTimeEntries: TimeEntry[] = [
  {
    id: '1',
    taskId: '1',
    projectId: '1',
    startTime: '2024-03-18T09:00:00Z',
    endTime: '2024-03-18T11:30:00Z',
    duration: 9000, // 2.5 hours in seconds
    notes: 'Working on homepage layout',
    createdAt: '2024-03-18T09:00:00Z',
    updatedAt: '2024-03-18T11:30:00Z',
  },
  {
    id: '2',
    taskId: '1',
    projectId: '1',
    startTime: '2024-03-19T14:00:00Z',
    endTime: '2024-03-19T17:00:00Z',
    duration: 10800, // 3 hours in seconds
    notes: 'Implementing responsive design',
    createdAt: '2024-03-19T14:00:00Z',
    updatedAt: '2024-03-19T17:00:00Z',
  },
]

export const mockTimeReport: TimeReport = {
  totalDuration: 19800, // 5.5 hours in seconds
  projectBreakdown: {
    '1': 19800, // Website Redesign: 5.5 hours
  },
  dailyBreakdown: {
    '2024-03-18': 9000, // 2.5 hours
    '2024-03-19': 10800, // 3 hours
  },
  entries: mockTimeEntries,
}