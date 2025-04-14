"use client"

import { 
  addDays, 
  eachDayOfInterval, 
  endOfWeek, 
  format, 
  startOfWeek, 
  subDays,
  subYears,
  startOfDay,
  isSameDay 
} from "date-fns"
import { ContributionData, ContributionWeek } from "./types"

export function generateContributionData(): ContributionData {
  // Start exactly one year ago from today
  const end = startOfDay(new Date())
  const start = subYears(end, 1)
  
  // Adjust to start and end of weeks
  const adjustedStart = startOfWeek(start, { weekStartsOn: 0 })
  const adjustedEnd = endOfWeek(end, { weekStartsOn: 0 })
  
  // Generate all days in the interval
  const days = eachDayOfInterval({ start: adjustedStart, end: adjustedEnd })
  
  // Initialize data structures
  const weeks: ContributionWeek[] = []
  let currentWeek: ContributionWeek = { days: [] }
  let totalContributions = 0
  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0

  // Process each day
  days.forEach((date) => {
    const dayOfWeek = date.getDay()
    
    // Generate activity level with weighted randomization
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    const baseChance = isWeekend ? 0.3 : 0.7 // Less activity on weekends
    const random = Math.random()
    
    // Only generate activity for dates up to today
    const isInFuture = date > end
    let level: 0 | 1 | 2 | 3 | 4 = 0

    if (!isInFuture) {
      if (random < baseChance * 0.2) level = 4
      else if (random < baseChance * 0.4) level = 3
      else if (random < baseChance * 0.6) level = 2
      else if (random < baseChance * 0.8) level = 1
    }

    // Calculate completed goals based on level
    const completed = level === 0 ? 0 : Math.floor(Math.random() * level + 1)
    
    // Update streaks
    if (completed > 0) {
      totalContributions += completed
      tempStreak++
      longestStreak = Math.max(longestStreak, tempStreak)
    } else {
      tempStreak = 0
    }

    // Create day data
    const day = {
      date: format(date, 'yyyy-MM-dd'),
      count: completed,
      level,
      goals: {
        completed,
        total: 4 // Maximum possible goals per day
      }
    }

    currentWeek.days.push(day)

    // Start a new week when we reach Sunday
    if (dayOfWeek === 6) {
      weeks.push(currentWeek)
      currentWeek = { days: [] }
    }
  })

  // Handle the last partial week if needed
  if (currentWeek.days.length > 0) {
    // Fill remaining days with empty cells
    while (currentWeek.days.length < 7) {
      currentWeek.days.push({
        date: '',
        count: 0,
        level: 0,
        goals: { completed: 0, total: 0 }
      })
    }
    weeks.push(currentWeek)
  }

  // Calculate current streak (counting backwards from today)
  currentStreak = 0
  for (let i = days.length - 1; i >= 0; i--) {
    const date = days[i]
    if (date > end) continue
    
    const dayData = weeks[Math.floor(i / 7)].days[i % 7]
    if (dayData.level > 0) {
      currentStreak++
    } else {
      break
    }
  }

  return {
    weeks,
    totalContributions,
    longestStreak,
    currentStreak
  }
}