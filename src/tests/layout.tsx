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

  vi.mock("@/core/hooks/useMovies", () => ({
    useMovies: vi.fn(),
  }));

  vi.mock("react-hook-form", () => {
    const originalModule = vi.importActual("react-hook-form");
    return {
      ...originalModule,
      useForm: () => ({
        register: vi.fn(),
        watch: vi.fn(),
        setValue: vi.fn(),
        reset: vi.fn(),
      }),
    };
  });
};
