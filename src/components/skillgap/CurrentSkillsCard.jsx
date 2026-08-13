import { Chip, Stack } from '@mui/material';
import { FiCheckCircle } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function CurrentSkillsCard({ skills }) {
  return (
    <DashboardCard title="Current Skills" subtitle={`${skills.length} skills you already have`} icon={FiCheckCircle}>
      <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
        {skills.map((s) => (
          <Chip
            key={s}
            label={s}
            size="small"
            sx={{ bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, fontWeight: 500 }}
          />
        ))}
      </Stack>
    </DashboardCard>
  );
}
