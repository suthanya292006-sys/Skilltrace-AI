import { Box } from '@mui/material';
import { Radar } from 'react-chartjs-2';
import './chartSetup';
import { tokens } from '../../styles/theme';

export default function RadarSkillChart({ labels, values }) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Skill Profile',
        data: values,
        backgroundColor: 'rgba(15,157,140,0.18)',
        borderColor: tokens.teal,
        borderWidth: 2,
        pointBackgroundColor: tokens.teal,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { display: false },
        grid: { color: 'rgba(102,112,133,0.25)' },
        angleLines: { color: 'rgba(102,112,133,0.25)' },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <Box sx={{ height: 260 }}>
      <Radar data={data} options={options} />
    </Box>
  );
}
