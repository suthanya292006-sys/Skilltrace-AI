import { Box, InputBase, Avatar, Typography, Stack } from '@mui/material';
import { FiSearch } from 'react-icons/fi';
import NotificationsMenu from './NotificationsMenu';
import { tokens } from '../../styles/theme';

export default function DashboardHeader({ studentName = 'Aditi Sharma' }) {
  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 5,
        bgcolor: 'background.paper',
        borderBottom: `1px solid ${tokens.line}`,
        px: { xs: 2, md: 4 },
        py: 1.6,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: 'background.default',
          border: `1px solid ${tokens.line}`,
          borderRadius: 2,
          px: 1.5,
          py: 0.7,
          width: { xs: '100%', sm: 320 },
        }}
      >
        <FiSearch size={16} color={tokens.slate} />
        <InputBase placeholder="Search skills, companies, reports…" fullWidth sx={{ fontSize: 14 }} />
      </Box>

      <Stack direction="row" alignItems="center" spacing={2}>
        <NotificationsMenu />
        <Stack direction="row" alignItems="center" spacing={1.2}>
          <Avatar sx={{ width: 34, height: 34, bgcolor: tokens.teal, fontSize: 14 }}>
            {studentName
              .split(' ')
              .map((w) => w[0])
              .join('')}
          </Avatar>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.1 }}>
              {studentName}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Final Year · CSE
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
