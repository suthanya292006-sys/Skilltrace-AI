import { Box, Typography, Grid } from '@mui/material';
import CurrentSkillsCard from '../../components/skillgap/CurrentSkillsCard';
import MissingSkillsCard from '../../components/skillgap/MissingSkillsCard';
import RecommendedSkillsCard from '../../components/skillgap/RecommendedSkillsCard';
import LearningRoadmapCard from '../../components/skillgap/LearningRoadmapCard';
import ProjectSuggestionsCard from '../../components/skillgap/ProjectSuggestionsCard';
import LearningResourcesCard from '../../components/skillgap/LearningResourcesCard';
import ImprovementTimelineCard from '../../components/skillgap/ImprovementTimelineCard';
import {
  currentSkills,
  missingSkills,
  recommendedSkills,
  learningRoadmap,
  projectSuggestions,
  learningResources,
  improvementTimeline,
} from '../../utils/skillGapData';

export default function SkillGapAnalysisPage() {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.4 }}>
          Skill Gap Analysis
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          What you have, what's missing, and a concrete path to close the gap.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CurrentSkillsCard skills={currentSkills} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <MissingSkillsCard skills={missingSkills} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <RecommendedSkillsCard items={recommendedSkills} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <LearningRoadmapCard steps={learningRoadmap} />
        </Grid>

        <Grid size={12}>
          <ProjectSuggestionsCard projects={projectSuggestions} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <LearningResourcesCard resources={learningResources} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ImprovementTimelineCard timeline={improvementTimeline} />
        </Grid>
      </Grid>
    </Box>
  );
}
