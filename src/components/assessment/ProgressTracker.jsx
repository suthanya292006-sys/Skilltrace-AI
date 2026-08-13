import { Box, LinearProgress, Typography } from '@mui/material';
import { tokens } from '../../styles/theme';

export default function ProgressTracker({ completed, total }) {
  const percent = Math.round((completed / total) * 100);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Progress
        </Typography>
        <Typography variant="caption" sx={{ fontWeight: 700 }}>
          {completed}/{total}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percent}
        sx={{
          height: 8,
          borderRadius: 999,
          bgcolor: 'rgba(15,157,140,0.08)',
          '& .MuiLinearProgress-bar': { bgcolor: tokens.teal, borderRadius: 999 },
        }}
      />
    </Box>
  );
}
