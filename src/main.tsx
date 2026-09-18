import { QueryClient } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AppTree } from "@/app/AppTree";
import App from "@/app/App";
import "@/app/i18n";
import { getLangFromPath, setLanguage } from "@/shared/i18n";

// URL — единственный источник правды о языке: ставим его до первого рендера,
// чтобы синхронный рендер (гидратация/пререндер) совпал с SSR-разметкой.
setLanguage(getLangFromPath(window.location.pathname));

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root not found");
}

const tree = (
  <StrictMode>
    <AppTree queryClient={queryClient}>
      <App />
    </AppTree>
  </StrictMode>
);

// В dev пререндера нет — #root пуст, рендерим с нуля. В production приходит
// отпререндеренный HTML (vite-prerender-plugin), его нужно только гидратировать.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, tree);
} else {
  createRoot(rootElement).render(tree);
}