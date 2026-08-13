import { Grid, Box } from '@mui/material';
import WelcomeCard from '../../components/dashboard/WelcomeCard';
import ProfileSummaryCard from '../../components/dashboard/ProfileSummaryCard';
import PortfolioScoreCard from '../../components/dashboard/PortfolioScoreCard';
import SkillLevelCard from '../../components/dashboard/SkillLevelCard';
import PlacementProbabilityCard from '../../components/dashboard/PlacementProbabilityCard';
import CareerRecommendationCard from '../../components/dashboard/CareerRecommendationCard';
import AITipsCard from '../../components/dashboard/AITipsCard';
import RecentActivityTimeline from '../../components/dashboard/RecentActivityTimeline';
import QuickActions from '../../components/dashboard/QuickActions';

export default function DashboardPage() {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <WelcomeCard />
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <ProfileSummaryCard />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <PortfolioScoreCard />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <PlacementProbabilityCard />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <SkillLevelCard />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CareerRecommendationCard />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <AITipsCard />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <RecentActivityTimeline />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <QuickActions />
        </Grid>
      </Grid>
    </Box>
  );
}
