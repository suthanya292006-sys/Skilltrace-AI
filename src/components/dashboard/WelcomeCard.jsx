import { Box, Typography, Button, Stack } from '@mui/material';
import { FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { tokens } from '../../styles/theme';
import TrajectoryMark from '../ui/TrajectoryMark';

export default function WelcomeCard({ name = 'Aditi', streakDays = 6 }) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      sx={{
        bgcolor: tokens.ink,
        color: '#fff',
        borderRadius: 3,
        p: { xs: 3, md: 3.5 },
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 3,
      }}
    >
      <Box sx={{ zIndex: 1, maxWidth: 480 }}>
        <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.55)' }}>
          Welcome back
        </Typography>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Good to see you, {name}.
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.65)', mb: 2.5 }}>
          You&apos;re on a {streakDays}-day activity streak — your portfolio score climbed 4 points
          this week. Keep the momentum going.
        </Typography>
        <Stack direction="row" spacing={1.5}>
          <Button variant="contained" sx={{ bgcolor: tokens.teal, '&:hover': { bgcolor: tokens.tealDark } }} endIcon={<FiArrowRight />}>
            Resume portfolio
          </Button>
          <Button variant="text" sx={{ color: '#fff' }}>
            View report
          </Button>
        </Stack>
      </Box>
      <Box sx={{ display: { xs: 'none', lg: 'block' }, opacity: 0.9 }}>
        <TrajectoryMark width={260} height={140} animate={false} />
      </Box>
    </Box>
  );
}
