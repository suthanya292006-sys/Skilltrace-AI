import { Stack, Box, Typography, Switch, Chip } from '@mui/material';
import { tokens } from '../../styles/theme';

export default function SettingsToggle({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  badgeText,
  badgeColor = 'default',
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
      sx={{
        py: 1.8,
        px: 2,
        borderRadius: 2.5,
        border: `1px solid ${tokens.line}`,
        bgcolor: checked ? 'rgba(15,157,140,0.03)' : 'background.paper',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: tokens.teal,
        },
      }}
    >
      <Box sx={{ pr: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: tokens.ink, fontSize: 14 }}>
            {label}
          </Typography>
          {badgeText && (
            <Chip
              label={badgeText}
              size="small"
              color={badgeColor}
              sx={{ height: 18, fontSize: 10, fontWeight: 700 }}
            />
          )}
        </Stack>
        {description && (
          <Typography variant="caption" sx={{ color: tokens.slate, mt: 0.3, display: 'block', lineHeight: 1.4 }}>
            {description}
          </Typography>
        )}
      </Box>

      <Switch
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        sx={{
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: tokens.teal,
            '& + .MuiSwitch-track': {
              backgroundColor: tokens.teal,
            },
          },
        }}
      />
    </Stack>
  );
}
