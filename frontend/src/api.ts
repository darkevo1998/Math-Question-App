const API_BASE = import.meta.env.VITE_API_BASE || ''

async function http<T>(path: string, options?: RequestInit): Promise<T> {
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

export async function getLessons() { return http<{ lessons: LessonListItem[] }>(`/api/lessons`) }
export async function getLesson(id: number) { return http<LessonDetail>(`/api/lessons/${id}`) }
export async function submitLesson(id: number, payload: any) { return http<any>(`/api/lessons/${id}/submit`, { method: 'POST', body: JSON.stringify(payload) }) }
export async function getProfile() { return http<any>(`/api/profile`) } 