import { Box, Stack, Typography } from '@mui/material';
import { FiCheckCircle } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function StrengthCard({ strengths }) {
  return (
    <DashboardCard title="Strengths" subtitle="Timeline cards" icon={FiCheckCircle}>
      <Stack spacing={1.6} sx={{ pt: 0.2 }}>
        {strengths.map((strength) => (
          <Box key={strength.title} sx={{ borderLeft: `3px solid ${tokens.teal}`, pl: 1.8, py: 0.2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {strength.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.35 }}>
              {strength.description}
            </Typography>
            <Typography variant="caption" sx={{ color: tokens.tealDark, mt: 0.4, display: 'block', fontWeight: 600 }}>
              {strength.time}
            </Typography>
          </Box>
        ))}
      </Stack>
    </DashboardCard>
  );
}
