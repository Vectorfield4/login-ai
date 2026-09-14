import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "@/app/layouts/MainLayout";
import CasePage from "@/pages/cases/[slug]/ui/CasePage";
import CasesPage from "@/pages/cases/list/ui/CasesPage";
import ContactsPage from "@/pages/contacts/ui/ContactsPage";
import HomePage from "@/pages/home/ui/HomePage";
import InvestorsPage from "@/pages/investors/ui/InvestorsPage";
import ServicePage from "@/pages/services/[slug]/ui/ServicePage";
import ServicesPage from "@/pages/services/list/ui/ServicesPage";
import SolutionPage from "@/pages/solutions/[slug]/ui/SolutionPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServicePage />} />
        <Route path="solutions/:slug" element={<SolutionPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="cases" element={<CasesPage />} />
        <Route path="cases/:slug" element={<CasePage />} />
        <Route path="investors" element={<InvestorsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
