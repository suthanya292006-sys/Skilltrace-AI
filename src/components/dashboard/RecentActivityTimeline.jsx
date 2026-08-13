import { Box, Typography, Stack } from '@mui/material';
import { FiUpload, FiCheckCircle, FiAward, FiTrendingUp } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

const activity = [
  { icon: FiUpload, text: 'Uploaded resume for re-analysis', time: 'Today, 10:24 AM' },
  { icon: FiCheckCircle, text: 'Completed DSA assessment — scored 78%', time: 'Yesterday, 6:10 PM' },
  { icon: FiAward, text: 'Added AWS Cloud Practitioner certificate', time: '2 days ago' },
  { icon: FiTrendingUp, text: 'Portfolio score increased from 78 to 82', time: '3 days ago' },
];

export default function RecentActivityTimeline() {
  return (
    <DashboardCard title="Recent Activity">
      <Stack spacing={0}>
        {activity.map((a, i) => (
          <Stack key={i} direction="row" spacing={1.6} sx={{ position: 'relative', pb: i === activity.length - 1 ? 0 : 2.4 }}>
            <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  bgcolor: 'rgba(15,157,140,0.1)',
                  color: tokens.tealDark,
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                  zIndex: 1,
                }}
              >
                <a.icon size={14} />
              </Box>
              {i !== activity.length - 1 && (
                <Box sx={{ flex: 1, width: '1px', bgcolor: tokens.line, mt: 0.5 }} />
              )}
            </Box>
            <Box sx={{ pb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {a.text}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {a.time}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </DashboardCard>
  );
}
