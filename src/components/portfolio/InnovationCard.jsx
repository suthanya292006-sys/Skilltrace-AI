import { Box, Stack, Typography } from '@mui/material';
import { FiZap } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import CircularScoreChart from '../charts/CircularScoreChart';
import { tokens } from '../../styles/theme';

export default function InnovationCard({ data }) {
  return (
    <DashboardCard title="Innovation Score" subtitle="Circular indicator" icon={FiZap}>
      <Stack spacing={2} alignItems="center" sx={{ py: 1 }}>
        <CircularScoreChart value={data.score} label="Innovation" color={tokens.amber} size={180} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            AI Comment
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.7, lineHeight: 1.6 }}>
            {data.comment}
          </Typography>
        </Box>
      </Stack>
    </DashboardCard>
  );
}
