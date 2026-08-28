import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";

function renderApp() {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={createTheme()}>
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
        <ThemeProvider theme={createTheme()}>
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
});
