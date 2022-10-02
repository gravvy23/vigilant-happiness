import { useCallback } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { resetCounter } from "../../features/counter/counterSlice";
import { resetQuestions } from "../../features/question/questionSlice";

export function FinalScreen() {
  const { points } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  const handleButtonClick = useCallback(() => {
    dispatch(resetCounter());
    dispatch(resetQuestions());
  }, [dispatch]);

  return (
    <Flex flexDir="column" alignItems="center">
      <Heading size="md" p="2">
        Your score is {points} points
      </Heading>
      <Button size="lg" p="2" onClick={handleButtonClick}>
        New Game
      </Button>
    </Flex>
  );
}
