import { FiHexagon } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import AssessmentRadarChart from '../charts/AssessmentRadarChart';
import { skillMetrics } from '../../utils/skillAnalysisData';

export default function SkillRadarCard() {
  return (
    <DashboardCard title="Skill Radar" subtitle="All five tracked dimensions" icon={FiHexagon}>
      <AssessmentRadarChart
        labels={skillMetrics.map((s) => s.label)}
        values={skillMetrics.map((s) => s.value)}
      />
    </DashboardCard>
  );
}
