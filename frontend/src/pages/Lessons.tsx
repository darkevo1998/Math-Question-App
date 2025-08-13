import { useEffect, useState } from 'react'
import { getLessons, LessonListItem } from '../api'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Lessons() {
  const [items, setItems] = useState<LessonListItem[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLessons()
      .then(r => setItems(r.lessons))
      .catch(e => toast.error(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-10">Loading lessons…</div>
  if (!items) return <div className="text-center py-10">No lessons</div>

  return (
    <div className="flex flex-col gap-3">
      {items.map(l => (
        <Link key={l.id} to={`/lessons/${l.id}`} className="bg-white rounded-xl p-4 shadow-sm border flex items-center justify-between">
          <div>
            <div className="font-semibold">{l.title}</div>
            <div className="text-sm text-slate-600">{l.description}</div>
          </div>
          <div className="text-sm text-slate-700">{Math.round(l.progress*100)}%</div>
        </Link>
      ))}
    </div>
  )
} 