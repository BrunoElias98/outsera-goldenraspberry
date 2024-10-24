import { vi } from "vitest";

import { act, render, screen, waitFor } from "@Tests/customRender";

import { fetchMultipleWinners } from "@Services/movies";

import MultipleWinners from "./";

vi.mock("@Services/movies", () => ({
  fetchMultipleWinners: vi.fn(),
}));

describe("MultipleWinners Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should render initial page state", async () => {
    await act(async () => {
      (fetchMultipleWinners as any).mockResolvedValueOnce([
        { year: 1990, winnerCount: 2 },
        { year: 1995, winnerCount: 3 },
      ]);

      render(<MultipleWinners />);
    });

    const titleElement = screen.getByTestId("multiple-winners-page");
    expect(titleElement).not.toBeNull();

    expect(screen.getByText("Year")).not.toBeNull();
    expect(screen.getByText("Win Count")).not.toBeNull();
  });

  it("Should render data after loading", async () => {
    await act(async () => {
      (fetchMultipleWinners as any).mockResolvedValueOnce([
        { year: 1990, winnerCount: 2 },
        { year: 1995, winnerCount: 3 },
      ]);

      render(<MultipleWinners />);
    });

    await waitFor(() => {
      expect(screen.getByText("1990")).not.toBeNull();
      expect(screen.getByText("2")).not.toBeNull();
      expect(screen.getByText("1995")).not.toBeNull();
      expect(screen.getByText("3")).not.toBeNull();
    });
  });
});
