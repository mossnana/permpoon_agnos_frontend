'use client'

import { Header } from '@/components/header'
import { QuestionContext } from '@/context/question'
import { useContext } from 'react'

function HeaderWrapper() {
  const context = useContext(QuestionContext)

  return (
    <Header
      question={context.questions[context.currentQuestionIndex].question}
      questionPercentage={context.progressPercentage}
    ></Header>
  )
}

export default HeaderWrapper
