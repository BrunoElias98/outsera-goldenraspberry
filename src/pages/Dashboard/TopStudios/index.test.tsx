import { vi } from "vitest";

import { render, screen, waitFor } from "@Tests/customRender";

import { fetchTopStudios } from "@Services/movies";

import TopStudios from "./";

vi.mock("@Services/movies", () => ({
  fetchTopStudios: vi.fn(),
}));

describe("TopStudios Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should render title and table headers", async () => {
    (fetchTopStudios as any).mockResolvedValueOnce([
      { name: "Studio A", winCount: 5 },
      { name: "Studio B", winCount: 3 },
      { name: "Studio C", winCount: 2 },
    ]);

    render(<TopStudios />);

    await waitFor(() => {
      expect(screen.getByTestId("top-studios-page")).not.toBeNull();
    });

    expect(screen.getByText("Name")).not.to.be.null;
    expect(screen.getByText("Win Count")).not.to.be.null;
  });

  it("Should render studios data after loading", async () => {
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
