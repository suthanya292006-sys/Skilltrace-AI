import { Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import './chartSetup';
import { tokens } from '../../styles/theme';

export default function PortfolioBarChart({ labels, values }) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [tokens.teal, tokens.tealDark, tokens.amber, '#A6D8D1', '#F4B942'],
        borderRadius: 8,
        maxBarThickness: 34,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { display: false },
        grid: { color: 'rgba(102,112,133,0.2)' },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  return (
    <Box sx={{ height: 260 }}>
      <Bar data={data} options={options} />
    </Box>
  );
}
