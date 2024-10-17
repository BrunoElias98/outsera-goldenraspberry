import { vi } from "vitest";

import { render, screen, waitFor, fireEvent } from "@Tests/customRender";

import ListMoviesPage from "./";

import { useMainLayout } from "@Pages/Main";
import { useMovies } from "@/core/hooks/useMovies";
import { generateMovies } from "@Mocks/listMovies";

describe("ListMoviesPage", () => {
  beforeEach(() => {
    (useMainLayout as any).mockReturnValue({
      setModuleName: vi.fn(),
    });
  });

  it("Renders the list of movies", async () => {
    const mockMovies = generateMovies(false, false);

    (useMovies as any).mockReturnValue({
      movies: mockMovies,
      currentPage: 0,
      totalPages: 1,
      setCurrentPage: vi.fn(),
    });

    render(<ListMoviesPage />);

    const titleElement = await screen.findByText(/List of Worst Movies/i);
    expect(titleElement).not.toBeNull();

    await waitFor(() => {
      expect(screen.queryByText("1990")).not.toBeNull();
      expect(screen.queryByText("Bad Movie 1")).not.toBeNull();
      expect(screen.queryByText("1991")).not.toBeNull();
      expect(screen.queryByText("Bad Movie 2")).not.toBeNull();
    });
  });

  it("Filters movies by year", async () => {
    const mockMovies = generateMovies(false, true);

    (useMovies as any).mockReturnValue({
      movies: mockMovies,
      currentPage: 0,
      totalPages: 1,
      setCurrentPage: vi.fn(),
    });

    render(<ListMoviesPage />);

    const yearInput = screen.getByTestId("year-filter");
    fireEvent.change(yearInput, { target: { value: "1991" } });

    const titleElement = await screen.findByText(/List of Worst Movies/i);
    expect(titleElement).not.toBeNull();

    await waitFor(() => {
      expect(screen.queryByText("1990")).not.toBeNull();
      expect(screen.queryByText("Bad Movie 1")).not.toBeNull();
      expect(screen.queryByText("1991")).toBeNull();
      expect(screen.queryByText("Bad Movie 2")).toBeNull();
    });
  });

  it("Filters movies by winner status", async () => {
    const mockMovies = generateMovies(true, false);

    (useMovies as any).mockReturnValue({
      movies: mockMovies,
      currentPage: 0,
      totalPages: 1,
      setCurrentPage: vi.fn(),
    });

    render(<ListMoviesPage />);

    const yearInput = screen.getByTestId("year-filter");
    fireEvent.change(yearInput, { target: { value: "1990" } });

    const titleElement = await screen.findByText(/List of Worst Movies/i);
    expect(titleElement).not.toBeNull();

    await waitFor(() => {
      expect(screen.queryByText("1990")).toBeNull();
      expect(screen.queryByText("Bad Movie 1")).toBeNull();
      expect(screen.queryByText("1991")).not.toBeNull();
      expect(screen.queryByText("Bad Movie 2")).not.toBeNull();
    });
  });
});
