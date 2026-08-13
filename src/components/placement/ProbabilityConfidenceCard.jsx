import { Stack, Chip } from '@mui/material';
import { FiTrendingUp } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import CircularScoreChart from '../charts/CircularScoreChart';
import { tokens } from '../../styles/theme';

export default function ProbabilityConfidenceCard({ probability, confidence }) {
  return (
    <DashboardCard title="Placement Probability" subtitle="Next placement cycle" icon={FiTrendingUp}>
      <Stack alignItems="center" spacing={1.6} sx={{ py: 0.5 }}>
        <CircularScoreChart value={probability} label="probability" size={160} />
        <Chip
          label={`Confidence: ${confidence}`}
          sx={{ bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, fontWeight: 600 }}
        />
      </Stack>
    </DashboardCard>
  );
}
