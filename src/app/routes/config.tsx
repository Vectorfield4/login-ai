import type { RouteObject } from "react-router-dom";
import LangLayout from "@/app/layouts/LangLayout";
import CasePage from "@/pages/cases/details/ui/CasePage";
import CasesPage from "@/pages/cases/list/ui/CasesPage";
import ContactsPage from "@/pages/contacts/ui/ContactsPage";
import HomePage from "@/pages/home/ui/HomePage";
import InvestorsPage from "@/pages/investors/ui/InvestorsPage";
import ServicePage from "@/pages/services/details/ui/ServicePage";
import ServicesPage from "@/pages/services/list/ui/ServicesPage";
import SolutionPage from "@/pages/solutions/details/ui/SolutionPage";

/**
 * Дочерние маршруты — чистые пути без языкового префикса.
 * Вся панель обёрнута в сегмент "/:lang" (LangLayout), поэтому публичный
 * URL каждой страницы = "/{lang}" + путь: /ru/contacts, /en/solutions/:slug.
 * Корня "/" как отдельной страницы не существует.
 */
export const pageRoutes: RouteObject[] = [
  { path: "services", element: <ServicesPage /> },
  { path: "services/:slug", element: <ServicePage /> },
  { path: "solutions/:slug", element: <SolutionPage /> },
  { path: "contacts", element: <ContactsPage /> },
  { path: "cases", element: <CasesPage /> },
  { path: "cases/:slug", element: <CasePage /> },
  { path: "investors", element: <InvestorsPage /> },
];

export const routes: RouteObject[] = [
  {
    path: "/:lang",
    element: <LangLayout />,
    children: [{ index: true, element: <HomePage /> }, ...pageRoutes],
  },
];
