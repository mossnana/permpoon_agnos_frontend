'use client'

import { WithChildren } from '@/types/component'
import { Question } from '@/types/question'
import { createContext, useState } from 'react'

const defaultStage = {
  currentQuestionIndex: 0,
  progressPercentage: 0,
  questions: [
    {
      question: '',
    },
    {
      question: '',
    },
    {
      question: '',
    },
  ],
}

export const QuestionContext = createContext({
  ...defaultStage,
  toNextQuestion: (currentQuestion: Question) => {},
})

function QuestionContextProvider({ children }: WithChildren<{}>) {
  const [stage, setStage] = useState(defaultStage)

  const getProgressPercentage = (nextQuestionIndex: number): number => {
    const questionOrder = nextQuestionIndex
    const questionTotalCount = stage.questions.length - 1
    return Math.round((100 / questionTotalCount) * questionOrder)
  }

  const toNextQuestion = (currentQuestion: Question) => {
    const nextQuestionIndex =
      stage.currentQuestionIndex + 1 >= stage.questions.length
        ? 0
        : stage.currentQuestionIndex + 1
    let newQuestions = [...stage.questions]
    if (nextQuestionIndex > 0) {
      newQuestions[stage.currentQuestionIndex] = currentQuestion
    }
    setStage({
      currentQuestionIndex: nextQuestionIndex,
      progressPercentage: getProgressPercentage(nextQuestionIndex),
      questions: newQuestions,
    })
  }

  return (
    <QuestionContext.Provider
      value={{
        ...stage,
        toNextQuestion,
      }}
    >
      {children}
    </QuestionContext.Provider>
  )
}

export default QuestionContextProvider
