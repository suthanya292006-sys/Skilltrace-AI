import { Box, Typography, Stack } from '@mui/material';
import { FiZap } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

const tips = [
  'Add a live demo link to your Waste Management project — recruiters click through 3x more.',
  'Your DBMS assessment score is trailing your other scores. A short refresher could lift Placement Probability by ~5%.',
  'System Design is your biggest gap for Full Stack roles — start with one small case-study writeup.',
];

export default function AITipsCard() {
  return (
    <DashboardCard title="AI Tips" subtitle="Personalized this week" icon={FiZap}>
      <Stack spacing={1.6}>
        {tips.map((tip, i) => (
          <Stack key={i} direction="row" spacing={1.2} alignItems="flex-start">
            <Box
              sx={{
                mt: 0.3,
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: tokens.amber,
                flexShrink: 0,
              }}
            />
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
              {tip}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </DashboardCard>
  );
}
