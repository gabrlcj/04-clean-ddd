import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/value-object/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// sut (system under test)
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-id'),
      title: 'Old title',
      content: 'Some old content',
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
      title: 'New title',
      content: 'Some new content',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'New title',
      content: 'Some new content',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityID('author-id'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(() =>
      sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: 'not-the-author-id',
        title: 'Not my question title',
        content: 'Not my question title',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
