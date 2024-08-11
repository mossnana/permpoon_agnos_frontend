'use client'

import { WithChildren } from '@/types/component'
import { Question } from '@/types/question'
import { createContext, useState } from 'react'

const defaultStage: any = {
  currentQuestionIndex: 0,
  progressPercentage: 0,
  questions: [
    {
      question: '',
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
  toNextQuestion: (currentQuestion: Question) => {},
})

function QuestionContextProvider({ children }: WithChildren<{}>) {
  const [stage, setStage] = useState(defaultStage)

  const getProgressPercentage = (nextQuestionIndex: number): number => {
    const questionOrder = nextQuestionIndex
    const questionTotalCount = stage.questions.length - 1
    return Math.round((100 / questionTotalCount) * questionOrder)
  }

  const choiceQuestion = (questionIndex: number) => (choice: number) => {
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
        choiceQuestion,
        toNextQuestion,
        toPreviousQuestion,
      }}
    >
      {children}
    </QuestionContext.Provider>
  )
}

export default QuestionContextProvider
