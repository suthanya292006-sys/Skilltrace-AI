import { Box, Typography, Stack, LinearProgress } from '@mui/material';
import { FiBarChart2 } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

const skills = [
  { label: 'Programming', value: 85 },
  { label: 'Data Structures & Algorithms', value: 72 },
  { label: 'Database Knowledge', value: 66 },
  { label: 'System Design', value: 48 },
  { label: 'Communication', value: 79 },
];

function levelColor(v) {
  if (v >= 75) return tokens.teal;
  if (v >= 50) return tokens.amber;
  return tokens.danger;
}

export default function SkillLevelCard() {
  return (
    <DashboardCard title="Skill Level" subtitle="Derived from assessments + projects" icon={FiBarChart2}>
      <Stack spacing={2}>
        {skills.map((s) => (
          <Box key={s.label}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.6 }}>
              <Typography variant="body2">{s.label}</Typography>
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                {s.value}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={s.value}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: 'action.hover',
                '& .MuiLinearProgress-bar': { bgcolor: levelColor(s.value), borderRadius: 3 },
              }}
            />
          </Box>
        ))}
      </Stack>
    </DashboardCard>
  );
}
