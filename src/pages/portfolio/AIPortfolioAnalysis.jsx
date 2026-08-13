import { useEffect, useState } from 'react';
import { Box, Button, Chip, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { FiActivity, FiRefreshCw } from 'react-icons/fi';
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
import { getPortfolioAnalysis } from '../../services/portfolioAnalysisService';
import { tokens } from '../../styles/theme';

export default function AIPortfolioAnalysis() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);

  const loadAnalysis = async () => {
    setLoading(true);
    const data = await getPortfolioAnalysis();
    setAnalysis(data);
    setLoading(false);
    setEmpty(!data);
  };

  useEffect(() => {
    loadAnalysis();
  }, []);

  const handleAnalyzeAgain = async () => {
    await loadAnalysis();
  };

  if (loading) {
    return (
      <Box>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Box>
            <Skeleton variant="text" width={240} height={36} />
            <Skeleton variant="text" width={320} height={22} sx={{ mt: 1 }} />
          </Box>
          <Stack direction="row" spacing={1.5}>
            <Skeleton variant="rounded" width={140} height={40} />
            <Skeleton variant="rounded" width={120} height={40} />
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
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rounded" height={220} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Skeleton variant="rounded" height={220} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Skeleton variant="rounded" height={220} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (empty || !analysis) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <DashboardCard title="AI Portfolio Analysis" subtitle="No portfolio analysis available." icon={FiActivity}>
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              No portfolio analysis available.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Generate a fresh AI review to see your readiness metrics and recommendations.
            </Typography>
            <Button variant="contained" onClick={handleAnalyzeAgain} startIcon={<FiRefreshCw size={15} />}>
              Analyze Portfolio
            </Button>
          </Box>
        </DashboardCard>
      </motion.div>
    );
  }

  return (
    <Box>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.4 }}>
              AI Portfolio Analysis
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Analyze your portfolio using AI-powered insights.
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} alignItems={{ xs: 'flex-start', sm: 'center' }}>
            <Button
              variant="outlined"
              onClick={handleAnalyzeAgain}
              startIcon={<FiRefreshCw size={15} />}
              sx={{ borderColor: tokens.line, color: 'text.primary' }}
            >
              Analyze Again
            </Button>
            <Chip label={`Last updated ${analysis.lastUpdated}`} color="default" sx={{ bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, fontWeight: 600 }} />
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

        <Grid size={{ xs: 12 }}>
          <KeywordSection keywords={analysis.keywords} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TechnologyGrid technologies={analysis.technologies} />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <StrengthCard strengths={analysis.strengths} />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <WeaknessCard weaknesses={analysis.weaknesses} />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' } }}>
            {analysis.recommendations.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }}>
                <RecommendationCard item={item} />
              </motion.div>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
