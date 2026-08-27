import { FiPieChart } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import SkillDistributionPieChart from '../charts/SkillDistributionPieChart';
import { skillMetrics as defaultMetrics } from '../../utils/skillAnalysisData';

export default function SkillDistributionCard({ metrics }) {
  const dataList = metrics || defaultMetrics;
  return (
    <DashboardCard title="Skill Distribution" subtitle="Share of total skill weight" icon={FiPieChart}>
      <SkillDistributionPieChart
        labels={dataList.map((s) => s.label)}
        values={dataList.map((s) => s.value)}
      />
    </DashboardCard>
  );
}
