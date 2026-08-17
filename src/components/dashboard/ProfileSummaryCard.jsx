import { Avatar, Box, Typography, Stack, Chip, LinearProgress } from '@mui/material';
import { FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function ProfileSummaryCard({
  completeness = 85,
  tags = ['React', 'Node.js', 'Python', 'FastAPI', 'DSA'],
}) {
  const { user } = useAuth();

  const name = user?.fullName || 'Suthanya';
  const initials = user?.initials || 'S';
  const department = user?.department || 'Computer Science & Engineering';

  return (
    <DashboardCard title="Profile Summary" icon={FiUser}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: tokens.teal, fontSize: 20, fontWeight: 700 }}>
          {initials}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: tokens.ink }}>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {department}
          </Typography>
          <Typography variant="caption" sx={{ color: tokens.tealDark, fontWeight: 600 }}>
            Member Since {user?.createdAt || 'Aug 2026'}
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap sx={{ mb: 2.2 }}>
        {tags.map((t) => (
          <Chip key={t} label={t} size="small" sx={{ bgcolor: 'action.hover', fontSize: 12, fontWeight: 500 }} />
        ))}
      </Stack>

      <Box sx={{ mt: 'auto' }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.6 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Profile completeness
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 700, color: tokens.tealDark }}>
            {completeness}%
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={completeness}
          sx={{ height: 6, borderRadius: 3, bgcolor: 'action.hover', '& .MuiLinearProgress-bar': { bgcolor: tokens.teal } }}
        />
      </Box>
    </DashboardCard>
  );
}
