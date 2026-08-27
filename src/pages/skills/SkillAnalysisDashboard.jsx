import { useEffect, useState, useCallback } from 'react';
import { Box, Typography, Grid, Button, Skeleton, Chip, Stack, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FiBarChart2, FiPlusCircle, FiCheckCircle, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';
import DashboardCard from '../../components/ui/DashboardCard';
import OverallSkillCard from '../../components/skills/OverallSkillCard';
import SkillRadarCard from '../../components/skills/SkillRadarCard';
import SkillDistributionCard from '../../components/skills/SkillDistributionCard';
import SkillBreakdownGrid from '../../components/skills/SkillBreakdownGrid';
import { getStudentProfile } from '../../services/profileService';
import { tokens } from '../../styles/theme';

export default function SkillAnalysisDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getStudentProfile();
      setProfile(res.profile);
    } catch (err) {
      console.error('Error fetching profile for skill analysis:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) {
    return (
      <Box sx={{ pb: 6 }}>
        <Skeleton variant="text" width={280} height={36} sx={{ mb: 1 }} />
        <Skeleton variant="text" width={340} height={20} sx={{ mb: 3 }} />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Skeleton variant="rounded" height={260} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Skeleton variant="rounded" height={260} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Skeleton variant="rounded" height={260} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  const skills = profile?.skills || [];
  const projects = profile?.projects || [];
  const certs = profile?.certifications || [];
  const resume = profile?.resume;

  const hasData = skills.length > 0 || projects.length > 0 || certs.length > 0 || Boolean(resume);

  // Requirement 5: Professional empty state when no portfolio data exists
  if (!hasData) {
    return (
      <Box sx={{ pb: 6 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.4 }}>
            Skill Analysis & Insights
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            A combined dynamic evaluation of your programming, engineering, and core CS competencies.
          </Typography>
        </Box>

        <DashboardCard title="Skill Insights" icon={FiBarChart2}>
          <Box sx={{ py: 6, px: 2, textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
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
              No portfolio data available yet. Add your skills, projects, certifications, or resume to generate Skill Insights.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/portfolio')}
              startIcon={<FiPlusCircle size={16} />}
              sx={{ bgcolor: tokens.teal, '&:hover': { bgcolor: tokens.tealDark }, fontWeight: 700, px: 3, py: 1.2, borderRadius: 2.5 }}
            >
              Add Portfolio Data
            </Button>
          </Box>
        </DashboardCard>
      </Box>
    );
  }

  // Calculate real metrics based on user's entered skills
  const categorized = {
    Frontend: skills.filter((s) => /frontend|react|html|css|js|javascript|ts|typescript|vue|angular/i.test(s.category || s.name)),
    Backend: skills.filter((s) => /backend|node|express|python|java|c\+\+|rest|api|fastapi|django|flask/i.test(s.category || s.name)),
    Database: skills.filter((s) => /database|sql|postgres|mysql|mongo|redis/i.test(s.category || s.name)),
    Cloud: skills.filter((s) => /cloud|devops|aws|docker|kubernetes|git/i.test(s.category || s.name)),
    CoreCS: skills.filter((s) => /core|dsa|algo|structure|system|problem/i.test(s.category || s.name)),
  };

  const topStrengths = skills.filter((s) => s.level === 'Advanced' || s.level === 'Expert');
  const needsImprovement = skills.filter((s) => s.level === 'Beginner');

  // Overall score calculated from real user skills & projects
  const computedScore = Math.min(98, Math.max(35, Math.round(
    (skills.length * 6) + (projects.length * 12) + (certs.length * 8) + (resume ? 15 : 0)
  )));

  // Build metrics array for radar and breakdown grid
  const dynamicMetrics = [
    {
      key: 'programming',
      label: 'Programming Skill',
      value: Math.min(95, Math.max(40, (categorized.Frontend.length + categorized.Backend.length) * 15 || 50)),
      level: (categorized.Frontend.length + categorized.Backend.length) >= 3 ? 'Advanced' : 'Intermediate',
      note: `${skills.length} verified technical skill(s) registered in portfolio.`,
    },
    {
      key: 'problemSolving',
      label: 'Problem Solving & DSA',
      value: Math.min(95, Math.max(35, categorized.CoreCS.length * 25 || 45)),
      level: categorized.CoreCS.length >= 2 ? 'Advanced' : 'Intermediate',
      note: categorized.CoreCS.length > 0 ? 'Algorithmic DSA competencies recognized.' : 'Recommend completing problem-solving modules.',
    },
    {
      key: 'databaseKnowledge',
      label: 'Database Knowledge',
      value: Math.min(95, Math.max(30, categorized.Database.length * 30 || 35)),
      level: categorized.Database.length >= 2 ? 'Advanced' : categorized.Database.length === 1 ? 'Intermediate' : 'Beginner',
      note: categorized.Database.length > 0 ? `Proficient in ${categorized.Database.map((s) => s.name).join(', ')}.` : 'Add SQL or MongoDB skills to strengthen database profile.',
    },
    {
      key: 'systemDesign',
      label: 'Cloud & DevOps',
      value: Math.min(95, Math.max(30, categorized.Cloud.length * 30 || 35)),
      level: categorized.Cloud.length >= 2 ? 'Advanced' : categorized.Cloud.length === 1 ? 'Intermediate' : 'Beginner',
      note: categorized.Cloud.length > 0 ? `Trained in ${categorized.Cloud.map((s) => s.name).join(', ')}.` : 'Learn Docker or AWS deployment patterns.',
    },
  ];

  return (
    <Box sx={{ pb: 6 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.4 }}>
          Skill Analysis Dashboard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Dynamic breakdown calculated from your {skills.length} skills, {projects.length} projects, and portfolio data.
        </Typography>
      </Box>

      {/* Top 3 Diagnostic Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <OverallSkillCard value={computedScore} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SkillRadarCard metrics={dynamicMetrics} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SkillDistributionCard metrics={dynamicMetrics} />
        </Grid>
      </Grid>

      {/* Real Portfolio Strengths & Areas for Growth */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2.6, borderRadius: 3, border: `1px solid ${tokens.line}`, height: '100%' }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <FiCheckCircle size={18} color={tokens.teal} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: tokens.ink }}>
                Top Portfolio Strengths
              </Typography>
            </Stack>
            {topStrengths.length > 0 ? (
              <Stack spacing={1}>
                {topStrengths.map((s) => (
                  <Stack key={s.name} direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 1.2, bgcolor: 'rgba(15,157,140,0.06)', borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>{s.name}</Typography>
                    <Chip label={s.level} size="small" sx={{ bgcolor: tokens.teal, color: '#fff', fontSize: 10, fontWeight: 700 }} />
                  </Stack>
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Add more advanced skills to populate your top strengths matrix.
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 2.6, borderRadius: 3, border: `1px solid ${tokens.line}`, height: '100%' }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <FiTrendingUp size={18} color={tokens.amber} />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: tokens.ink }}>
                Recommended Growth Areas
              </Typography>
            </Stack>
            <Stack spacing={1}>
              {categorized.Database.length === 0 && (
                <Stack direction="row" alignItems="center" spacing={1} sx={{ p: 1.2, bgcolor: 'rgba(245,166,35,0.1)', borderRadius: 2 }}>
                  <FiAlertCircle size={14} color={tokens.amber} />
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 13 }}>Add Database skill (PostgreSQL or MongoDB)</Typography>
                </Stack>
              )}
              {categorized.Cloud.length === 0 && (
                <Stack direction="row" alignItems="center" spacing={1} sx={{ p: 1.2, bgcolor: 'rgba(245,166,35,0.1)', borderRadius: 2 }}>
                  <FiAlertCircle size={14} color={tokens.amber} />
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 13 }}>Learn Docker / AWS cloud deployment</Typography>
                </Stack>
              )}
              {projects.length < 2 && (
                <Stack direction="row" alignItems="center" spacing={1} sx={{ p: 1.2, bgcolor: 'rgba(245,166,35,0.1)', borderRadius: 2 }}>
                  <FiAlertCircle size={14} color={tokens.amber} />
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 13 }}>Add 2 featured projects to strengthen evidence</Typography>
                </Stack>
              )}
              {categorized.Database.length > 0 && categorized.Cloud.length > 0 && projects.length >= 2 && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Great work! Your portfolio covers key full-stack engineering dimensions.
                </Typography>
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Skill Breakdown Grid */}
      <SkillBreakdownGrid metrics={dynamicMetrics} />
    </Box>
  );
}
