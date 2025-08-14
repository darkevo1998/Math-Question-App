import { useEffect, useState } from 'react'
import { getLessons, LessonListItem } from '../api'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Lessons() {
  const [items, setItems] = useState<LessonListItem[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('Lessons component mounted, fetching data...')
    getLessons()
      .then(r => {
        console.log('Lessons fetched successfully:', r)
        setItems(r.lessons)
        setError(null)
      })
      .catch(e => {
        console.error('Failed to load lessons:', e)
        setError(e.message)
        toast.error('Failed to load lessons. Please check your connection.')
      })
      .finally(() => {
        console.log('Lessons fetch completed')
        setLoading(false)
      })
  }, [])

  console.log('Lessons render state:', { loading, error, itemsCount: items?.length })

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="text-lg font-semibold mb-2">Loading lessons…</div>
        <div className="text-sm text-slate-600">Please wait while we fetch your lessons</div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-600 mb-4">Failed to load lessons</div>
        <div className="text-sm text-slate-600 mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    )
  }
  
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-10">
        <div className="text-slate-600">No lessons available</div>
        <div className="text-sm text-slate-500 mt-2">Please check back later</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold mb-4">Available Lessons</div>
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