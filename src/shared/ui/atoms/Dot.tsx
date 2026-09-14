import { Box } from "@mui/material";

/**
 * Round list marker: an 8px colored dot in the brand color.
 * Used in lists (marker in front of an item).
 */
export function Dot() {
  return (
    <Box
      component="span"
      sx={{
        mt: 0.7,
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "primary.main",
        flexShrink: 0,
      }}
    />
  );
}
