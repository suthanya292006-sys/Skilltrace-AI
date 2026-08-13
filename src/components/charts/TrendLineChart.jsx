import { Box } from '@mui/material';
import { Line } from 'react-chartjs-2';
import './chartSetup';
import { tokens } from '../../styles/theme';

export default function TrendLineChart({ labels, values, height = 220 }) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: tokens.teal,
        backgroundColor: 'rgba(15,157,140,0.12)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: tokens.teal,
        pointRadius: 4,
        pointHoverRadius: 5,
        borderWidth: 2.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.parsed.y}%` } },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11, family: 'Inter' }, color: tokens.slate } },
      y: {
        min: 0,
        max: 100,
        grid: { color: tokens.line },
        ticks: { font: { size: 10 }, color: tokens.slate, stepSize: 25 },
      },
    },
  };

  return (
    <Box sx={{ height }}>
      <Line data={data} options={options} />
    </Box>
  );
}
