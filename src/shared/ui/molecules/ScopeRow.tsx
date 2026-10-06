import * as stylex from "@stylexjs/stylex";
import { CircleCheck } from "lucide-react";
import { SCHEMA_TYPE, schemaIri } from "@/shared/data/schema";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { type AppLang, useT } from "@/shared/hooks/useT";
import { ListItemScope } from "@/shared/ui/atoms/ListItemScope";
import { Typography } from "@/shared/ui/atoms/Typography";

const styles = stylex.create({
  root: { display: "flex", alignItems: "flex-start", gap: tokens.spacing15 },
  icon: {
    flexShrink: 0,
    width: 24,
    height: 24,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.colorSuccessSoft,
    color: tokens.colorSuccess,
  },
  body: { display: "flex", flexDirection: "column", gap: tokens.spacing05, minWidth: 0 },
});

/** Строка чек-листа: галочка-якорь, короткий пункт и опциональное пояснение. */
export function ScopeRow({
  title,
  text,
  lang,
  position,
}: {
  title: string;
  text?: string;
  lang: AppLang;
  position: number;
}) {
  const t = useT(lang);
  return (
    <div
      itemScope
      itemProp="itemListElement"
      itemType={schemaIri(SCHEMA_TYPE.listItem)}
      {...stylex.props(styles.root)}
    >
      <ListItemScope position={position} type={SCHEMA_TYPE.thing}>
        <span {...stylex.props(styles.icon)}>
          <CircleCheck size={16} aria-hidden="true" />
        </span>
        <div {...stylex.props(styles.body)}>
          <Typography variant="h6" component="h3" itemProp="name">
            {t(title)}
          </Typography>
          {text ? (
            <Typography variant="body2" color="textSecondary" itemProp="description">
              {t(text)}
            </Typography>
          ) : null}
        </div>
      </ListItemScope>
    </div>
  );
}

export default ScopeRow;
