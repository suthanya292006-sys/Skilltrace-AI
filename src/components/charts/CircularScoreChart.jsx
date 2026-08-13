import { Box } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import './chartSetup';
import { tokens } from '../../styles/theme';

export default function CircularScoreChart({ value, color = tokens.teal, label, size = 220 }) {
  const safeValue = Math.max(0, Math.min(100, value));
  const data = {
    datasets: [
      {
        data: [safeValue, 100 - safeValue],
        backgroundColor: [color, 'rgba(228, 231, 236, 0.85)'],
        borderWidth: 0,
        cutout: '78%',
        hoverOffset: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90 * (Math.PI / 180),
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }}>
      <Box sx={{ width: size, height: size, position: 'relative', mx: 'auto' }}>
        <Doughnut data={data} options={options} />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Box component="span" sx={{ fontSize: 28, fontWeight: 700, lineHeight: 1, color: tokens.ink }}>
            {safeValue}
          </Box>
          {label && (
            <Box component="span" sx={{ mt: 0.8, fontSize: 13, color: 'text.secondary' }}>
              {label}
            </Box>
          )}
        </Box>
      </Box>
    </motion.div>
  );
}
