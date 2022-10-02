import { render, screen, fireEvent } from "@testing-library/react";
import { QuestionForm } from "../QuestionForm";
import {
  useAppDispatch as useAppDispatchMocked,
  useGetQuizQuestion as useGetQuizQuestionMocked,
} from "../../../hooks";
import {
  increasePoints as increasePointsMocked,
  decreaseChances as decreaseChancesMocked,
} from "../../../features/counter/counterSlice";

const useAppDispatch = useAppDispatchMocked as jest.MockedFunction<
  typeof useAppDispatchMocked
>;
const useGetQuizQuestion = useGetQuizQuestionMocked as jest.MockedFunction<
  typeof useGetQuizQuestionMocked
>;
const increasePoints = increasePointsMocked as jest.MockedFunction<
  typeof increasePointsMocked
>;
const decreaseChances = decreaseChancesMocked as jest.MockedFunction<
  typeof decreaseChancesMocked
>;
const nextMock = jest.fn();

const currentQuestion = {
  answerSha1: "3b623b2d411086d1da0499f92c0f0478330f744e",
  question: "In which body of water is Christmas Island?",
};
jest.mock("../../../hooks", () => ({
  ...jest.requireActual("../../../hooks"),
  useAppDispatch: jest.fn(),
  useGetQuizQuestion: jest.fn(),
}));

jest.mock("../../../features/counter/counterSlice", () => ({
  ...jest.requireActual("../../../features/counter/counterSlice"),
  increasePoints: jest.fn(),
  decreaseChances: jest.fn(),
}));

beforeEach(() => {
  useGetQuizQuestion.mockReturnValue({
    isFetching: false,
    next: nextMock,
    currentQuestion,
  });
  useAppDispatch.mockReturnValue(jest.fn());
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("<QuestionForm />", () => {
  test("should render current question", () => {
    render(<QuestionForm />);

    expect(screen.getByText(currentQuestion.question)).toBeInTheDocument();
  });

  test("should not render current question when isFetching", () => {
    useGetQuizQuestion.mockReturnValueOnce({
      isFetching: true,
      next: jest.fn(),
      currentQuestion,
    });
    render(<QuestionForm />);

    expect(
      screen.queryByText(currentQuestion.question)
    ).not.toBeInTheDocument();
  });

  test("should properly handle correct answer", () => {
    render(<QuestionForm />);

    fireEvent.change(screen.getByPlaceholderText("Type in your answer"), {
      target: { value: "Indian Ocean" },
    });
    fireEvent.click(screen.getByRole("button"));

    expect(increasePoints).toHaveBeenCalled();
    expect(nextMock).toHaveBeenCalled();
  });

  test("should properly handle wrong answer", () => {
    render(<QuestionForm />);

    fireEvent.change(screen.getByPlaceholderText("Type in your answer"), {
      target: { value: "atlantic" },
    });
    fireEvent.click(screen.getByRole("button"));

    expect(decreaseChances).toHaveBeenCalled();
    expect(nextMock).toHaveBeenCalled();
  });
});
