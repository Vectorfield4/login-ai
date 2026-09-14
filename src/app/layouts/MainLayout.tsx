import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
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
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, Link as RouterLink, ScrollRestoration } from "react-router-dom";
import { Footer } from "@/app/layouts/Footer";
import { selectServices, useServicesStore } from "@/entities/service/model/servicesStore";
import { selectSolutions, useSolutionsStore } from "@/entities/solution/model/solutionsStore";
import RouteMeta from "@/shared/ui/atoms/RouteMeta";
import LanguageToggle from "@/shared/ui/molecules/LanguageToggle";
import { ThemeToggle } from "@/shared/ui/molecules/ThemeToggle";

/**
 * Основной шаблон сайта: RouteMeta, AppBar (нав-меню, переключатель языка и
 * темы, мобильный Drawer), <main> с Outlet и Footer.
 *
 * Первый ребёнок layout: React 19 hoists <title>/<meta> в <head>.
 * MainLayout не размонтируется между навигациями → ровно одна пара мета-тегов.
 */
export default function MainLayout() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [solutionsAnchor, setSolutionsAnchor] = useState<null | HTMLElement>(null);
  const [servicesAnchor, setServicesAnchor] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const solutions = useSolutionsStore(selectSolutions);
  const services = useServicesStore(selectServices);

  const openSolutions = Boolean(solutionsAnchor);
  const openServices = Boolean(servicesAnchor);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <RouteMeta />
      <ScrollRestoration />
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
              <Button color="inherit" component={RouterLink} to="/cases">
                {t("ui.menu.cases")}
              </Button>
              <Button color="inherit" component={RouterLink} to="/investors">
                {t("ui.menu.investors")}
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
            <ListItemButton component={RouterLink} to="/cases">
              <ListItemText primary={t("ui.menu.cases")} />
            </ListItemButton>
          </List>
          <Divider />
          <List>
            <ListItemButton component={RouterLink} to="/investors">
              <ListItemText primary={t("ui.menu.investors")} />
            </ListItemButton>
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
      <Footer />
    </Box>
  );
}
