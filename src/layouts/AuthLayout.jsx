import { Box, Stack, Typography, Chip } from '@mui/material';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import TrajectoryMark from '../components/ui/TrajectoryMark';
import { tokens } from '../styles/theme';

export default function AuthLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Brand panel */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '44%',
          minHeight: '100vh',
          bgcolor: tokens.ink,
          color: '#fff',
          px: 6,
          py: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.2}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '9px',
              bgcolor: tokens.teal,
              display: 'grid',
              placeItems: 'center',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
            }}
          >
            S
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
            SkillTrace <Box component="span" sx={{ color: tokens.teal }}>AI</Box>
          </Typography>
        </Stack>

        <Box>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Chip
              label="CAREER READINESS, MEASURED"
              size="small"
              sx={{
                bgcolor: 'rgba(15,157,140,0.16)',
                color: tokens.teal,
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 11,
                letterSpacing: '0.06em',
                mb: 3,
              }}
            />
            <Typography variant="h3" sx={{ maxWidth: 420, lineHeight: 1.2, mb: 2 }}>
              Every project, skill and certificate — plotted into one trajectory.
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', maxWidth: 380 }}>
              SkillTrace AI reads your portfolio the way a recruiter would, then tells you
              exactly what to build next.
            </Typography>
          </motion.div>

          <Box sx={{ mt: 5 }}>
            <TrajectoryMark width={380} height={190} />
          </Box>
        </Box>

        <Stack direction="row" spacing={3}>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)' }}>
            © 2026 SkillTrace AI
          </Typography>
          <Typography
            component={RouterLink}
            to="/"
            variant="caption"
            sx={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
          >
            Back to home
          </Typography>
        </Stack>
      </Box>

      {/* Form panel */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
          py: 6,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 420 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
