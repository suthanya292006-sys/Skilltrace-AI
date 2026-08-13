import { Paper, Box, Typography, Stack } from '@mui/material';

export default function DashboardCard({ title, subtitle, action, icon: Icon, children, sx }) {
  return (
    <Paper
      sx={{
        borderRadius: 3,
        p: 2.8,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {(title || action) && (
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1.2} alignItems="center">
            {Icon && (
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '9px',
                  bgcolor: 'rgba(15,157,140,0.1)',
                  color: 'primary.dark',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Icon size={16} />
              </Box>
            )}
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Stack>
          {action}
        </Stack>
      )}
      {children}
    </Paper>
  );
}
