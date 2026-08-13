import { Box, Chip, LinearProgress, Stack, Typography } from '@mui/material';
import { FiBarChart2 } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function TechnicalDepthCard({ data }) {
  return (
    <DashboardCard title="Technical Depth" subtitle="Progress bar with AI insight" icon={FiBarChart2}>
      <Stack spacing={2} sx={{ py: 0.6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Score
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {data.score}/100
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={data.score} sx={{ height: 10, borderRadius: 999, bgcolor: 'rgba(15,157,140,0.08)', '& .MuiLinearProgress-bar': { bgcolor: tokens.teal, borderRadius: 999 } }} />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {data.description}
        </Typography>
        <Box>
          <Chip label={data.status} sx={{ bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, fontWeight: 600 }} />
        </Box>
      </Stack>
    </DashboardCard>
  );
}
