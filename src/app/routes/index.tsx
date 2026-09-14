import type { RouteObject } from "react-router-dom";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/app/layouts/MainLayout";
import CasePage from "@/pages/cases/[slug]/ui/CasePage";
import CasesPage from "@/pages/cases/list/ui/CasesPage";
import ContactsPage from "@/pages/contacts/ui/ContactsPage";
import HomePage from "@/pages/home/ui/HomePage";
import InvestorsPage from "@/pages/investors/ui/InvestorsPage";
import ServicePage from "@/pages/services/[slug]/ui/ServicePage";
import ServicesPage from "@/pages/services/list/ui/ServicesPage";
import SolutionPage from "@/pages/solutions/[slug]/ui/SolutionPage";

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "services/:slug", element: <ServicePage /> },
      { path: "solutions/:slug", element: <SolutionPage /> },
      { path: "contacts", element: <ContactsPage /> },
      { path: "cases", element: <CasesPage /> },
      { path: "cases/:slug", element: <CasePage /> },
      { path: "investors", element: <InvestorsPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
