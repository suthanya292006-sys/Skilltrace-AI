import { Box } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import './chartSetup';
import { tokens } from '../../styles/theme';

export default function AssessmentPieChart({ correct, wrong, skipped }) {
  const data = {
    labels: ['Correct', 'Wrong', 'Skipped'],
    datasets: [
      {
        data: [correct, wrong, skipped],
        backgroundColor: [tokens.teal, tokens.danger, 'rgba(102,112,133,0.25)'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return <Box sx={{ height: 260 }}><Pie data={data} options={options} /></Box>;
}
