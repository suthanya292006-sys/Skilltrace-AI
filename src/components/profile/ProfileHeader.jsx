import {
  Card,
  CardContent,
  Box,
  Typography,
  Stack,
  Button,
  Avatar,
  Chip,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import {
  FiEdit3,
  FiAward,
  FiBookOpen,
  FiTarget,
  FiMapPin,
  FiCheckCircle,
  FiAlertCircle,
} from 'react-icons/fi';
import { tokens } from '../../styles/theme';

export default function ProfileHeader({ profile, completion, onEditClick }) {
  if (!profile) return null;

  const initials = profile.fullName
    ? profile.fullName
        .split(' ')
        .map((w) => w[0])
        .join('')
    : 'ST';

  const completionPct = completion?.percentage || 90;

  return (
    <Card
      sx={{
        borderRadius: 3,
        borderColor: tokens.line,
        background: `linear-gradient(135deg, ${tokens.paper} 0%, #ffffff 100%)`,
        position: 'relative',
        overflow: 'hidden',
        mb: 4,
      }}
    >
      {/* Decorative Brand Accent Line */}
      <Box sx={{ height: 6, bgcolor: tokens.teal, width: '100%' }} />

      <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'center', md: 'flex-start' }}
          justifyContent="space-between"
          spacing={3}
        >
          {/* Avatar & Basic Info */}
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={3}>
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={profile.avatarUrl}
                sx={{
                  width: { xs: 80, sm: 96 },
                  height: { xs: 80, sm: 96 },
                  bgcolor: tokens.teal,
                  fontSize: { xs: 28, sm: 36 },
                  fontWeight: 700,
                  color: '#ffffff',
                  boxShadow: '0 8px 24px rgba(15,157,140,0.2)',
                  border: `3px solid #ffffff`,
                }}
              >
                {initials}
              </Avatar>
              <Tooltip title="Verified Student Account">
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 4,
                    right: 4,
                    bgcolor: tokens.teal,
                    color: '#fff',
                    borderRadius: '50%',
                    width: 22,
                    height: 22,
                    display: 'grid',
                    placeItems: 'center',
                    border: '2px solid #fff',
                  }}
                >
                  <FiCheckCircle size={14} />
                </Box>
              </Tooltip>
            </Box>

            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Stack direction="row" alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-start' }} spacing={1} sx={{ mb: 0.5 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: 22, sm: 26 }, color: tokens.ink }}>
                  {profile.fullName}
                </Typography>
                <Chip label="Final Year" size="small" sx={{ bgcolor: 'rgba(15,157,140,0.1)', color: tokens.tealDark, fontWeight: 700, height: 22 }} />
              </Stack>

              <Typography variant="body1" sx={{ color: tokens.slate, fontWeight: 500, mb: 1, fontSize: 14.5 }}>
                {profile.department} · {profile.college}
              </Typography>

              <Stack direction="row" flexWrap="wrap" justifyContent={{ xs: 'center', sm: 'flex-start' }} gap={1.5} sx={{ color: tokens.slate, fontSize: 13 }}>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <FiMapPin size={14} color={tokens.teal} />
                  <Typography variant="caption" sx={{ fontSize: 12.5, fontWeight: 500 }}>
                    {profile.location}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <FiBookOpen size={14} color={tokens.teal} />
                  <Typography variant="caption" sx={{ fontSize: 12.5, fontWeight: 500 }}>
                    {profile.academicYear}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <FiAward size={14} color={tokens.amber} />
                  <Typography variant="caption" sx={{ fontSize: 12.5, fontWeight: 700, color: tokens.ink }}>
                    CGPA: {profile.cgpa}
                  </Typography>
                </Stack>
              </Stack>

              {/* Career Goal Chip */}
              {profile.careerGoal && (
                <Box sx={{ mt: 1.8 }}>
                  <Chip
                    icon={<FiTarget size={14} color={tokens.tealDark} />}
                    label={`Target Role: ${profile.careerGoal}`}
                    variant="outlined"
                    sx={{
                      borderColor: tokens.teal,
                      bgcolor: 'rgba(15,157,140,0.06)',
                      color: tokens.tealDark,
                      fontWeight: 700,
                      fontSize: 12.5,
                      py: 0.5,
                    }}
                  />
                </Box>
              )}
            </Box>
          </Stack>

          {/* Edit Button & Profile Completion Progress Card */}
          <Stack alignItems={{ xs: 'center', md: 'flex-end' }} spacing={2} sx={{ width: { xs: '100%', md: 'auto' } }}>
            <Button
              variant="contained"
              startIcon={<FiEdit3 size={16} />}
              onClick={onEditClick}
              sx={{
                bgcolor: tokens.teal,
                '&:hover': { bgcolor: tokens.tealDark },
                fontWeight: 700,
                borderRadius: 2.5,
                px: 2.8,
                py: 1,
                alignSelf: { xs: 'stretch', sm: 'auto' },
              }}
            >
              Edit Profile
            </Button>

            {/* Completion Indicator Box */}
            <Box
              sx={{
                bgcolor: '#ffffff',
                border: `1px solid ${tokens.line}`,
                borderRadius: 2.5,
                p: 2,
                minWidth: { xs: '100%', sm: 260 },
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.8 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: tokens.slate, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Profile Completion
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: completionPct >= 90 ? tokens.teal : tokens.amber }}>
                  {completionPct}%
                </Typography>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={completionPct}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: 'rgba(102,112,133,0.12)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: completionPct >= 90 ? tokens.teal : tokens.amber,
                    borderRadius: 4,
                  },
                }}
              />

              {completion?.missingItems && completion.missingItems.length > 0 ? (
                <Stack direction="row" alignItems="center" spacing={0.8} sx={{ mt: 1 }}>
                  <FiAlertCircle size={12} color={tokens.amber} />
                  <Typography variant="caption" sx={{ fontSize: 11, color: tokens.slate }}>
                    Tip: {completion.missingItems[0]}
                  </Typography>
                </Stack>
              ) : (
                <Typography variant="caption" sx={{ fontSize: 11, color: tokens.teal, fontWeight: 600, mt: 1, display: 'block' }}>
                  ✓ All essential sections completed!
                </Typography>
              )}
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
