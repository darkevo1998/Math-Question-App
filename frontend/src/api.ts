const API_BASE = import.meta.env.VITE_API_BASE || ''

console.log('API_BASE value:', API_BASE)
console.log('API_BASE type:', typeof API_BASE)
console.log('API_BASE length:', API_BASE.length)

// Mock data for development/testing
const MOCK_LESSONS = [
  { id: 1, title: "Basic Addition", description: "Learn to add numbers from 1 to 10", progress: 0.8 },
  { id: 2, title: "Simple Subtraction", description: "Practice subtracting numbers", progress: 0.3 },
  { id: 3, title: "Multiplication Tables", description: "Master the times tables", progress: 0.0 },
]

async function http<T>(path: string, options?: RequestInit): Promise<T> {
  console.log('HTTP request to:', path, 'API_BASE:', API_BASE)
  
  // If no API_BASE is set, return mock data
  if (!API_BASE || API_BASE === '') {
    console.warn('No API_BASE set, using mock data for:', path)
    await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
    
    if (path === '/api/lessons') {
      console.log('Returning mock lessons data')
      return { lessons: MOCK_LESSONS } as T
    }
    if (path.startsWith('/api/lessons/') && path.endsWith('/submit')) {
      return { success: true, score: 85 } as T
    }
    if (path === '/api/profile') {
      return { name: "Student", level: 3, totalScore: 1250 } as T
    }
    if (path.startsWith('/api/lessons/') && !path.endsWith('/submit')) {
      // Mock individual lesson data
      const lessonId = path.split('/').pop()
      const lesson = MOCK_LESSONS.find(l => l.id.toString() === lessonId)
      if (lesson) {
        return {
          ...lesson,
          problems: [
            { id: 1, question: "What is 2 + 3?", answer: 5 },
            { id: 2, question: "What is 4 + 1?", answer: 5 },
            { id: 3, question: "What is 3 + 2?", answer: 5 }
          ]
        } as T
      }
    }
    
    throw new Error('Mock endpoint not found')
  }

  // Only make actual HTTP request if API_BASE is configured
  console.log('Making actual HTTP request to:', `${API_BASE}${path}`)
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || `HTTP ${res.status}`)
  }
  return res.json()
}

export type LessonListItem = { id: number; title: string; description: string; progress: number }
export type LessonDetail = { id: number; title: string; description: string; progress: number; problems: any[] }

export async function getLessons() { 
  const response = await http<any>(`/api/lessons`)
  // Backend returns array directly, frontend expects { lessons: [...] }
  return { lessons: response }
}

export async function getLesson(id: number) { 
  return http<LessonDetail>(`/api/lessons/${id}`)
}

export async function submitLesson(id: number, payload: any) { 
  return http<any>(`/api/lessons/${id}/submit`, { method: 'POST', body: JSON.stringify(payload) })
}

export async function getProfile() { 
  const response = await http<any>(`/api/profile`)
  // Transform backend response to match frontend expectations
  return {
    name: response.username || "Student",
    level: Math.floor((response.total_xp || 0) / 100) + 1,
    totalScore: response.total_xp || 0,
    streak: response.streak || { current: 0, best: 0 },
    progress: response.progress || 0
  }
} 