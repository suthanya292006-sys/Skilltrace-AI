import { useEffect, useState } from 'react';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { FiAward } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import CircularScoreChart from '../charts/CircularScoreChart';
import { tokens } from '../../styles/theme';

function getCategoryColor(value) {
  if (value >= 85) return tokens.teal;
  if (value >= 70) return tokens.amber;
  return tokens.danger;
}

export default function PortfolioScoreCard({ score, confidence, category }) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const duration = 900;

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      setDisplayScore(Math.round(progress * score));
      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [score]);

  return (
    <DashboardCard title="Portfolio Score" subtitle="Professional score card" icon={FiAward}>
      <Stack spacing={2.2} alignItems="center" sx={{ py: 1 }}>
        <CircularScoreChart value={displayScore} label="Overall Score" color={getCategoryColor(score)} size={220} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            AI Confidence
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.2 }}>
            {confidence}%
          </Typography>
          <Chip label={category} sx={{ mt: 1.2, bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, fontWeight: 600 }} />
        </Box>
      </Stack>
    </DashboardCard>
  );
}
