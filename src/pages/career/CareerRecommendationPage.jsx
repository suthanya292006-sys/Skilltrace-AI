import { useMemo, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CareerCard from '../../components/career/CareerCard';
import CareerSortControl from '../../components/career/CareerSortControl';
import { careerRecommendations } from '../../utils/careerRecommendationData';

function parseSalaryUpper(range) {
  const matches = range.match(/₹(\d+)L/g) || [];
  const nums = matches.map((m) => parseInt(m.replace(/[₹L]/g, ''), 10));
  return nums.length ? Math.max(...nums) : 0;
}

function parseGrowth(growth) {
  const match = growth.match(/(\d+)%/);
  return match ? parseInt(match[1], 10) : 0;
}

export default function CareerRecommendationPage() {
  const [sortBy, setSortBy] = useState('match');

  const sorted = useMemo(() => {
    const list = [...careerRecommendations];
    if (sortBy === 'match') return list.sort((a, b) => b.match - a.match);
    if (sortBy === 'salary') return list.sort((a, b) => parseSalaryUpper(b.salaryRange) - parseSalaryUpper(a.salaryRange));
    if (sortBy === 'growth') return list.sort((a, b) => parseGrowth(b.growth) - parseGrowth(a.growth));
    return list;
  }, [sortBy]);

  return (
    <Box>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { sm: 'flex-end' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.4 }}>
            Career Recommendation
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            AI-matched roles based on your skills, projects, and assessments.
          </Typography>
        </Box>
        <CareerSortControl value={sortBy} onChange={setSortBy} />
      </Box>

      <Grid container spacing={2.5}>
        {sorted.map((career) => (
          <Grid key={career.key} size={{ xs: 12, sm: 6, lg: 4 }}>
            <CareerCard career={career} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
