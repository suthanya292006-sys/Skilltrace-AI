import { Box, Chip, Stack, Typography } from '@mui/material';
import { FiTag } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';

export default function KeywordSection({ keywords }) {
  return (
    <DashboardCard title="Resume Keywords" subtitle="Beautiful keyword chips" icon={FiTag}>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ pt: 0.4 }}>
        {keywords.map((keyword) => (
          <Chip
            key={keyword}
            label={keyword}
            sx={{
              bgcolor: 'rgba(15,157,140,0.08)',
              color: 'primary.dark',
              border: '1px solid rgba(15,157,140,0.12)',
              fontWeight: 600,
              px: 0.4,
              py: 0.3,
            }}
          />
        ))}
      </Stack>
    </DashboardCard>
  );
}
