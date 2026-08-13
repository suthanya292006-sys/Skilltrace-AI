import { Box, Typography, Grid } from '@mui/material';
import OverallSkillCard from '../../components/skills/OverallSkillCard';
import SkillRadarCard from '../../components/skills/SkillRadarCard';
import SkillDistributionCard from '../../components/skills/SkillDistributionCard';
import SkillBreakdownGrid from '../../components/skills/SkillBreakdownGrid';
import { overallSkillLevel } from '../../utils/skillAnalysisData';

export default function SkillAnalysisDashboard() {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.4 }}>
          Skill Analysis Dashboard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          A combined view of your programming, communication, and core CS competencies.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <OverallSkillCard value={overallSkillLevel} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SkillRadarCard />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <SkillDistributionCard />
        </Grid>

        <Grid size={12}>
          <SkillBreakdownGrid />
        </Grid>
      </Grid>
    </Box>
  );
}
