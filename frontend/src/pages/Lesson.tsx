import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getLesson, submitLesson } from '../api'
import ProblemCard from '../components/ProblemCard'

function uuid() {
  return crypto.randomUUID()
}

export default function Lesson() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState<any | null>(null)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [loading, setLoading] = useState(true)
  const attemptId = useMemo(() => uuid(), [])

  useEffect(() => {
    if (!id) return
    getLesson(Number(id))
      .then(setData)
      .catch(e => toast.error(e.message))
      .finally(() => setLoading(false))
  }, [id])

  function onAnswer(a: any) {
    setAnswers(prev => ({
      ...prev,
      [a.problem_id]: a
    }))
  }

  async function onSubmit() {
    if (!id) return
    const answersArray = Object.values(answers)
    if (answersArray.length === 0) { 
      toast.error('Please answer at least one problem'); 
      return 
    }
    try {
      const res = await submitLesson(Number(id), { 
        attempt_id: attemptId, 
        answers: answersArray 
      })
      navigate('/results', { state: { result: res, lessonId: Number(id) } })
    } catch (e:any) {
      toast.error(e.message)
    }
  }

  if (loading) return <div className="text-center py-10">Loading…</div>
  if (!data) return <div className="text-center py-10">Not found</div>

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="text-xl font-bold">{data.title}</div>
        <div className="text-slate-600 text-sm">{data.description}</div>
        <div className="mt-1 text-sm">Progress: {Math.round((data.progress||0)*100)}%</div>
      </div>
      {data.problems.map((p:any) => (
        <ProblemCard 
          key={p.id} 
          problem={p} 
          onAnswer={onAnswer}
          currentAnswer={answers[p.id]}
        />
      ))}
      <button className="mt-2 bg-green-600 text-white rounded-lg py-3" onClick={onSubmit}>
        Submit Answers ({Object.keys(answers).length} answered)
      </button>
    </div>
  )
} 