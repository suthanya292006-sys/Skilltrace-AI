import { Grid } from '@mui/material';
import { FiList } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import SkillProgressCard from './SkillProgressCard';
import { skillMetrics as defaultMetrics } from '../../utils/skillAnalysisData';

export default function SkillBreakdownGrid({ metrics }) {
  const dataList = metrics || defaultMetrics;
  return (
    <DashboardCard title="Skill Breakdown" subtitle="Programming, engineering, and core CS competencies" icon={FiList}>
      <Grid container spacing={2}>
        {dataList.map((s) => (
          <Grid key={s.key || s.label} size={{ xs: 12, sm: 6, md: 4 }}>
            <SkillProgressCard
              skillKey={s.key}
              label={s.label}
              value={s.value}
              level={s.level}
              note={s.note}
            />
          </Grid>
        ))}
      </Grid>
    </DashboardCard>
  );
}
