import * as stylex from "@stylexjs/stylex";
import { useMemo, useState } from "react";
import { SolutionCard } from "@/entities/solution/ui/organisms/SolutionCard";
import { SolutionFilters } from "@/features/case-filters";
import type { HomeSolution } from "@/shared/data/entities";
import { tokens } from "@/shared/design/tokens.stylex.ts";
import { useT } from "@/shared/hooks/useT";
import { Grid } from "@/shared/ui/atoms/Grid";
import { Typography } from "@/shared/ui/atoms/Typography";

interface HomeSolutionsProps {
  solutions: HomeSolution[];
  lang: "ru" | "en";
}

const styles = stylex.create({
  filters: { marginBlockEnd: tokens.spacing4 },
  empty: {
    textAlign: "center",
    paddingBlock: tokens.spacing4,
  },
});

export function HomeSolutions({ solutions, lang }: HomeSolutionsProps) {
  const t = useT(lang);
  const [audience, setAudience] = useState("audiences.all");
  const [technology, setTechnology] = useState("technologies.any");

  const filteredSolutions = useMemo(
    () =>
      solutions.filter(
        (solution) =>
          (audience === "audiences.all" || solution.audiences.includes(audience)) &&
          (technology === "technologies.any" || solution.tags.includes(technology)),
      ),
    [audience, technology, solutions],
  );

  return (
    <>
      <div {...stylex.props(styles.filters)}>
        <SolutionFilters
          audience={audience}
          technology={technology}
          onAudienceChange={setAudience}
          onTechnologyChange={setTechnology}
          t={t}
        />
      </div>
      {filteredSolutions.length > 0 ? (
        <Grid container spacing={3}>
          {filteredSolutions.map((solution) => (
            <Grid item key={solution.slug} size={12} md={3}>
              <SolutionCard solution={solution} t={t} lang={lang} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="textSecondary" style={styles.empty}>
          {t("home.filters.empty")}
        </Typography>
      )}
    </>
  );
}
