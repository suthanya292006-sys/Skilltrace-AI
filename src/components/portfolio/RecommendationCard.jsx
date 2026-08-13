import { Button, Chip, Stack, Typography } from '@mui/material';
import { FiArrowRight } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function RecommendationCard({ item }) {
  return (
    <DashboardCard title={item.title} subtitle={item.priority} icon={FiArrowRight}>
      <Stack spacing={1.8} sx={{ py: 0.3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Estimated Learning Time: {item.time}
          </Typography>
          <Chip label={item.difficulty} size="small" sx={{ bgcolor: 'rgba(245,166,35,0.14)', color: tokens.amber, fontWeight: 600 }} />
        </Stack>
        <Button variant="contained" size="small" endIcon={<FiArrowRight size={14} />} sx={{ alignSelf: 'flex-start' }}>
          {item.action}
        </Button>
      </Stack>
    </DashboardCard>
  );
}
