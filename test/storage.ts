/**
 * jsdom 26 в этом окружении (Node 26 + Vitest) не предоставляет window.localStorage
 * (опорный origin есть, но свойство не инициализируется). Тесты полагаются на
 * localStorage (язык, тема, порядок меню) — подставляем лёгкую in-memory Storage.
 * Файл подключён первым в setupFiles (до i18n и остальных setup-модулей).
 */

class MemoryStorage implements Storage {
  private readonly store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
}

if (typeof window !== "undefined" && typeof window.localStorage === "undefined") {
  Object.defineProperty(window, "localStorage", {
    value: new MemoryStorage(),
    configurable: true,
    writable: true,
  });
}

export {};
