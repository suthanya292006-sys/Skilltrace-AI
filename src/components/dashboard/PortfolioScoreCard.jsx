import '../charts/chartSetup';
import { Radar } from 'react-chartjs-2';
import { Box, Typography, Stack } from '@mui/material';
import { FiTarget } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

const labels = ['Technical Depth', 'Documentation', 'Innovation', 'Consistency', 'Readiness'];
const values = [82, 68, 74, 90, 77];

export default function PortfolioScoreCard({ score = 82 }) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: 'rgba(15,157,140,0.18)',
        borderColor: tokens.teal,
        pointBackgroundColor: tokens.teal,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      r: {
        angleLines: { color: tokens.line },
        grid: { color: tokens.line },
        pointLabels: { font: { size: 10, family: 'Inter' }, color: tokens.slate },
        ticks: { display: false, backdropColor: 'transparent' },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <DashboardCard title="Portfolio Score" subtitle="AI-analyzed, updated today" icon={FiTarget}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
        <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, fontSize: 34 }}>
          {score}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 0.5 }}>/ 100</Typography>
      </Stack>
      <Box sx={{ height: 220 }}>
        <Radar data={data} options={options} />
      </Box>
    </DashboardCard>
  );
}
