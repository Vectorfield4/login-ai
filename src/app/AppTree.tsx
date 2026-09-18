import { CssBaseline } from "@mui/material";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { ThemeProvider } from "@mui/material/styles";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { theme } from "@/shared/config/theme";

/**
 * Провайдеры приложения (тема, CssBaseline, цветовая схема, QueryClient).
 * Используется и на клиенте (src/main.tsx), и в пре-рендере (src/prerender.tsx),
 * чтобы серверная разметка совпала с клиентской при гидратации.
 */
export function AppTree({
  queryClient,
  children,
}: {
  queryClient: QueryClient;
  children: ReactNode;
}) {
  return (
    <>
      <InitColorSchemeScript defaultMode="system" />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme} defaultMode="system">
          <CssBaseline />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}