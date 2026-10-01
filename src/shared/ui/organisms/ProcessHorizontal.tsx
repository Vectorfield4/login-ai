import * as stylex from "@stylexjs/stylex";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import type { ProcessItem } from "@/shared/types/content";
import { Card, CardContent } from "@/shared/ui/atoms/Card";
import { Container } from "@/shared/ui/atoms/Container";
import { Section } from "@/shared/ui/atoms/Section";
import { Typography } from "@/shared/ui/atoms/Typography";
import { ProcessDecor } from "@/shared/ui/molecules/ProcessDecor";
import { SectionHeader } from "@/shared/ui/molecules/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

/** Ряд шагов уводится вбок только там, где карточки в ряд ещё читаются;
 *  на узком экране остаётся колонка. */
const WIDE_QUERY = "(min-width: 900px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

const styles = stylex.create({
  // Пинится целиком: заголовок секции + ряд карточек.
  viewport: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing4,
  },
  viewportPinned: {
    minHeight: "100vh",
    justifyContent: "center",
    overflow: "hidden",
  },
  // Дефолт — колонка. Ряд включается только после замера: собранный HTML без
  // JavaScript остаётся вертикальным списком шагов.
  track: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing3,
    marginBlock: 0,
    padding: 0,
    listStyleType: "none",
  },
  trackRow: {
    flexDirection: "row",
    alignItems: "stretch",
    willChange: "transform",
    // Лента выходит за Container, но первая карточка встаёт на его левую
    // границу — иначе ряд визуально съезжает из колонки контента.
    paddingInline: "max(24px, calc((100vw - 1120px) / 2))",
  },
  item: {
    display: "flex",
    flexShrink: 0,
    width: "100%",
  },
  itemRow: {
    width: "min(360px, 78vw)",
  },
  card: { width: "100%", display: "flex" },
  cardContent: { display: "flex", flexDirection: "column", gap: tokens.spacing15, width: "100%" },
  step: { fontVariantNumeric: "tabular-nums" },
});

/**
 * Блок «процесс» на детальных страницах услуг и решений.
 *
 * Списком вниз шаги читаются как документация, поэтому лента уводится вбок:
 * секция пинится, трек едет по X на длину переполнения (scrub) — так же, как
 * устроены остальные длинные блоки сайта.
 *
 * ПРОГРЕССИВНОЕ УЛУЧШЕНИЕ, а не подмена блока: разметка одна, `ProcessSection`
 * рядом не рендерится (иначе текст шагов продублировался бы в HTML), а дефолт
 * в CSS — вертикальная колонка. Пин включается из `useEffect`, то есть уже в
 * браузере: `dist/` без JavaScript остаётся обычным списком шагов, доступным
 * поиску и скринридеру. На узком экране и при `prefers-reduced-motion: reduce`
 * лента не включается вовсе.
 *
 * Анимация декоров (`data-part`/`data-origin` в `ProcessDecor`) живёт здесь же,
 * одним контекстом GSAP: `ctx.revert()` на размонтировании снимает и твин
 * скролла, и вращение шестерёнок, поэтому ушедшие со страницы твины не
 * остаются работать в фоне.
 *
 * СТРАНИЦЫ ГИДРИРУЮТ ЕГО ЧЕРЕЗ `client:load`, а не `client:visible`: переход
 * «колонка → лента» меняет высоту секции примерно вдвое, и при ленивой
 * гидрации этот скачок пришёлся бы на момент, когда пользователь как раз
 * доезжает до блока. GSAP и ScrollTrigger всё равно грузятся на каждой
 * странице (`revealHeadings`), поэтому разницы в весе почти нет.
 */
export function ProcessHorizontal({
  alt,
  title,
  eyebrow,
  items,
  lang,
}: {
  alt?: boolean;
  title?: string;
  eyebrow?: string;
  items: ProcessItem[];
  lang: AppLang;
}) {
  const t = useT(lang);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [row, setRow] = useState(false);

  useEffect(() => {
    if (window.matchMedia(REDUCED_QUERY).matches) return;
    if (!window.matchMedia(WIDE_QUERY).matches) return;
    setRow(true);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!row || !viewport || !track) return;

    // Ряд уже в разметке: мерим реальные ширины, а не считаем по константам —
    // длина текста в RU и EN разная, и длина ленты тоже.
    const distance = track.scrollWidth - viewport.clientWidth;
    if (distance <= 0) {
      setRow(false);
      return;
    }

    const ctx = gsap.context(() => {
      // `containerAnimation` ждёт именно анимацию, а не её ScrollTrigger:
      // GSAP сам достаёт из твина созданный триггер и переводит координаты
      // старта/конца в систему координат движущегося трека.
      const containerAnimation = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: viewport,
          start: "top top",
          end: () => `+=${track.scrollWidth - viewport.clientWidth}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Появление карточек привязано к горизонтали: без `containerAnimation`
      // старт и конец триггера считались бы по вертикали и сработали разом
      // при входе в секцию.
      for (const card of gsap.utils.toArray<HTMLElement>("[data-process-card]", track)) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: card,
              containerAnimation,
              start: "left 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // Шестерёнки: соседние крутятся в разные стороны и с разным периодом,
      // иначе ряд читается как гирлянда, а не как связанная передача.
      for (const gear of gsap.utils.toArray<SVGGElement>('[data-part="gear"]', track)) {
        gsap.to(gear, {
          rotation: 360,
          svgOrigin: gear.dataset.origin ?? "0 0",
          repeat: -1,
          duration: Number(gear.dataset.duration ?? 9000) / 1000,
          ease: "none",
        });
      }

      // Блокнот: строки проступают слева направо, как заполнение анкеты.
      for (const line of gsap.utils.toArray<SVGElement>('[data-part="line"]', track)) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            svgOrigin: line.dataset.origin ?? "0 0",
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.12,
            repeat: -1,
            repeatDelay: 2.6,
          },
        );
      }

      // Поток данных: штрих ползёт по линии, точки идут по своему пути.
      for (const flow of gsap.utils.toArray<SVGElement>('[data-part="flow"]', track)) {
        gsap.to(flow, { strokeDashoffset: -44, repeat: -1, duration: 1.6, ease: "none" });
      }
      for (const pulse of gsap.utils.toArray<SVGCircleElement>('[data-part="pulse"]', track)) {
        gsap.to(pulse, {
          x: Number(pulse.dataset.distance ?? 280),
          repeat: -1,
          duration: 2.4,
          ease: "none",
        });
      }

      // Нейтральный декор: медленные кольца, чтобы ряд не выглядел пустым.
      for (const ring of gsap.utils.toArray<SVGGElement>('[data-part="ring"]', track)) {
        gsap.to(ring, {
          rotation: -360,
          svgOrigin: ring.dataset.origin ?? "0 0",
          repeat: -1,
          duration: 14,
          ease: "none",
        });
      }
    }, viewport);

    return () => ctx.revert();
  }, [row]);

  if (items.length === 0) return null;

  return (
    <Section alt={alt} label={title ? t(title) : undefined}>
      <div ref={viewportRef} {...stylex.props(styles.viewport, row && styles.viewportPinned)}>
        {title ? (
          <Container>
            <SectionHeader eyebrow={eyebrow ? t(eyebrow) : undefined} title={t(title)} />
          </Container>
        ) : null}
        <ol ref={trackRef} {...stylex.props(styles.track, row && styles.trackRow)}>
          {items.map((item, index) => (
            <li
              key={item.title}
              data-process-card=""
              {...stylex.props(styles.item, row && styles.itemRow)}
            >
              <Card style={styles.card}>
                <CardContent style={styles.cardContent}>
                  <ProcessDecor processType={item.processType} />
                  <Typography variant="body2" color="primary" style={styles.step}>
                    {index + 1}
                  </Typography>
                  <Typography variant="h6">{t(item.title)}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {t(item.text)}
                  </Typography>
                </CardContent>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
