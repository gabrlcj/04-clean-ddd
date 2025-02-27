import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/value-object/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
// sut (system under test)
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-id'),
      content: 'Some old content',
    })

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
      content: 'Some new content',
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Some new content',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityID('author-id'),
    })

    await inMemoryAnswersRepository.create(newAnswer)

    await expect(() =>
      sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: 'not-the-author-id',
        content: 'Not my answer title',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
