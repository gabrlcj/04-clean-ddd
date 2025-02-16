import { UniqueEntityID } from '@/core/entities/value-object/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    authorId: new UniqueEntityID(),
    title: 'New Title',
    content: 'New content',
    ...override,
  })

  return question
}
