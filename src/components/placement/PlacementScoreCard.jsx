import { FiTarget } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import GaugeChart from '../charts/GaugeChart';

export default function PlacementScoreCard({ score }) {
  return (
    <DashboardCard title="Placement Score" subtitle="Composite readiness score" icon={FiTarget}>
      <GaugeChart value={score} label="out of 100" />
    </DashboardCard>
  );
}
