import { Box, Typography, Grid, Stack } from '@mui/material';
import { FiDollarSign, FiAward } from 'react-icons/fi';
import DashboardCard from '../ui/DashboardCard';
import { tokens } from '../../styles/theme';

export default function ExpectedOutcomesCard({ expectedSalary, expectedTier }) {
  return (
    <DashboardCard title="Expected Outcomes" subtitle="Based on similar placed profiles">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ border: `1px solid ${tokens.line}`, borderRadius: 2.5, p: 2 }}>
            <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1 }}>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: '8px',
                  bgcolor: 'rgba(15,157,140,0.1)',
                  color: tokens.tealDark,
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <FiDollarSign size={15} />
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                EXPECTED SALARY
              </Typography>
            </Stack>
            <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, fontSize: 20 }}>
              {expectedSalary}
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ border: `1px solid ${tokens.line}`, borderRadius: 2.5, p: 2 }}>
            <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1 }}>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: '8px',
                  bgcolor: 'rgba(245,166,35,0.14)',
                  color: tokens.amber,
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <FiAward size={15} />
              </Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                EXPECTED COMPANY TIER
              </Typography>
            </Stack>
            <Typography sx={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, fontSize: 20 }}>
              {expectedTier}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}
