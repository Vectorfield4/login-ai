import { localizePath, SUPPORTED_LANGS } from "@/shared/i18n";
import { caseFixtures } from "@/shared/mocks/fixtures/cases";
import { serviceFixtures } from "@/shared/mocks/fixtures/services";
import { solutionFixtures } from "@/shared/mocks/fixtures/solutions";

/**
 * Единый генератор маршрутов сайта. Чистые пути без языкового префикса;
 * detail-пути строятся из slug'ов синхронных фикстур — добавление новой
 * страницы в фикстуры автоматически расширяет и роутер, и пререндер,
 * и sitemap.
 */
export function getAllPaths(): string[] {
  const staticPaths = ["/", "/services", "/cases", "/investors", "/contacts"];
  const servicePaths = serviceFixtures.map((service) => `/services/${service.slug}`);
  const solutionPaths = solutionFixtures.map((solution) => `/solutions/${solution.slug}`);
  const casePaths = caseFixtures.map((caseData) => `/cases/${caseData.slug}`);
  return [...staticPaths, ...servicePaths, ...solutionPaths, ...casePaths];
}

/** Итоговые URL для пререндера и sitemap: чистый путь × язык. */
export function getPrerenderRoutes(): string[] {
  return getAllPaths().flatMap((path) =>
    SUPPORTED_LANGS.map((lang) => localizePath(path, lang)),
  );
}