import { Box, Typography, Stack, LinearProgress, Button } from '@mui/material';
import { FiCompass } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

const careers = [
  { title: 'Full Stack Developer', match: 88 },
  { title: 'Backend Developer', match: 81 },
  { title: 'Data Scientist', match: 64 },
];

export default function CareerRecommendationCard() {
  return (
    <DashboardCard
      title="Career Recommendation"
      subtitle="Based on your skill profile"
      icon={FiCompass}
      action={
        <Button size="small" sx={{ fontSize: 12.5 }}>
          View all
        </Button>
      }
    >
      <Stack spacing={2}>
        {careers.map((c) => (
          <Box key={c.title}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.6 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {c.title}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, color: tokens.tealDark }}>
                {c.match}% match
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={c.match}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: 'action.hover',
                '& .MuiLinearProgress-bar': { bgcolor: tokens.teal, borderRadius: 3 },
              }}
            />
          </Box>
        ))}
      </Stack>
    </DashboardCard>
  );
}
