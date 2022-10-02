import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { resetQuestions } from "../../features/question/questionSlice";
import { useGetQuestionsQuery as useGetQuestionsQueryMocked } from "../../services/quiz";
import { useGetQuizQuestion } from "../useGetQuizQuestion";

const dataMock = {
  questions: [
    {
      question: "A",
      answerSha1: "A",
    },
    {
      question: "B",
      answerSha1: "B",
    },
    {
      question: "C",
      answerSha1: "C",
    },
  ],
};
const refetchMock = jest.fn();

const useGetQuestionsQuery = useGetQuestionsQueryMocked as jest.MockedFunction<
  typeof useGetQuestionsQueryMocked
>;

function GetQuizQuestion() {
  const { currentQuestion, isFetching, next } = useGetQuizQuestion();

  return (
    <div>
      <div data-testid="question">{currentQuestion?.question}</div>
      <div data-testid="isFetching">{isFetching.toString()}</div>
      <button onClick={next}>next</button>
    </div>
  );
}

const wrapper = () => (
  <Provider store={store}>
    <GetQuizQuestion />
  </Provider>
);

jest.mock("../../services/quiz", () => ({
  ...jest.requireActual("../../services/quiz"),
  useGetQuestionsQuery: jest.fn(),
}));

beforeEach(() => {
  useGetQuestionsQuery.mockReturnValue({
    isFetching: false,
    refetch: refetchMock,
    data: dataMock,
  });
});

afterEach(() => {
  jest.clearAllMocks();
  store.dispatch(resetQuestions());
});

describe("useGetQuizQuestion", () => {
  test("should return current question", () => {
    render(wrapper());

    expect(screen.getByTestId("question")).toHaveTextContent(
      dataMock.questions[0].question
    );
  });

  test("should properly handle fetching state", () => {
    useGetQuestionsQuery.mockReturnValue({
      isFetching: true,
      refetch: jest.fn(),
      data: dataMock,
    });
    render(wrapper());

    expect(screen.getByTestId("isFetching")).toHaveTextContent("true");
  });

  test("should properly handle taking next question", () => {
    render(wrapper());
    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByTestId("question")).toHaveTextContent(
      dataMock.questions[1].question
    );
  });

  test("should refetch after using all questions", () => {
    render(wrapper());
    for (let i = 0; i < dataMock.questions.length; ++i) {
      fireEvent.click(screen.getByRole("button"));
    }

    expect(refetchMock).toHaveBeenCalled();
  });
});
