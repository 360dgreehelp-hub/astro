import { Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import OnboardingPage from '../pages/OnboardingPage';
import DashboardPage from '../pages/DashboardPage';
import PricingPage from '../pages/PricingPage';
import ReportPage from '../pages/ReportPage';
import AdminPage from '../pages/AdminPage';
import Layout from '../components/Layout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
