import { Box } from '@mui/material';
import { Radar } from 'react-chartjs-2';
import './chartSetup';
import { tokens } from '../../styles/theme';

export default function AssessmentRadarChart({ labels, values }) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: 'rgba(15,157,140,0.15)',
        borderColor: tokens.teal,
        borderWidth: 2,
        pointBackgroundColor: tokens.teal,
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
      },
    },
    plugins: { legend: { display: false } },
  };

  return <Box sx={{ height: 260 }}><Radar data={data} options={options} /></Box>;
}
