import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/value-object/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface AnswerProps {
  questionId: UniqueEntityID
  authorId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  get questionId() {
    return this.props.questionId
  }

  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private updated() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content

    this.updated()
  }

  static create(
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answer = new Answer(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return answer
  }
}
