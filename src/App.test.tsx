import { render, screen, waitFor } from "@Tests/customRender";

import App from "./App";

test("renders loading fallback and then the application title", async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByTestId("dashboard-page")).not.toBeNull();
  });
});
