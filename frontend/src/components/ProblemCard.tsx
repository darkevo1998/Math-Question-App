import { useState, useEffect } from 'react'

type McqOption = { id: number; text: string }

type Problem = {
  id: number
  type: 'mcq' | 'input'
  prompt: string
  options?: McqOption[]
}

export default function ProblemCard({ 
  problem, 
  onAnswer, 
  currentAnswer 
}: { 
  problem: Problem; 
  onAnswer: (answer: any) => void;
  currentAnswer?: any;
}) {
  const [value, setValue] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Update local input value when currentAnswer changes
  useEffect(() => {
    if (currentAnswer?.value) {
      setValue(currentAnswer.value)
      setIsSubmitted(true)
    } else {
      setIsSubmitted(false)
    }
  }, [currentAnswer])

  const handleInputSubmit = () => {
    if (value.trim()) {
      onAnswer({ problem_id: problem.id, value: value.trim() })
      setIsSubmitted(true)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (isSubmitted) {
      setIsSubmitted(false)
    }
  }

  return (
    <div className="bg-white rounded-xl p-4 border shadow-sm">
      <div className="font-medium mb-3">{problem.prompt}</div>
      {problem.type === 'mcq' && (
        <div className="grid grid-cols-1 gap-2">
          {problem.options?.map(o => (
            <button 
              key={o.id} 
              className={`border rounded-lg px-3 py-2 text-left transition-colors ${
                currentAnswer?.option_id === o.id 
                  ? 'bg-blue-100 border-blue-300 text-blue-800' 
                  : 'hover:bg-slate-50'
              }`}
              onClick={() => onAnswer({ problem_id: problem.id, option_id: o.id })}
            >
              {o.text}
            </button>
          ))}
        </div>
      )}
      {problem.type === 'input' && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input 
              className={`flex-1 border rounded-lg px-3 py-2 transition-colors ${
                isSubmitted ? 'border-blue-300 bg-blue-50' : ''
              }`}
              placeholder="Type your answer"
              value={value} 
              onChange={handleInputChange}
              disabled={isSubmitted}
            />
            <button 
              className={`px-4 py-2 rounded-lg transition-colors ${
                isSubmitted 
                  ? 'bg-blue-600 text-white cursor-not-allowed' 
                  : value.trim() 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={handleInputSubmit}
              disabled={isSubmitted || !value.trim()}
            >
              {isSubmitted ? 'Submitted' : 'Submit'}
            </button>
          </div>
          {isSubmitted && (
            <div className="text-sm text-blue-600">
              Answer recorded: "{value}"
            </div>
          )}
        </div>
      )}
    </div>
  )
} 