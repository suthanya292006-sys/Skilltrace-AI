import { Box, Typography, Stack } from '@mui/material';
import { FiClock } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function ImprovementTimelineCard({ timeline }) {
  return (
    <DashboardCard title="Improvement Timeline" subtitle="Target milestones over the next 8 weeks" icon={FiClock}>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 0,
          pb: 1,
        }}
      >
        {timeline.map((t, i) => (
          <Box
            key={t.milestone}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexShrink: 0,
              width: 190,
            }}
          >
            <Stack alignItems="flex-start" sx={{ width: '100%' }}>
              <Stack direction="row" alignItems="center" sx={{ width: '100%', mb: 1.2 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: tokens.teal,
                    flexShrink: 0,
                  }}
                />
                {i !== timeline.length - 1 && (
                  <Box sx={{ flex: 1, height: '2px', bgcolor: tokens.line }} />
                )}
              </Stack>
              <Typography
                variant="caption"
                sx={{ color: tokens.tealDark, fontWeight: 700, fontFamily: '"IBM Plex Mono", monospace' }}
              >
                {t.eta}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500, pr: 2, lineHeight: 1.4 }}>
                {t.milestone}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Box>
    </DashboardCard>
  );
}
