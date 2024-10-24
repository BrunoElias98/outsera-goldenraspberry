import { vi } from "vitest";

import { render, screen, waitFor } from "@Tests/customRender";

import { fetchProducers } from "@Services/movies";

import Producers from "./";

vi.mock("@Services/movies", () => ({
  fetchProducers: vi.fn(),
}));

describe("Producers Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("Should render page state initially", async () => {
    (fetchProducers as any).mockResolvedValueOnce({
      min: [
        {
          producer: "Producer 1",
          interval: 1,
          previousWin: 2000,
          followingWin: 2001,
        },
      ],
      max: [
        {
          producer: "Producer 2",
          interval: 5,
          previousWin: 1990,
          followingWin: 1995,
        },
      ],
    });

    render(<Producers />);

    expect(screen.getByText("Loading...")).not.toBeNull();

    await waitFor(() => {
      expect(screen.getByTestId("producers-page")).not.toBeNull();
    });
  });

  it("Should render producers data after loading", async () => {
    (fetchProducers as any).mockResolvedValueOnce({
      min: [
        {
          producer: "Producer 1",
          interval: 1,
          previousWin: 2000,
          followingWin: 2001,
        },
      ],
      max: [
        {
          producer: "Producer 2",
          interval: 5,
          previousWin: 1990,
          followingWin: 1995,
        },
      ],
    });

    render(<Producers />);

    await waitFor(() => {
      expect(screen.getByTestId("producers-page")).not.toBeNull();
    });

    expect(screen.queryByText("Producer 2")).not.toBeNull();
    expect(screen.queryByText("5")).not.toBeNull();
    expect(screen.queryByText("1990")).not.toBeNull();
    expect(screen.queryByText("1995")).not.toBeNull();

    expect(screen.queryByText("Producer 1")).not.toBeNull();
    expect(screen.queryByText("1")).not.toBeNull();
    expect(screen.queryByText("2000")).not.toBeNull();
    expect(screen.queryByText("2001")).not.toBeNull();
  });
});
