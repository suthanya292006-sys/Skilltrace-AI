import { Typography, Chip, Stack } from '@mui/material';
import { FiActivity } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import CircularScoreChart from '../charts/CircularScoreChart';
import { tokens } from '../../styles/theme';
import { levelFromScore } from '../../utils/skillAnalysisData';

export default function OverallSkillCard({ value }) {
  const level = levelFromScore(value);

  return (
    <DashboardCard title="Overall Skill Level" subtitle="Weighted across all tracked skills" icon={FiActivity}>
      <Stack alignItems="center" spacing={1.5} sx={{ py: 1 }}>
        <CircularScoreChart value={value} label="/ 100" size={180} />
        <Chip
          label={level}
          sx={{
            bgcolor: 'rgba(15,157,140,0.1)',
            color: tokens.tealDark,
            fontWeight: 600,
          }}
        />
        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 260 }}>
          Based on your latest assessment scores, portfolio analysis, and project activity.
        </Typography>
      </Stack>
    </DashboardCard>
  );
}
