/**
 * Re-export news entity types and utilities for backward compatibility.
 * @deprecated Import directly from "@/entities/news/model/news" instead.
 */
export {
  estimateReadingTime,
  filterNewsForLang,
  isNewsLang,
  NEWS_LANGS,
  type NewsAuthor,
  type NewsCategory,
  type NewsData,
  type NewsItem,
  type NewsLang,
  newsArticlePath,
  newsSectionPath,
  parseNewsId,
  sortNewsByDateDesc,
  toNewsEntityRefs,
  toNewsItem,
} from "@/entities/news/model/news";
