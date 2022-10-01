export type QuizQuestion = {
  answerSha1: string;
  question: string;
};

export type QuizQuestionResponse = {
  questions: Array<QuizQuestion>;
};
