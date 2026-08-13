import { Avatar, Box, Typography, Stack, Chip, LinearProgress } from '@mui/material';
import { FiUser } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';

export default function ProfileSummaryCard({
  name = 'Aditi Sharma',
  branch = 'Computer Science & Engineering',
  year = 'Final Year',
  completeness = 78,
  tags = ['React', 'Node.js', 'DBMS', 'DSA'],
}) {
  return (
    <DashboardCard title="Profile Summary" icon={FiUser}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', fontSize: 20 }}>
          {name
            .split(' ')
            .map((w) => w[0])
            .join('')}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {branch}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {year}
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap sx={{ mb: 2.2 }}>
        {tags.map((t) => (
          <Chip key={t} label={t} size="small" sx={{ bgcolor: 'action.hover', fontSize: 12 }} />
        ))}
      </Stack>

      <Box sx={{ mt: 'auto' }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.6 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Profile completeness
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {completeness}%
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={completeness}
          sx={{ height: 6, borderRadius: 3, bgcolor: 'action.hover' }}
        />
      </Box>
    </DashboardCard>
  );
}
