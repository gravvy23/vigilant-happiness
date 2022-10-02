import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { App } from "./App";
import { store } from "./app/store";
import { useAppSelector as useAppSelectorMocked } from "./hooks";

const useAppSelector = useAppSelectorMocked as jest.MockedFunction<
  typeof useAppSelectorMocked
>;

const wrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

jest.mock("./components", () => ({
  ...jest.requireActual("./components"),
  QuestionForm: () => <div>QuestionForm</div>,
  FinalScreen: () => <div>FinalScreen</div>,
}));

jest.mock("./hooks", () => ({
  ...jest.requireActual("./hooks"),
  useAppSelector: jest.fn(),
}));

beforeEach(() => {
  useAppSelector.mockReturnValue({ chances: 3 });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("<App />", () => {
  test("should render QuestionForm when chances greater than 0", () => {
    useAppSelector.mockReturnValue({ chances: 3 });
    render(wrapper());

    expect(screen.getByText("QuestionForm")).toBeInTheDocument();
    expect(screen.queryByText("FinalScreen")).not.toBeInTheDocument();
  });
  test("should render FinalScreen when chances equals 0", () => {
    useAppSelector.mockReturnValue({ chances: 0 });
    render(wrapper());

    expect(screen.getByText("FinalScreen")).toBeInTheDocument();
    expect(screen.queryByText("QuestionForm")).not.toBeInTheDocument();
  });
});
