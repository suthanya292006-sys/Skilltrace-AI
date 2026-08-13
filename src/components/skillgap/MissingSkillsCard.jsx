import { Chip, Stack } from '@mui/material';
import { FiAlertCircle } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function MissingSkillsCard({ skills }) {
  return (
    <DashboardCard title="Missing Skills" subtitle={`${skills.length} gaps holding back your matches`} icon={FiAlertCircle}>
      <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap>
        {skills.map((s) => (
          <Chip
            key={s}
            label={s}
            size="small"
            sx={{ bgcolor: 'rgba(228,87,46,0.1)', color: tokens.danger, fontWeight: 500 }}
          />
        ))}
      </Stack>
    </DashboardCard>
  );
}
