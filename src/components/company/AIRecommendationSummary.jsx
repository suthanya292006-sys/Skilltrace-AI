import { Box, Typography, Stack, Chip, Paper, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { FiCpu, FiTrendingUp, FiCheckCircle, FiAward, FiZap } from 'react-icons/fi';
import { tokens } from '../../styles/theme';

export default function AIRecommendationSummary({ profile, matchedCount }) {
  if (!profile) return null;

  const {
    careerPath,
    portfolioScore,
    portfolioTier,
    placementReadiness,
    readinessStatus,
    skills,
    aiRecommendationInsight,
  } = profile;

  return (
    <Paper
      component={motion.div}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      elevation={0}
      sx={{
        borderRadius: 4,
        p: { xs: 2.5, md: 3 },
        mb: 4,
        background: `linear-gradient(135deg, ${tokens.ink} 0%, #1a2638 100%)`,
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(16, 24, 40, 0.15)',
        border: `1px solid rgba(255, 255, 255, 0.08)`,
      }}
    >
      {/* Background Decorative Accent */}
      <Box
        sx={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(15,157,140,0.25) 0%, rgba(15,157,140,0) 70%)`,
          pointerEvents: 'none',
        }}
      />

      <Grid container spacing={3} alignItems="center">
        <Grid size={{ xs: 12, md: 7 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '8px',
                bgcolor: 'rgba(15, 157, 140, 0.2)',
                color: tokens.teal,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <FiCpu size={16} />
            </Box>
            <Typography variant="overline" sx={{ color: tokens.teal, fontWeight: 700, letterSpacing: 1.2 }}>
              AI MATCHING ENGINE &bull; MODULE 10
            </Typography>
          </Stack>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#FFFFFF',
              mb: 1,
              fontSize: { xs: '1.4rem', sm: '1.75rem' },
            }}
          >
            Target Path: {careerPath}
          </Typography>

          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.75)', mb: 2.5, lineHeight: 1.6 }}>
            {aiRecommendationInsight}
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', width: '100%', mb: 0.5 }}>
              EVALUATED SKILL MATRIX:
            </Typography>
            {skills.slice(0, 7).map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  fontSize: 11,
                  fontWeight: 500,
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              />
            ))}
            {skills.length > 7 && (
              <Chip
                label={`+${skills.length - 7} more`}
                size="small"
                sx={{
                  bgcolor: 'rgba(15, 157, 140, 0.2)',
                  color: tokens.teal,
                  fontSize: 11,
                  fontWeight: 600,
                }}
              />
            )}
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Grid container spacing={2}>
            {/* Portfolio Score Card */}
            <Grid size={{ xs: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  textAlign: 'center',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5} sx={{ mb: 0.5 }}>
                  <FiAward color={tokens.amber} size={16} />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                    Portfolio Score
                  </Typography>
                </Stack>
                <Typography variant="h4" sx={{ fontWeight: 800, color: tokens.amber, fontFamily: '"Space Grotesk", sans-serif' }}>
                  {portfolioScore}
                  <Box component="span" sx={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', ml: 0.3 }}>
                    /100
                  </Box>
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', display: 'block', mt: 0.3 }}>
                  {portfolioTier}
                </Typography>
              </Paper>
            </Grid>

            {/* Placement Readiness Card */}
            <Grid size={{ xs: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  textAlign: 'center',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5} sx={{ mb: 0.5 }}>
                  <FiTrendingUp color={tokens.teal} size={16} />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                    Placement Readiness
                  </Typography>
                </Stack>
                <Typography variant="h4" sx={{ fontWeight: 800, color: tokens.teal, fontFamily: '"Space Grotesk", sans-serif' }}>
                  {placementReadiness}%
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)', display: 'block', mt: 0.3 }}>
                  {readinessStatus}
                </Typography>
              </Paper>
            </Grid>

            {/* AI Active Matches Bar */}
            <Grid size={{ xs: 12 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 1.8,
                  borderRadius: 3,
                  bgcolor: 'rgba(15, 157, 140, 0.15)',
                  border: '1px solid rgba(15, 157, 140, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1.2}>
                  <FiZap color={tokens.amber} size={18} />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>
                      {matchedCount} Companies Active
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Filtered for your skill stack & qualifications
                    </Typography>
                  </Box>
                </Stack>
                <Chip
                  label="Updated Today"
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.15)',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: 10,
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
