import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

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

export default function AppRoutes() {
  return (
    <Routes>
      {/* Module 1 — Authentication */}
      <Route path="/" element={<SplashScreen />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Module 2 — Student Dashboard */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Module 3 — Portfolio Management */}
        <Route path="/portfolio" element={<PortfolioPage />} />
        {/* Module 4 — AI Portfolio Analysis */}
        <Route path="/dashboard/portfolio-analysis" element={<AIPortfolioAnalysis />} />
        {/* Module 5 — Online Skill Assessment */}
        <Route path="/assessment" element={<AssessmentPageFlow />} />
        {/* Module 6 — Skill Analysis Dashboard */}
        <Route path="/skills" element={<SkillAnalysisDashboard />} />
        {/* Module 7 — Career Recommendation */}
        <Route path="/career" element={<CareerRecommendationPage />} />
        {/* Module 8 — Placement Prediction */}
        <Route path="/placement" element={<PlacementPredictionPage />} />
        {/* Module 9 — Skill Gap Analysis */}
        <Route path="/skill-gap" element={<SkillGapAnalysisPage />} />
        {/* Module 10 — Company Recommendation */}
        <Route path="/companies" element={<CompanyRecommendationPage />} />
        {/* Module 11 — Career Intelligence Reports */}
        <Route path="/reports" element={<ReportsPage />} />
        {/* Module 12 & 13 — Student Profile & Notifications */}
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
