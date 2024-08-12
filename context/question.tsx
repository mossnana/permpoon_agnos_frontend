'use client'

import { createContext, useState } from 'react'
import { WithChildren } from '@/types/component'
import { QuestionStage } from '@/types/context'

const defaultStage: QuestionStage = {
  currentQuestionIndex: 0,
  progressPercentage: 0,
  questions: [
    {
      question: 'กรุณากดต่อไป',
      choice: null,
    },
    {
      question: '',
      choice: null,
    },
    {
      question: '',
      choice: null,
    },
  ],
}

export const QuestionContext = createContext({
  ...defaultStage,
  choiceAnswer: (_questionIndex: number) => (_choice: number) => {},
  toNextQuestion: () => {},
  toPreviousQuestion: () => {},
})

function QuestionContextProvider({ children }: WithChildren<{}>) {
  const [stage, setStage] = useState(defaultStage)

  const getProgressPercentage = (nextQuestionIndex: number): number => {
    const questionOrder = nextQuestionIndex
    const questionTotalCount = stage.questions.length - 1
    return Math.round((100 / questionTotalCount) * questionOrder)
  }

  const choiceAnswer = (questionIndex: number) => (choice: number) => {
    stage.questions[questionIndex].choice = choice
    setStage(stage)
  }

  const toNextQuestion = () => {
    const nextQuestionIndex =
      stage.currentQuestionIndex + 1 >= stage.questions.length
        ? 0
        : stage.currentQuestionIndex + 1
    setStage({
      ...stage,
      currentQuestionIndex: nextQuestionIndex,
      progressPercentage: getProgressPercentage(nextQuestionIndex),
    })
  }

  const toPreviousQuestion = () => {
    const newQuestionIndex = stage.currentQuestionIndex - 1 < 0
    ? 0
    : stage.currentQuestionIndex - 1
    setStage({
      ...stage,
      progressPercentage: getProgressPercentage(newQuestionIndex),
      currentQuestionIndex: newQuestionIndex
    })
  }

  return (
    <QuestionContext.Provider
      value={{
        ...stage,
        choiceAnswer,
        toNextQuestion,
        toPreviousQuestion,
      }}
    >
      {children}
    </QuestionContext.Provider>
  )
}

export default QuestionContextProvider
