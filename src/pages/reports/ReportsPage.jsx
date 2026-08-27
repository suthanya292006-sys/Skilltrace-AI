import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Stack,
  Button,
  Grid,
  Alert,
  Skeleton,
  Snackbar,
} from '@mui/material';
import {
  FiFileText,
  FiZap,
  FiInfo,
  FiRefreshCw,
  FiCheckCircle,
} from 'react-icons/fi';
import ReportCard from '../../components/reports/ReportCard';
import ReportViewer from '../../components/reports/ReportViewer';
import ReportHistory from '../../components/reports/ReportHistory';
import GenerateReportModal from '../../components/reports/GenerateReportModal';
import ShareReportModal from '../../components/reports/ShareReportModal';
import {
  getPrimaryReports,
  getReportHistory,
  generateReport,
  deleteHistoryReport,
} from '../../services/reportService';
import { tokens } from '../../styles/theme';

export default function ReportsPage() {
  // Data States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportsData, setReportsData] = useState({});
  const [historyItems, setHistoryItems] = useState([]);

  // Filter States
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal & Active Item States
  const [selectedReport, setSelectedReport] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareTargetReport, setShareTargetReport] = useState(null);

  // Toast Snackbar Feedback State
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const showToast = (message, severity = 'success') => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  // 1. Fetch Primary Reports and Audit History
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const primaryRes = await getPrimaryReports();
      const historyRes = await getReportHistory({
        search,
        typeFilter,
        statusFilter,
      });

      setReportsData(primaryRes.reports || {});
      setHistoryItems(historyRes.history || []);
    } catch (err) {
      console.error('Failed to load reports data:', err);
      setError('Unable to load career intelligence reports. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  }, [search, typeFilter, statusFilter]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Actions: View Report
  const handleViewReport = (report) => {
    setSelectedReport(report);
    setViewerOpen(true);
  };

  // Actions: Download PDF (Simulated)
  const handleDownloadPdf = (report) => {
    showToast(`Downloading "${report.title}" PDF report…`, 'info');
    setTimeout(() => {
      // Simulate file download trigger
      const element = document.createElement('a');
      const file = new Blob([`SkillTrace AI Verified Report: ${report.title}\nScore: ${report.score}\nGenerated: ${report.lastGenerated || report.formattedDate}`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${report.type || 'report'}_${Date.now()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      showToast(`Downloaded "${report.title}" successfully!`, 'success');
    }, 800);
  };

  // Actions: Print Report
  const handlePrintReport = (report) => {
    showToast(`Preparing print document for "${report.title}"…`, 'info');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  // Actions: Share Report
  const handleShareReport = (report) => {
    setShareTargetReport(report);
    setShareModalOpen(true);
  };

  // Actions: Generate Report
  const handleGenerateNewReport = async ({ reportType, depth }) => {
    try {
      const res = await generateReport({ reportType, depth });
      showToast(`New ${res.report.scoreLabel || 'AI'} Report generated successfully!`, 'success');
      await fetchDashboardData();
      setSelectedReport(res.report);
      setViewerOpen(true);
    } catch (err) {
      console.error(err);
      showToast('Failed to generate report.', 'error');
    }
  };

  // Actions: Delete History Item
  const handleDeleteHistoryItem = async (id) => {
    try {
      await deleteHistoryReport(id);
      showToast('Report deleted from history log.', 'info');
      await fetchDashboardData();
    } catch (err) {
      console.error(err);
      showToast('Failed to delete report.', 'error');
    }
  };

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', pb: 6 }}>
      {/* 1. Header Hero Section */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.5 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                bgcolor: 'rgba(15,157,140,0.12)',
                color: tokens.teal,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <FiFileText size={20} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: 22, md: 26 }, color: tokens.ink }}>
              Career Intelligence Reports
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: tokens.slate, fontSize: 14.5 }}>
            AI-synthesized evaluations across portfolio readiness, technical skill benchmarks, career matches, and placement probability.
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<FiZap size={18} />}
          onClick={() => setGenerateModalOpen(true)}
          sx={{
            bgcolor: tokens.teal,
            '&:hover': { bgcolor: tokens.tealDark },
            fontWeight: 700,
            borderRadius: 2.5,
            px: 3,
            py: 1.2,
            boxShadow: '0 4px 12px rgba(15,157,140,0.25)',
          }}
        >
          Generate AI Report
        </Button>
      </Stack>



      {/* Error State Banner */}
      {error && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" startIcon={<FiRefreshCw size={14} />} onClick={fetchDashboardData}>
              Retry
            </Button>
          }
          sx={{ mb: 4, borderRadius: 3 }}
        >
          {error}
        </Alert>
      )}

      {/* 2. Primary 4 Report Cards Grid */}
      <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 700, mb: 2, color: tokens.ink }}>
        Active Intelligence Diagnostic Reports
      </Typography>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {loading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <Grid item xs={12} sm={6} lg={3} key={idx}>
              <Skeleton variant="rounded" height={420} sx={{ borderRadius: 3 }} />
            </Grid>
          ))
        ) : (
          Object.values(reportsData).map((report) => (
            <Grid item xs={12} sm={6} lg={3} key={report.id}>
              <ReportCard
                report={report}
                onViewReport={handleViewReport}
                onDownloadPdf={handleDownloadPdf}
                onPrintReport={handlePrintReport}
                onShareReport={handleShareReport}
              />
            </Grid>
          ))
        )}
      </Grid>

      {/* 3. Report Audit Trail / History Component */}
      <ReportHistory
        historyItems={historyItems}
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onViewHistoryItem={(item) => {
          const matchedPrimary = reportsData[item.type];
          if (matchedPrimary) {
            setSelectedReport(matchedPrimary);
          } else {
            setSelectedReport({
              ...item,
              subtitle: 'Historical diagnostic evaluation record.',
              keyInsights: ['Historical report archive data retrieved.'],
              strengths: ['Verified Data Score'],
              weaknesses: ['Archived Record'],
              recommendations: [],
            });
          }
          setViewerOpen(true);
        }}
        onDownloadHistoryItem={handleDownloadPdf}
        onDeleteHistoryItem={handleDeleteHistoryItem}
        onOpenGenerateModal={() => setGenerateModalOpen(true)}
      />

      {/* Modals & Dialogs */}
      <ReportViewer
        open={viewerOpen}
        report={selectedReport}
        onClose={() => setViewerOpen(false)}
        onDownloadPdf={handleDownloadPdf}
        onPrintReport={handlePrintReport}
        onShareReport={handleShareReport}
      />

      <GenerateReportModal
        open={generateModalOpen}
        onClose={() => setGenerateModalOpen(false)}
        onGenerate={handleGenerateNewReport}
      />

      <ShareReportModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        report={shareTargetReport}
      />

      {/* Feedback Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3500}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          icon={<FiCheckCircle size={18} />}
          sx={{ borderRadius: 2.5, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', fontWeight: 600 }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
