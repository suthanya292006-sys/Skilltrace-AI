import { Box, Typography, Grid } from '@mui/material';
import PlacementScoreCard from '../../components/placement/PlacementScoreCard';
import ProbabilityConfidenceCard from '../../components/placement/ProbabilityConfidenceCard';
import ExpectedOutcomesCard from '../../components/placement/ExpectedOutcomesCard';
import PlacementTrendCard from '../../components/placement/PlacementTrendCard';
import PredictionExplanationCard from '../../components/placement/PredictionExplanationCard';
import { placementPrediction } from '../../utils/placementPredictionData';

export default function PlacementPredictionPage() {
  const { score, probability, confidence, expectedSalary, expectedTier, trend, explanation } =
    placementPrediction;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.4 }}>
          Placement Prediction
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          A model estimate of your placement outcome for the next hiring cycle.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <PlacementScoreCard score={score} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ProbabilityConfidenceCard probability={probability} confidence={confidence} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ExpectedOutcomesCard expectedSalary={expectedSalary} expectedTier={expectedTier} />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <PlacementTrendCard trend={trend} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <PredictionExplanationCard explanation={explanation} />
        </Grid>
      </Grid>
    </Box>
  );
}
