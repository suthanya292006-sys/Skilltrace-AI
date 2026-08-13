import { Card, CardContent, Box, Typography, Stack, Button, Divider } from '@mui/material';
import { tokens } from '../../styles/theme';

export default function ProfileSection({
  title,
  subtitle,
  icon: Icon,
  actionText,
  onActionClick,
  children,
}) {
  return (
    <Card sx={{ borderRadius: 3, borderColor: tokens.line, height: '100%', mb: 3 }}>
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            {Icon && (
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: 2,
                  bgcolor: 'rgba(15,157,140,0.1)',
                  color: tokens.teal,
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Icon size={19} />
              </Box>
            )}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 17, color: tokens.ink, lineHeight: 1.2 }}>
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="caption" sx={{ color: tokens.slate, fontSize: 12 }}>
                  {subtitle}
                </Typography>
              )}
            </Box>
          </Stack>

          {actionText && onActionClick && (
            <Button
              size="small"
              variant="outlined"
              onClick={onActionClick}
              sx={{ borderColor: tokens.line, color: tokens.tealDark, fontWeight: 700, borderRadius: 2, fontSize: 12.5 }}
            >
              {actionText}
            </Button>
          )}
        </Stack>

        <Divider sx={{ mb: 2.5, borderColor: tokens.line }} />

        {children}
      </CardContent>
    </Card>
  );
}
