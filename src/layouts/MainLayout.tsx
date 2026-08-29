import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { useState } from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { services } from "../data/services";
import { solutions } from "../data/solutions";

/**
 * Переключатель тёмной/светлой темы.
 * MUI (ThemeProvider + cssVariables) сам сохраняет выбранный mode
 * в localStorage (ключ `mui-mode`) и применяет его при загрузке
 * через InitColorSchemeScript в main.tsx.
 */
function ThemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();
  const isDark = mode === "dark" || (mode === "system" && systemMode === "dark");
  const label = isDark ? "Включить светлую тему" : "Включить тёмную тему";
  return (
    <IconButton
      color="inherit"
      aria-label={label}
      title={label}
      onClick={() => setMode(isDark ? "light" : "dark")}
    >
      {isDark ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}

export default function MainLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [solutionsAnchor, setSolutionsAnchor] = useState<null | HTMLElement>(null);
  const [servicesAnchor, setServicesAnchor] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openSolutions = Boolean(solutionsAnchor);
  const openServices = Boolean(servicesAnchor);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppBar
        position="sticky"
        sx={{ zIndex: (t) => t.zIndex.appBar }} // слой AppBar — токен zIndex
      >
        <Toolbar sx={{ gap: 1 }}>
          {isMobile ? (
            <IconButton
              color="inherit"
              edge="start"
              aria-label="Открыть меню"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ color: "inherit", textDecoration: "none", fontWeight: 700 }}
          >
            Login AI
          </Typography>
          {!isMobile ? (
            <Box component="nav" sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: 2 }}>
              <Button color="inherit" component={RouterLink} to="/">
                Главная
              </Button>
              <Button
                color="inherit"
                aria-controls={openSolutions ? "solutions-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openSolutions ? "true" : undefined}
                onClick={(event) => {
                  setServicesAnchor(null);
                  setSolutionsAnchor(event.currentTarget);
                }}
              >
                Решения
              </Button>
              <Button
                color="inherit"
                aria-controls={openServices ? "services-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openServices ? "true" : undefined}
                onClick={(event) => {
                  setSolutionsAnchor(null);
                  setServicesAnchor(event.currentTarget);
                }}
              >
                Услуги
              </Button>
              <Button color="inherit" component={RouterLink} to="/contacts">
                Контакты
              </Button>
            </Box>
          ) : null}
          <Box sx={{ flexGrow: 1 }} />
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Menu
        id="solutions-menu"
        anchorEl={solutionsAnchor}
        open={openSolutions}
        onClose={() => setSolutionsAnchor(null)}
        MenuListProps={{ onMouseLeave: () => setSolutionsAnchor(null) }}
      >
        {solutions.map((solution) => (
          <MenuItem
            key={solution.slug}
            component={RouterLink}
            to={`/solutions/${solution.slug}`}
            onClick={() => setSolutionsAnchor(null)}
          >
            {solution.navTitle}
          </MenuItem>
        ))}
      </Menu>

      <Menu
        id="services-menu"
        anchorEl={servicesAnchor}
        open={openServices}
        onClose={() => setServicesAnchor(null)}
        MenuListProps={{ onMouseLeave: () => setServicesAnchor(null) }}
      >
        <MenuItem component={RouterLink} to="/services" onClick={() => setServicesAnchor(null)}>
          Все услуги
        </MenuItem>
        {services.map((service) => (
          <MenuItem
            key={service.slug}
            component={RouterLink}
            to={`/services/${service.slug}`}
            onClick={() => setServicesAnchor(null)}
          >
            {service.navTitle}
          </MenuItem>
        ))}
      </Menu>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={closeDrawer}
        slotProps={{
          paper: { sx: { boxShadow: (t) => t.shadows[24] } }, // модальный слой — shadow 24
        }}
      >
        <Box sx={{ width: 280 }} role="presentation" onClick={closeDrawer}>
          <Box sx={{ p: 2 }}>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{ textDecoration: "none", color: "inherit", fontWeight: 700 }}
            >
              Login AI
            </Typography>
          </Box>
          <Divider />
          <List>
            <ListItemButton component={RouterLink} to="/">
              <ListItemText primary="Главная" />
            </ListItemButton>
          </List>
          <Divider />
          <Typography variant="overline" sx={{ px: 2, color: "text.secondary" }}>
            Решения
          </Typography>
          <List dense>
            {solutions.map((solution) => (
              <ListItemButton
                key={solution.slug}
                component={RouterLink}
                to={`/solutions/${solution.slug}`}
              >
                <ListItemText primary={solution.navTitle} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <Typography variant="overline" sx={{ px: 2, color: "text.secondary" }}>
            Услуги
          </Typography>
          <List dense>
            <ListItemButton component={RouterLink} to="/services">
              <ListItemText primary="Все услуги" />
            </ListItemButton>
            {services.map((service) => (
              <ListItemButton
                key={service.slug}
                component={RouterLink}
                to={`/services/${service.slug}`}
              >
                <ListItemText primary={service.navTitle} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <List>
            <ListItemButton component={RouterLink} to="/contacts">
              <ListItemText primary="Контакты" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Box
        component="footer"
        sx={{
          backgroundColor: "background.paper",
          borderTop: 1,
          borderColor: "divider",
          py: 4, // 32px — единицы theme.spacing()
          textAlign: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Login AI
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
