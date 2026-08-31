import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll, beforeEach } from "vitest";
import i18n from "../i18n";
import { server } from "./server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Тесты всегда стартуют с русской локали; localStorage очищается между тестами
beforeEach(() => {
  window.localStorage.clear();
  void i18n.changeLanguage("ru");
});
