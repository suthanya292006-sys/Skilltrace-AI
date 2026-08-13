import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import AssessmentPieChart from '../../components/charts/AssessmentPieChart';
import AssessmentRadarChart from '../../components/charts/AssessmentRadarChart';
import CategoryBarChart from '../../components/charts/CategoryBarChart';
import RecommendationCard from '../../components/assessment/RecommendationCard';
import ResultSummary from '../../components/assessment/ResultSummary';
import { tokens } from '../../styles/theme';

export default function AssessmentResult({ result, onRetake, onReview }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.4 }}>
            Assessment Result
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            A detailed summary of your performance and next-step recommendations.
          </Typography>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
          <Button variant="outlined" onClick={onReview}>
            Review Answers
          </Button>
          <Button variant="contained" onClick={onRetake}>
            Retake Assessment
          </Button>
        </Stack>
      </Box>

      <ResultSummary result={result} />

      <Grid container spacing={3} sx={{ mt: 0.2 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ border: `1px solid ${tokens.line}`, borderRadius: 3, p: 2.4, bgcolor: 'background.paper', height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.2 }}>
              Performance Breakdown
            </Typography>
            <AssessmentPieChart correct={result.correct} wrong={result.wrong} skipped={result.skipped} />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ border: `1px solid ${tokens.line}`, borderRadius: 3, p: 2.4, bgcolor: 'background.paper', height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.2 }}>
              Skill Radar
            </Typography>
            <AssessmentRadarChart labels={result.radarLabels} values={result.radarValues} />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ border: `1px solid ${tokens.line}`, borderRadius: 3, p: 2.4, bgcolor: 'background.paper', height: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.2 }}>
              Category Wise Score
            </Typography>
            <CategoryBarChart labels={result.categoryLabels} values={result.categoryValues} />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0.2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <RecommendationCard title="Weak Topics" body={result.weakTopics} actionLabel="Practice Now" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <RecommendationCard title="Improvement Suggestions" body={result.improvementSuggestions} actionLabel="Explore Paths" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <RecommendationCard title="Recommended Courses" body={result.recommendedCourses} actionLabel="View Courses" />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <RecommendationCard title="Suggested Projects" body={result.suggestedProjects} actionLabel="Open Ideas" />
        </Grid>
      </Grid>
    </motion.div>
  );
}
