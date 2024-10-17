import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";

import { setupMockLayout } from "@/tests/layout";

const customRender = (ui: ReactElement, options?: RenderOptions) => {
  setupMockLayout();

  return render(ui, options);
};

export * from "@testing-library/react";
export { customRender as render };
