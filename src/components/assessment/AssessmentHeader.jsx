import { Box, Chip, Stack, Typography } from '@mui/material';
import { FiClock, FiCheckCircle } from 'react-icons/fi';
import { tokens } from '../../styles/theme';

export default function AssessmentHeader({ title, questionNumber, totalQuestions, timeLeft, status }) {
  return (
    <Box sx={{ border: `1px solid ${tokens.line}`, borderRadius: 3, p: 2.2, bgcolor: 'background.paper' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={1.4}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Question {questionNumber} of {totalQuestions}
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.2} flexWrap="wrap" useFlexGap>
          <Chip icon={<FiCheckCircle size={15} />} label={status} sx={{ bgcolor: 'rgba(15,157,140,0.08)', color: tokens.tealDark, fontWeight: 600 }} />
          <Chip icon={<FiClock size={15} />} label={timeLeft} sx={{ bgcolor: 'rgba(245,166,35,0.12)', color: tokens.amber, fontWeight: 600 }} />
        </Stack>
      </Stack>
    </Box>
  );
}
