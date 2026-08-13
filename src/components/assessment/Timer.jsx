import { Box, Typography } from '@mui/material';
import { FiClock } from 'react-icons/fi';
import { tokens } from '../../styles/theme';

export default function Timer({ timeLeft }) {
  return (
    <Box sx={{ border: `1px solid ${tokens.line}`, borderRadius: 2.5, p: 1.6, bgcolor: 'background.default' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.6 }}>
        <FiClock size={15} color={tokens.amber} />
        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
          Time Remaining
        </Typography>
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {timeLeft}
      </Typography>
    </Box>
  );
}
