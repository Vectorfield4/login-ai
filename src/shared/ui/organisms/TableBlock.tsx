import type { TFunc } from "@/shared/i18n/t";
import { Card, CardContent } from "@/shared/ui/atoms/Card";
import Stack from "@/shared/ui/atoms/Stack";
import { Typography } from "@/shared/ui/atoms/Typography";

interface TableRowItem {
  label: string;
  value: string;
}

export function TableBlock({ items, t }: { items: TableRowItem[]; t: TFunc }) {
  return (
    <Card>
      <CardContent>
        <Stack gap={2}>
          {items.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid var(--color-divider)",
                paddingBottom: 8,
              }}
            >
              <Typography variant="body2">{t(item.label)}</Typography>
              <Typography variant="body2" style={{ fontWeight: 600 } as any}>
                {t(item.value)}
              </Typography>
            </div>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
