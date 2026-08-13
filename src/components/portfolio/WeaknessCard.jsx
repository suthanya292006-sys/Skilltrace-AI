import { Box, Stack, Typography } from '@mui/material';
import { FiAlertTriangle } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function WeaknessCard({ weaknesses }) {
  return (
    <DashboardCard title="Weaknesses" subtitle="Timeline cards" icon={FiAlertTriangle}>
      <Stack spacing={1.6} sx={{ pt: 0.2 }}>
        {weaknesses.map((weakness) => (
          <Box key={weakness.title} sx={{ borderLeft: `3px solid ${tokens.amber}`, pl: 1.8, py: 0.2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {weakness.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.35 }}>
              {weakness.description}
            </Typography>
            <Typography variant="caption" sx={{ color: tokens.amber, mt: 0.4, display: 'block', fontWeight: 600 }}>
              {weakness.time}
            </Typography>
          </Box>
        ))}
      </Stack>
    </DashboardCard>
  );
}
