import { keyframes } from "@emotion/react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

const AUDIENCE_KEYS = [
  "audiences.all",
  "audiences.manufacturers",
  "audiences.clinics",
  "audiences.adAgencies",
  "audiences.businessOwners",
];

const TECHNOLOGY_KEYS = [
  "technologies.any",
  "technologies.computerVision",
  "technologies.agentic",
  "technologies.content",
  "technologies.video",
  "technologies.reputation",
  "technologies.llm",
];

/** Свечение фильтров: один «пинг» при загрузке страницы — без повторов и hover. */
const glowPulse = keyframes`
  0%, 100% { box-shadow: none; }
  50% { box-shadow: 0 0 16px 6px rgba(25, 118, 210, 0.42); }
`;

interface SolutionFiltersProps {
  audience: string;
  technology: string;
  onAudienceChange: (value: string) => void;
  onTechnologyChange: (value: string) => void;
}

/**
 * Фильтры каталога решений: «для кого» (аудитория) и «технология».
 * Раскладка вынесена в правую часть SectionHeader через prop `action`.
 */
export function SolutionFilters({
  audience,
  technology,
  onAudienceChange,
  onTechnologyChange,
}: SolutionFiltersProps) {
  const { t } = useTranslation();

  const filters = [
    {
      value: audience,
      onChange: onAudienceChange,
      label: t("home.filters.audienceLabel"),
      keys: AUDIENCE_KEYS,
    },
    {
      value: technology,
      onChange: onTechnologyChange,
      label: t("home.filters.technologyLabel"),
      keys: TECHNOLOGY_KEYS,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {filters.map((filter) => (
        <Box
          key={filter.label}
          sx={{
            borderRadius: 2,
            bgcolor: "background.paper",
            // Один цикл при загрузке: без infinite и без hover-перезапуска.
            animation: `${glowPulse} 2.6s ease-in-out 1`,
          }}
        >
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id={filter.label}>{filter.label}</InputLabel>
            <Select
              labelId={filter.label}
              value={filter.value}
              label={filter.label}
              onChange={(event) => filter.onChange(event.target.value as string)}
            >
              {filter.keys.map((key) => (
                <MenuItem key={key} value={key}>
                  {t(key)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      ))}
    </Box>
  );
}
