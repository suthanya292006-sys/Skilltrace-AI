import { Box, Stack, Avatar, Typography, Button, Paper, Chip } from '@mui/material';
import { FiLogOut, FiMail, FiCalendar, FiBookOpen } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { tokens } from '../../styles/theme';

export default function UserProfile({ compact = false }) {
  const { user, logout } = useAuth();

  if (!user) return null;

  if (compact) {
    return (
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: tokens.teal,
            color: '#ffffff',
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          {user.initials || 'U'}
        </Avatar>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 700, color: tokens.ink, lineHeight: 1.1 }}>
            {user.fullName}
          </Typography>
          <Typography variant="caption" sx={{ color: tokens.slate }}>
            {user.department || 'Student'}
          </Typography>
        </Box>
      </Stack>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: `1px solid ${tokens.line}`,
        bgcolor: '#ffffff',
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Avatar
          sx={{
            width: 52,
            height: 52,
            bgcolor: tokens.teal,
            color: '#ffffff',
            fontWeight: 800,
            fontSize: 20,
          }}
        >
          {user.initials || 'U'}
        </Avatar>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: tokens.ink }}>
              {user.fullName}
            </Typography>
            <Chip
              label={user.role || 'Student'}
              size="small"
              sx={{
                bgcolor: 'rgba(15,157,140,0.1)',
                color: tokens.tealDark,
                fontWeight: 700,
                fontSize: 10,
                height: 18,
              }}
            />
          </Stack>
          <Typography variant="body2" sx={{ color: tokens.slate, fontSize: 13 }}>
            {user.email}
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={1} sx={{ pt: 1.5, borderTop: `1px dashed ${tokens.line}`, mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FiBookOpen size={14} color={tokens.teal} />
          <Typography variant="caption" sx={{ color: tokens.slate }}>
            Dept: <strong>{user.department || 'Computer Science & Engineering'}</strong>
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <FiCalendar size={14} color={tokens.teal} />
          <Typography variant="caption" sx={{ color: tokens.slate }}>
            Member Since: <strong>{user.createdAt || 'Aug 2026'}</strong>
          </Typography>
        </Stack>
      </Stack>

      <Button
        variant="outlined"
        color="error"
        fullWidth
        size="small"
        startIcon={<FiLogOut size={14} />}
        onClick={logout}
        sx={{ borderRadius: 2, fontWeight: 600 }}
      >
        Sign Out
      </Button>
    </Paper>
  );
}
