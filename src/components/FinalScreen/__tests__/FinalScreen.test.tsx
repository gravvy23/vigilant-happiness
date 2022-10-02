import { render, screen, fireEvent } from "@testing-library/react";
import { FinalScreen } from "../FinalScreen";
import {
  useAppDispatch as useAppDispatchMocked,
  useAppSelector as useAppSelectorMocked,
} from "../../../hooks";
import { resetCounter as resetCounterMocked } from "../../../features/counter/counterSlice";
import { resetQuestions as resetQuestionsMocked } from "../../../features/question/questionSlice";

const useAppDispatch = useAppDispatchMocked as jest.MockedFunction<
  typeof useAppDispatchMocked
>;
const useAppSelector = useAppSelectorMocked as jest.MockedFunction<
  typeof useAppSelectorMocked
>;
const resetCounter = resetCounterMocked as jest.MockedFunction<
  typeof resetCounterMocked
>;
const resetQuestions = resetQuestionsMocked as jest.MockedFunction<
  typeof resetQuestionsMocked
>;

const points = 23;

jest.mock("../../../hooks", () => ({
  ...jest.requireActual("../../../hooks"),
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

jest.mock("../../../features/counter/counterSlice", () => ({
  ...jest.requireActual("../../../features/counter/counterSlice"),
  resetCounter: jest.fn(),
}));

jest.mock("../../../features/question/questionSlice", () => ({
  ...jest.requireActual("../../../features/question/questionSlice"),
  resetQuestions: jest.fn(),
}));

beforeEach(() => {
  useAppSelector.mockReturnValue({ points });
  useAppDispatch.mockReturnValue(jest.fn());
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("<FinalScreen />", () => {
  test("should render points", () => {
    render(<FinalScreen />);

    expect(
      screen.getByText(`Your score is ${points} points`)
    ).toBeInTheDocument();
  });

  test("should restart game on button click", () => {
    render(<FinalScreen />);
    fireEvent.click(screen.getByRole("button"));

    expect(resetCounter).toBeCalled();
    expect(resetQuestions).toBeCalled();
  });
});
