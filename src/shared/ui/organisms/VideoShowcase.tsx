import * as stylex from "@stylexjs/stylex";
import gsap from "gsap";
import { Play, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SolutionShowcase } from "../../../entities/solution/model/solutions";
import { routeUrl } from "../../data/routes";
import { tokens } from "../../design/tokens.stylex.ts";
import { astroDicts } from "../../i18n/dict";
import { createT } from "../../i18n/t";
import { Alert } from "../atoms/Alert";
import { Button } from "../atoms/Button";
import { Grid } from "../atoms/Grid";
import IconButton from "../atoms/IconButton";
import { Typography } from "../atoms/Typography";

type VideoShowcaseProps = {
  showcase: SolutionShowcase;
  lang: "ru" | "en";
};

const styles = stylex.create({
  card: {
    width: "100%",
    aspectRatio: "16 / 9",
    padding: tokens.spacing2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: tokens.spacing15,
    borderRadius: tokens.radiusBorder,
    textTransform: "none",
    fontFamily: "inherit",
    color: tokens.colorText,
    border: `1px solid ${tokens.colorDivider}`,
    backgroundImage: `linear-gradient(135deg, ${tokens.colorPrimary}22, ${tokens.colorSecondary}22)`,
    cursor: "pointer",
    transition: `box-shadow ${tokens.durationShort} ease`,
    ":hover": { boxShadow: tokens.shadow8 },
  },
  playCircle: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    backgroundColor: tokens.colorPrimary,
    color: tokens.colorPrimaryContrastText,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "fixed",
    inset: 0,
    zIndex: tokens.zModal,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  backdrop: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
  stage: {
    position: "fixed",
    overflow: "hidden",
    backgroundColor: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "fixed",
    top: tokens.spacing2,
    right: tokens.spacing2,
    zIndex: tokens.zTooltip,
    borderRadius: "50%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    ":hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    cursor: "pointer",
  },
  demoWrap: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacing2,
  },
  demoCard: {
    maxWidth: 460,
    padding: tokens.spacing3,
    textAlign: "center",
    borderRadius: tokens.radiusBorder,
    backgroundColor: tokens.colorSurface,
    color: tokens.colorText,
    boxShadow: tokens.shadow8,
  },
  demoTitle: { marginBlockEnd: tokens.spacing1 },
  demoText: { marginBlockStart: tokens.spacing1, marginBlockEnd: tokens.spacing3 },
  demoActions: {
    display: "flex",
    gap: tokens.spacing2,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  ctaBanner: {
    position: "fixed",
    bottom: tokens.spacing4,
    left: "50%",
    zIndex: tokens.zSnackbar,
    transform: "translateX(-50%)",
    width: "min(560px, calc(100vw - 32px))",
  },
  ctaBody: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacing1,
  },
});

/**
 * Витрина видео-примеров.
 *
 * Поведение:
 * - карточка-прямоугольник, по клику разворачивается на весь экран (GSAP);
 * - если у примера есть videoUrl — открывается фулскрин-видео, клик в любом
 *   месте закрывает; если просмотрено ≥ 3 секунд — после закрытия показываем
 *   баннер с призывом к контакту;
 * - если videoUrl нет — сразу открывается баннер «Хотите демо?» с переходом
 *   на страницу контактов.
 *
 * Островный компонент (client:only): словарь `astroDicts` и `createT`
 * импортируются модулем напрямую, поэтому `t` не передаётся пропсом
 * (функции не сериализуются через границу клиента).
 */
export function VideoShowcase({ showcase, lang }: VideoShowcaseProps) {
  const t = createT(lang, astroDicts);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const watchedRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [mode, setMode] = useState<"video" | "demo" | null>(null);
  const [ctaBanner, setCtaBanner] = useState(false);

  const activeItem = activeIndex !== null ? showcase.items[activeIndex] : null;

  const openCard = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    watchedRef.current = 0;
    setOriginRect(card.getBoundingClientRect());
    setActiveIndex(index);
  };

  // Разворачивание карточки в фулскрин после монтирования сцены
  useEffect(() => {
    if (activeIndex === null || !originRect || !stageRef.current) return;
    const stage = stageRef.current;
    gsap.fromTo(
      stage,
      {
        top: originRect.top,
        left: originRect.left,
        width: originRect.width,
        height: originRect.height,
        borderRadius: 16,
      },
      {
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        duration: 0.55,
        ease: "power3.inOut",
        onComplete: () => {
          const item = showcase.items[activeIndex];
          setMode(item.videoUrl ? "video" : "demo");
        },
      },
    );
    return () => {
      gsap.killTweensOf(stage);
    };
  }, [activeIndex, originRect, showcase.items]);

  // Блокируем скролл страницы, пока сцена открыта
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  // Автоскрытие CTA-баннера через 8 секунд
  useEffect(() => {
    if (!ctaBanner) return;
    const timer = window.setTimeout(() => setCtaBanner(false), 8000);
    return () => window.clearTimeout(timer);
  }, [ctaBanner]);

  const close = useCallback(
    (showCta: boolean) => {
      const finish = () => {
        if (showCta) setCtaBanner(true);
        setActiveIndex(null);
        setOriginRect(null);
        setMode(null);
      };
      const stage = stageRef.current;
      if (stage && originRect) {
        gsap.to(stage, {
          top: originRect.top,
          left: originRect.left,
          width: originRect.width,
          height: originRect.height,
          borderRadius: 16,
          duration: 0.45,
          ease: "power3.inOut",
          onComplete: finish,
        });
      } else {
        finish();
      }
    },
    [originRect],
  );

  // Escape закрывает сцену
  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, close]);

  // Клик по видео — закрываем; если просмотрено ≥ 3с, показываем CTA-баннер
  const handleVideoClick = () => close(watchedRef.current >= 3);

  return (
    <div>
      <Grid container spacing={3}>
        {showcase.items.map((item, index) => (
          <Grid key={item.title} item size={12} md={4}>
            <button
              type="button"
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onClick={() => openCard(index)}
              {...stylex.props(styles.card)}
            >
              <div {...stylex.props(styles.playCircle)}>
                <Play size={32} />
              </div>
              <Typography variant="h6" component="span">
                {t(item.title)}
              </Typography>
            </button>
          </Grid>
        ))}
      </Grid>

      {activeIndex !== null && activeItem ? (
        <div {...stylex.props(styles.overlay)}>
          <div {...stylex.props(styles.backdrop)} />
          <div ref={stageRef} {...stylex.props(styles.stage)}>
            {mode === "video" && activeItem.videoUrl ? (
              // biome-ignore lint/a11y/useMediaCaption: подписи появятся вместе с эмбеддингами видео
              <video
                ref={videoRef}
                src={activeItem.videoUrl}
                autoPlay
                playsInline
                onClick={handleVideoClick}
                onTimeUpdate={(event) => {
                  watchedRef.current = event.currentTarget.currentTime;
                }}
                style={{ width: "100%", height: "100%", objectFit: "contain", cursor: "pointer" }}
              />
            ) : null}

            {mode === "demo" ? (
              <div {...stylex.props(styles.demoWrap)}>
                <div {...stylex.props(styles.demoCard)}>
                  <Typography variant="h5" component="p" style={styles.demoTitle}>
                    {t("showcase.demoTitle")}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" style={styles.demoText}>
                    {t("showcase.demoText", { title: t(activeItem.title) })}
                  </Typography>
                  <div {...stylex.props(styles.demoActions)}>
                    <Button
                      variant="contained"
                      href={routeUrl("/contacts", lang)}
                      onClick={() => close(false)}
                    >
                      {t("showcase.demoCta")}
                    </Button>
                    <Button variant="outlined" onClick={() => close(false)}>
                      {t("showcase.close")}
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <IconButton
            label={t("showcase.close")}
            style={styles.closeButton}
            onClick={() => close(false)}
          >
            <X size={20} />
          </IconButton>
        </div>
      ) : null}

      {ctaBanner ? (
        <div {...stylex.props(styles.ctaBanner)} role="status">
          <Alert severity="info" style={styles.ctaBody}>
            <Typography variant="body2" component="span">
              {t("showcase.bannerText")}
            </Typography>
            <Button variant="soft" size="small" href={routeUrl("/contacts", lang)}>
              {t("showcase.bannerAction")}
            </Button>
            <IconButton label={t("showcase.close")} onClick={() => setCtaBanner(false)}>
              <X size={18} />
            </IconButton>
          </Alert>
        </div>
      ) : null}
    </div>
  );
}

export default VideoShowcase;
