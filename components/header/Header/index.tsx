import { useCallback } from 'react'
import { type WithOptionalKey } from '@/types/base'

const Header = ({
  question = '',
  questionPercentage = 0,
}: WithOptionalKey<'question', string> &
  WithOptionalKey<'questionPercentage', number>) => {
  const progressbarPercentage = useCallback(() => {
    const percentage = questionPercentage < 10 ? 10 : questionPercentage
    return `${percentage}%`
  }, [questionPercentage])
  const textPercentage = `${questionPercentage}%`

  return (
    <header className="w-full h-32 flex flex-col items-center justify-center text-white text-bold rounded-b-xl gap-2">
      <h1 className="font-bold text-2xl">Agnos</h1>
      <h2>{question}</h2>
      <div className="w-9/12">
        <div className="w-full bg-gray-200 rounded-md dark:bg-gray-700">
          <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-md"
            style={{
              width: progressbarPercentage(),
            }}
          >
            {textPercentage}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
