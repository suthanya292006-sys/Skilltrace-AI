import { useEffect, useState, useCallback } from 'react';
import { Box, Button, Chip, Grid, Skeleton, Stack, Typography, Snackbar, Alert, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { FiActivity, FiRefreshCw, FiPlusCircle, FiFileText, FiFolder, FiAward } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../../components/ui/DashboardCard';
import PortfolioScoreCard from '../../components/portfolio/PortfolioScoreCard';
import TechnicalDepthCard from '../../components/portfolio/TechnicalDepthCard';
import DocumentationCard from '../../components/portfolio/DocumentationCard';
import InnovationCard from '../../components/portfolio/InnovationCard';
import IndustryReadinessCard from '../../components/portfolio/IndustryReadinessCard';
import KeywordSection from '../../components/portfolio/KeywordSection';
import TechnologyGrid from '../../components/portfolio/TechnologyGrid';
import StrengthCard from '../../components/portfolio/StrengthCard';
import WeaknessCard from '../../components/portfolio/WeaknessCard';
import RecommendationCard from '../../components/portfolio/RecommendationCard';
import RadarSkillChart from '../../components/charts/RadarSkillChart';
import PortfolioBarChart from '../../components/charts/PortfolioBarChart';
import { getPortfolioAnalysis, runPortfolioAnalysis } from '../../services/portfolioAnalysisService';
import { tokens } from '../../styles/theme';

export default function AIPortfolioAnalysis() {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  const loadAnalysis = useCallback(async (forceRecalculate = false) => {
    if (forceRecalculate) {
      setAnalyzing(true);
    } else {
      setLoading(true);
    }

    try {
      const data = await runPortfolioAnalysis(forceRecalculate);
      setAnalysis(data);
      if (forceRecalculate && data.hasRequiredInputs) {
        setToast({
          open: true,
          message: `Portfolio analysis updated! Last updated: ${data.lastUpdated}`,
          severity: 'success',
        });
      }
    } catch (err) {
      console.error('Failed to run portfolio analysis:', err);
      setToast({
        open: true,
        message: 'Failed to run analysis. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
      setAnalyzing(false);
    }
  }, []);

  useEffect(() => {
    loadAnalysis(false);
  }, [loadAnalysis]);

  const handleAnalyzeAgain = async () => {
    await loadAnalysis(true);
  };

  if (loading) {
    return (
      <Box sx={{ pb: 6 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Box>
            <Skeleton variant="text" width={240} height={36} />
            <Skeleton variant="text" width={320} height={22} sx={{ mt: 1 }} />
          </Box>
          <Stack direction="row" spacing={1.5}>
            <Skeleton variant="rounded" width={140} height={40} />
          </Stack>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <Skeleton variant="rounded" height={360} />
          </Grid>
          <Grid size={{ xs: 12, lg: 7 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Skeleton variant="rounded" height={220} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Skeleton variant="rounded" height={220} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }

  // Requirement 7 & 11: If user has not provided required inputs, show professional data collection empty state
  if (!analysis || !analysis.hasRequiredInputs) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <DashboardCard title="AI Portfolio Analysis" subtitle="Portfolio data collection required" icon={FiActivity}>
          <Box sx={{ py: 5, px: 2, textAlign: 'center', maxWidth: 640, mx: 'auto' }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                bgcolor: 'rgba(15,157,140,0.1)',
                color: tokens.teal,
                display: 'grid',
                placeItems: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <FiPlusCircle size={28} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: tokens.ink }}>
              No portfolio data available yet.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3.5, lineHeight: 1.6 }}>
              Add your skills, projects, certifications, or resume to generate your real AI Portfolio Analysis. The system evaluates your actual entered data to produce authentic readiness scores.
            </Typography>

            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FiFolder size={16} />}
                  onClick={() => navigate('/portfolio')}
                  sx={{ py: 1.2, fontWeight: 700, borderRadius: 2.5 }}
                >
                  Add Projects & Skills
                </Button>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<FiFileText size={16} />}
                  onClick={() => navigate('/portfolio')}
                  sx={{ py: 1.2, fontWeight: 700, borderRadius: 2.5 }}
                >
                  Upload Resume
                </Button>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              onClick={() => loadAnalysis(true)}
              disabled={analyzing}
              startIcon={analyzing ? <CircularProgress size={16} color="inherit" /> : <FiRefreshCw size={15} />}
              sx={{ bgcolor: tokens.teal, '&:hover': { bgcolor: tokens.tealDark }, px: 3, py: 1.2, fontWeight: 700, borderRadius: 2.5 }}
            >
              {analyzing ? 'Checking Inputs...' : 'Analyze Portfolio'}
            </Button>
          </Box>
        </DashboardCard>
      </motion.div>
    );
  }

  return (
    <Box sx={{ pb: 6 }}>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.4 }}>
              AI Portfolio Analysis
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Real-time portfolio evaluation generated from your saved skills, projects, certs, and resume data.
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems={{ xs: 'flex-start', sm: 'center' }}>
            <Button
              variant="contained"
              onClick={handleAnalyzeAgain}
              disabled={analyzing}
              startIcon={analyzing ? <CircularProgress size={15} color="inherit" /> : <FiRefreshCw size={15} />}
              sx={{ bgcolor: tokens.teal, '&:hover': { bgcolor: tokens.tealDark }, fontWeight: 700, px: 2.5, py: 1 }}
            >
              {analyzing ? 'Analyzing...' : 'Analyze Again'}
            </Button>
            <Chip
              label={`Last updated: ${analysis.lastUpdated}`}
              color="default"
              sx={{ bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, fontWeight: 700, px: 0.5, fontSize: 12 }}
            />
          </Stack>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <PortfolioScoreCard
            score={analysis.overallScore}
            confidence={analysis.confidence}
            category={analysis.category}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}>
                <DashboardCard title="Skill Profile" subtitle="AI radar profile" icon={FiActivity}>
                  <RadarSkillChart labels={analysis.radarData.labels} values={analysis.radarData.values} />
                </DashboardCard>
              </motion.div>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.05 }}>
                <DashboardCard title="Portfolio Evidence" subtitle="Resume and project signal" icon={FiActivity}>
                  <PortfolioBarChart labels={analysis.barData.labels} values={analysis.barData.values} />
                </DashboardCard>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <TechnicalDepthCard data={analysis.technicalDepth} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <DocumentationCard data={analysis.documentation} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <InnovationCard data={analysis.innovation} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <IndustryReadinessCard data={analysis.readiness} />
        </Grid>

        {analysis.keywords && analysis.keywords.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <KeywordSection keywords={analysis.keywords} />
          </Grid>
        )}

        {analysis.technologies && analysis.technologies.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <TechnologyGrid technologies={analysis.technologies} />
          </Grid>
        )}

        <Grid size={{ xs: 12, lg: 6 }}>
          <StrengthCard strengths={analysis.strengths} />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <WeaknessCard weaknesses={analysis.weaknesses} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' } }}>
            {analysis.recommendations.map((item, index) => (
              <motion.div key={item.title || index} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                <RecommendationCard item={item} />
              </motion.div>
            ))}
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={toast.open}
        autoHideDuration={3500}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setToast((prev) => ({ ...prev, open: false }))}
          severity={toast.severity}
          variant="filled"
          sx={{ borderRadius: 2.5, fontWeight: 600 }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
