import { FiHexagon } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import AssessmentRadarChart from '../charts/AssessmentRadarChart';
import { skillMetrics as defaultMetrics } from '../../utils/skillAnalysisData';

export default function SkillRadarCard({ metrics }) {
  const dataList = metrics || defaultMetrics;
  return (
    <DashboardCard title="Skill Radar" subtitle="Tracked engineering dimensions" icon={FiHexagon}>
      <AssessmentRadarChart
        labels={dataList.map((s) => s.label)}
        values={dataList.map((s) => s.value)}
      />
    </DashboardCard>
  );
}
