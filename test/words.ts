/** Собирает все строковые значения из произвольно вложенного i18n-поддерева. */
export function collectStrings(node: unknown): string[] {
  if (typeof node === "string") return [node];
  if (Array.isArray(node)) return node.flatMap(collectStrings);
  if (node !== null && typeof node === "object") {
    return Object.values(node as Record<string, unknown>).flatMap(collectStrings);
  }
  return [];
}

/** Количество слов в поддереве словаря (разделитель — всё, кроме букв и цифр). */
export function wordCount(node: unknown): number {
  return collectStrings(node)
    .join(" ")
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean).length;
}

/** Рекурсивно собирает пути ключей до строковых листьев (для проверки парити RU/EN). */
export function keyPaths(node: unknown, prefix = ""): string[] {
  if (typeof node === "string") return [prefix];
  if (Array.isArray(node)) {
    return node.flatMap((value, index) => keyPaths(value, `${prefix}.${index}`));
  }
  if (node !== null && typeof node === "object") {
    return Object.entries(node as Record<string, unknown>).flatMap(([key, value]) =>
      keyPaths(value, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [];
}
