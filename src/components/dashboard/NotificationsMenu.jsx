import { useState, useEffect, useCallback } from 'react';
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
  Divider,
  Button,
  Stack,
  Chip,
} from '@mui/material';
import {
  FiBell,
  FiFileText,
  FiCompass,
  FiCheckSquare,
  FiTarget,
  FiUser,
  FiCheckCircle,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '../../services/notificationService';
import { tokens } from '../../styles/theme';

const categoryIcons = {
  'AI Analysis': FiFileText,
  'Assessment': FiCheckSquare,
  'Career Recommendation': FiCompass,
  'Placement': FiTarget,
  'Profile': FiUser,
  'System': FiBell,
};

export default function NotificationsMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const loadNotifications = useCallback(async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.notifications);
      setUnreadCount(res.unreadCount);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
    loadNotifications();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = async (n) => {
    if (!n.read) {
      await markNotificationAsRead(n.id);
      loadNotifications();
    }
    handleClose();
    if (n.actionUrl) {
      navigate(n.actionUrl);
    } else {
      navigate('/profile');
    }
  };

  const handleMarkAllRead = async (e) => {
    e.stopPropagation();
    await markAllNotificationsAsRead();
    loadNotifications();
  };

  return (
    <>
      <IconButton onClick={handleOpen} size="small">
        <Badge badgeContent={unreadCount} color="error" max={99}>
          <FiBell size={19} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            width: 360,
            maxHeight: 480,
            mt: 1,
            borderRadius: 3,
            border: `1px solid ${tokens.line}`,
            boxShadow: '0 12px 32px rgba(16,24,40,0.12)',
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: 15, color: tokens.ink }}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Chip label={`${unreadCount} new`} size="small" color="error" sx={{ height: 18, fontSize: 10, fontWeight: 700 }} />
            )}
          </Stack>

          {unreadCount > 0 && (
            <Button
              size="small"
              onClick={handleMarkAllRead}
              startIcon={<FiCheckCircle size={13} />}
              sx={{ fontSize: 11, p: 0, minWidth: 'auto', color: tokens.tealDark, fontWeight: 700 }}
            >
              Mark all read
            </Button>
          )}
        </Box>

        <Divider />

        {notifications.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: tokens.slate }}>
              No notifications yet.
            </Typography>
          </Box>
        ) : (
          notifications.slice(0, 5).map((n) => {
            const IconComp = categoryIcons[n.category] || FiBell;
            return (
              <MenuItem
                key={n.id}
                onClick={() => handleItemClick(n)}
                sx={{
                  py: 1.5,
                  px: 2,
                  alignItems: 'flex-start',
                  gap: 1.5,
                  bgcolor: n.read ? 'transparent' : 'rgba(15,157,140,0.04)',
                  borderBottom: `1px solid ${tokens.line}`,
                  '&:last-child': { borderBottom: 0 },
                }}
              >
                <Box
                  sx={{
                    width: 34,
                    height: 34,
                    borderRadius: 2,
                    bgcolor: !n.read ? 'rgba(15,157,140,0.12)' : 'action.hover',
                    color: !n.read ? tokens.tealDark : tokens.slate,
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                    mt: 0.2,
                  }}
                >
                  <IconComp size={16} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontWeight: !n.read ? 700 : 500, color: tokens.ink, lineHeight: 1.3, whiteSpace: 'normal' }}>
                    {n.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: tokens.slate, display: 'block', fontSize: 11.5, mt: 0.3, lineHeight: 1.3, whiteSpace: 'normal' }}>
                    {n.description}
                  </Typography>
                  <Typography variant="caption" sx={{ color: tokens.slate, opacity: 0.7, fontSize: 10.5, mt: 0.5, display: 'block' }}>
                    {n.timestamp}
                  </Typography>
                </Box>
              </MenuItem>
            );
          })
        )}

        <Divider />

        <Box sx={{ p: 1, textAlign: 'center' }}>
          <Button
            fullWidth
            size="small"
            onClick={() => {
              handleClose();
              navigate('/profile');
            }}
            sx={{ color: tokens.tealDark, fontWeight: 700, fontSize: 12.5 }}
          >
            Manage All Notifications →
          </Button>
        </Box>
      </Menu>
    </>
  );
}
