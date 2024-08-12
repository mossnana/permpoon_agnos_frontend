import { type WithChildren } from '@/types/component'
import { type WithOptionalKey } from '@/types/base'

const Card = ({
  children,
  className,
}: WithChildren<WithOptionalKey<'className', string>>) => {
  return (
    <div className={`rounded overflow-hidden shadow-lg ${className}`}>
      {children}
    </div>
  )
}

export default Card
