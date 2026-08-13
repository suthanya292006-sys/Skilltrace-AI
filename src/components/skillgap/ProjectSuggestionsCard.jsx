import { Box, Typography, Stack, Chip, Grid } from '@mui/material';
import { FiFolderPlus } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function ProjectSuggestionsCard({ projects }) {
  return (
    <DashboardCard title="Project Suggestions" subtitle="Build these to close specific gaps" icon={FiFolderPlus}>
      <Grid container spacing={2}>
        {projects.map((p) => (
          <Grid key={p.title} size={{ xs: 12, sm: 6, md: 4 }}>
            <Box sx={{ border: `1px solid ${tokens.line}`, borderRadius: 2.5, p: 2, height: '100%' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.8 }}>
                {p.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.4, lineHeight: 1.5 }}>
                {p.description}
              </Typography>
              <Stack direction="row" spacing={0.6} flexWrap="wrap" useFlexGap>
                {p.skillsCovered.map((s) => (
                  <Chip key={s} label={s} size="small" sx={{ bgcolor: 'action.hover', fontSize: 11 }} />
                ))}
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </DashboardCard>
  );
}
