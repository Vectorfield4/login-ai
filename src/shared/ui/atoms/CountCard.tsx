import { Paper, styled } from "@mui/material";

/**
 * Counter card: one platform metric (value + label).
 * Container for CountersBlock, which animates the number through GSAP.
 */
export const CountCard = styled(Paper)<{ alt?: boolean }>(({ theme }) => ({
  borderRadius: theme.border.radius,
  boxShadow: theme.shadows[0],
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3, 2),
  textAlign: "center",
  height: "100%",
  "&:hover, &:focus-within": { boxShadow: theme.shadows[2] },
}));
