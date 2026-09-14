import { JSDOM } from "jsdom";
import { populateGlobal } from "vitest/environments";

/**
 * jsdom-окружение Vitest, которое после populateGlobal возвращает родные
 * Node-совместимые AbortController/AbortSignal.
 *
 * Зачем: vitest копирует все window-ключи (включая `AbortController` и
 * `AbortSignal`) с jsdom-реализацией на глобал тестового воркера. При этом
 * `Request`/`fetch` остаются undici-реализацией Node, а undici проверяет
 * сигнал через instanceof собственного AbortSignal — сигнал из jsdom-реализации
 * не проходит, и data-роутер React Router падает при любой навигации с
 * «RequestInit: Expected signal (...) to be an instance of AbortSignal».
 *
 * Решение: до populateGlobal снимаем оригинальные (Node) классы и после
 * копирования глобальных ключей переназначаем их обратно через сеттер
 * overrideObject (populateGlobal хранит override в map и отдаёт его из геттера).
 */
export default {
  name: "login-ai-jsdom",
  transformMode: "web",
  setup(
    global: Record<string, unknown>,
    { jsdom = {} }: { jsdom?: { url?: string; pretendToBeVisual?: boolean } } = {},
  ): { teardown(global: Record<string, unknown>): void } {
    const url = jsdom.url ?? "http://localhost:3000";
    const pretendToBeVisual = jsdom.pretendToBeVisual ?? true;

    const dom = new JSDOM("<!DOCTYPE html>", {
      url,
      pretendToBeVisual,
      runScripts: "dangerously",
    });

    const originalAbortController = global.AbortController;
    const originalAbortSignal = global.AbortSignal;

    const { keys, originals } = populateGlobal(global, dom.window, { bindFunctions: true });
    global.jsdom = dom;

    global.AbortController = originalAbortController;
    global.AbortSignal = originalAbortSignal;

    return {
      teardown(teardownGlobal: Record<string, unknown>) {
        dom.window.close();
        delete teardownGlobal.jsdom;
        keys.forEach((key) => {
          delete teardownGlobal[key];
        });
        originals.forEach((value, key) => {
          (teardownGlobal as Record<string | symbol, unknown>)[key] = value;
        });
      },
    };
  },
};
