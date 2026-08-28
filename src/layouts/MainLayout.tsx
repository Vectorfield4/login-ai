import { AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { solutions } from "../data/solutions";

export default function MainLayout() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar position="sticky">
        <Toolbar sx={{ flexWrap: "wrap", gap: 1 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              color: "inherit",
              textDecoration: "none",
              fontWeight: 700,
              mr: 2,
            }}
          >
            Login AI
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" component={RouterLink} to="/">
            Главная
          </Button>
          <Button
            color="inherit"
            aria-controls={open ? "solutions-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleOpen}
          >
            Решения
          </Button>
          <Menu
            id="solutions-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ onMouseLeave: handleClose }}
          >
            {solutions.map((solution) => (
              <MenuItem
                key={solution.slug}
                component={RouterLink}
                to={`/solutions/${solution.slug}`}
                onClick={handleClose}
              >
                {solution.navTitle}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>
      <Box component="footer" sx={{ py: 3, textAlign: "center", color: "text.secondary" }}>
        <Typography variant="body2">© {new Date().getFullYear()} Login AI</Typography>
      </Box>
    </Box>
  );
}
