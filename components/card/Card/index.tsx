import { WithChildren, WithType } from '@/types/component'

const Card = ({
  children,
  className,
}: WithChildren<WithType<'className', string>>) => {
  return (
    <div className={`max-w-sm rounded overflow-hidden shadow-lg ${className}`}>
      {children}
    </div>
  )
}

export default Card
