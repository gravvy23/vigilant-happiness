import { render, screen } from "@testing-library/react";
import { Results } from "../Results";
import { useAppSelector as useAppSelectorMocked } from "../../../hooks";

const useAppSelector = useAppSelectorMocked as jest.MockedFunction<
  typeof useAppSelectorMocked
>;

const points = 12;
const chances = 2;

jest.mock("../../../hooks", () => ({
  ...jest.requireActual("../../../hooks"),
  useAppSelector: jest.fn(),
}));

beforeEach(() => {
  useAppSelector.mockReturnValue({ points, chances });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("<Results />", () => {
  test("should render information about current score", () => {
    render(<Results />);

    expect(screen.getByText(points)).toBeInTheDocument();
  });
  test("should render information about current chances", () => {
    render(<Results />);

    expect(screen.getByText(chances)).toBeInTheDocument();
  });
});
