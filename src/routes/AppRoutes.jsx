import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';

import SplashScreen from '../pages/auth/SplashScreen';
import WelcomePage from '../pages/auth/WelcomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';

import DashboardPage from '../pages/dashboard/DashboardPage';
import PortfolioPage from '../pages/portfolio/PortfolioPage';
import AIPortfolioAnalysis from '../pages/portfolio/AIPortfolioAnalysis';
import AssessmentPageFlow from '../pages/assessment/AssessmentPageFlow';
import SkillAnalysisDashboard from '../pages/skills/SkillAnalysisDashboard';
import CareerRecommendationPage from '../pages/career/CareerRecommendationPage';
import PlacementPredictionPage from '../pages/placement/PlacementPredictionPage';
import SkillGapAnalysisPage from '../pages/skillgap/SkillGapAnalysisPage';
import CompanyRecommendationPage from '../pages/companies/CompanyRecommendationPage';
import ReportsPage from '../pages/reports/ReportsPage';
import ProfilePage from '../pages/profile/ProfilePage';
import SettingsPage from '../pages/settings/SettingsPage';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/" element={<SplashScreen />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Protected Private Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/dashboard/portfolio-analysis" element={<AIPortfolioAnalysis />} />
          <Route path="/assessment" element={<AssessmentPageFlow />} />
          <Route path="/skills" element={<SkillAnalysisDashboard />} />
          <Route path="/career" element={<CareerRecommendationPage />} />
          <Route path="/placement" element={<PlacementPredictionPage />} />
          <Route path="/skill-gap" element={<SkillGapAnalysisPage />} />
          <Route path="/companies" element={<CompanyRecommendationPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
