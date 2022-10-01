import { useCallback, useState, useEffect, useRef } from "react";
import { useGetQuestionsQuery } from "../services/quiz";
import { useAppSelector } from "./useAppSelector";
import { useAppDispatch } from "./useAppDispatch";
import { addQuestion } from "../features/question/questionSlice";

const findNextUnusedItem = <T>(
  usedList: Array<T>,
  list: Array<T>,
  index: number
): number => {
  const nextIndex = index + 1;
  const nextQuestionInOrder = list[nextIndex];
  if (
    nextQuestionInOrder &&
    usedList.find((question) => question === nextQuestionInOrder)
  ) {
    return findNextUnusedItem(usedList, list, nextIndex);
  }

  return nextIndex < list.length ? nextIndex : -1;
};

export const useGetQuizQuestion = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const {
    data: { questions = [] } = {},
    refetch,
    isFetching,
  } = useGetQuestionsQuery(undefined, { refetchOnMountOrArgChange: true });
  const { usedQuestionList } = useAppSelector((state) => state.question);
  const usedQuestionListRef = useRef(usedQuestionList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    usedQuestionListRef.current = usedQuestionList;
  }, [usedQuestionList]);

  const getNextUnusedQuestion = useCallback(
    (
      usedQuestions: Array<string>,
      currentQuestions: Array<string>,
      currentIndex: number
    ) => {
      const nextIndex = findNextUnusedItem(
        usedQuestions,
        currentQuestions,
        currentIndex
      );

      if (nextIndex === -1) {
        refetch();
      } else {
        dispatch(addQuestion(currentQuestions[nextIndex]));
      }

      setCurrentQuestionIdx(nextIndex);
    },
    [dispatch, refetch]
  );

  useEffect(() => {
    if (questions.length > 0)
      getNextUnusedQuestion(
        usedQuestionListRef.current,
        questions.map(({ question }) => question),
        -1
      );
  }, [getNextUnusedQuestion, questions, usedQuestionListRef]);

  const next = useCallback(() => {
    getNextUnusedQuestion(
      usedQuestionList,
      questions.map(({ question }) => question),
      currentQuestionIdx
    );
  }, [currentQuestionIdx, getNextUnusedQuestion, questions, usedQuestionList]);

  return {
    next,
    currentQuestion: isFetching ? undefined : questions[currentQuestionIdx],
  };
};
