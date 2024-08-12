'use client'

import { useContext, type MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { QuestionContext } from '@/context/question'

export default function Home() {
  const router = useRouter()
  const questionContext = useContext(QuestionContext)
  const onClickStart: MouseEventHandler = (event) => {
    event.preventDefault()
    questionContext.toNextQuestion()
    router.push('/questions')
  }

  return (
    <Card className="w-full flex flex-col items-center gap-[2.75rem] py-2">
      <div>Click start to answer questions</div>
      <Button buttonType="primary" onClick={onClickStart} className="px-10">
        ต่อไป
      </Button>
    </Card>
  )
}
