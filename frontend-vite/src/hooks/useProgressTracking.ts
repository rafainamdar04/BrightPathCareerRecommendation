// hooks/useProgressTracking.ts
import { useState, useEffect } from 'react'

export interface ProgressItem {
  id: string
  type: 'skill' | 'certification' | 'project'
  name: string
  completed: boolean
  completedDate?: string
  role: string
}

export interface CareerProgress {
  role: string
  items: ProgressItem[]
  readinessScore: number
  lastUpdated: string
}

const STORAGE_KEY = 'brightpath_career_progress'

export function useProgressTracking(role?: string) {
  const [progress, setProgress] = useState<Record<string, CareerProgress>>({})

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setProgress(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Failed to load progress:', error)
    }
  }, [])

  // Save to localStorage whenever progress changes
  const saveProgress = (newProgress: Record<string, CareerProgress>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress))
      setProgress(newProgress)
    } catch (error) {
      console.error('Failed to save progress:', error)
    }
  }

  // Initialize progress for a new career roadmap
  const initializeProgress = (
    role: string,
    skills: string[],
    certifications: string[],
    projects: string[]
  ) => {
    if (progress[role]) return // Already initialized

    const items: ProgressItem[] = [
      ...skills.map((skill, i) => ({
        id: `skill-${i}`,
        type: 'skill' as const,
        name: skill,
        completed: false,
        role,
      })),
      ...certifications.map((cert, i) => ({
        id: `cert-${i}`,
        type: 'certification' as const,
        name: cert,
        completed: false,
        role,
      })),
      ...projects.map((project, i) => ({
        id: `project-${i}`,
        type: 'project' as const,
        name: project,
        completed: false,
        role,
      })),
    ]

    const newProgress = {
      ...progress,
      [role]: {
        role,
        items,
        readinessScore: 0,
        lastUpdated: new Date().toISOString(),
      },
    }

    saveProgress(newProgress)
  }

  // Toggle completion status of an item
  const toggleItem = (role: string, itemId: string) => {
    if (!progress[role]) return

    const roleProgress = progress[role]
    const updatedItems = roleProgress.items.map((item) =>
      item.id === itemId
        ? {
            ...item,
            completed: !item.completed,
            completedDate: !item.completed ? new Date().toISOString() : undefined,
          }
        : item
    )

    // Calculate readiness score
    const totalItems = updatedItems.length
    const completedItems = updatedItems.filter((i) => i.completed).length
    const readinessScore = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

    const newProgress = {
      ...progress,
      [role]: {
        ...roleProgress,
        items: updatedItems,
        readinessScore,
        lastUpdated: new Date().toISOString(),
      },
    }

    saveProgress(newProgress)
  }

  // Get progress for a specific role
  const getRoleProgress = (role: string): CareerProgress | null => {
    return progress[role] || null
  }

  // Get overall statistics
  const getStats = () => {
    const allRoles = Object.values(progress)
    if (allRoles.length === 0)
      return { totalTracked: 0, totalCompleted: 0, averageReadiness: 0 }

    const totalTracked = allRoles.reduce((sum, rp) => sum + rp.items.length, 0)
    const totalCompleted = allRoles.reduce(
      (sum, rp) => sum + rp.items.filter((i) => i.completed).length,
      0
    )
    const averageReadiness =
      allRoles.reduce((sum, rp) => sum + rp.readinessScore, 0) / allRoles.length

    return { totalTracked, totalCompleted, averageReadiness: Math.round(averageReadiness) }
  }

  return {
    progress,
    initializeProgress,
    toggleItem,
    getRoleProgress,
    getStats,
  }
}
