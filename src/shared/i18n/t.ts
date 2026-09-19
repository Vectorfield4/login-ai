type Variables = Record<string, string | number>;

function resolvePath(source: unknown, key: string): unknown {
  let node: unknown = source;
  for (const segment of key.split(".")) {
    if (node == null) return undefined;
    node = (node as Record<string, unknown>)[segment];
  }
  return node;
}

function interpolate(name: string, vars: Variables, fallback: string): string {
  return Object.hasOwn(vars, name) ? String(vars[name]) : fallback;
}

/**
 * Build-time переводчик: точечная навигация по плоскому словарю и
 * интерполяция `{{var}}`/`{var}` (совместимо с i18next-синтаксисом).
 * Словари — plain-объекты RU/EN из `src/`, i18next/runtime не используются.
 * Неизвестный ключ возвращается как есть (видно в билде, не ломает сборку).
 */
export type TFunc = (key: string, vars?: Variables) => string;

export function createT<L extends string, D>(lang: L, dicts: Record<L, D>): TFunc {
  const dict: unknown = dicts[lang];
  return (key, vars) => {
    const value = resolvePath(dict, key);
    if (typeof value !== "string") return key;
    if (!vars) return value;
    return value
      .replace(/\{\{\s*(\w+)\s*\}\}/g, (match, name: string) => interpolate(name, vars, match))
      .replace(/\{\s*(\w+)\s*\}/g, (match, name: string) => interpolate(name, vars, match));
  };
}
