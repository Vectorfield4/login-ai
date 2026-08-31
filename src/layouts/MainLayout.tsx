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
import { useTranslation } from "react-i18next";
import { Outlet, Link as RouterLink } from "react-router-dom";
import LanguageToggle from "../components/LanguageToggle";
import { services } from "../data/services";
import { solutions } from "../data/solutions";

/**
 * Переключатель тёмной/светлой темы.
 * MUI (ThemeProvider + cssVariables) сам сохраняет выбранный mode
 * в localStorage (ключ `mui-mode`) и применяет его при загрузке
 * через InitColorSchemeScript в main.tsx.
 */
function ThemeToggle() {
  const { t } = useTranslation();
  const { mode, systemMode, setMode } = useColorScheme();
  const isDark = mode === "dark" || (mode === "system" && systemMode === "dark");
  const label = isDark ? t("ui.theme.toggleLight") : t("ui.theme.toggleDark");
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
  const { t } = useTranslation();
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
              aria-label={t("ui.menu.openMenu")}
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
                {t("ui.menu.home")}
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
                {t("ui.menu.solutions")}
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
                {t("ui.menu.services")}
              </Button>
              <Button color="inherit" component={RouterLink} to="/contacts">
                {t("ui.menu.contacts")}
              </Button>
            </Box>
          ) : null}
          <Box sx={{ flexGrow: 1 }} />
          <LanguageToggle />
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
            {t(solution.navTitle)}
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
          {t("ui.menu.allServices")}
        </MenuItem>
        {services.map((service) => (
          <MenuItem
            key={service.slug}
            component={RouterLink}
            to={`/services/${service.slug}`}
            onClick={() => setServicesAnchor(null)}
          >
            {t(service.navTitle)}
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
              <ListItemText primary={t("ui.menu.home")} />
            </ListItemButton>
          </List>
          <Divider />
          <Typography variant="overline" sx={{ px: 2, color: "text.secondary" }}>
            {t("ui.menu.solutions")}
          </Typography>
          <List dense>
            {solutions.map((solution) => (
              <ListItemButton
                key={solution.slug}
                component={RouterLink}
                to={`/solutions/${solution.slug}`}
              >
                <ListItemText primary={t(solution.navTitle)} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <Typography variant="overline" sx={{ px: 2, color: "text.secondary" }}>
            {t("ui.menu.services")}
          </Typography>
          <List dense>
            <ListItemButton component={RouterLink} to="/services">
              <ListItemText primary={t("ui.menu.allServices")} />
            </ListItemButton>
            {services.map((service) => (
              <ListItemButton
                key={service.slug}
                component={RouterLink}
                to={`/services/${service.slug}`}
              >
                <ListItemText primary={t(service.navTitle)} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <List>
            <ListItemButton component={RouterLink} to="/contacts">
              <ListItemText primary={t("ui.menu.contacts")} />
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
            {t("ui.footer", { year: new Date().getFullYear() })}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
