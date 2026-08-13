import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';
import { tokens } from '../../styles/theme';
import TrajectoryMark from '../../components/ui/TrajectoryMark';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate('/welcome'), 2200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: tokens.ink,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        gap: 3,
      }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '12px',
              bgcolor: tokens.teal,
              display: 'grid',
              placeItems: 'center',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            S
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            SkillTrace <Box component="span" sx={{ color: tokens.teal }}>AI</Box>
          </Typography>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <TrajectoryMark width={260} height={140} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{ width: 180 }}
      >
        <LinearProgress
          sx={{
            height: 3,
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.1)',
            '& .MuiLinearProgress-bar': { bgcolor: tokens.teal },
          }}
        />
        <Typography
          variant="overline"
          sx={{ display: 'block', textAlign: 'center', mt: 1.5, color: 'rgba(255,255,255,0.5)' }}
        >
          Plotting your trajectory
        </Typography>
      </motion.div>
    </Box>
  );
}
