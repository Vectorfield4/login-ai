import "@testing-library/jest-dom/vitest";
import { beforeEach } from "vitest";

// Tests always start with the Russian locale; localStorage is cleared between runs
beforeEach(() => {
  window.localStorage.clear();
});

// jsdom implements no scroll — stub it with a noop so client islands do not
// crash when a script scrolls to an anchor
Object.defineProperty(window, "scrollTo", {
  value: () => {},
  writable: true,
});

// The custom jsdom environment exposes no matchMedia, while client islands read
// breakpoints through useMatchMedia — stub it with a non-matching MediaQueryList
// so components render their desktop branch by default
if (typeof window.matchMedia !== "function") {
  const createMediaQueryList = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;

  Object.defineProperty(window, "matchMedia", {
    value: createMediaQueryList,
    writable: true,
  });
}
