import { Answer } from '../entities/answer';

interface AnswerQuestionParams {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  export({ instructorId, questionId, content }: AnswerQuestionParams) {
    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId,
    });

    return answer;
  }
}
