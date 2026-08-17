import { Grid, Paper, Box, Typography, Stack, Chip } from '@mui/material';
import {
  FiUsers,
  FiUserCheck,
  FiFolder,
  FiCheckCircle,
  FiCompass,
  FiTarget,
  FiTrendingUp,
} from 'react-icons/fi';
import { tokens } from '../../styles/theme';

export default function AdminStats({ stats }) {
  const statItems = [
    {
      title: 'Total Students',
      value: stats.totalStudents?.toLocaleString() || '1,284',
      change: '+14% this term',
      icon: FiUsers,
      color: '#0F9D8C',
    },
    {
      title: 'Active Students',
      value: stats.activeStudents?.toLocaleString() || '1,042',
      change: '81% Active Rate',
      icon: FiUserCheck,
      color: '#2A9D8F',
    },
    {
      title: 'Portfolios Analyzed',
      value: stats.portfoliosAnalyzed?.toLocaleString() || '956',
      change: '+18% MoM',
      icon: FiFolder,
      color: '#E76F51',
    },
    {
      title: 'Assessments Completed',
      value: stats.assessmentsCompleted?.toLocaleString() || '3,410',
      change: 'Avg Score: 76%',
      icon: FiCheckCircle,
      color: '#F4A261',
    },
    {
      title: 'Career Recommendations',
      value: stats.careerRecommendations?.toLocaleString() || '2,890',
      change: '94% Match Precision',
      icon: FiCompass,
      color: '#457B9D',
    },
    {
      title: 'Placement Predictions',
      value: stats.placementPredictions?.toLocaleString() || '1,150',
      change: 'High Confidence',
      icon: FiTarget,
      color: '#1D3557',
    },
  ];

  return (
    <Grid container spacing={2.5} sx={{ mb: 4 }}>
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: `1px solid ${tokens.line}`,
                bgcolor: '#ffffff',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 8px 24px rgba(16,24,40,0.06)',
                  borderColor: item.color,
                },
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2.5,
                    bgcolor: `${item.color}15`,
                    color: item.color,
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Icon size={22} />
                </Box>
                <Chip
                  icon={<FiTrendingUp size={12} />}
                  label={item.change}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(15,157,140,0.08)',
                    color: tokens.tealDark,
                    fontWeight: 700,
                    fontSize: 10.5,
                    height: 22,
                  }}
                />
              </Stack>

              <Typography variant="h4" sx={{ fontWeight: 800, color: tokens.ink, fontSize: 28, lineHeight: 1.1 }}>
                {item.value}
              </Typography>
              <Typography variant="body2" sx={{ color: tokens.slate, mt: 0.5, fontWeight: 500, fontSize: 13 }}>
                {item.title}
              </Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}
