import { Box, Typography, Stack, LinearProgress } from '@mui/material';
import { FiInfo } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

function weightColor(v) {
  if (v >= 75) return tokens.teal;
  if (v >= 50) return tokens.amber;
  return tokens.danger;
}

export default function PredictionExplanationCard({ explanation }) {
  return (
    <DashboardCard
      title="Why this prediction?"
      subtitle="Factors the model weighed, in order of influence"
      icon={FiInfo}
    >
      <Stack spacing={2.2}>
        {explanation.map((e) => (
          <Box key={e.factor}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.6 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {e.factor}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, color: weightColor(e.weight) }}>
                {e.weight}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={e.weight}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: 'action.hover',
                mb: 0.8,
                '& .MuiLinearProgress-bar': { bgcolor: weightColor(e.weight), borderRadius: 3 },
              }}
            />
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
              {e.detail}
            </Typography>
          </Box>
        ))}
      </Stack>
    </DashboardCard>
  );
}
