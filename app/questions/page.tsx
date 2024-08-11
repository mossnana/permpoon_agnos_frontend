'use client'

import dynamic from 'next/dynamic'

const HandQuestion = dynamic(() => import('@/components/questions/HandQuestion'), { ssr: false })

export default function QuestionsPage() {
  const points = [
    [0, 0],
    [0, 0],
    [0, 0],
  ]

  const images = [
    '/questions/dip-highlight.png',
    '/questions/pip-highlight.png',
    '/questions/mcp-highlight.png',
  ]

  return (
    <div>
      <HandQuestion
        width={828}
        height={976}
      />
    </div>
  )
}
