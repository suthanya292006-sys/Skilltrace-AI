import { Box, Typography, Stack, Chip } from '@mui/material';
import { FiBookOpen } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function LearningResourcesCard({ resources }) {
  return (
    <DashboardCard title="Learning Resources" subtitle="Curated for the skills above" icon={FiBookOpen}>
      <Stack spacing={1.2}>
        {resources.map((r) => (
          <Stack
            key={r.title}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ border: `1px solid ${tokens.line}`, borderRadius: 2.5, px: 1.8, py: 1.1 }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" noWrap sx={{ fontWeight: 600, maxWidth: 260 }}>
                {r.title}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {r.platform} · {r.skill}
              </Typography>
            </Box>
            <Chip
              size="small"
              label={r.type}
              sx={{
                fontSize: 11,
                fontWeight: 600,
                bgcolor: r.type === 'Free' ? 'rgba(15,157,140,0.1)' : 'rgba(245,166,35,0.14)',
                color: r.type === 'Free' ? tokens.tealDark : tokens.amber,
              }}
            />
          </Stack>
        ))}
      </Stack>
    </DashboardCard>
  );
}
