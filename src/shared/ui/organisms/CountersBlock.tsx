import { Box, Typography } from "@mui/material";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import type { CounterItem } from "@/entities/case/model/cases";
import { CountCard } from "@/shared/ui/atoms/CountCard";

/**
 * Tiles with an animated count-up value (GSAP) and an i18n-key label.
 * Same idea as the «цифры платформы» block on the old site, where counters
 * ran up to their data-count target values.
 */
export function CountersBlock({ items }: { items: CounterItem[] }) {
  const { t, i18n } = useTranslation();
  const valuesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const formatter = new Intl.NumberFormat(i18n.language === "ru" ? "ru-RU" : "en-US");
    const tweens = items.map((item, index) => {
      const node = valuesRef.current[index];
      if (!node) return null;
      const holder = { value: 0 };
      return gsap.to(holder, {
        value: item.value,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => {
          node.textContent = formatter.format(Math.round(holder.value));
        },
      });
    });
    return () => {
      tweens.forEach((tween) => {
        tween?.kill();
      });
    };
  }, [items, i18n.language]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
        gap: 2,
      }}
    >
      {items.map((item, index) => (
        <CountCard key={item.label} elevation={0}>
          <Typography
            component="span"
            ref={(node) => {
              valuesRef.current[index] = node;
            }}
            variant="h3"
            color="primary.main"
          >
            0
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {t(item.label)}
          </Typography>
        </CountCard>
      ))}
    </Box>
  );
}
