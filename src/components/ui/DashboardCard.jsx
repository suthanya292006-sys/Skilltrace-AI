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
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...sx,
      }}
    >
      {(title || action) && (
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1} sx={{ mb: 2, minWidth: 0 }}>
          <Stack direction="row" spacing={1.2} alignItems="center" sx={{ minWidth: 0, flex: 1 }}>
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
                  flexShrink: 0,
                }}
              >
                <Icon size={16} />
              </Box>
            )}
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2, wordBreak: 'break-word' }}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', wordBreak: 'break-word' }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Stack>
          {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
        </Stack>
      )}
      <Box sx={{ minWidth: 0, width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </Box>
    </Paper>
  );
}
