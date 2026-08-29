import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";
import { theme } from "./theme";

function renderApp() {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>,
  );
}

describe("App", () => {
  it("renders the heading", () => {
    renderApp();
    expect(screen.getByRole("heading", { name: /login ai/i })).toBeInTheDocument();
  });

  it("renders a solution page", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={["/solutions/computer-vision"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );
    expect(
      screen.getByRole("heading", { name: /внедрение компьютерного зрения/i }),
    ).toBeInTheDocument();
  });

  it("renders the services page", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={["/services"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );
    expect(screen.getByRole("heading", { name: /услуги/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /разработка по/i })).toBeInTheDocument();
  });

  it("renders a service page with software categories", () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={["/services/software-development"]}>
            <App />
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>,
    );
    expect(
      screen.getByRole("heading", { name: /разработка программного обеспечения/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /виды программного обеспечения и технологии/i }),
    ).toBeInTheDocument();
  });
});
