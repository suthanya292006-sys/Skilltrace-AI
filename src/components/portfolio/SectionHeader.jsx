import { Box, Typography, Stack } from '@mui/material';

export default function SectionHeader({ icon: Icon, title, subtitle, action }) {
  return (
    <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 2.5 }}>
      <Stack direction="row" spacing={1.4} alignItems="center">
        {Icon && (
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '9px',
              bgcolor: 'rgba(15,157,140,0.1)',
              color: 'primary.dark',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Icon size={17} />
          </Box>
        )}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Stack>
      {action}
    </Stack>
  );
}
