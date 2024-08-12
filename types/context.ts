import type { WithKey } from './base'
import type { Question } from './question'

export type QuestionStage = WithKey<'currentQuestionIndex', number> &
  WithKey<'progressPercentage', number> &
  WithKey<'questions', Question[]>
