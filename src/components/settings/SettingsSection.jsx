import { Paper, Box, Stack, Typography } from '@mui/material';
import { tokens } from '../../styles/theme';

export default function SettingsSection({
  title,
  subtitle,
  icon: Icon,
  action,
  children,
  sx = {},
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5 },
        borderRadius: 3,
        border: `1px solid ${tokens.line}`,
        bgcolor: '#ffffff',
        mb: 3,
        ...sx,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        spacing={2}
        sx={{ pb: 2.5, mb: 3, borderBottom: `1px solid ${tokens.line}` }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          {Icon && (
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: 'rgba(15,157,140,0.08)',
                color: tokens.teal,
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
              }}
            >
              <Icon size={20} />
            </Box>
          )}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: tokens.ink, fontSize: 18 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body2" sx={{ color: tokens.slate, mt: 0.2, fontSize: 13 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
        </Stack>

        {action && <Box>{action}</Box>}
      </Stack>

      <Box>{children}</Box>
    </Paper>
  );
}
