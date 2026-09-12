import { Navigate, Route, Routes } from "react-router-dom";
import CasesPage from "./pages/CasesPage";
import ContactsPage from "./pages/ContactsPage";
import CasePage from "./pages/cases/CasePage";
import HomePage from "./pages/HomePage";
import InvestorsPage from "./pages/InvestorsPage";
import ServicePage from "./pages/ServicePage";
import ServicesPage from "./pages/ServicesPage";
import SolutionPage from "./pages/SolutionPage";
import MainLayout from "./templates/MainLayout";

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
