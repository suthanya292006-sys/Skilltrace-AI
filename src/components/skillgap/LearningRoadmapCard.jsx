import { Box, Typography, Stack, Chip } from '@mui/material';
import { FiMap } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function LearningRoadmapCard({ steps }) {
  return (
    <DashboardCard title="Learning Roadmap" subtitle="Suggested order to close your gaps" icon={FiMap}>
      <Stack spacing={0}>
        {steps.map((s, i) => {
          const isCurrent = s.status === 'current';
          return (
            <Stack
              key={s.step}
              direction="row"
              spacing={1.6}
              sx={{ position: 'relative', pb: i === steps.length - 1 ? 0 : 2.4 }}
            >
              <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    bgcolor: isCurrent ? tokens.teal : 'rgba(15,157,140,0.1)',
                    color: isCurrent ? '#fff' : tokens.tealDark,
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    zIndex: 1,
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {s.step}
                </Box>
                {i !== steps.length - 1 && <Box sx={{ flex: 1, width: '1px', bgcolor: tokens.line, mt: 0.5 }} />}
              </Box>
              <Box sx={{ pb: 0.5 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {s.title}
                  </Typography>
                  {isCurrent && (
                    <Chip
                      label="In progress"
                      size="small"
                      sx={{ height: 18, fontSize: 10.5, bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark }}
                    />
                  )}
                </Stack>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {s.duration}
                </Typography>
              </Box>
            </Stack>
          );
        })}
      </Stack>
    </DashboardCard>
  );
}
