'use client'

import { Button } from '@/components/button'
import { QuestionContext } from '@/context/question'
import dynamic from 'next/dynamic'
import { useContext } from 'react'

const HandQuestion = dynamic(
  () => import('@/components/questions/HandQuestion'),
  { ssr: false }
)
const BodyQuestion = dynamic(
  () => import('@/components/questions/BodyQuestion'),
  { ssr: false }
)

export default function QuestionsPage() {
  const questionContext = useContext(QuestionContext)

  const goBackQuestion = (event: any) => {
    event.preventDefault()
    questionContext.toPreviousQuestion()
  }

  const onNextQuestion = (event: any) => {
    event.preventDefault()
    questionContext.toNextQuestion()
  }

  return (
    <div>
      {questionContext.currentQuestionIndex === 0 && <h3>Please Click Next</h3>}
      {questionContext.currentQuestionIndex === 1 && (
        <HandQuestion
          width={500}
          prevRegion={questionContext.questions[1].choice}
          onChoice={questionContext.choiceQuestion(1)}
        />
      )}
      {questionContext.currentQuestionIndex === 2 && (
        <BodyQuestion
          width={500}
          prevRegion={questionContext.questions[2].choice}
          onChoice={questionContext.choiceQuestion(2)}
        />
      )}

      <div className="flex items-center justify-center gap-8">
        {questionContext.currentQuestionIndex > 1 && (
          <Button
            className="px-8"
            buttonType="secondary"
            onClick={goBackQuestion}
          >
            Back
          </Button>
        )}
        {questionContext.currentQuestionIndex < 2 && (
          <Button
            className="px-8"
            buttonType="primary"
            onClick={onNextQuestion}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
}
