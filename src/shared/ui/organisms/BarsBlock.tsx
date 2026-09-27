import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import Stack from "@/shared/ui/atoms/Stack";
import { Typography } from "@/shared/ui/atoms/Typography";

interface BarItem {
  label: string;
  value: number;
}

export function BarsBlock({ items, lang }: { items: BarItem[]; lang: AppLang }) {
  const t = useT(lang);
  return (
    <Stack gap={2}>
      {items.map((item) => (
        <div key={item.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2">{t(item.label)}</Typography>
            <Typography variant="body2" color="primary">
              {item.value}%
            </Typography>
          </div>
          <div
            style={{
              width: "100%",
              height: 8,
              backgroundColor: tokens.colorDivider,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${item.value}%`,
                height: "100%",
                backgroundColor: tokens.colorPrimary,
              }}
            />
          </div>
        </div>
      ))}
    </Stack>
  );
}
