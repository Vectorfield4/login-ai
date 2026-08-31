import { PlayArrow } from "@mui/icons-material";
import { Alert, Box, Button, Grid, Paper, Snackbar, Stack, Typography } from "@mui/material";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import type { SolutionShowcase } from "../data/solutions";

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
 */
export default function VideoShowcase({ showcase }: { showcase: SolutionShowcase }) {
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

  const close = useCallback(
    (showCta: boolean) => {
      const finish = () => {
        if (showCta) setCtaBanner(true);
        setActiveIndex(null);
        setOriginRect(null);
        setMode(null);
      };
      if (stageRef.current && originRect) {
        gsap.to(stageRef.current, {
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

  // Клик по видео — закрываем; если просмотрено ≥ 3с, показываем CTA-баннер
  const handleVideoClick = () => close(watchedRef.current >= 3);

  // Клик по фону сцены (вне карточки/баннера) — закрываем без CTA
  const handleStageClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) close(false);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {showcase.items.map((item, index) => (
          <Grid key={item.title} size={{ xs: 12, sm: 6, md: 4 }}>
            <Button
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onClick={() => openCard(index)}
              sx={{
                width: "100%",
                aspectRatio: "16 / 9",
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
                borderRadius: 3,
                textTransform: "none",
                color: "text.primary",
                border: 1,
                borderColor: "divider",
                background: (t) =>
                  `linear-gradient(135deg, ${t.palette.primary.dark}22, ${t.palette.secondary.main}22)`,
                "&:hover": { boxShadow: (t) => t.shadows[8] },
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PlayArrow sx={{ fontSize: 32 }} />
              </Box>
              <Typography variant="subtitle1" component="span" sx={{ textAlign: "center" }}>
                {item.title}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>

      {activeIndex !== null && activeItem ? (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            zIndex: (t) => t.zIndex.modal,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.75)" }} />
          <Box
            ref={stageRef}
            onClick={handleStageClick}
            sx={{
              position: "fixed",
              overflow: "hidden",
              bgcolor: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {mode === "video" && activeItem.videoUrl ? (
              // biome-ignore lint/a11y/useMediaCaption: caption tracks появятся вместе с эмбеддингами видео на следующем этапе
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
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 2,
                }}
              >
                <Paper
                  elevation={12}
                  sx={{ maxWidth: 460, p: { xs: 3, md: 4 }, textAlign: "center", borderRadius: 3 }}
                >
                  <Typography variant="h5" component="p" gutterBottom>
                    Хотите демо?
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Категория «{activeItem.title}». Видео-примеры появятся на следующем этапе —
                    запросите демо, и мы покажем возможности на вашей задаче.
                  </Typography>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="center"
                  >
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to="/contacts"
                      onClick={() => close(false)}
                    >
                      Да, хочу демо
                    </Button>
                    <Button variant="outlined" onClick={() => close(false)}>
                      Закрыть
                    </Button>
                  </Stack>
                </Paper>
              </Box>
            ) : null}
          </Box>
        </Box>
      ) : null}

      <Snackbar
        open={ctaBanner}
        autoHideDuration={8000}
        onClose={() => setCtaBanner(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="info"
          onClose={() => setCtaBanner(false)}
          action={
            <Button
              color="inherit"
              size="small"
              component={RouterLink}
              to="/contacts"
              onClick={() => setCtaBanner(false)}
            >
              Оставить заявку
            </Button>
          }
        >
          Понравился пример? Получите демо и расчёт под вашу задачу.
        </Alert>
      </Snackbar>
    </Box>
  );
}
