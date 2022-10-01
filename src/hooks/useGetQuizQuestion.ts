import { useCallback, useState, useEffect } from "react";
import { useGetQuestionsQuery } from "../services/quiz";

export const useGetQuizQuestion = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const { data: { questions = [] } = {}, refetch } = useGetQuestionsQuery();

  useEffect(() => {
    setCurrentQuestionIdx(0);
  }, [questions]);

  const findNextQuestionIndex = useCallback(
    (index: number) => {
      //   if question with current index is already used
      //   return findNextQuestionIndex(index + 1);

      return index % questions.length;
    },
    [questions.length]
  );

  const next = useCallback(() => {
    const nextIndex = findNextQuestionIndex(currentQuestionIdx);

    if (nextIndex === 0) {
      refetch();
    }

    setCurrentQuestionIdx(nextIndex);
  }, [currentQuestionIdx, findNextQuestionIndex, refetch]);

  return { next, currentQuestion: questions[currentQuestionIdx] };
};
