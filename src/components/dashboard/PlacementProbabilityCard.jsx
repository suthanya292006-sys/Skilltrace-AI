import { Box, Typography, Stack, Chip } from '@mui/material';
import { FiTrendingUp } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function PlacementProbabilityCard({ probability = 74, confidence = 'High' }) {
  const size = 148;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (probability / 100) * circumference;

  return (
    <DashboardCard title="Placement Probability" subtitle="Next placement cycle" icon={FiTrendingUp}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 1 }}>
        <Box sx={{ position: 'relative', width: size, height: size }}>
          <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={size / 2} cy={size / 2} r={radius} stroke={tokens.line} strokeWidth={stroke} fill="none" />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={tokens.teal}
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
          </svg>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, fontSize: 28 }}>
              {probability}%
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              probability
            </Typography>
          </Box>
        </Box>
      </Box>

      <Stack direction="row" justifyContent="center" spacing={1} sx={{ mt: 1 }}>
        <Chip
          size="small"
          label={`Confidence: ${confidence}`}
          sx={{ bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, fontSize: 12 }}
        />
        <Chip size="small" label="Expected: Tier 2" sx={{ bgcolor: 'action.hover', fontSize: 12 }} />
      </Stack>
    </DashboardCard>
  );
}
