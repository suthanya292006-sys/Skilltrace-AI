import { Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import './chartSetup';
import { tokens } from '../../styles/theme';

export default function CategoryBarChart({ labels, values }) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [tokens.teal, tokens.amber, tokens.tealDark, tokens.danger, '#7AC8C0', '#F4B942'],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, max: 100, ticks: { display: false } },
      x: { grid: { display: false } },
    },
  };

  return <Box sx={{ height: 260 }}><Bar data={data} options={options} /></Box>;
}
