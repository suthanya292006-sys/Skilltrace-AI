import { Box, Typography, Button, Stack, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { tokens } from '../../styles/theme';
import TrajectoryMark from '../../components/ui/TrajectoryMark';

const stats = [
  { label: 'Portfolios analyzed', value: '12,400+' },
  { label: 'Avg. placement lift', value: '+38%' },
  { label: 'Skill signals tracked', value: '160' },
];

export default function WelcomePage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: { xs: 3, md: 8 }, py: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction="row" alignItems="center" spacing={1.2}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              bgcolor: tokens.teal,
              display: 'grid',
              placeItems: 'center',
              color: '#fff',
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
            }}
          >
            S
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            SkillTrace <Box component="span" sx={{ color: tokens.teal }}>AI</Box>
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.5}>
          <Button component={RouterLink} to="/login" color="inherit">
            Log in
          </Button>
          <Button component={RouterLink} to="/register" variant="contained" disableElevation>
            Get started
          </Button>
        </Stack>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          px: { xs: 3, md: 8 },
          py: { xs: 4, md: 0 },
          gap: 6,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box sx={{ flex: 1.1 }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Chip
              label="FOR STUDENTS ENTERING TECH"
              size="small"
              sx={{
                mb: 2.5,
                bgcolor: 'rgba(15,157,140,0.1)',
                color: tokens.tealDark,
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 11,
                letterSpacing: '0.06em',
              }}
            />
            <Typography variant="h2" sx={{ fontSize: { xs: 34, md: 48 }, lineHeight: 1.12, mb: 2.5 }}>
              Turn your projects and resume into a placement-ready trajectory.
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 520, mb: 4 }}>
              SkillTrace AI reads your resume, GitHub and certificates, scores your portfolio like a
              recruiter would, and maps the exact skill gaps standing between you and your target role.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                size="large"
                endIcon={<FiArrowRight />}
                disableElevation
              >
                Create your portfolio
              </Button>
              <Button component={RouterLink} to="/login" variant="outlined" size="large">
                I already have an account
              </Button>
            </Stack>

            <Stack direction="row" spacing={4} sx={{ mt: 6 }}>
              {stats.map((s) => (
                <Box key={s.label}>
                  <Typography
                    sx={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, fontSize: 22, color: tokens.ink }}
                  >
                    {s.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {s.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </motion.div>
        </Box>

        <Box sx={{ flex: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <Box
              sx={{
                bgcolor: tokens.ink,
                borderRadius: 4,
                p: 4,
                width: 420,
                color: '#fff',
              }}
            >
              <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                Portfolio Score
              </Typography>
              <Typography variant="h2" sx={{ fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, mb: 1 }}>
                82<Box component="span" sx={{ fontSize: 22, color: 'rgba(255,255,255,0.4)' }}>/100</Box>
              </Typography>
              <TrajectoryMark width={360} height={170} animate={false} />
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}
