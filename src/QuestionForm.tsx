import { ChangeEvent, useCallback, useState } from "react";
import CryptoJS from "crypto-js";
import { Flex, Heading, Input, Button } from "@chakra-ui/react";
import {
  increasePoints,
  decreaseChances,
} from "./features/counter/counterSlice";
import { useGetQuizQuestion, useAppDispatch } from "./hooks";

export function QuestionForm() {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();
  const { currentQuestion, next } = useGetQuizQuestion();

  const handleSubmitButtonClick = useCallback(() => {
    const hash = CryptoJS.SHA1(value.trim().toLowerCase());
    const currentAnswerSha1 = hash.toString(CryptoJS.enc.Hex);

    if (currentAnswerSha1 === currentQuestion.answerSha1) {
      dispatch(increasePoints());
    } else {
      dispatch(decreaseChances());
    }

    setValue("");
    next();
  }, [currentQuestion.answerSha1, dispatch, next, value]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
    []
  );

  return (
    <Flex flexDir="column" alignItems="center">
      <Heading size="md">{currentQuestion?.question}</Heading>
      <Flex m="2">
        <Input
          size="lg"
          w="container.sm"
          m="2"
          value={value}
          onChange={handleInputChange}
        />
        <Button size="lg" m="2" onClick={handleSubmitButtonClick}>
          Submit
        </Button>
      </Flex>
    </Flex>
  );
}
