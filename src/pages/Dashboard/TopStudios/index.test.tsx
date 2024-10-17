import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { fetchTopStudios } from "@Services/movies";

import TopStudios from "./";

vi.mock("@Services/movies", () => ({
  fetchTopStudios: vi.fn(),
}));

describe("TopStudios Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Renders the title and table headers", async () => {
    (fetchTopStudios as any).mockResolvedValueOnce([
      { name: "Studio A", winCount: 5 },
      { name: "Studio B", winCount: 3 },
      { name: "Studio C", winCount: 2 },
    ]);

    render(<TopStudios />);

    const title = screen.getByText(/Top 3 studios with winners/i);
    expect(title).not.to.be.null;

    expect(screen.getByText("Studio")).not.to.be.null;
    expect(screen.getByText("Win Count")).not.to.be.null;
  });

  it("Renders the studios' data after loading", async () => {
    (fetchTopStudios as any).mockResolvedValueOnce([
      { name: "Studio A", winCount: 5 },
      { name: "Studio B", winCount: 3 },
      { name: "Studio C", winCount: 2 },
    ]);

    render(<TopStudios />);

    await waitFor(() => {
      expect(screen.getByText("Studio A")).not.to.be.null;
      expect(screen.getByText("5")).not.to.be.null;
      expect(screen.getByText("Studio B")).not.to.be.null;
      expect(screen.getByText("3")).not.to.be.null;
      expect(screen.getByText("Studio C")).not.to.be.null;
      expect(screen.getByText("2")).not.to.be.null;
    });
  });
});
