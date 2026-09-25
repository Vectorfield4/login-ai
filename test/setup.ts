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
