import { Answer } from '../entities/answer';
import { AnswerRepository } from '../repositories/answer-repository';

interface AnswerQuestionParams {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async export({ instructorId, questionId, content }: AnswerQuestionParams) {
    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId,
    });

    await this.answerRepository.create(answer);

    return answer;
  }
}
