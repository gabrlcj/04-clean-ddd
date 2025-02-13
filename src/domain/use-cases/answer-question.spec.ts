import { expect, test } from 'vitest';
import { AnswerQuestionUseCase } from './answer-question';
import { AnswerRepository } from '../repositories/answer-repository';
import { Answer } from '../entities/answer';

const fakeAnswerRepository: AnswerRepository = {
  create: async (answer: Answer) => {
    return;
  },
};

test('create an answer', async () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswerRepository);

  const answer = await answerQuestionUseCase.export({
    instructorId: 'instructor-id',
    questionId: 'question-id',
    content: 'Nova resposta',
  });

  expect(answer.content).toEqual('Nova resposta');
});
