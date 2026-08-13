import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import { FiCheckCircle, FiXCircle, FiClock, FiTarget } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function ResultSummary({ result }) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DashboardCard title="Score" subtitle="Overall result" icon={FiTarget}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {result.score}%
          </Typography>
        </DashboardCard>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DashboardCard title="Attempted" subtitle="Answered" icon={FiCheckCircle}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {result.attempted}
          </Typography>
        </DashboardCard>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DashboardCard title="Correct" subtitle="Right answers" icon={FiCheckCircle}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {result.correct}
          </Typography>
        </DashboardCard>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <DashboardCard title="Wrong" subtitle="Incorrect answers" icon={FiXCircle}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {result.wrong}
          </Typography>
        </DashboardCard>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <DashboardCard title="Performance Summary" subtitle="AI summary" icon={FiClock}>
          <Stack spacing={1.2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>Percentage</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{result.percentage}%</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>Time Taken</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{result.timeTaken}</Typography>
            </Box>
            <Chip label={result.passed ? 'Pass' : 'Fail'} sx={{ bgcolor: result.passed ? 'rgba(15,157,140,0.1)' : 'rgba(228,87,46,0.12)', color: result.passed ? tokens.tealDark : tokens.danger, fontWeight: 700, alignSelf: 'flex-start' }} />
          </Stack>
        </DashboardCard>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <DashboardCard title="Feedback" subtitle="Next-step insight" icon={FiTarget}>
          <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
            {result.summary}
          </Typography>
        </DashboardCard>
      </Grid>
    </Grid>
  );
}
