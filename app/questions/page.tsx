'use client'

import { type MouseEvent, useContext, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { QuestionContext } from '@/context/question'
import { Button } from '@/components/button'

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

  const onClickBack = (event: MouseEvent) => {
    event.preventDefault()
    questionContext.toPreviousQuestion()
  }

  const [screenWidth, setScreenWidth] = useState(0)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setScreenWidth(window.innerWidth)
      }
      setScreenWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  const onClickNext = (event: MouseEvent) => {
    event.preventDefault()
    questionContext.toNextQuestion()
  }

  const renderQuestion = () => {
    let windowWidth = (screenWidth * 80) / 100
    if (windowWidth > 500) {
      windowWidth = 500
    }

    switch (questionContext.currentQuestionIndex) {
      case 1:
        return (
          <HandQuestion
            width={windowWidth}
            prevRegion={questionContext.questions[1].choice}
            onChoice={questionContext.choiceAnswer(1)}
          />
        )
      case 2:
        return (
          <BodyQuestion
            width={windowWidth}
            prevRegion={questionContext.questions[2].choice}
            onChoice={questionContext.choiceAnswer(2)}
          />
        )
      default:
        return <></>
    }
  }

  const renderActionButtons = () => {
    const isNotFirstQuestion = questionContext.currentQuestionIndex > 0
    const isNotLastQuestion = questionContext.currentQuestionIndex < 2

    return (
      <div className="flex items-center justify-center gap-8">
        {isNotFirstQuestion && (
          <Button className="px-8" buttonType="secondary" onClick={onClickBack}>
            กลับ
          </Button>
        )}
        {isNotLastQuestion && (
          <Button className="px-8" buttonType="primary" onClick={onClickNext}>
            ต่อไป
          </Button>
        )}
      </div>
    )
  }

  return (
    <div>
      {renderQuestion()}
      <div className="flex items-center justify-center gap-8 my-2">
        {renderActionButtons()}
      </div>
    </div>
  )
}
