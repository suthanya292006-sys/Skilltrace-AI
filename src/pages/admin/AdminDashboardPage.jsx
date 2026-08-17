import { useState, useEffect } from 'react';
import {
  Box,
  Snackbar,
  Alert,
  Stack,
  Typography,
  Chip,
  Button,
  Paper,
  Container,
} from '@mui/material';
import {
  FiShield,
  FiLogOut,
  FiRefreshCw,
  FiUserCheck,
  FiDatabase,
  FiCheckCircle,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminLoginPage from '../../components/admin/AdminLoginPage';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminStats from '../../components/admin/AdminStats';
import StudentTable from '../../components/admin/StudentTable';
import AssessmentManager from '../../components/admin/AssessmentManager';
import CompanyManager from '../../components/admin/CompanyManager';
import CareerManager from '../../components/admin/CareerManager';
import AdminAnalytics from '../../components/admin/AdminAnalytics';
import { tokens } from '../../styles/theme';
import {
  getAdminState,
  toggleStudentStatus,
  saveAssessment,
  deleteAssessment,
  saveCompany,
  deleteCompany,
  saveCareer,
  deleteCareer,
  resetAdminState,
} from '../../services/adminService';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [currentTab, setCurrentTab] = useState('overview');
  const [adminData, setAdminData] = useState(null);

  // Snackbar Toast
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  const loadData = () => {
    const data = getAdminState();
    setAdminData(data);
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      loadData();
    }
  }, [user]);

  // If user is not authenticated as admin, show secure Admin Login Gateway!
  if (!user || user.role !== 'admin') {
    return <AdminLoginPage onSuccess={loadData} />;
  }

  if (!adminData) return null;

  // Student Actions
  const handleToggleStudentStatus = async (studentId) => {
    const updatedStudents = await toggleStudentStatus(studentId);
    const updatedData = getAdminState();
    setAdminData(updatedData);
    showToast('Student account status updated successfully.', 'success');
  };

  // Assessment Actions
  const handleSaveAssessment = async (assessmentData) => {
    const updatedAssessments = await saveAssessment(assessmentData);
    const updatedData = getAdminState();
    setAdminData(updatedData);
    showToast('Assessment details saved successfully.', 'success');
  };

  const handleDeleteAssessment = async (assessmentId) => {
    const updatedAssessments = await deleteAssessment(assessmentId);
    const updatedData = getAdminState();
    setAdminData(updatedData);
    showToast('Assessment removed from system.', 'info');
  };

  // Company Actions
  const handleSaveCompany = async (companyData) => {
    const updatedCompanies = await saveCompany(companyData);
    const updatedData = getAdminState();
    setAdminData(updatedData);
    showToast('Hiring partner updated successfully.', 'success');
  };

  const handleDeleteCompany = async (companyId) => {
    const updatedCompanies = await deleteCompany(companyId);
    const updatedData = getAdminState();
    setAdminData(updatedData);
    showToast('Hiring partner removed from system.', 'info');
  };

  // Career Actions
  const handleSaveCareer = async (careerData) => {
    const updatedCareers = await saveCareer(careerData);
    const updatedData = getAdminState();
    setAdminData(updatedData);
    showToast('Career path updated successfully.', 'success');
  };

  const handleDeleteCareer = async (careerId) => {
    const updatedCareers = await deleteCareer(careerId);
    const updatedData = getAdminState();
    setAdminData(updatedData);
    showToast('Career path removed.', 'info');
  };

  // Reset Admin State
  const handleResetData = () => {
    const resetData = resetAdminState();
    setAdminData(resetData);
    showToast('Admin data reset to default demo state.', 'info');
  };

  // Export Analytics PDF Simulation
  const handleExportAnalytics = () => {
    showToast('Generating Admin Analytics Executive Report (PDF)…', 'info');
    setTimeout(() => {
      showToast('Executive Analytics Report downloaded successfully.', 'success');
    }, 1200);
  };

  // Logout / Exit Admin Mode
  const handleExitAdmin = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', pb: 8 }}>
      {/* Top Admin Security Status Bar */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          px: 3,
          mb: 3,
          borderRadius: 3.5,
          bgcolor: tokens.ink,
          color: '#ffffff',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          boxShadow: '0 8px 24px rgba(29,53,87,0.18)',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2.5,
              bgcolor: tokens.teal,
              color: '#ffffff',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <FiShield size={20} />
          </Box>
          <Box>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, fontSize: 16, lineHeight: 1.2 }}>
                Admin Management Console
              </Typography>
              <Chip
                label="SECURE SESSION"
                size="small"
                sx={{
                  bgcolor: 'rgba(15,157,140,0.25)',
                  color: '#4FBBAE',
                  fontWeight: 800,
                  fontSize: 9.5,
                  height: 18,
                }}
              />
            </Stack>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
              Authenticated as <strong>manager</strong> (System Admin) · Role-Based Access Enforced
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Button
            size="small"
            startIcon={<FiRefreshCw size={13} />}
            onClick={handleResetData}
            sx={{
              color: 'rgba(255,255,255,0.85)',
              borderColor: 'rgba(255,255,255,0.2)',
              border: '1px solid',
              textTransform: 'none',
              fontSize: 12,
              fontWeight: 600,
              borderRadius: 2,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            Reset Demo State
          </Button>

          <Button
            size="small"
            variant="contained"
            startIcon={<FiLogOut size={13} />}
            onClick={handleExitAdmin}
            sx={{
              bgcolor: tokens.danger,
              '&:hover': { bgcolor: '#c95337' },
              fontSize: 12,
              fontWeight: 700,
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Exit Admin Session
          </Button>
        </Stack>
      </Paper>

      {/* Top Admin Sidebar & Navigation Tabs */}
      <AdminSidebar currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* TAB 1: OVERVIEW */}
      {currentTab === 'overview' && (
        <Box>
          <AdminStats stats={adminData.stats} />
          <StudentTable
            students={adminData.students}
            onToggleStatus={handleToggleStudentStatus}
          />
        </Box>
      )}

      {/* TAB 2: STUDENT MANAGEMENT */}
      {currentTab === 'students' && (
        <Box>
          <StudentTable
            students={adminData.students}
            onToggleStatus={handleToggleStudentStatus}
          />
        </Box>
      )}

      {/* TAB 3: ASSESSMENT MANAGEMENT */}
      {currentTab === 'assessments' && (
        <Box>
          <AssessmentManager
            assessments={adminData.assessments}
            onSaveAssessment={handleSaveAssessment}
            onDeleteAssessment={handleDeleteAssessment}
          />
        </Box>
      )}

      {/* TAB 4: COMPANY PORTAL */}
      {currentTab === 'companies' && (
        <Box>
          <CompanyManager
            companies={adminData.companies}
            onSaveCompany={handleSaveCompany}
            onDeleteCompany={handleDeleteCompany}
          />
        </Box>
      )}

      {/* TAB 5: CAREER PATHS */}
      {currentTab === 'careers' && (
        <Box>
          <CareerManager
            careers={adminData.careers}
            onSaveCareer={handleSaveCareer}
            onDeleteCareer={handleDeleteCareer}
          />
        </Box>
      )}

      {/* TAB 6: ANALYTICS & REPORTS */}
      {currentTab === 'analytics' && (
        <Box>
          <AdminAnalytics
            analytics={adminData.analytics}
            onExportReport={handleExportAnalytics}
          />
        </Box>
      )}

      {/* Global Feedback Toast Snackbar */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          severity={toast.severity}
          sx={{ borderRadius: 2.5, fontWeight: 600, boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
