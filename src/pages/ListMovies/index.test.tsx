import { vi } from "vitest";

import { render, screen, waitFor, fireEvent } from "@Tests/customRender";

import { useMainLayout } from "@Pages/Main";
import { useMovies } from "@/core/hooks/useMovies";
import { generateMovies } from "@Mocks/listMovies";

import ListMoviesPage from "./";

vi.mock("@/core/hooks/useMovies", () => ({
  useMovies: vi.fn(),
}));

describe("ListMovies Page", () => {
  beforeEach(() => {
    (useMainLayout as any).mockReturnValue({
      setModuleName: vi.fn(),
    });
  });

  it("Should render list of movies", async () => {
    const mockMovies = generateMovies(false, false);

    (useMovies as any).mockReturnValue({
      movies: mockMovies,
      currentPage: 0,
      totalPages: 1,
      setCurrentPage: vi.fn(),
    });

    render(<ListMoviesPage />);

    const content = await screen.getByTestId("movies-page");
    expect(content).not.toBeNull();

    await waitFor(() => {
      expect(screen.queryByText("1990")).not.toBeNull();
      expect(screen.queryByText("Bad Movie 1")).not.toBeNull();
      expect(screen.queryByText("1991")).not.toBeNull();
      expect(screen.queryByText("Bad Movie 2")).not.toBeNull();
    });
  });

  it("Should filter movies by year", async () => {
    const mockMovies = generateMovies(false, true);

    (useMovies as any).mockImplementation((pageSize, filters) => {
      const filteredMovies = mockMovies.filter((movie) =>
        filters.yearFilter ? movie.year.toString() === filters.yearFilter : true
      );

      return {
        movies: filteredMovies,
        currentPage: 0,
        totalPages: 1,
        setCurrentPage: vi.fn(),
      };
    });

    render(<ListMoviesPage />);

    const yearInput = screen.getByTestId("year-filter");
    fireEvent.change(yearInput, { target: { value: "1991" } });

    await waitFor(() => {
      expect(screen.queryByText("1990")).toBeNull();
      expect(screen.queryByText("Bad Movie 1")).toBeNull();
      expect(screen.queryByText("1991")).not.toBeNull();
      expect(screen.queryByText("Bad Movie 2")).not.toBeNull();
    });
  });
});
