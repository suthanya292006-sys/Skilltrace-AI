import { FiPieChart } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import SkillDistributionPieChart from '../charts/SkillDistributionPieChart';
import { skillMetrics } from '../../utils/skillAnalysisData';

export default function SkillDistributionCard() {
  return (
    <DashboardCard title="Skill Distribution" subtitle="Share of total skill weight" icon={FiPieChart}>
      <SkillDistributionPieChart
        labels={skillMetrics.map((s) => s.label)}
        values={skillMetrics.map((s) => s.value)}
      />
    </DashboardCard>
  );
}
