import { useState } from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  Stack,
  Button,
  FormControl,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import '../charts/chartSetup';
import { tokens } from '../../styles/theme';
import {
  FiDownload,
  FiTrendingUp,
  FiUsers,
  FiCheckCircle,
  FiAward,
  FiBarChart2,
} from 'react-icons/fi';

export default function AdminAnalytics({ analytics, onExportReport }) {
  const [timeframe, setTimeframe] = useState('8m');

  if (!analytics) return null;

  // 1. Student Growth Line Chart
  const growthData = {
    labels: analytics.studentGrowth.labels,
    datasets: [
      {
        label: 'Enrolled Students',
        data: analytics.studentGrowth.values,
        borderColor: tokens.teal,
        backgroundColor: 'rgba(15,157,140,0.12)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: tokens.teal,
        pointRadius: 4,
      },
    ],
  };

  const growthOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y} Enrolled Students` } },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11, family: 'Inter' }, color: tokens.slate } },
      y: { grid: { color: tokens.line }, ticks: { font: { size: 10 }, color: tokens.slate } },
    },
  };

  // 2. Assessment Performance Bar Chart
  const perfData = {
    labels: analytics.assessmentPerformance.categories,
    datasets: [
      {
        label: 'Average Score %',
        data: analytics.assessmentPerformance.scores,
        backgroundColor: [tokens.teal, tokens.amber, '#457B9D', '#E76F51', '#2A9D8F'],
        borderRadius: 8,
      },
    ],
  };

  const perfOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y}% Avg Score` } },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11, family: 'Inter' }, color: tokens.slate } },
      y: { min: 0, max: 100, grid: { color: tokens.line }, ticks: { font: { size: 10 }, color: tokens.slate } },
    },
  };

  // 3. Popular Career Paths Doughnut Chart
  const careerData = {
    labels: analytics.careerPopularity.labels,
    datasets: [
      {
        data: analytics.careerPopularity.counts,
        backgroundColor: [tokens.teal, tokens.amber, '#457B9D', '#E76F51', '#1D3557'],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const careerOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { font: { size: 11, family: 'Inter' }, boxWidth: 12 } },
    },
  };

  // 4. Skill Demand Horizontal Bar Chart
  const skillData = {
    labels: analytics.skillDemand.labels,
    datasets: [
      {
        label: 'Recruiter Demand %',
        data: analytics.skillDemand.demandPercent,
        backgroundColor: 'rgba(15,157,140,0.85)',
        borderRadius: 6,
      },
    ],
  };

  const skillOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.x}% Demand` } },
    },
    scales: {
      x: { min: 0, max: 100, grid: { color: tokens.line }, ticks: { font: { size: 10 }, color: tokens.slate } },
      y: { grid: { display: false }, ticks: { font: { size: 11, family: 'Inter' }, color: tokens.slate } },
    },
  };

  // 5. Placement Readiness Distribution Bar Chart
  const readinessData = {
    labels: analytics.placementReadiness.ranges,
    datasets: [
      {
        label: 'Student Count',
        data: analytics.placementReadiness.studentCounts,
        backgroundColor: ['#E4572E', '#F5A623', '#4FBBAE', tokens.teal, tokens.tealDark],
        borderRadius: 8,
      },
    ],
  };

  const readinessOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y} Students` } },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11, family: 'Inter' }, color: tokens.slate } },
      y: { grid: { color: tokens.line }, ticks: { font: { size: 10 }, color: tokens.slate } },
    },
  };

  return (
    <Box>
      {/* Top Controls Header */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: tokens.ink, fontSize: 19 }}>
              System Analytics & Placement Intelligence
            </Typography>
            <Chip
              label="REAL-TIME"
              size="small"
              sx={{ bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, fontWeight: 800, fontSize: 10 }}
            />
          </Stack>
          <Typography variant="caption" sx={{ color: tokens.slate, mt: 0.3, display: 'block' }}>
            Real-time analytics on student enrollment, assessment performance, career trends, and recruiter skill demand
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
              <MenuItem value="8m">Last 8 Months</MenuItem>
              <MenuItem value="ytd">Academic Year 2025-26</MenuItem>
              <MenuItem value="all">All Time</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<FiDownload size={16} />}
            onClick={onExportReport}
            sx={{ bgcolor: tokens.teal, '&:hover': { bgcolor: tokens.tealDark }, borderRadius: 2.5, fontWeight: 700 }}
          >
            Export Analytics PDF
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {/* Chart 1: Student Growth */}
        <Grid item xs={12} md={7}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3.5, border: `1px solid ${tokens.line}`, bgcolor: '#ffffff' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: tokens.ink, mb: 0.5 }}>
              Student Growth & Cohort Trajectory
            </Typography>
            <Typography variant="caption" sx={{ color: tokens.slate, display: 'block', mb: 2 }}>
              Active student profiles registered on SkillTrace AI over time
            </Typography>
            <Box sx={{ height: 260 }}>
              <Line data={growthData} options={growthOptions} />
            </Box>
          </Paper>
        </Grid>

        {/* Chart 2: Popular Career Paths */}
        <Grid item xs={12} md={5}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3.5, border: `1px solid ${tokens.line}`, bgcolor: '#ffffff' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: tokens.ink, mb: 0.5 }}>
              Popular Career Path Selection
            </Typography>
            <Typography variant="caption" sx={{ color: tokens.slate, display: 'block', mb: 2 }}>
              Student domain focus & preferred career distributions (%)
            </Typography>
            <Box sx={{ height: 260 }}>
              <Doughnut data={careerData} options={careerOptions} />
            </Box>
          </Paper>
        </Grid>

        {/* Chart 3: Assessment Performance */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3.5, border: `1px solid ${tokens.line}`, bgcolor: '#ffffff' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: tokens.ink, mb: 0.5 }}>
              Assessment Performance by Category
            </Typography>
            <Typography variant="caption" sx={{ color: tokens.slate, display: 'block', mb: 2 }}>
              Average student score (%) across domain test categories
            </Typography>
            <Box sx={{ height: 240 }}>
              <Bar data={perfData} options={perfOptions} />
            </Box>
          </Paper>
        </Grid>

        {/* Chart 4: Skill Demand */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3.5, border: `1px solid ${tokens.line}`, bgcolor: '#ffffff' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: tokens.ink, mb: 0.5 }}>
              Top Industry Skill Demand
            </Typography>
            <Typography variant="caption" sx={{ color: tokens.slate, display: 'block', mb: 2 }}>
              Most requested technical skills by recruitment partners (%)
            </Typography>
            <Box sx={{ height: 240 }}>
              <Bar data={skillData} options={skillOptions} />
            </Box>
          </Paper>
        </Grid>

        {/* Chart 5: Placement Readiness Distribution */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3.5, border: `1px solid ${tokens.line}`, bgcolor: '#ffffff' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: tokens.ink, mb: 0.5 }}>
              Placement Readiness Index Distribution
            </Typography>
            <Typography variant="caption" sx={{ color: tokens.slate, display: 'block', mb: 2 }}>
              Distribution of student cohort categorized by AI readiness score ranges
            </Typography>
            <Box sx={{ height: 240 }}>
              <Bar data={readinessData} options={readinessOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
