import { Box, Stack, Chip } from '@mui/material';
import { notificationCategories } from '../../utils/notificationData';
import { tokens } from '../../styles/theme';

export default function NotificationFilters({
  activeCategory = 'All',
  onCategoryChange,
  unreadCountByCategory = {},
}) {
  return (
    <Box sx={{ overflowX: 'auto', py: 0.5, mb: 2.5 }}>
      <Stack direction="row" spacing={1} sx={{ minWidth: 'max-content' }}>
        {notificationCategories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          const unread = unreadCountByCategory[cat.id] || 0;

          return (
            <Chip
              key={cat.id}
              label={
                unread > 0 ? `${cat.label} (${unread})` : cat.label
              }
              onClick={() => onCategoryChange(cat.id)}
              variant={isSelected ? 'filled' : 'outlined'}
              sx={{
                fontWeight: isSelected ? 700 : 500,
                fontSize: 12.5,
                bgcolor: isSelected ? tokens.teal : 'background.paper',
                color: isSelected ? '#ffffff' : tokens.ink,
                borderColor: isSelected ? tokens.teal : tokens.line,
                '&:hover': {
                  bgcolor: isSelected ? tokens.tealDark : 'background.default',
                },
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
