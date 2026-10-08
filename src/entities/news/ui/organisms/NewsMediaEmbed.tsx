import * as stylex from "@stylexjs/stylex";
import { Play } from "lucide-react";
import { type FC, useState } from "react";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";

interface NewsMediaEmbedProps {
  url: string;
  lang: AppLang;
}

/**
 * Ссылка на запись → URL для `iframe`. YouTube в форматах `watch?v=` и
 * `youtu.be` приводится к `/embed/`; прочие провайдеры (VK, Rutube) отдаются
 * как есть. Вынесено из компонента ради юнит-теста.
 */
export function toEmbedUrl(url: string): string {
  const youtube = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{6,})/);
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`;
  return url;
}

const styles = stylex.create({
  root: {
    position: "relative",
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: tokens.radiusBorder,
    overflow: "hidden",
    backgroundColor: tokens.colorSurface,
    border: `1px solid ${tokens.colorDivider}`,
  },
  frame: {
    width: "100%",
    height: "100%",
    borderWidth: 0,
    borderStyle: "none",
    display: "block",
  },
  button: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacing1,
    cursor: "pointer",
    borderWidth: 0,
    borderStyle: "none",
    backgroundColor: "transparent",
    color: tokens.colorPrimary,
    fontSize: tokens.sizeBody2,
    fontWeight: 600,
  },
  icon: {
    width: "2.5rem",
    height: "2.5rem",
  },
});

/**
 * Врезка записи для жанра `media`: до клика показывает кнопку, после —
 * `iframe` провайдера. Сторонние куки и вес плеера приезжают по действию
 * пользователя. Расшифровка живёт в теле статьи.
 */
export const NewsMediaEmbed: FC<NewsMediaEmbedProps> = ({ url, lang }) => {
  const t = useT(lang);
  const [active, setActive] = useState(false);

  return (
    <div {...stylex.props(styles.root)}>
      {active ? (
        <iframe
          {...stylex.props(styles.frame)}
          src={toEmbedUrl(url)}
          title={t("newsPage.mediaPlay")}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" {...stylex.props(styles.button)} onClick={() => setActive(true)}>
          <Play {...stylex.props(styles.icon)} aria-hidden="true" />
          {t("newsPage.mediaPlay")}
        </button>
      )}
    </div>
  );
};
