import { FiActivity } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import TrendLineChart from '../charts/TrendLineChart';

export default function PlacementTrendCard({ trend }) {
  return (
    <DashboardCard title="Placement Probability Trend" subtitle="Last 6 months" icon={FiActivity}>
      <TrendLineChart labels={trend.labels} values={trend.values} />
    </DashboardCard>
  );
}
