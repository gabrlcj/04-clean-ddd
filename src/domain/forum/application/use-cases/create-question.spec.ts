import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async () => {},
}

it('should be able to create an question', async () => {
  const createQuestionUseCase = new CreateQuestionUseCase(
    fakeQuestionsRepository,
  )

  const { question } = await createQuestionUseCase.execute({
    authorId: 'author-id',
    title: 'New Title',
    content: 'New content',
  })

  expect(question.id).toBeTruthy()
})
