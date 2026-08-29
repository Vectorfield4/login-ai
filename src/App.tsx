import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ContactsPage from "./pages/ContactsPage";
import HomePage from "./pages/HomePage";
import ServicePage from "./pages/ServicePage";
import ServicesPage from "./pages/ServicesPage";
import SolutionPage from "./pages/SolutionPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServicePage />} />
        <Route path="solutions/:slug" element={<SolutionPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
