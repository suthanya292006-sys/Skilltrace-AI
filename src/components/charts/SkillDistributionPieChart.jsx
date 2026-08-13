import { Box } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import './chartSetup';
import { tokens } from '../../styles/theme';

const palette = [tokens.teal, tokens.amber, tokens.tealDark, tokens.danger, '#7AC8C0'];

export default function SkillDistributionPieChart({ labels, values, height = 240 }) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: palette.slice(0, values.length),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { boxWidth: 10, boxHeight: 10, font: { size: 11, family: 'Inter' }, color: tokens.slate },
      },
    },
  };

  return (
    <Box sx={{ height }}>
      <Pie data={data} options={options} />
    </Box>
  );
}
