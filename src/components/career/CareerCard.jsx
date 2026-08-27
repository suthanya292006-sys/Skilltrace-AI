import { Box, Typography, Stack, Chip, LinearProgress, Paper } from '@mui/material';
import { FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import { tokens } from '../../styles/theme';

function matchColor(v) {
  if (v >= 75) return tokens.teal;
  if (v >= 50) return tokens.amber;
  return tokens.slate;
}

export default function CareerCard({ career }) {
  const { title, icon: Icon, description, requiredSkills, salaryRange, growth, match } = career;
  const color = matchColor(match);

  return (
    <Paper
      sx={{
        borderRadius: 3,
        p: 2.6,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1} sx={{ mb: 1.6, minWidth: 0 }}>
        <Stack direction="row" spacing={1.4} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
          {Icon && (
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: '10px',
                bgcolor: 'rgba(15,157,140,0.1)',
                color: 'primary.dark',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
              }}
            >
              <Icon size={18} />
            </Box>
          )}
          <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.25, wordBreak: 'break-word', minWidth: 0 }}>
            {title}
          </Typography>
        </Stack>
      </Stack>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, flex: 1, wordBreak: 'break-word' }}>
        {description}
      </Typography>

      <Stack direction="row" spacing={0.7} flexWrap="wrap" useFlexGap sx={{ mb: 2, minWidth: 0 }}>
        {requiredSkills.map((s) => (
          <Chip
            key={s}
            label={s}
            size="small"
            sx={{
              bgcolor: 'action.hover',
              fontSize: 11,
              maxWidth: '100%',
              '& .MuiChip-label': { wordBreak: 'break-word', whiteSpace: 'normal', py: 0.2 },
            }}
          />
        ))}
      </Stack>

      <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 2, minWidth: 0 }}>
        <Stack direction="row" spacing={0.6} alignItems="center" sx={{ minWidth: 0 }}>
          <FiDollarSign size={13} color={tokens.slate} style={{ flexShrink: 0 }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, wordBreak: 'break-word' }}>
            {salaryRange}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={0.6} alignItems="center" sx={{ minWidth: 0 }}>
          <FiTrendingUp size={13} color={tokens.slate} style={{ flexShrink: 0 }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, wordBreak: 'break-word' }}>
            {growth}
          </Typography>
        </Stack>
      </Stack>

      <Box sx={{ mt: 'auto', minWidth: 0 }}>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.6 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Career match
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 700, color }}>
            {match}%
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={match}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: 'action.hover',
            '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 3 },
          }}
        />
      </Box>
    </Paper>
  );
}
