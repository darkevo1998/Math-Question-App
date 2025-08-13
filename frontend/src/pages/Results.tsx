import { useLocation, Link } from 'react-router-dom'

export default function Results() {
  const { state } = useLocation() as any
  const result = state?.result
  const lessonId = state?.lessonId

  if (!result) {
    return (
      <div className="text-center py-10">
        <div className="mb-3">No results to show.</div>
        <Link className="text-blue-600 underline" to="/">Back to lessons</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white rounded-xl p-5 border shadow-sm">
        <div className="text-xl font-bold">Great job!</div>
        <div className="text-slate-700 mt-2">Correct answers: <span className="font-semibold">{result.correct_count}</span></div>
        <div className="text-slate-700">XP earned: <span className="font-semibold">{result.earned_xp}</span></div>
        <div className="text-slate-700">Total XP: <span className="font-semibold">{result.new_total_xp}</span></div>
        <div className="text-slate-700">Streak: <span className="font-semibold">{result.streak.current}</span> (Best {result.streak.best})</div>
      </div>

      <div className="bg-white rounded-xl p-5 border shadow-sm">
        <div className="mb-2 font-medium">Lesson progress</div>
        <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
          <div className="h-3 bg-green-500 rounded-full transition-all duration-700" style={{ width: `${Math.round(result.lesson_progress*100)}%` }} />
        </div>
        <div className="mt-2 text-sm text-slate-700">{Math.round(result.lesson_progress*100)}% complete</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link className="bg-blue-600 text-white py-3 rounded-lg text-center" to="/">Continue</Link>
        {lessonId && <Link className="bg-slate-800 text-white py-3 rounded-lg text-center" to={`/lessons/${lessonId}`}>Retry</Link>}
      </div>
    </div>
  )
} 