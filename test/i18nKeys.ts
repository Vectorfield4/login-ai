/** Проверка, что точечный ключ i18n существует в словаре (значение — строка). */
export function dictionaryHasKey(dict: object, key: string): boolean {
  let node: unknown = dict;
  for (const part of key.split(".")) {
    if (node === null || typeof node !== "object" || !(part in node)) {
      return false;
    }
    node = (node as Record<string, unknown>)[part];
  }
  return typeof node === "string";
}
