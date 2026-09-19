import { darkTheme } from "./tokens.stylex.ts";

/**
 * Классы StyleX-темы darkTheme (createTheme компилируется в объект
 * `{ [varGroupHash]: "<overrideClass> <varGroupHash>", $$css: true }`).
 * BaseLayout кладёт их в data-theme-class на <html>, инлайн-скрипт добавляет
 * класс при тёмной схеме — hashed-переменные компонентов переопределяются.
 */
const themeClasses = Object.values(darkTheme).filter(
  (value): value is string => typeof value === "string",
);

export const darkThemeClassName = themeClasses.join(" ");
