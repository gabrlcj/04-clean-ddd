import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentParams {
  authorId: string
  answerCommentId: string
}

interface DeleteAnswerCommentResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentParams): Promise<DeleteAnswerCommentResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error('Answer comment not found.')
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new Error('Not allowed')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return {}
  }
}
