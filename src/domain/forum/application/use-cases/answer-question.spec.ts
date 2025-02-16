import { AnswerQuestionUseCase } from './answer-question'
import { AnswerRepository } from '../repositories/answer-repository'

const fakeAnswerRepository: AnswerRepository = {
  create: async () => {},
}

it('should be able to create an answer', async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestionUseCase.export({
    instructorId: 'instructor-id',
    questionId: 'question-id',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})
