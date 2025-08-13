import { useEffect, useState } from 'react'
import { getProfile } from '../api'
import toast from 'react-hot-toast'

export default function Profile() {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProfile()
      .then(setData)
      .catch(e => toast.error(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-center py-10">Loading…</div>
  if (!data) return <div className="text-center py-10">No data</div>

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-xl p-5 border shadow-sm">
        <div className="text-xl font-bold">Your Stats</div>
        <div className="text-slate-700 mt-2">Total XP: <span className="font-semibold">{data.total_xp}</span></div>
        <div className="text-slate-700">Streak: <span className="font-semibold">{data.streak.current}</span> (Best {data.streak.best})</div>
      </div>

      <div className="bg-white rounded-xl p-5 border shadow-sm">
        <div className="mb-2 font-medium">Overall progress</div>
        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
          <div className="h-3 bg-blue-500 rounded-full" style={{ width: `${Math.round(data.progress*100)}%` }} />
        </div>
        <div className="mt-2 text-sm text-slate-700">{Math.round(data.progress*100)}% complete</div>
      </div>
    </div>
  )
} 