import { Box, Chip, Stack, Typography } from '@mui/material';
import { FiTarget } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import CircularScoreChart from '../charts/CircularScoreChart';
import { tokens } from '../../styles/theme';

export default function IndustryReadinessCard({ data }) {
  return (
    <DashboardCard title="Industry Readiness" subtitle="Large progress circle" icon={FiTarget}>
      <Stack spacing={2} alignItems="center" sx={{ py: 1 }}>
        <CircularScoreChart value={data.score} label="Readiness" color={tokens.tealDark} size={200} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {data.description}
          </Typography>
          <Chip label={data.status} sx={{ mt: 1.2, bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, fontWeight: 600 }} />
        </Box>
      </Stack>
    </DashboardCard>
  );
}
