import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Появление заголовков при входе во вьюпорт — каскадом по словам.
 *
 * КОНТРАКТ РАЗМЕТКИ, два писателя: `data-reveal` ставит атом
 * `shared/ui/atoms/Typography.tsx` (визуальные H1/H2), а заголовки внутри
 * статьи приходят из markdown сырыми тегами мимо атома — их ловим по `.prose`.
 * По тегу селектор не строится: `FeatureCard` верстает заголовок карточки как
 * `h2`, и сетка карточек замигала бы при прокрутке.
 *
 * ПОЧЕМУ ОТДЕЛЬНЫЙ СКРИПТ, А НЕ ХУК В АТОМЕ: заголовки `.astro`-страниц
 * рендерятся в статику и не гидрируются, поэтому IntersectionObserver в
 * компоненте на них не запустится. Скрипт один на сайт и работает с готовым
 * DOM — ровно тем, что уже есть в статике.
 *
 * ПОЧЕМУ `tag: "span"`: в заголовке только фразовое содержимое, а `div`, который
 * SplitText ставит по умолчанию, внутри `h1` невалиден. На `span` браузер не
 * рисует трансформации, поэтому `display: inline-block` задаём сами — ровно то,
 * что SplitText делает для `div`.
 *
 * SplitText сам отдаёт скринридеру полный текст заголовка: ставит себе
 * `aria-label`, а свои слова помечает `aria-hidden`, поэтому имя не меняется и
 * скринридер не читает слова по два раза.
 *
 * `revert()` после каскада возвращает исходную разметку: в покое заголовок —
 * снова обычный текст, который можно выделить, найти поиском и перенести.
 * Пока анимация не дошла до конца (её сняли досрочно, страница ушла в
 * background), разметку возвращает `revert` самого matchMedia-контекста.
 */

const revealedSelector = "[data-reveal], .prose h2, .prose h3, .prose h4";

export function revealHeadings(root: ParentNode = document): void {
  const headings = Array.from(root.querySelectorAll<HTMLElement>(revealedSelector));
  if (headings.length === 0) return;

  const media = gsap.matchMedia();
  // Контекст — это и гейт по «меньше движения», и точка отката: смена системной
  // настройки пересобирает анимацию, а не оставляет её на середине.
  media.add("(prefers-reduced-motion: no-preference)", () => {
    const splits: SplitText[] = [];

    for (const heading of headings) {
      const split = SplitText.create(heading, { type: "words", tag: "span" });
      splits.push(split);
      gsap.set(split.words, { display: "inline-block" });
      gsap.from(split.words, {
        opacity: 0,
        yPercent: 40,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05,
        scrollTrigger: { trigger: heading, start: "top 85%", once: true },
        onComplete: () => split.revert(),
      });
    }

    return () => {
      for (const split of splits) split.revert();
    };
  });
}
