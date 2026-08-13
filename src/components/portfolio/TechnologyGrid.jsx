import { Box, Chip, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { FiCpu } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

const iconMap = {
  react: '⚛️',
  node: '🟢',
  java: '☕',
  python: '🐍',
  sql: '🗄️',
  docker: '🐳',
  aws: '☁️',
  git: '🔧',
};

export default function TechnologyGrid({ technologies }) {
  return (
    <DashboardCard title="Technology Stack" subtitle="Responsive grid with progress indicators" icon={FiCpu}>
      <Grid container spacing={2}>
        {technologies.map((tech) => (
          <Grid key={tech.name} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Box sx={{ border: `1px solid ${tokens.line}`, borderRadius: 2.5, p: 2.2, height: '100%' }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.4 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box sx={{ fontSize: 18 }}>{iconMap[tech.icon] || '💡'}</Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {tech.name}
                  </Typography>
                </Stack>
                <Chip label={tech.level} size="small" sx={{ bgcolor: 'rgba(15,157,140,0.08)', color: tokens.tealDark, fontWeight: 600 }} />
              </Stack>
              <LinearProgress variant="determinate" value={tech.progress} sx={{ height: 8, borderRadius: 999, bgcolor: 'rgba(15,157,140,0.08)', '& .MuiLinearProgress-bar': { bgcolor: tokens.teal, borderRadius: 999 } }} />
              <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
                {tech.progress}% experience
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </DashboardCard>
  );
}
