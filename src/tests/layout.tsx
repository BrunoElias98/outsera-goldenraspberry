import { vi } from "vitest";

export const setupMockLayout = () => {
  vi.mock("@Pages/Main", async () => {
    const actual = await vi.importActual<any>("@Pages/Main");
    return {
      ...actual,
      useMainLayout: vi.fn(() => ({
        moduleName: "Dashboard",
        setModuleName: vi.fn(),
      })),
      MainLayoutProvider: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
      ),
    };
  });
};
