import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import { FiFileText } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function DocumentationCard({ data }) {
  return (
    <DashboardCard title="Documentation Quality" subtitle="Progress indicator" icon={FiFileText}>
      <Stack spacing={2} sx={{ py: 0.6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Score
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {data.score}/100
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={data.score} sx={{ height: 10, borderRadius: 999, bgcolor: 'rgba(15,157,140,0.08)', '& .MuiLinearProgress-bar': { bgcolor: tokens.amber, borderRadius: 999 } }} />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {data.description}
        </Typography>
      </Stack>
    </DashboardCard>
  );
}
