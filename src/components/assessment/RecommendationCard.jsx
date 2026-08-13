import { Box, Button, Stack, Typography } from '@mui/material';
import { FiArrowRight } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';

export default function RecommendationCard({ title, body, actionLabel }) {
  return (
    <DashboardCard title={title} subtitle="Suggested next step" icon={FiArrowRight}>
      <Stack spacing={1.4}>
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
          {body}
        </Typography>
        <Button variant="outlined" size="small" endIcon={<FiArrowRight size={14} />} sx={{ alignSelf: 'flex-start' }}>
          {actionLabel}
        </Button>
      </Stack>
    </DashboardCard>
  );
}
