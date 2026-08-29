import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import type { Preview } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from "../src/theme";

const queryClient = new QueryClient();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Story />
        </ThemeProvider>
      </QueryClientProvider>
    ),
  ],
};

export default preview;
