import { vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@Tests/customRender";
import { fetchMoviesByYear } from "@Services/movies";
import ListMoviesByYear from "./";

vi.mock("@Services/movies", () => ({
  fetchMoviesByYear: vi.fn(),
}));

describe("ListMoviesByYear Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should render initial state correctly", () => {
    render(<ListMoviesByYear />);

    expect(screen.getByTestId("list-movies-by-year-page")).not.toBeNull();
    expect(screen.getByTestId("input-search")).not.toBeNull();
    expect(screen.getByTestId("button-submit")).not.toBeNull();
  });

  it("Should render movies after searching for a year", async () => {
    const mockMovies = [
      {
        id: 1,
        year: 2010,
        title: "Movie One",
        studios: ["Studio A"],
        producers: ["Producer A"],
        winner: true,
      },
      {
        id: 2,
        year: 2010,
        title: "Movie Two",
        studios: ["Studio B"],
        producers: ["Producer B"],
        winner: true,
      },
    ];

    (fetchMoviesByYear as any).mockResolvedValueOnce(mockMovies);

    render(<ListMoviesByYear />);

    const yearInput = screen.getByTestId("input-search");
    fireEvent.change(yearInput, { target: { value: "2010" } });

    const searchButton = screen.getByTestId("button-submit");
    fireEvent.click(searchButton);

    expect(screen.getByText("Loading...")).not.toBeNull();

    await waitFor(() => {
      expect(screen.getByText("Movie One")).not.toBeNull();
      expect(screen.getByText("Movie Two")).not.toBeNull();
    });
  });
});
