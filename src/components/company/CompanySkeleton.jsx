import { Grid, Paper, Box, Skeleton, Stack } from '@mui/material';
import { tokens } from '../../styles/theme';

export default function CompanySkeleton({ count = 6 }) {
  return (
    <Grid container spacing={2.5}>
      {Array.from({ length: count }).map((_, idx) => (
        <Grid key={idx} size={{ xs: 12, sm: 6, lg: 4 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3.5,
              p: 2.6,
              height: '100%',
              bgcolor: 'background.paper',
              border: `1px solid ${tokens.line}`,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Skeleton variant="rounded" width={46} height={46} sx={{ borderRadius: 3 }} />
              <Box flex={1}>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton variant="text" width="80%" height={18} />
              </Box>
            </Stack>

            <Skeleton variant="rounded" height={44} sx={{ borderRadius: 2.5, mb: 2 }} />

            <Stack spacing={1} sx={{ mb: 2 }}>
              <Skeleton variant="text" width="70%" />
              <Skeleton variant="text" width="55%" />
              <Skeleton variant="text" width="65%" />
            </Stack>

            <Stack direction="row" spacing={0.8} sx={{ mb: 2 }}>
              <Skeleton variant="rounded" width={70} height={24} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: 2 }} />
              <Skeleton variant="rounded" width={60} height={24} sx={{ borderRadius: 2 }} />
            </Stack>

            <Skeleton variant="rounded" height={40} sx={{ borderRadius: 2.5, mt: 'auto' }} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
