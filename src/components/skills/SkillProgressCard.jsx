import { Box, Typography, Stack, LinearProgress, Chip } from '@mui/material';
import {
  FiCode,
  FiMessageCircle,
  FiCpu,
  FiDatabase,
  FiLayers,
} from 'react-icons/fi';
import { tokens } from '../../styles/theme';

const iconMap = {
  programming: FiCode,
  communication: FiMessageCircle,
  problemSolving: FiCpu,
  databaseKnowledge: FiDatabase,
  systemDesign: FiLayers,
};

function levelColor(v) {
  if (v >= 75) return tokens.teal;
  if (v >= 50) return tokens.amber;
  return tokens.danger;
}

export default function SkillProgressCard({ skillKey, label, value, level, note }) {
  const Icon = iconMap[skillKey] || FiCode;
  const color = levelColor(value);

  return (
    <Box sx={{ border: `1px solid ${tokens.line}`, borderRadius: 3, p: 2.4, height: '100%' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.4 }}>
        <Stack direction="row" spacing={1.2} alignItems="center">
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '9px',
              bgcolor: `${color}1F`,
              color,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Icon size={16} />
          </Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {label}
          </Typography>
        </Stack>
        <Chip label={level} size="small" sx={{ bgcolor: `${color}1F`, color, fontWeight: 600, fontSize: 11 }} />
      </Stack>

      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.6 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          Score
        </Typography>
        <Typography
          variant="caption"
          sx={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600 }}
        >
          {value}/100
        </Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 7,
          borderRadius: 4,
          bgcolor: 'action.hover',
          mb: 1.4,
          '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 4 },
        }}
      />

      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
        {note}
      </Typography>
    </Box>
  );
}
