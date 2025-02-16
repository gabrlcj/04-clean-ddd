import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'

const fakeAnswersRepository: AnswersRepository = {
  create: async () => {},
}

it('should be able to create an answer', async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestionUseCase.execute({
    instructorId: 'instructor-id',
    questionId: 'question-id',
    content: 'New answer',
  })

  expect(answer.content).toEqual('New answer')
})
