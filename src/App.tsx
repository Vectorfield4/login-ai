import { Box, Container, Typography } from "@mui/material";

export default function App() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box textAlign="center">
        <Typography variant="h2" component="h1" gutterBottom>
          Login AI
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Scaffolded on the standardized stack — ready for development.
        </Typography>
      </Box>
    </Container>
  );
}
