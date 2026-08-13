import {
  Card,
  CardContent,
  Box,
  Typography,
  Stack,
  IconButton,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  FiFileText,
  FiCompass,
  FiCheckSquare,
  FiTarget,
  FiUser,
  FiBell,
  FiCheck,
  FiTrash2,
  FiExternalLink,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { tokens } from '../../styles/theme';

const categoryIcons = {
  'AI Analysis': FiFileText,
  'Assessment': FiCheckSquare,
  'Career Recommendation': FiCompass,
  'Placement': FiTarget,
  'Profile': FiUser,
  'System': FiBell,
};

const categoryColors = {
  'AI Analysis': '#0F9D8C',
  'Assessment': '#3B82F6',
  'Career Recommendation': '#8B5CF6',
  'Placement': '#F5A623',
  'Profile': '#E4572E',
  'System': '#667085',
};

export default function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
}) {
  const navigate = useNavigate();
  const IconComponent = categoryIcons[notification.category] || FiBell;
  const brandColor = categoryColors[notification.category] || tokens.teal;

  const handleActionClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 2.5,
        borderColor: notification.read ? tokens.line : `${brandColor}40`,
        bgcolor: notification.read ? '#ffffff' : `${brandColor}06`,
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(16,24,40,0.06)',
        },
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Stack direction="row" alignItems="flex-start" spacing={1.8}>
          {/* Icon Badge */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: `${brandColor}15`,
              color: brandColor,
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
              mt: 0.2,
            }}
          >
            <IconComponent size={20} />
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ mb: 0.5 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                {!notification.read && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: brandColor,
                      flexShrink: 0,
                    }}
                  />
                )}
                <Chip
                  label={notification.category}
                  size="small"
                  sx={{
                    bgcolor: `${brandColor}12`,
                    color: brandColor,
                    fontWeight: 700,
                    fontSize: 10.5,
                    height: 20,
                  }}
                />
              </Stack>
              <Typography variant="caption" sx={{ color: tokens.slate, fontSize: 11.5, flexShrink: 0 }}>
                {notification.timestamp}
              </Typography>
            </Stack>

            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: notification.read ? 600 : 700,
                color: tokens.ink,
                fontSize: 14.5,
                lineHeight: 1.3,
                mb: 0.4,
              }}
            >
              {notification.title}
            </Typography>

            <Typography variant="body2" sx={{ color: tokens.slate, fontSize: 13, lineHeight: 1.4, mb: 1 }}>
              {notification.description}
            </Typography>

            {/* Bottom Actions */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
              {notification.actionText && notification.actionUrl ? (
                <Typography
                  variant="caption"
                  onClick={handleActionClick}
                  sx={{
                    color: brandColor,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.4,
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {notification.actionText} <FiExternalLink size={12} />
                </Typography>
              ) : (
                <Box />
              )}

              <Stack direction="row" alignItems="center" spacing={0.5}>
                {!notification.read && (
                  <Tooltip title="Mark as Read">
                    <IconButton size="small" onClick={() => onMarkAsRead(notification.id)}>
                      <FiCheck size={16} color={tokens.teal} />
                    </IconButton>
                  </Tooltip>
                )}

                <Tooltip title="Delete Notification">
                  <IconButton size="small" onClick={() => onDelete(notification.id)}>
                    <FiTrash2 size={15} color={tokens.slate} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
